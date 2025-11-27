package com.example.assignment_three_zelora.dto;

import java.util.Date;

/**
 * DTO for review information.
 * Used for displaying reviews without exposing entity relationships.
 */
public class ReviewDto {
    
    private Integer reviewId;
    private Integer productId;
    private String productName;
    private Integer customerId;
    private String customerName;
    private String customerCity;
    private Integer rating;
    private String reviewText;
    private Date reviewDate;
    private Boolean flaggedAsSpam;
    
    // Default constructor
    public ReviewDto() {
    }
    
    // Full constructor
    public ReviewDto(Integer reviewId, Integer productId, String productName,
                    Integer customerId, String customerName, String customerCity, Integer rating,
                    String reviewText, Date reviewDate, Boolean flaggedAsSpam) {
        this.reviewId = reviewId;
        this.productId = productId;
        this.productName = productName;
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerCity = customerCity;
        this.rating = rating;
        this.reviewText = reviewText;
        this.reviewDate = reviewDate;
        this.flaggedAsSpam = flaggedAsSpam;
    }

    // Getters and Setters
    public Integer getReviewId() {
        return reviewId;
    }

    public void setReviewId(Integer reviewId) {
        this.reviewId = reviewId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerCity() {
        return customerCity;
    }

    public void setCustomerCity(String customerCity) {
        this.customerCity = customerCity;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }

    public Boolean getFlaggedAsSpam() {
        return flaggedAsSpam;
    }

    public void setFlaggedAsSpam(Boolean flaggedAsSpam) {
        this.flaggedAsSpam = flaggedAsSpam;
    }
}
