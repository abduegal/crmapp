package utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import play.data.validation.ValidationError;

public class ErrorMessageBuilder {

	Map<String, List<ValidationError>> errorMessage;
	
	private ErrorMessageBuilder(){
		errorMessage = new HashMap<String, List<ValidationError>>();
	}
	
	public ErrorMessageBuilder addError(String field, String message){
		List<ValidationError> errors = new ArrayList<ValidationError>();
        errors.add(new ValidationError(field, message, new ArrayList<Object>()));
        errorMessage.put(field, errors);
        return this;
	}
	
	public Map<String, List<ValidationError>> build(){
		return errorMessage;
	}
	
	public static ErrorMessageBuilder getInstance(){
		return new ErrorMessageBuilder();
	}
	
}
