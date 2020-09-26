package cvut.fel.rsp.eduaplan.exception;

/**
 * Base for all application-specific exceptions.
 */
public class EduaplanException extends RuntimeException {

    public EduaplanException() {
    }

    public EduaplanException(String message) {
        super(message);
    }

    public EduaplanException(String message, Throwable cause) {
        super(message, cause);
    }

    public EduaplanException(Throwable cause) {
        super(cause);
    }

}