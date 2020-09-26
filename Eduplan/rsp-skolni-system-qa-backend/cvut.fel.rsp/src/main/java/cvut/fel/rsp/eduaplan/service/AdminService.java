package cvut.fel.rsp.eduaplan.service;

import cvut.fel.rsp.eduaplan.dao.AdminDao;
import cvut.fel.rsp.eduaplan.model.Admin;
import org.springframework.stereotype.Service;

@Service
public class AdminService extends BaseService<Admin, AdminDao> {

    public AdminService(AdminDao dao) {
        super(dao);
    }
}
