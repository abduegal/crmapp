package models;

import uk.co.panaxiom.playjongo.PlayJongo;
import utils.Model;

public class Company implements Model{

	private static String collectionName = "company";
	
	private String _id;
	private String name;
	private String product;
	private String client;
	private String currency;
	
	private int orderCount;
	
	@Override
	public void save() {
    	PlayJongo.getCollection(collectionName).save(this);
	}

	@Override
	public void update() {
    	PlayJongo.getCollection(collectionName).save(this);
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

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}
	
	public String getCurrency() {
		return currency;
	}
	
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	
	public void setOrderCount(int orderCount) {
		this.orderCount = orderCount;
	}
	
	public int getOrderCount() {
		return orderCount;
	}
}
