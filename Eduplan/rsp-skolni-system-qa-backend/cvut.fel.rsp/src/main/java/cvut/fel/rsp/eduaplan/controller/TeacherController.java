package cvut.fel.rsp.eduaplan.controller;

import cvut.fel.rsp.eduaplan.dao.TeacherDao;
import cvut.fel.rsp.eduaplan.exception.NotFoundException;
import cvut.fel.rsp.eduaplan.model.Group;
import cvut.fel.rsp.eduaplan.model.Subject;
import cvut.fel.rsp.eduaplan.model.Teacher;
import cvut.fel.rsp.eduaplan.service.BaseService;
import cvut.fel.rsp.eduaplan.service.SubjectService;
import cvut.fel.rsp.eduaplan.service.TeacherService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping(path = "/teacher")
public class TeacherController extends BaseController<TeacherService, Teacher, TeacherDao> {

    private SubjectService subjectService;
    public TeacherController(TeacherService service, SubjectService subjectService) {
        super(service);
        this.subjectService = subjectService;
    }

    /**
     * Get group by teacher id.
     * @return  Entity.
     */
    @RequestMapping(value = "/{id}/groups", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Group> getGroupById(@PathVariable("id") Integer id) {

        final Teacher teacher = ((BaseService<Teacher, TeacherDao>)service).find(id);
        if (teacher == null) {
            throw NotFoundException.create(this.getClass().getSimpleName(), id);
        }

        return ((TeacherService)service).findGroupById(teacher.getId());
    }

    /**
     * Get group by teacher id and subject id.
     * @return  Entity.
     */
    @RequestMapping(value = "/{id}/groups/{id2}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Group> getGroupByIdAndSubjectId(@PathVariable("id") Integer id, @PathVariable("id2") Integer id2) {

        final Teacher teacher = ((BaseService<Teacher, TeacherDao>)service).find(id);
        if (teacher == null) {
            throw NotFoundException.create(this.getClass().getSimpleName(), id);
        }

        final Subject subject = subjectService.find(id2);
        if (subject == null) {
            throw NotFoundException.create(this.getClass().getSimpleName(), id);
        }

        return ((TeacherService)service).findGroupBySubject(teacher.getId(), id2);
    }
}
