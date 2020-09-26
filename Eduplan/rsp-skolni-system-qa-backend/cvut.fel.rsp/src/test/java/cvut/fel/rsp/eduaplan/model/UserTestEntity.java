package cvut.fel.rsp.eduaplan.model;

import javax.persistence.Entity;

@Entity
public class UserTestEntity extends User {

    private String userName;

    private String email;

    public String getLogin() {
        return userName;
    }

    public void setLogin(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
