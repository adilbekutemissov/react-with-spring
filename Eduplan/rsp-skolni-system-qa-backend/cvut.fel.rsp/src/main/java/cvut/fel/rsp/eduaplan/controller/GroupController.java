package cvut.fel.rsp.eduaplan.controller;

import cvut.fel.rsp.eduaplan.dao.GroupDao;
import cvut.fel.rsp.eduaplan.model.Group;
import cvut.fel.rsp.eduaplan.service.GroupService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/group")
public class GroupController extends BaseController<GroupService, Group, GroupDao> {
    public GroupController(GroupService service) {
        super(service);
    }
}
