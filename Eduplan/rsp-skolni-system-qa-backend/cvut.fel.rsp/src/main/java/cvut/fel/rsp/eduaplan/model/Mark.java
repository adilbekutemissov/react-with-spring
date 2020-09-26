package cvut.fel.rsp.eduaplan.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "marks")
@JsonIgnoreProperties(ignoreUnknown = true, value = {"student"})

public class Mark extends BaseEntity implements IEntity{

    private Integer id_student;
    private Integer id_subject;
    private Integer mark;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="id_subject",  insertable = false, updatable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_student", insertable = false, updatable = false)
    private Student student;

    public Integer getId_student() {
        return this.id_student;
    }

    public void setId_student(Integer id_student) {
        this.id_student = id_student;
    }

    public Integer getId_subject() {
        return this.id_subject;
    }

    public void setId_subject(Integer id_subject) {
        this.id_subject = id_subject;
    }

    public Integer getMark() {
        return this.mark;
    }

    public void setMark(Integer mark) {
        this.mark = mark;
    }

    public Student getStudent() {
        return this.student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }


}
