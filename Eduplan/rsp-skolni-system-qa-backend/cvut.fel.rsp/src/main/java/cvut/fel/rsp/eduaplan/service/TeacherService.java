package cvut.fel.rsp.eduaplan.service;

import cvut.fel.rsp.eduaplan.dao.GenericDao;
import cvut.fel.rsp.eduaplan.dao.GroupDao;
import cvut.fel.rsp.eduaplan.dao.TeacherDao;
import cvut.fel.rsp.eduaplan.model.Event;
import cvut.fel.rsp.eduaplan.model.Group;
import cvut.fel.rsp.eduaplan.model.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.HashSet;
import java.util.Set;

@Service
public class TeacherService extends BaseService<Teacher, TeacherDao>{

    private GroupDao groupDao;

    @Autowired
    public TeacherService(TeacherDao dao, GroupDao groupDao) {
        super(dao);
        this.groupDao = groupDao;
    }

    public List<Group> findGroupById(Integer id) {
        Teacher teacher = ((GenericDao<Teacher>)dao).find(id);
        Set<Integer> groupIds = new HashSet<>();
        for (Event event : teacher.getEvents()) {
            groupIds.add(event.getId_group());
        }

        return groupDao.findAllByAds(groupIds);
    }

    public List<Group> findGroupBySubject(int teacherId, int subjectId) {
        Teacher teacher = ((GenericDao<Teacher>)dao).find(teacherId);
        Set<Integer> groupIds = new HashSet<>();
        for (Event event : teacher.getEvents()) {
            if (event.getId_subject() == subjectId) {
                groupIds.add(event.getId_group());
            }
        }

        return groupDao.findAllByAds(groupIds);
    }
}
