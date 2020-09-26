package cvut.fel.rsp.eduaplan.exception;

public class PersistenceException extends EduaplanException {

    public PersistenceException(String message, Throwable cause) {
        super(message, cause);
    }

    public PersistenceException(Throwable cause) {
        super(cause);
    }
}
