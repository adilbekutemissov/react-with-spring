package cvut.fel.rsp.eduaplan.controller;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import cvut.fel.rsp.eduaplan.controller.util.RestUtils;
import cvut.fel.rsp.eduaplan.dao.EventDao;
import cvut.fel.rsp.eduaplan.model.Event;
import cvut.fel.rsp.eduaplan.service.EventService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="/event")
public class EventController extends BaseController<EventService, Event, EventDao> {

    public EventController(EventService service) {
        super(service);
    }

    /**
     * Create events.
     *
     * @method  POST
     * @param   jsonWithEvents
     * @autor   Grigoryev Nikita
     * @date    2020-04-01
     * @return  Response with headers and http status.
     */
    @RequestMapping(value = "/events/{day}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> createEntities(@PathVariable("day") Integer day, @RequestBody String jsonWithEvents) {
        ((EventService) service).deleteAllEventsByDay(day);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ArrayList<Event> list = objectMapper.readValue(jsonWithEvents, new TypeReference<ArrayList<Event>>() {
            });
            StringBuilder stringBuilder = new StringBuilder();
            for (Event event : list) {
                ((EventService) service).persist(event);
                stringBuilder.append(event.getId()).append(" | ");
            }
            LOG.debug("Created entity {}.", jsonWithEvents);
            final HttpHeaders headers = RestUtils.createLocationHeaderFromCurrentUri("", stringBuilder.toString());
            return new ResponseEntity<>(headers, HttpStatus.CREATED);
        } catch (Exception ex) {
            LOG.debug("Crash during create entities {}.", jsonWithEvents);
            final HttpHeaders headers = RestUtils.createLocationHeaderFromCurrentUri("", "Error");
            return new ResponseEntity<>(headers, HttpStatus.FAILED_DEPENDENCY);
        }
    }

    /**
     * Get events by day.
     *
     * @method  GET
     * @param   day
     * @autor   Grigoryev Nikita
     * @date    2020-04-01
     * @return  Response with headers and http status.
     */
    @RequestMapping(value = "/day/{day}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Event> getEntitiesByDay(@PathVariable("day") Integer day) {
        return ((EventService)service).findAllByDay(day);
    }

    /**
     * Get events by day.
     *
     * @method  GET
     * @param   groupId
     * @param   subjectId
     * @autor   Grigoryev Nikita
     * @date    2020-04-01
     * @return  Response with headers and http status.
     */
    @RequestMapping(value = "/group/{id_group}/subject/{id_subject}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Event> getEntitiesByDay(@PathVariable("id_group") Integer groupId, @PathVariable("id_subject") Integer subjectId) {
        return ((EventService)service).findAllByGroupAndSubject(groupId, subjectId);
    }
}
