package cvut.fel.rsp.eduaplan.controller;

import cvut.fel.rsp.eduaplan.dao.TimeZoneDao;
import cvut.fel.rsp.eduaplan.model.TimeZone;
import cvut.fel.rsp.eduaplan.service.TimeZoneService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/time_zone")
public class TimeZoneController extends BaseController<TimeZoneService, TimeZone, TimeZoneDao> {
    public TimeZoneController(TimeZoneService service) {
        super(service);
    }
}

