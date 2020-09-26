package cvut.fel.rsp.eduaplan.dao;

import cvut.fel.rsp.eduaplan.model.Group;
import org.springframework.stereotype.Repository;

@Repository
public class GroupDao extends BaseDao<Group> {
    public GroupDao() {
        super(Group.class);
    }
}
