package models;

import java.math.BigDecimal;

import play.data.validation.Constraints.Required;

import uk.co.panaxiom.playjongo.PlayJongo;
import utils.DeletableModel;
import utils.Model;

public class Product implements Model, DeletableModel{
	
	public static String collectionName = "product";
	
	private String _id;
	
	@Required
	private String name;
	private String description;
	@Required
	private BigDecimal unit;
	@Required
	private String unitName;
	
	private long quantity = 0;
	
	private BigDecimal price;

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

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	
	public void setUnit(BigDecimal unit) {
		this.unit = unit;
	}
	
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	
	public BigDecimal getUnit() {
		return unit;
	}
	
	public String getUnitName() {
		return unitName;
	}
	
	public long getQuantity() {
		return quantity;
	}
	
	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}
}