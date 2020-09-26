package cvut.fel.rsp.eduaplan.service;

import cvut.fel.rsp.eduaplan.dao.StudentDao;
import cvut.fel.rsp.eduaplan.model.Student;
import org.springframework.stereotype.Service;

@Service
public class StudentService extends BaseService<Student, StudentDao> {

    public StudentService(StudentDao dao) {
        super(dao);
    }
}
