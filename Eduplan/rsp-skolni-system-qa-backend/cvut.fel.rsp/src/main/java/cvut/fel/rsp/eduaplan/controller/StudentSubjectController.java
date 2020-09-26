package cvut.fel.rsp.eduaplan.controller;

import cvut.fel.rsp.eduaplan.dao.StudentSubjectDao;
import cvut.fel.rsp.eduaplan.model.StudentSubject;
import cvut.fel.rsp.eduaplan.service.StudentSubjectService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/student_subject")
public class StudentSubjectController extends BaseController<StudentSubjectService, StudentSubject, StudentSubjectDao> {

    public StudentSubjectController(StudentSubjectService service) {
        super(service);
    }
}
