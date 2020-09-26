package cvut.fel.rsp.eduaplan.dao;

import cvut.fel.rsp.eduaplan.exception.PersistenceException;
import cvut.fel.rsp.eduaplan.model.Admin;
import org.springframework.stereotype.Repository;
import java.util.Objects;

@Repository
public class AdminDao extends BaseDao<Admin> {

    public AdminDao() {
        super(Admin.class);
    }

    public void persist(Admin admin) {
        Objects.requireNonNull(admin);
        try {
            em.createNativeQuery("INSERT INTO admin (id) VALUES (?)")
                    .setParameter(1, admin.getId())
                    .executeUpdate();
        } catch (RuntimeException e) {
            throw new PersistenceException(e);
        }
    }
}
