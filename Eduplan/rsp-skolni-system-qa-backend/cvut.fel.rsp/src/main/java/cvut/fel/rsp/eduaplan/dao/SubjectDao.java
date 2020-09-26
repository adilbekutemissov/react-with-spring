package cvut.fel.rsp.eduaplan.dao;

import cvut.fel.rsp.eduaplan.model.Subject;
import org.springframework.stereotype.Repository;

/**
 * The type Subject dao.
 * @author Patrik Jankuv
 * @date 2020-04-04
 */
@Repository
public class SubjectDao extends BaseDao<Subject> {

    /**
     * Instantiates a new Subject dao.
     */
    protected SubjectDao() {
        super(Subject.class);
    }
}

