package cvut.fel.rsp.eduaplan.controller;

import cvut.fel.rsp.eduaplan.dao.MarkDao;
import cvut.fel.rsp.eduaplan.model.Mark;
import cvut.fel.rsp.eduaplan.service.MarkService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/mark")
public class MarkController extends BaseController<MarkService, Mark, MarkDao> {
    public MarkController(MarkService service) {
        super(service);
    }
}
