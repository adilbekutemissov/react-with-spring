package cvut.fel.rsp.eduaplan.service;

import cvut.fel.rsp.eduaplan.dao.StudentSubjectDao;
import cvut.fel.rsp.eduaplan.model.StudentSubject;
import org.springframework.stereotype.Service;

@Service
public class StudentSubjectService extends BaseService<StudentSubject, StudentSubjectDao>{
    public StudentSubjectService(StudentSubjectDao dao) {
        super(dao);
    }
}
