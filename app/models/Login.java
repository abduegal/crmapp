package models;

import play.data.validation.Constraints.Required;
import uk.co.panaxiom.playjongo.PlayJongo;
import utils.BCrypt;
import utils.Model;

public class Login implements Model{
	public static String collectionName = "login";
	
    private String _id;
    
    @Required
    private String username;
    @Required
    private String password;
    private String salt;
    private boolean remember;
    
    public void save(){
    	if(salt == null){
    		salt = BCrypt.gensalt();
    	}
    	password = BCrypt.hashpw(password, salt);
    	PlayJongo.getCollection(collectionName).save(this);
    }
    
    @Override
    public void update() {
    	PlayJongo.getCollection(collectionName).save(this);
    }
    
    public String validate() {
        if(!authenticate(username, password)) {
            return "Invalid username or password";
        }
        return null;
    }
    
    public static boolean authenticate(String username, String password){
    	String query = String.format("{username: '%s'}", username);
    	Login item = PlayJongo.getCollection(collectionName).findOne(query).as(Login.class);
    	if(item == null){
    		return false;
    	}
    	if(item.getPassword().equals(BCrypt.hashpw(password, item.salt))){
    		return true;
    	}  
    	return false;
    }

    public static boolean changePassword(String username, String oldPassword, String newPassword){
    	if(authenticate(username, oldPassword)){
        	String query = String.format("{username: '%s'}", username);
        	Login item = PlayJongo.getCollection(collectionName).findOne(query).as(Login.class);
        	item.setPassword(newPassword);
        	item.setSalt(null);
        	item.save();
        	return true;
    	}
    	return false;
    }
    
	public String get_id() {
		return _id;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public String getSalt() {
		return salt;
	}

	public boolean isRemember() {
		return remember;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public void setRemember(boolean remember) {
		this.remember = remember;
	}
}
