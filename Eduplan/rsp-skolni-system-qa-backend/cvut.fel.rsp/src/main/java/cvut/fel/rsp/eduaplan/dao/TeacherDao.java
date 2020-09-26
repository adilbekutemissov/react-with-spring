package cvut.fel.rsp.eduaplan.dao;

import cvut.fel.rsp.eduaplan.exception.PersistenceException;
import cvut.fel.rsp.eduaplan.model.Teacher;
import org.springframework.stereotype.Repository;
import java.util.Objects;

@Repository
public class TeacherDao extends BaseDao<Teacher> {
    public TeacherDao() {
        super(Teacher.class);
    }

    public void persist(Teacher teacher) {
        Objects.requireNonNull(teacher);
        try {
            em.createNativeQuery("INSERT INTO teacher (id) VALUES (?)")
                    .setParameter(1, teacher.getId())
                    .executeUpdate();
        } catch (RuntimeException e) {
            throw new PersistenceException(e);
        }
    }
}
