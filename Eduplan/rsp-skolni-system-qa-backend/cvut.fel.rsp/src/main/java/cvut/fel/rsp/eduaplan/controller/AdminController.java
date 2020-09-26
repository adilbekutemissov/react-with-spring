package cvut.fel.rsp.eduaplan.controller;

import cvut.fel.rsp.eduaplan.dao.AdminDao;
import cvut.fel.rsp.eduaplan.model.Admin;
import cvut.fel.rsp.eduaplan.service.AdminService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/admin")
public class AdminController extends BaseController<AdminService, Admin, AdminDao> {
    public AdminController(AdminService service) {
        super(service);
    }
}
