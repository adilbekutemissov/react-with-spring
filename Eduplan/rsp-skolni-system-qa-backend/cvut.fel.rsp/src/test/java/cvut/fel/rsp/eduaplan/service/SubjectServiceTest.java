package cvut.fel.rsp.eduaplan.service;

import cvut.fel.rsp.eduaplan.Generator;
import cvut.fel.rsp.eduaplan.exception.NotFoundException;
import cvut.fel.rsp.eduaplan.model.Subject;
import cvut.fel.rsp.eduaplan.model.Teacher;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.print.attribute.standard.Destination;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
public class SubjectServiceTest {

    @Autowired
    public SubjectService subjectService;

    @Test
    public void getDestinationTest() {
        Subject subject = Generator.generateSubject();
        Subject tempDestination = subjectService.find(subject.getId());
        assertEquals(subject, tempDestination);

    }

    @Test(expected = NotFoundException.class)
    public void removeDestinationByIdTest() {
        Subject subject = Generator.generateSubject();

        subjectService.remove(subject);

        subjectService.find(subject.getId());
    }

}
