package cvut.fel.rsp.eduaplan.dao;

import cvut.fel.rsp.eduaplan.model.Absence;
import org.springframework.stereotype.Repository;

@Repository
public class AbsenceDao extends BaseDao<Absence> {
    public AbsenceDao() {
        super(Absence.class);
    }
}
