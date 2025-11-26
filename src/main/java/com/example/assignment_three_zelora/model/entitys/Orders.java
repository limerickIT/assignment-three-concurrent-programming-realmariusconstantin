package com.example.assignment_three_zelora.model.entitys;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "orders")
public class Orders implements Serializable {

    @Id
    @Basic(optional = false)
    @Column(name = "order_id")
    private Integer orderId;
    
    @Column(name = "order_date")
    @Temporal(TemporalType.DATE)
    private Date orderDate;
    
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "total_amount")
    private BigDecimal totalAmount;
    
    @Column(name = "order_status")
    private String orderStatus;
    
    @Column(name = "payment_method")
    private String paymentMethod;
    
    @Column(name = "shipping_method")
    private String shippingMethod;
    
    @Column(name = "delivery_date")
    @Temporal(TemporalType.DATE)
    private Date deliveryDate;
    
    @OneToMany(mappedBy = "orderId", fetch = FetchType.EAGER)
    private List<Orderitem> orderitemList;
    
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id")
    @ManyToOne
    @JsonIgnore
    private Customer customerId;
    
    // Transient field to expose customer ID without full object
    @Transient
    @JsonProperty("customerId")
    public Integer getCustomerIdValue() {
        return customerId != null ? customerId.getCustomerId() : null;
    }
    
    // Transient field for customer name
    @Transient
    @JsonProperty("customerName")
    public String getCustomerName() {
        if (customerId != null) {
            return (customerId.getFirstName() != null ? customerId.getFirstName() : "") + 
                   " " + 
                   (customerId.getLastName() != null ? customerId.getLastName() : "");
        }
        return null;
    }
    
    // Transient field for customer email
    @Transient
    @JsonProperty("customerEmail")
    public String getCustomerEmail() {
        return customerId != null ? customerId.getEmail() : null;
    }

    public Orders(Integer orderId, Date orderDate, BigDecimal totalAmount, String orderStatus, String paymentMethod, String shippingMethod, Date deliveryDate, List<Orderitem> orderitemList, Customer customerId) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.orderStatus = orderStatus;
        this.paymentMethod = paymentMethod;
        this.shippingMethod = shippingMethod;
        this.deliveryDate = deliveryDate;
        this.orderitemList = orderitemList;
        this.customerId = customerId;
    }

    public Orders() {
    }

    public Integer getOrderId() {
        return this.orderId;
    }

    public Date getOrderDate() {
        return this.orderDate;
    }

    public BigDecimal getTotalAmount() {
        return this.totalAmount;
    }

    public String getOrderStatus() {
        return this.orderStatus;
    }

    public String getPaymentMethod() {
        return this.paymentMethod;
    }

    public String getShippingMethod() {
        return this.shippingMethod;
    }

    public Date getDeliveryDate() {
        return this.deliveryDate;
    }

    public List<Orderitem> getOrderitemList() {
        return this.orderitemList;
    }

    public Customer getCustomerId() {
        return this.customerId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public void setShippingMethod(String shippingMethod) {
        this.shippingMethod = shippingMethod;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public void setOrderitemList(List<Orderitem> orderitemList) {
        this.orderitemList = orderitemList;
    }

    public void setCustomerId(Customer customerId) {
        this.customerId = customerId;
    }

    public String toString() {
        return "Orders(orderId=" + this.getOrderId() + ", orderDate=" + this.getOrderDate() + ", totalAmount=" + this.getTotalAmount() + ", orderStatus=" + this.getOrderStatus() + ", paymentMethod=" + this.getPaymentMethod() + ", shippingMethod=" + this.getShippingMethod() + ", deliveryDate=" + this.getDeliveryDate() + ")";
    }
}