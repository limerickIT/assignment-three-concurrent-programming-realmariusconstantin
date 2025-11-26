package com.example.assignment_three_zelora.dto;

import java.math.BigDecimal;
import java.util.Date;

/**
 * DTO for wishlist items.
 * Used for displaying wishlist without exposing entity relationships.
 */
public class WishlistItemDto {
    
    private Integer wishlistId;
    private Integer customerId;
    private Integer productId;
    private String productName;
    private String productDescription;
    private BigDecimal price;
    private BigDecimal discountedPrice;
    private String featureImage;
    private String categoryName;
    private boolean inStock;
    private Date addedDate;
    private String wishlistName;
    private String notes;
    
    // Default constructor
    public WishlistItemDto() {
    }
    
    // Full constructor
    public WishlistItemDto(Integer wishlistId, Integer customerId, Integer productId,
                          String productName, String productDescription, BigDecimal price,
                          BigDecimal discountedPrice, String featureImage, String categoryName,
                          boolean inStock, Date addedDate, String wishlistName, String notes) {
        this.wishlistId = wishlistId;
        this.customerId = customerId;
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.featureImage = featureImage;
        this.categoryName = categoryName;
        this.inStock = inStock;
        this.addedDate = addedDate;
        this.wishlistName = wishlistName;
        this.notes = notes;
    }

    // Getters and Setters
    public Integer getWishlistId() {
        return wishlistId;
    }

    public void setWishlistId(Integer wishlistId) {
        this.wishlistId = wishlistId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
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

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(BigDecimal discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public String getFeatureImage() {
        return featureImage;
    }

    public void setFeatureImage(String featureImage) {
        this.featureImage = featureImage;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }

    public Date getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(Date addedDate) {
        this.addedDate = addedDate;
    }

    public String getWishlistName() {
        return wishlistName;
    }

    public void setWishlistName(String wishlistName) {
        this.wishlistName = wishlistName;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
