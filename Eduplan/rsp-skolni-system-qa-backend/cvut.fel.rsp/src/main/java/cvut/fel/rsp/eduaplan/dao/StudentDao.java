package cvut.fel.rsp.eduaplan.dao;

import cvut.fel.rsp.eduaplan.exception.PersistenceException;
import cvut.fel.rsp.eduaplan.model.Student;
import org.springframework.stereotype.Repository;

import java.util.Objects;

@Repository
public class StudentDao extends BaseDao<Student> {
    public StudentDao() {
        super(Student.class);
    }

    public void persist(Student student) {
        Objects.requireNonNull(student);
        try {
            em.createNativeQuery("INSERT INTO student (id, id_group, year) VALUES (?,?,?)")
                    .setParameter(1, student.getId())
                    .setParameter(2, student.getId_group())
                    .setParameter(3, student.getYear())
                    .executeUpdate();
        } catch (RuntimeException e) {
            throw new PersistenceException(e);
        }
    }
}
