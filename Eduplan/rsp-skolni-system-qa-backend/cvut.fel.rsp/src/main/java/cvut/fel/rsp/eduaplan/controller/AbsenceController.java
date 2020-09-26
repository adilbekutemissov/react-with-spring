package cvut.fel.rsp.eduaplan.controller;

import cvut.fel.rsp.eduaplan.dao.AbsenceDao;
import cvut.fel.rsp.eduaplan.model.Absence;
import cvut.fel.rsp.eduaplan.service.AbsenceService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/absence")
public class AbsenceController extends BaseController<AbsenceService, Absence, AbsenceDao> {
    public AbsenceController(AbsenceService service) {
        super(service);
    }
}
