package cvut.fel.rsp.eduaplan.dao;

import cvut.fel.rsp.eduaplan.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao extends BaseDao<User> {

    public UserDao() {
        super(User.class);
    }

    public boolean existsUsername(String username) {
        return this.findAll().stream().anyMatch(user -> user.getLogin().equals(username));
    }

    public boolean existsEmail(String email) {
        return this.findAll().stream().anyMatch(user -> user.getEmail().equals(email));
    }
}
