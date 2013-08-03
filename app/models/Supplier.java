package models;

import play.data.validation.Constraints.Email;
import play.data.validation.Constraints.Required;
import uk.co.panaxiom.playjongo.PlayJongo;
import utils.DeletableModel;
import utils.Model;

public class Supplier implements Model, DeletableModel{
	
	public static String collectionName = "supplier";
	
	private String _id;
	
	@Required
	private String name;
	private String description;
	@Required
	@Email
	private String email;
	
    public void save(){
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
    }
	
	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getEmail() {
		return email;
	}
	
}