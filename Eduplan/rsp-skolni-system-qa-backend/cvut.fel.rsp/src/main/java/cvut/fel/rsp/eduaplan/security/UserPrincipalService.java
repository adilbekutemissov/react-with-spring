package cvut.fel.rsp.eduaplan.security;

import cvut.fel.rsp.eduaplan.dao.UserDao;
import cvut.fel.rsp.eduaplan.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserPrincipalService implements UserDetailsService {

    private final UserDao userDao;

    public UserPrincipalService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Transactional
    public UserPrincipal loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findAll().stream().filter(us -> us.getLogin().equals(username)).findFirst().orElseThrow(() -> new UsernameNotFoundException("User not found: "+ username));

        return UserPrincipal.create(user);
    }


}
