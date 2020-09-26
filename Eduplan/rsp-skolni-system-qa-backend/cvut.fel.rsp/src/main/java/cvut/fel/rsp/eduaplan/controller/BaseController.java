package cvut.fel.rsp.eduaplan.controller;

import cvut.fel.rsp.eduaplan.controller.util.RestUtils;
import cvut.fel.rsp.eduaplan.exception.NotFoundException;
import cvut.fel.rsp.eduaplan.model.IEntity;
import cvut.fel.rsp.eduaplan.service.BaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class BaseController<T, S, D> {

    protected final Logger LOG = LoggerFactory.getLogger(this.getClass());

    protected final T service;

    @Autowired
    public BaseController(T service) {
        this.service = service;
    }

    /**
     * Get all entities.
     *
     * @method  GET
     * @autor   Grigoryev Nikita
     * @date    2020-04-01
     * @return  List with courses.
     */
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<S> getEntities() {
        return ((BaseService<S, D>)service).findAll();
    }

    /**
     * Create entity.
     *
     * @method  POST
     * @param   entity
     * @autor   Grigoryev Nikita
     * @date    2020-04-01
     * @return  Response with headers and http status.
     */
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> createEntity(@RequestBody S entity) {
        ((BaseService<S, D>)service).persist(entity);
        LOG.debug("Created entity {}.", entity);
        final HttpHeaders headers = RestUtils.createLocationHeaderFromCurrentUri("/{id}", ((IEntity)entity).getId());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    /**
     * Get entity by id.
     *
     * @method  GET
     * @param   id
     * @autor   Grigoryev Nikita
     * @date    2020-04-01
     * @return  Entity.
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public S getById(@PathVariable("id") Integer id) {
        final S entity =  ((BaseService<S, D>)service).find(id);
        if (entity == null) {
            throw NotFoundException.create(this.getClass().getSimpleName(), id);
        }
        return entity;
    }

    /**
     * Update entity by id.
     *
     * @method  PUT
     * @param   id
     * @author  Grigoryev Nikita
     * @date    2020-04-01
     * @return  Entity
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateEntity(@RequestBody S entityToUpdate, @PathVariable("id") Integer id) {
        final S entity = ((BaseService<S, D>)service).find(id);
        if (entity == null) {
            throw NotFoundException.create(this.getClass().getSimpleName(), id);
        }
        ((IEntity)entityToUpdate).setId(((IEntity)entity).getId());
        ((BaseService<S, D>)service).update(entityToUpdate);

        LOG.debug("Updated entity {}.", entityToUpdate);
        final HttpHeaders headers = RestUtils.createLocationHeaderFromCurrentUri("/{id}", ((IEntity)entityToUpdate).getId());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeEntity(@PathVariable("id") Integer id) {
        final S entity = ((BaseService<S, D>)service).find(id);
        if (entity != null) {
            ((BaseService<S, D>)service).remove(entity);
        }
        LOG.debug("Removed entity {}.", entity);
    }
}
