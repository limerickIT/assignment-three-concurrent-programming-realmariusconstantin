package com.example.assignment_three_zelora.dto;

import java.math.BigDecimal;

public class CartItemResponse {
    private Integer cartItemId;
    private Integer userId;
    private ProductSummary product;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal subtotal;

    public CartItemResponse() {}

    public CartItemResponse(Integer cartItemId, Integer userId, ProductSummary product, 
                           Integer quantity, BigDecimal price, BigDecimal subtotal) {
        this.cartItemId = cartItemId;
        this.userId = userId;
        this.product = product;
        this.quantity = quantity;
        this.price = price;
        this.subtotal = subtotal;
    }

    // Getters and Setters
    public Integer getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(Integer cartItemId) {
        this.cartItemId = cartItemId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public ProductSummary getProduct() {
        return product;
    }

    public void setProduct(ProductSummary product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    // Inner class for product summary
    public static class ProductSummary {
        private Integer productId;
        private String productName;
        private String description;
        private String featureImage;

        public ProductSummary() {}

        public ProductSummary(Integer productId, String productName, String description, String featureImage) {
            this.productId = productId;
            this.productName = productName;
            this.description = description;
            this.featureImage = featureImage;
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

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getFeatureImage() {
            return featureImage;
        }

        public void setFeatureImage(String featureImage) {
            this.featureImage = featureImage;
        }
    }
}
