package cvut.fel.rsp.eduaplan.service;

import cvut.fel.rsp.eduaplan.dao.EventDao;
import cvut.fel.rsp.eduaplan.model.Event;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService extends BaseService<Event, EventDao>{

    public EventService(EventDao dao) {
        super(dao);
    }

    @Transactional
    public void deleteAllEventsByDay(Integer day) {
        dao.deleteAllByDay(day);
    }

    @Transactional
    public List<Event> findAllByDay(Integer day) {
        return dao.findAll().stream().filter(event -> event.getWeek_day().equals(day)).collect(Collectors.toList());
    }

    @Transactional
    public List<Event> findAllByGroupAndSubject(Integer groupId, Integer subjectId) {
        return dao.findAll().stream().filter(event -> event.getId_subject().equals(subjectId) && event.getId_group().equals(groupId)).collect(Collectors.toList());
    }
}
