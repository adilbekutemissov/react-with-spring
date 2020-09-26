package cvut.fel.rsp.eduaplan.controller;


import cvut.fel.rsp.eduaplan.dao.SubjectDao;
import cvut.fel.rsp.eduaplan.model.Subject;
import cvut.fel.rsp.eduaplan.service.SubjectService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/subject")
public class SubjectController extends BaseController<SubjectService, Subject, SubjectDao> {

    public SubjectController(SubjectService service) {
        super(service);
    }
}
