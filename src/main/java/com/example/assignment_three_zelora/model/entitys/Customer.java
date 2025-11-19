package com.example.assignment_three_zelora.model.entitys;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "customers")
public class Customer implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Integer customerId;
    
    @Column(name = "first_name")
    private String firstName;
   
    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "email")
    private String email;
   
    @Column(name = "password")
    private String password;
    
    @Column(name = "role")
    private String role;
   
    @Lob
    @Column(name = "address")
    private String address;
   
    @Column(name = "phone_number")
    private String phoneNumber;
   
    @Column(name = "date_of_birth")
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;
    
    @Column(name = "payment_info")
    private String paymentInfo;
   
    @Lob
    @Column(name = "size_preferences")
    private String sizePreferences;
    
    @Column(name = "vip_status")
    private String vipStatus;
    
    @Lob
    @Column(name = "communication_preferences")
    private String communicationPreferences;
   
    @Column(name = "dateJoined")
    @Temporal(TemporalType.DATE)
    private Date dateJoined;
   
    @Column(name = "city")
    private String city;
   
    @OneToMany(mappedBy = "customerId")
    @JsonIgnore
    private List<Review> reviewList;
   
    @OneToMany(mappedBy = "customerId")
    @JsonIgnore
    private List<Wishlist> wishlistList;
    
    @OneToMany(mappedBy = "customerId")
    @JsonIgnore
    private List<Orders> ordersList;

    public Customer(Integer customerId, String firstName, String lastName, String email, String password, String role, String address, String phoneNumber, Date dateOfBirth, String paymentInfo, String sizePreferences, String vipStatus, String communicationPreferences, Date dateJoined, String city, List<Review> reviewList, List<Wishlist> wishlistList, List<Orders> ordersList) {
        this.customerId = customerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.paymentInfo = paymentInfo;
        this.sizePreferences = sizePreferences;
        this.vipStatus = vipStatus;
        this.communicationPreferences = communicationPreferences;
        this.dateJoined = dateJoined;
        this.city = city;
        this.reviewList = reviewList;
        this.wishlistList = wishlistList;
        this.ordersList = ordersList;
    }

    public Customer() {
    }

    public Integer getCustomerId() {
        return this.customerId;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public String getAddress() {
        return this.address;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public Date getDateOfBirth() {
        return this.dateOfBirth;
    }

    public String getPaymentInfo() {
        return this.paymentInfo;
    }

    public String getSizePreferences() {
        return this.sizePreferences;
    }

    public String getVipStatus() {
        return this.vipStatus;
    }

    public String getCommunicationPreferences() {
        return this.communicationPreferences;
    }

    public Date getDateJoined() {
        return this.dateJoined;
    }

    public String getCity() {
        return this.city;
    }

    public List<Review> getReviewList() {
        return this.reviewList;
    }

    public List<Wishlist> getWishlistList() {
        return this.wishlistList;
    }

    public List<Orders> getOrdersList() {
        return this.ordersList;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setPaymentInfo(String paymentInfo) {
        this.paymentInfo = paymentInfo;
    }

    public void setSizePreferences(String sizePreferences) {
        this.sizePreferences = sizePreferences;
    }

    public void setVipStatus(String vipStatus) {
        this.vipStatus = vipStatus;
    }

    public void setCommunicationPreferences(String communicationPreferences) {
        this.communicationPreferences = communicationPreferences;
    }

    public void setDateJoined(Date dateJoined) {
        this.dateJoined = dateJoined;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setReviewList(List<Review> reviewList) {
        this.reviewList = reviewList;
    }

    public void setWishlistList(List<Wishlist> wishlistList) {
        this.wishlistList = wishlistList;
    }

    public void setOrdersList(List<Orders> ordersList) {
        this.ordersList = ordersList;
    }

    public String toString() {
        return "Customer(customerId=" + this.getCustomerId() + ", firstName=" + this.getFirstName() + ", lastName=" + this.getLastName() + ", email=" + this.getEmail() + ", password=" + this.getPassword() + ", address=" + this.getAddress() + ", phoneNumber=" + this.getPhoneNumber() + ", dateOfBirth=" + this.getDateOfBirth() + ", paymentInfo=" + this.getPaymentInfo() + ", sizePreferences=" + this.getSizePreferences() + ", vipStatus=" + this.getVipStatus() + ", communicationPreferences=" + this.getCommunicationPreferences() + ", dateJoined=" + this.getDateJoined() + ", city=" + this.getCity() + ")";
    }
}