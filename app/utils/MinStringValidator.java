package utils;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;
import static play.libs.F.Tuple;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.Payload;

import play.data.validation.Constraints;
 	
public class MinStringValidator extends Constraints{

	@Target({FIELD})
    @Retention(RUNTIME)
    @Constraint(validatedBy = MinNumberValidator.class)
    @play.data.Form.Display(name="constraint.minnumber", attributes={"value"})
    public static @interface MinNumber {
        String message() default MinValidator.message;
        Class<?>[] groups() default {};
        Class<? extends Payload>[] payload() default {};
        long value();
    }
	
    /**
     * Validator for <code>@Min</code> fields.
     */
    public static class MinNumberValidator extends Validator<String> implements ConstraintValidator<MinNumber, String> {

        final static public String message = "error.min";
        private long min;

        public MinNumberValidator() {}

        public MinNumberValidator(long value) {
            this.min = value;
        }

        public void initialize(MinNumber constraintAnnotation) {
            this.min = constraintAnnotation.value();
        }

        public boolean isValid(String object) {
            if(object == null || object.isEmpty()) {
                return true;
            }
            
            try{
            	return (Double.parseDouble(object)) >= min;
            }catch(NumberFormatException ne){
            	return false;
            }
        }            

        public Tuple<String, Object[]> getErrorMessageKey() {
            return Tuple(message, new Object[] { min });
        }

    }

    /**
     * Constructs a 'min' validator.
     */
    public static Validator<String> MinNumber(long value) {
        return new MinNumberValidator(value);
    }
	
	
	
}
