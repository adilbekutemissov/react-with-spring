package cvut.fel.rsp.eduaplan.service;

import cvut.fel.rsp.eduaplan.dao.MarkDao;
import cvut.fel.rsp.eduaplan.model.Mark;
import org.springframework.stereotype.Service;

@Service
public class MarkService extends BaseService<Mark, MarkDao> {
    public MarkService(MarkDao dao) {
        super(dao);
    }
}
