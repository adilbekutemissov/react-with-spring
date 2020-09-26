package cvut.fel.rsp.eduaplan.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "time_zone")
@JsonIgnoreProperties(ignoreUnknown = true, value = {"hibernateLazyInitializer", "handler", "events"})
public class TimeZone extends BaseEntity implements IEntity {

    private String zone;

    @OneToMany(mappedBy = "timeZone")
    private Set<Event> events;

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public String getZone() {
        return this.zone;
    }

    public Set<Event> getEvents() {
        return events;
    }
}
