package cvut.fel.rsp.eduaplan.service;

import cvut.fel.rsp.eduaplan.dao.RoomDao;
import cvut.fel.rsp.eduaplan.model.Room;
import org.springframework.stereotype.Service;

@Service
public class RoomService extends BaseService<Room, RoomDao> {
    public RoomService(RoomDao dao) {
        super(dao);
    }
}
