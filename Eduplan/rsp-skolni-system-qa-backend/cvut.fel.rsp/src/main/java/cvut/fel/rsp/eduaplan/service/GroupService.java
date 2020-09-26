package cvut.fel.rsp.eduaplan.service;

import cvut.fel.rsp.eduaplan.dao.GroupDao;
import cvut.fel.rsp.eduaplan.model.Group;
import org.springframework.stereotype.Service;

@Service
public class GroupService extends BaseService<Group, GroupDao> {

    public GroupService(GroupDao dao) {
        super(dao);
    }
}
