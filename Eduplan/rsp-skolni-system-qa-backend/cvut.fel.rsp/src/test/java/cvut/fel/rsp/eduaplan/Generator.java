package cvut.fel.rsp.eduaplan;

import cvut.fel.rsp.eduaplan.model.*;

import java.util.Date;
import java.util.Random;
import java.util.UUID;

public class Generator {
    private static final Random RAND = new Random();

    public static int randomInt() {
        return RAND.nextInt();
    }

    public static boolean randomBoolean() {
        return RAND.nextBoolean();
    }

    private static int createRandomIntBetween(int start, int end) {
        return start + (int) Math.round(Math.random() * (end - start));
    }

    private static Date generateRandomDate() {
        int day = createRandomIntBetween(1, 28);
        int month = createRandomIntBetween(1, 12);
        int year = createRandomIntBetween(1995, 2005);
        return new Date(year, month, day);
    }

    private static String generateRandomFirstName() {
        String[] names = {"Adam", "Juraj", "Patrik", "Anna", "Zuzana", "Eva"};

        return names[createRandomIntBetween(0, 5)];
    }

    private static String generateRandomSecondName() {
        String[] names = {"Novak", "Horvat", "Orisin", "Novotny", "Cibulka", "Kostik"};

        return names[createRandomIntBetween(0, 5)];
    }

    //return random unique integer
    public static String generateUniqueLogin() {
        return UUID.randomUUID().toString();
    }

    public static BaseTestEntity generateBasicEntity(){
        BaseTestEntity entity = new BaseTestEntity();
        String[] values = {"apple", "pie", "blackberry", "pear", "blueberry", "peach"};
        entity.setValue(values[createRandomIntBetween(0,5)]);

        return  new BaseTestEntity();
    }

    public static UserTestEntity generateUserEntity(){
        UserTestEntity entity = new UserTestEntity();
        String[] login = {"tdnfjd", "dsfjnf", "dfdfg", "trkdn", "dfne", "dhfje"};
        entity.setLogin(login[createRandomIntBetween(0,5)]);
        String[] email = {"tdnfjd@gmail.com", "dsfjnf@gmail.com", "dfdfg@gmail.com", "trkdn@gmail.com", "dfne@gmail.com", "dhfje@gmail.com"};
        entity.setEmail(email[createRandomIntBetween(0,5)]);

        return  new UserTestEntity();
    }

    // every user has password "123456:
    public static Student generateStudent() {
        final Student student = new Student();

        student.setBirthday(generateRandomDate());
        student.setFirst_name(generateRandomFirstName());
        student.setSecond_name(generateRandomSecondName());
        student.setEmail("test@test.com");
        student.setLogin(generateUniqueLogin());
        student.setPassword("123456");

        return student;
    }

    // every user has password "123456:
    public static Teacher generateTeacher() {
        final Teacher student = new Teacher();

        student.setBirthday(generateRandomDate());
        student.setFirst_name(generateRandomFirstName());
        student.setSecond_name(generateRandomSecondName());
        student.setEmail("test@test.com");
        student.setLogin(generateUniqueLogin());
        student.setPassword("123456");

        return student;
    }

    public static Subject generateSubject() {
        final Subject subject = new Subject();

        String[] subjectNames = {"English", "Slovak", "Math", "Chemistry", "Physics", "Coding"};
        subject.setName(subjectNames[createRandomIntBetween(0, 5)]);

        String[] subjectCode = {"ENG", "SLO", "MAT", "CHE", "PHY", "COD"};
        subject.setName(subjectCode[createRandomIntBetween(0, 5)]);

        return subject;
    }
}