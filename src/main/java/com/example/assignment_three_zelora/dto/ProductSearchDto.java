package com.example.assignment_three_zelora.dto;

import java.math.BigDecimal;

/**
 * DTO for product search results and listings.
 * Contains minimal data needed for product cards/grids.
 */
public class ProductSearchDto {
    
    private Integer productId;
    private String productName;
    private BigDecimal price;
    private BigDecimal discountedPrice;
    private String featureImage;
    private Integer categoryId;
    private String categoryName;
    private boolean inStock;
    private Double averageRating;
    private Integer totalReviews;
    
    // Default constructor
    public ProductSearchDto() {
    }
    
    // Full constructor
    public ProductSearchDto(Integer productId, String productName, BigDecimal price,
                           BigDecimal discountedPrice, String featureImage,
                           Integer categoryId, String categoryName, boolean inStock,
                           Double averageRating, Integer totalReviews) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.featureImage = featureImage;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.inStock = inStock;
        this.averageRating = averageRating;
        this.totalReviews = totalReviews;
    }

    // Getters and Setters
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

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
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

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(Integer totalReviews) {
        this.totalReviews = totalReviews;
    }
}
