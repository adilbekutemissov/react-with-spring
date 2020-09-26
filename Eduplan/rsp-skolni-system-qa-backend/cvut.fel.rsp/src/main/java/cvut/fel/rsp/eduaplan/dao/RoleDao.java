package cvut.fel.rsp.eduaplan.dao;

import cvut.fel.rsp.eduaplan.model.Role;
import org.springframework.stereotype.Repository;

@Repository
public class RoleDao extends BaseDao<Role> {

    public RoleDao() {
        super(Role.class);
    }

    public Role findByName(String name) {
        Role role = this.findAll().stream().filter(r -> r.getName().equals(name)).findFirst().orElse(null);
        return role;
    }
}
