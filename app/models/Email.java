package models;

import play.data.validation.Constraints.Required;
import uk.co.panaxiom.playjongo.PlayJongo;
import utils.Model;

public class Email implements Model{

	public static String MAIL_BASE_URL = "http://localhost:8000/email.html#/";
	
	public static String collectionName = "email";
	
	private String _id;
	
	@Required
	private String title;
	
	private String body;

	@Override
	public void save() {
    	PlayJongo.getCollection(collectionName).save(this);
	}

	@Override
	public void update() {
    	PlayJongo.getCollection(collectionName).save(this);
	}
	
	public void set_id(String _id) {
		this._id = _id;
	}
	
	public String get_id() {
		return _id;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setBody(String body) {
		this.body = body;
	}
	
	public String getBody() {
		return body;
	}
	
}
