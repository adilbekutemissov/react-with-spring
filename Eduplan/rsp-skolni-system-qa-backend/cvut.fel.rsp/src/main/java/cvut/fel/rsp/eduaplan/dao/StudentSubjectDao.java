package cvut.fel.rsp.eduaplan.dao;

import cvut.fel.rsp.eduaplan.model.StudentSubject;
import org.springframework.stereotype.Repository;

@Repository
public class StudentSubjectDao extends BaseDao<StudentSubject>{
    /**
     * Instantiates a new Subject dao.
     */
    protected StudentSubjectDao() {
        super(StudentSubject.class);
    }
}
