package cvut.fel.rsp.eduaplan.controller;

import cvut.fel.rsp.eduaplan.dao.*;
import cvut.fel.rsp.eduaplan.model.*;
import cvut.fel.rsp.eduaplan.security.UserPrincipal;
import cvut.fel.rsp.eduaplan.security.jwt.JwtUtils;
import cvut.fel.rsp.eduaplan.security.request.SignInRequest;
import cvut.fel.rsp.eduaplan.security.response.JwtResponse;
import cvut.fel.rsp.eduaplan.security.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDao userDao;

    @Autowired
    private TeacherDao teacherDao;

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private AdminDao adminDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody SignInRequest signInRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getLogin(), signInRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        List<String> roles = userPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt, userPrincipal.getId(), userPrincipal.getUsername(), userPrincipal.getId_group(), userPrincipal.getEmail(), roles));
    }

    @PostMapping("/signup/teacher")
    @Transactional
    public ResponseEntity<?> registerTeacher(@Valid @RequestBody Teacher teacher) {
        teacher.setPassword(passwordEncoder.encode(teacher.getPassword()));
        ResponseEntity<?> errorResponse = checkUsernameAndEmailExist(teacher);
        if (errorResponse != null) {
            return errorResponse;
        }

        List<Role> roles = new ArrayList<>();
        Role userRole = roleDao.findByName("ROLE_TEACHER");
        roles.add(userRole);

        teacher.setRoles(roles);
        userDao.persist(teacher);
        teacherDao.persist(teacher);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/signup/student")
    @Transactional
    public ResponseEntity<?> registerStudent(@Valid @RequestBody Student student) {
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        ResponseEntity<?> errorResponse = checkUsernameAndEmailExist(student);
        if (errorResponse != null) {
            return errorResponse;
        }

        List<Role> roles = new ArrayList<>();
        Role userRole = roleDao.findByName("ROLE_STUDENT");
        roles.add(userRole);

        student.setRoles(roles);
        userDao.persist(student);
        studentDao.persist(student);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/signup/admin")
    @Transactional
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        ResponseEntity<?> errorResponse = checkUsernameAndEmailExist(admin);
        if (errorResponse != null) {
            return errorResponse;
        }

        List<Role> roles = new ArrayList<>();
        Role userRole = roleDao.findByName("ROLE_ADMIN");
        roles.add(userRole);

        admin.setRoles(roles);
        userDao.persist(admin);
        adminDao.persist(admin);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    private ResponseEntity<?> checkUsernameAndEmailExist(User user) {
        if (userDao.existsUsername(user.getLogin())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already exist!"));
        }

        if (userDao.existsEmail(user.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        return null;
    }
}
