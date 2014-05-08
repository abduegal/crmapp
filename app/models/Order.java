package models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.github.kevinsawicki.http.HttpRequest;

import play.data.format.Formats.DateTime;
import play.libs.Json;
import uk.co.panaxiom.playjongo.PlayJongo;
import utils.DeletableModel;
import utils.Model;

public class Order implements Model, DeletableModel{

	public static String collectionName = "order";
	
	private String _id;
	
	private String orderId;
		
	private List<Stock> items = new ArrayList<Stock>();
	
	private String supplierId;
	
	private String email;
	
	@DateTime(pattern="YYYY-MM-DD")
	private String date;
	
	private boolean finished = false;
	
	public Order() {
	}
	
	@Override
	public void save() {
    	PlayJongo.getCollection(collectionName).save(this);
    	sendEmail();
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
	
	private void sendEmail(){
		String query = String.format("{_id: '%s'}", 1);
    	Email mail = PlayJongo.getCollection(Email.collectionName).findOne(query).as(Email.class);
    	
    	Map<String, String> data = new HashMap<String, String>();
		data.put("From", "****");
		data.put("To", email);
		data.put("Subject", mail.getTitle());
		data.put("TextBody", mail.getBody().replace("{{LINK}}", Email.MAIL_BASE_URL + _id));
		
		int response = HttpRequest.post("http://api.postmarkapp.com/email")
			.header("X-Postmark-Server-Token", "***")
			.accept("application/json")
			.contentType("application/json; charset=utf-8")
			.trustAllCerts()
			.trustAllHosts()
			.send(Json.toJson(data).toString())
			.code();
		System.out.println("Mail send with response: "+ response);
	}
	
	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getOrderId() {
		return orderId;
	}
	
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	
	public void setItems(List<Stock> items) {
		this.items = items;
	}
	
	public List<Stock> getItems() {
		return items;
	}
	
	public String getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(String supplierId) {
		this.supplierId = supplierId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setFinished(boolean finished) {
		this.finished = finished;
	}
	
	public boolean getFinished(){
		return finished;
	}
	
}
