package cvut.fel.rsp.eduaplan.config;

import cvut.fel.rsp.eduaplan.dao.RoleDao;
import cvut.fel.rsp.eduaplan.dao.UserDao;
import cvut.fel.rsp.eduaplan.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class RoleLoader implements ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        if (alreadySetup)
            return;

        // creating roles
        createRoleIfNotFound("ROLE_ADMIN");
        createRoleIfNotFound("ROLE_STUDENT");
        createRoleIfNotFound("ROLE_TEACHER");

        alreadySetup = true;
    }

    @Transactional
    Role createRoleIfNotFound(
            String name) {

        Role role = roleDao.findByName(name);
        if (role == null) {
            role = new Role(name);
            roleDao.persist(role);
        }
        return role;
    }
}
