package cvut.fel.rsp.eduaplan.controller;


import cvut.fel.rsp.eduaplan.dao.RoomDao;
import cvut.fel.rsp.eduaplan.model.Room;
import cvut.fel.rsp.eduaplan.service.RoomService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/room")
public class RoomController extends BaseController<RoomService, Room, RoomDao> {
    public RoomController(RoomService service) {
        super(service);
    }
}
