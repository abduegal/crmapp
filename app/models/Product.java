package models;

import java.util.List;
import java.util.Map;

import play.data.validation.Constraints.Required;
import play.data.validation.ValidationError;
import uk.co.panaxiom.playjongo.PlayJongo;
import utils.DeletableModel;
import utils.ErrorMessageBuilder;
import utils.MinStringValidator.MinNumber;
import utils.Model;

public class Product implements Model, DeletableModel{
	
	public static String collectionName = "product";
	
	private String _id;
	
	@Required
	private String name;
	private String description;
	@Required
	@MinNumber(0)
	private String unit;
	@Required
	private String unitName;
	
	private long quantity = 0;
	@MinNumber(0)
	private String sellingPrice;
	@MinNumber(0)
	private String buyingPrice;

    public void save(){
    	PlayJongo.getCollection(collectionName).save(this);
    }
    
    @Override
    public void update() {
		System.out.println(this.sellingPrice.toString());

    	PlayJongo.getCollection(collectionName).save(this);
    }
    
    @Override
    public void delete() {
    	String query = String.format("{_id: '%s'}", _id);
    	PlayJongo.getCollection(collectionName).remove(query);    	
    }
    
    public Map<String, List<ValidationError>> validate() {
    	try{
	    	if(Double.parseDouble(buyingPrice) > Double.parseDouble(sellingPrice)){
				return ErrorMessageBuilder.getInstance().
						addError("buyingPrice", "Price to buy must be lower than the price to sell").
						addError("sellingPrice", "Price to sell must be higher than the price to buy").
						build();
	    	}
    	}catch(NumberFormatException ne){}
    	return null;
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

	public void setSellingPrice(String sellingPrice) {
		this.sellingPrice = sellingPrice;
	}
	
	public String getSellingPrice() {
		return sellingPrice;
	}
	
	public void setBuyingPrice(String buyingPrice) {
		this.buyingPrice = buyingPrice;
	}
	
	public String getBuyingPrice() {
		return buyingPrice;
	}
	
	public void setUnit(String unit) {
		this.unit = unit;
	}
	
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	
	public String getUnit() {
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