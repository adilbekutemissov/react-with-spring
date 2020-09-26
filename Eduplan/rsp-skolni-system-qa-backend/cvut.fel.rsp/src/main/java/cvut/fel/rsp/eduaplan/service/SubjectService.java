package cvut.fel.rsp.eduaplan.service;

import cvut.fel.rsp.eduaplan.dao.SubjectDao;
import cvut.fel.rsp.eduaplan.model.Subject;
import org.springframework.stereotype.Service;

/**
 * The type Subject Service.
 * @author Patrik Jankuv
 * @date 2020-04-06
 */
@Service
public class SubjectService extends BaseService<Subject, SubjectDao>{

    public SubjectService(SubjectDao dao) {
        super(dao);
    }
}
