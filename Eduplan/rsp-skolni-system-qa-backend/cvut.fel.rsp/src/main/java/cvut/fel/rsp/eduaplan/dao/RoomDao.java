package cvut.fel.rsp.eduaplan.dao;


import cvut.fel.rsp.eduaplan.model.Room;
import org.springframework.stereotype.Repository;

@Repository
public class RoomDao extends BaseDao<Room> {
    protected RoomDao() {
        super(Room.class);
    }
}
