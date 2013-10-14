package models;

import utils.MinStringValidator.MinNumber;

public class Stock{

	public Stock() {
	}
	
	private long order;
	@MinNumber(1)
	private String quantity;
	private String productId;
	private String expirationDate;
	@MinNumber(0)
	private String priceperunit;
	private boolean received;
	
	public long getOrder() {
		return order;
	}
	public void setOrder(long order) {
		this.order = order;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getExpirationDate() {
		return expirationDate;
	}
	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}
	public String getPriceperunit() {
		return priceperunit;
	}
	public void setPriceperunit(String priceperunit) {
		this.priceperunit = priceperunit;
	}
	public boolean isReceived() {
		return received;
	}
	public void setReceived(boolean received) {
		this.received = received;
	}
}
