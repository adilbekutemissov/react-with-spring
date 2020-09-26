package cvut.fel.rsp.eduaplan.model;

import cvut.fel.rsp.eduaplan.Generator;
import org.junit.Test;
import java.util.HashSet;
import java.util.Set;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class GroupTest {

    @Test
    public  void addStudentToGroup(){
        System.out.println("add student to group");

        Set<Student> setOfStudents = new HashSet<>();

        for(int i = 0; i < 10; i++){
            setOfStudents.add(Generator.generateStudent());
        }


        Group group = new Group();
        group.setStudents(setOfStudents);


        assertNotNull(group.getStudents());
        assertEquals(10, group.getStudents().size());

    }
}
