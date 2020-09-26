package cvut.fel.rsp.eduaplan.dao;

import cvut.fel.rsp.eduaplan.model.Mark;
import org.springframework.stereotype.Repository;

@Repository
public class MarkDao extends BaseDao<Mark> {
    public MarkDao() {
        super(Mark.class);
    }
}
