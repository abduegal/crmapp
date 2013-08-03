package models;

import java.math.BigDecimal;

public class Stock{

	public Stock() {
	}
	
	private long order;
	private long quantity;
	private String product;
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
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
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
