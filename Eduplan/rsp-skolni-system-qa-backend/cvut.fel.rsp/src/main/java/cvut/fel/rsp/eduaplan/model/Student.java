package cvut.fel.rsp.eduaplan.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "student")
public class Student extends User {

    private int year;
    private Integer id_group;

    @ManyToOne
    @JoinColumn(name = "id_group", updatable = false, insertable = false)
    private Group group;

    @OneToMany(mappedBy = "student")
    private Set<Absence> absences;

    @OneToMany(mappedBy = "student")
    private Set<Mark> marks;

    @OneToMany(mappedBy = "student")
    private Set<StudentSubject> subjects;

    public Set<Absence> getAbsences() {
        return absences;
    }

    public void setAbsences(Set<Absence> absences) {
        this.absences = absences;
    }

    public Set<Mark> getMarks() {
        return this.marks;
    }

    public void setMarks(Set<Mark> marks) {
        this.marks = marks;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public Group getGroup() {
        return this.group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Integer getId_group() {
        return this.id_group;
    }

    public void setId_group(Integer id_group) {
        this.id_group = id_group;
    }

    public Set<StudentSubject> getSubjects() {
        return subjects;
    }

    public void setSubjects(Set<StudentSubject> subjects) {
        this.subjects = subjects;
    }
}
