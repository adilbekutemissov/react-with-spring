package cvut.fel.rsp.eduaplan.service;

import cvut.fel.rsp.eduaplan.dao.GenericDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Objects;

public abstract class BaseService<T, S> {

    protected S dao;

    @Autowired
    public BaseService(S dao) {
        this.dao = dao;
    }

    @Transactional(readOnly = true)
    public List<T> findAll() {

        return ((GenericDao<T>)dao).findAll();
    }

    @Transactional(readOnly = true)
    public T find(Integer id) {
        return (T) ((GenericDao<T>)dao).find(id);
    }

    @Transactional
    public void persist(T object) {
        Objects.requireNonNull(object);
        ((GenericDao<T>)dao).persist(object);
    }

    @Transactional
    public void update(T object) {
        Objects.requireNonNull(object);
        ((GenericDao<T>)dao).update(object);
    }

    @Transactional
    public void remove(T object) {
        Objects.requireNonNull(object);
        ((GenericDao<T>)dao).remove(object);
//        ((GenericDao<T>)dao).update(object);
    }
}
