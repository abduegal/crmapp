package models;

import java.math.BigDecimal;

import play.data.validation.Constraints.Required;

public class Stock{

	public Stock() {
	}
	
	private long order;
	private long quantity;
	private String productId;
	private String expirationDate;
	private BigDecimal priceperunit;
	private boolean received;
	
	public long getOrder() {
		return order;
	}
	public void setOrder(long order) {
		this.order = order;
	}
	public long getQuantity() {
		return quantity;
	}
	public void setQuantity(long quantity) {
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
	public BigDecimal getPriceperunit() {
		return priceperunit;
	}
	public void setPriceperunit(BigDecimal priceperunit) {
		this.priceperunit = priceperunit;
	}
	public boolean isReceived() {
		return received;
	}
	public void setReceived(boolean received) {
		this.received = received;
	}
}
