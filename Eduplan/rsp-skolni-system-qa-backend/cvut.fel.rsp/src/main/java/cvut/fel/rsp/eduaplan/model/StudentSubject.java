package cvut.fel.rsp.eduaplan.model;

import javax.persistence.*;

@Entity
@Table(name = "student_subject")
public class StudentSubject extends BaseEntity implements IEntity {
    private Integer id_student;
    private Integer id_subject;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="id_subject",  insertable = false, updatable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_student", insertable = false, updatable = false)
    private Student student;


    public Integer getId_subject() {
        return id_subject;
    }

    public void setId_subject(Integer id_subject) {
        this.id_subject = id_subject;
    }

    public Integer getId_student() {
        return id_student;
    }

    public void setId_student(Integer id_student) {
        this.id_student = id_student;
    }

    public Subject getSubject() {
        return this.subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
}
