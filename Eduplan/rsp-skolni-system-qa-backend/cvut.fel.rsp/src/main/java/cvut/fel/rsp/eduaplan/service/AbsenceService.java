package cvut.fel.rsp.eduaplan.service;

import cvut.fel.rsp.eduaplan.dao.AbsenceDao;
import cvut.fel.rsp.eduaplan.model.Absence;
import org.springframework.stereotype.Service;

@Service
public class AbsenceService extends BaseService<Absence, AbsenceDao> {
    public AbsenceService(AbsenceDao dao) {
        super(dao);
    }
}
