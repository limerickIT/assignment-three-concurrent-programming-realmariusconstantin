package com.example.assignment_three_zelora.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * DTO for detailed product information including reviews and stock status.
 * Used for product detail pages.
 */
public class ProductDetailDto {
    
    private Integer productId;
    private String productName;
    private String description;
    private BigDecimal price;
    private BigDecimal discountedPrice;
    private String featureImage;
    private String size;
    private String colour;
    private String material;
    private Integer sustainabilityRating;
    private String manufacturer;
    private Date releaseDate;
    private Integer categoryId;
    private String categoryName;
    private Integer stockQuantity;
    private Integer quantityReserved;
    private Integer availableQuantity;
    private Integer reorderPoint;
    private String stockStatus;
    private boolean inStock;
    private List<ReviewDto> reviews;
    private Double averageRating;
    private Integer totalReviews;
    
    // Default constructor
    public ProductDetailDto() {
    }
    
    // Full constructor
    public ProductDetailDto(Integer productId, String productName, String description, 
                           BigDecimal price, BigDecimal discountedPrice, String featureImage,
                           String size, String colour, String material, 
                           Integer sustainabilityRating, String manufacturer, Date releaseDate,
                           Integer categoryId, String categoryName, Integer stockQuantity,
                           boolean inStock, List<ReviewDto> reviews, Double averageRating,
                           Integer totalReviews) {
        this.productId = productId;
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.featureImage = featureImage;
        this.size = size;
        this.colour = colour;
        this.material = material;
        this.sustainabilityRating = sustainabilityRating;
        this.manufacturer = manufacturer;
        this.releaseDate = releaseDate;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.stockQuantity = stockQuantity;
        this.inStock = inStock;
        this.reviews = reviews;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public Integer getSustainabilityRating() {
        return sustainabilityRating;
    }

    public void setSustainabilityRating(Integer sustainabilityRating) {
        this.sustainabilityRating = sustainabilityRating;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
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

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }

    public List<ReviewDto> getReviews() {
        return reviews;
    }

    public void setReviews(List<ReviewDto> reviews) {
        this.reviews = reviews;
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

    public Integer getQuantityReserved() {
        return quantityReserved;
    }

    public void setQuantityReserved(Integer quantityReserved) {
        this.quantityReserved = quantityReserved;
    }

    public Integer getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(Integer availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public Integer getReorderPoint() {
        return reorderPoint;
    }

    public void setReorderPoint(Integer reorderPoint) {
        this.reorderPoint = reorderPoint;
    }

    public String getStockStatus() {
        return stockStatus;
    }

    public void setStockStatus(String stockStatus) {
        this.stockStatus = stockStatus;
    }
}
