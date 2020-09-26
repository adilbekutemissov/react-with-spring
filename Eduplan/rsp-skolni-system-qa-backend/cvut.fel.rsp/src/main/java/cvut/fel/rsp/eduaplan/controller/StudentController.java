package cvut.fel.rsp.eduaplan.controller;

import cvut.fel.rsp.eduaplan.dao.StudentDao;
import cvut.fel.rsp.eduaplan.model.Student;
import cvut.fel.rsp.eduaplan.service.StudentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/student")
public class StudentController extends BaseController<StudentService, Student, StudentDao> {
    public StudentController(StudentService service) {
        super(service);
    }
}
