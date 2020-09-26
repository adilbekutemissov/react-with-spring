package cvut.fel.rsp.eduaplan.dao;

import cvut.fel.rsp.eduaplan.exception.PersistenceException;
import cvut.fel.rsp.eduaplan.model.Event;
import org.springframework.stereotype.Repository;

@Repository
public class EventDao extends BaseDao<Event>{

    protected EventDao() {
            super(Event.class);
        }

    public void deleteAllByDay(Integer day) {
        try {
            em.createNativeQuery("DELETE FROM event_ WHERE week_day = ?") .setParameter(1, day).executeUpdate();
        } catch (RuntimeException e) {
            throw new PersistenceException(e);
        }
    }
}
