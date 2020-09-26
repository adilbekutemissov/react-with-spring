package cvut.fel.rsp.eduaplan.service;

import cvut.fel.rsp.eduaplan.dao.TimeZoneDao;
import cvut.fel.rsp.eduaplan.model.TimeZone;
import org.springframework.stereotype.Service;

@Service
public class TimeZoneService extends BaseService<TimeZone, TimeZoneDao> {
    public TimeZoneService(TimeZoneDao dao) {
        super(dao);
    }
}
