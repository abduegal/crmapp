package models;

import play.data.format.Formats.DateTime;
import play.data.validation.Constraints.Required;

import com.avaje.ebean.validation.Email;

import uk.co.panaxiom.playjongo.PlayJongo;
import utils.DeletableModel;
import utils.Model;

public class Account implements Model, DeletableModel{

	public static String collectionName = "account";
	
	private String _id;
	
	@Required
	private String firstname;
	private String middlename;
	@Required
	private String lastname;
	
	@DateTime(pattern="YYYY-MM-DD")
	private String birthdate;
	private String telephone;
	@Email
	@Required
	private String email;
	
	private String city;
	private String country;
	@Required
	private String username;
	@Required
	private String password;
	
	private String loginId;
	
	@Override
    public void save(){
    	Login l = new Login();
    	l.setUsername(username);
    	l.setPassword(password);
    	l.save();
    	username = "set";
    	password = "set";
    	loginId = l.get_id();
    	PlayJongo.getCollection(collectionName).save(this);
    }
    
    @Override
    public void update() {
    	PlayJongo.getCollection(collectionName).save(this);
    }
	
    @Override
    public void delete() {
		String query = String.format("{_id: '%s'}", _id);
    	PlayJongo.getCollection(collectionName).remove(query);
    	
		String queryForLogin = String.format("{_id: '%s'}", loginId);
    	PlayJongo.getCollection(Login.collectionName).remove(queryForLogin);
    }
    
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getMiddlename() {
		return middlename;
	}
	public void setMiddlename(String middlename) {
		this.middlename = middlename;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getBirthdate() {
		return birthdate;
	}
	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getLoginId() {
		return loginId;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}
}
