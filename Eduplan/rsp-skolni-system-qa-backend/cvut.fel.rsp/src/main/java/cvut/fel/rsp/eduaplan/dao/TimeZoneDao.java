package cvut.fel.rsp.eduaplan.dao;

import cvut.fel.rsp.eduaplan.model.TimeZone;
import org.springframework.stereotype.Repository;

@Repository
public class TimeZoneDao extends BaseDao<TimeZone> {
    protected TimeZoneDao() {
        super(TimeZone.class);
    }
}
