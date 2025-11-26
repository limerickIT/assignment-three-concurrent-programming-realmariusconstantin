package com.example.assignment_three_zelora.model.entitys;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "orderitems")
public class Orderitem implements Serializable {

    @Id
    @Basic(optional = false)
    @Column(name = "order_item_id")
    private Integer orderItemId;
   
    @Column(name = "quantity")
    private Integer quantity;
    
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "item_price")
    private BigDecimal itemPrice;
   
    @Column(name = "subtotal")
    private BigDecimal subtotal;
   
    @Column(name = "item_weight")
    private BigDecimal itemWeight;
   
    @Lob
    @Column(name = "customisation_options")
    private String customisationOptions;
   
    @JoinColumn(name = "order_id", referencedColumnName = "order_id")
    @ManyToOne
    @JsonIgnore
    private Orders orderId;
    
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    @ManyToOne
    @JsonIgnore
    private Product productId;
    
    // Expose product info without circular reference
    @Transient
    @JsonProperty("productId")
    public Integer getProductIdValue() {
        return productId != null ? productId.getProductId() : null;
    }
    
    @Transient
    @JsonProperty("productName")
    public String getProductName() {
        return productId != null ? productId.getProductName() : null;
    }
    
    @Transient
    @JsonProperty("productImage")
    public String getProductImage() {
        return productId != null ? productId.getFeatureImage() : null;
    }


    public Orderitem(Integer orderItemId, Integer quantity, BigDecimal itemPrice, BigDecimal subtotal, BigDecimal itemWeight, String customisationOptions, Orders orderId, Product productId) {
        this.orderItemId = orderItemId;
        this.quantity = quantity;
        this.itemPrice = itemPrice;
        this.subtotal = subtotal;
        this.itemWeight = itemWeight;
        this.customisationOptions = customisationOptions;
        this.orderId = orderId;
        this.productId = productId;
    }

    public Orderitem() {
    }

    public Integer getOrderItemId() {
        return this.orderItemId;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public BigDecimal getItemPrice() {
        return this.itemPrice;
    }

    public BigDecimal getSubtotal() {
        return this.subtotal;
    }

    public BigDecimal getItemWeight() {
        return this.itemWeight;
    }

    public String getCustomisationOptions() {
        return this.customisationOptions;
    }

    public Orders getOrderId() {
        return this.orderId;
    }

    public Product getProductId() {
        return this.productId;
    }

    public void setOrderItemId(Integer orderItemId) {
        this.orderItemId = orderItemId;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setItemPrice(BigDecimal itemPrice) {
        this.itemPrice = itemPrice;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public void setItemWeight(BigDecimal itemWeight) {
        this.itemWeight = itemWeight;
    }

    public void setCustomisationOptions(String customisationOptions) {
        this.customisationOptions = customisationOptions;
    }

    public void setOrderId(Orders orderId) {
        this.orderId = orderId;
    }

    public void setProductId(Product productId) {
        this.productId = productId;
    }

    public String toString() {
        return "Orderitem(orderItemId=" + this.getOrderItemId() + ", quantity=" + this.getQuantity() + ", itemPrice=" + this.getItemPrice() + ", subtotal=" + this.getSubtotal() + ", itemWeight=" + this.getItemWeight() + ", customisationOptions=" + this.getCustomisationOptions() + ")";
    }
}
