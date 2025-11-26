package com.example.assignment_three_zelora.service;

import com.example.assignment_three_zelora.dto.*;
import com.example.assignment_three_zelora.model.entitys.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for converting entities to DTOs.
 * Centralizes all entity-to-DTO conversion logic.
 */
@Service
public class DtoMapperService {
    
    /**
     * Convert Product entity to ProductDetailDto with full details.
     */
    public ProductDetailDto toProductDetailDto(Product product, List<Review> reviews, Integer stockQuantity) {
        ProductDetailDto dto = new ProductDetailDto();
        dto.setProductId(product.getProductId());
        dto.setProductName(product.getProductName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setDiscountedPrice(product.getDiscountedPrice());
        dto.setFeatureImage(product.getFeatureImage());
        dto.setSize(product.getSize());
        dto.setColour(product.getColour());
        dto.setMaterial(product.getMaterial());
        dto.setSustainabilityRating(product.getSustainabilityRating());
        dto.setManufacturer(product.getManufacturer());
        dto.setReleaseDate(product.getReleaseDate());
        
        // Category info
        if (product.getCategoryId() != null) {
            dto.setCategoryId(product.getCategoryId().getCategoryId());
            dto.setCategoryName(product.getCategoryId().getCategoryName());
        }
        
        // Stock info
        dto.setStockQuantity(stockQuantity != null ? stockQuantity : 0);
        dto.setInStock(stockQuantity != null && stockQuantity > 0);
        
        // Reviews
        if (reviews != null && !reviews.isEmpty()) {
            List<ReviewDto> reviewDtos = reviews.stream()
                    .map(this::toReviewDto)
                    .collect(Collectors.toList());
            dto.setReviews(reviewDtos);
            dto.setTotalReviews(reviews.size());
            
            // Calculate average rating
            double avgRating = reviews.stream()
                    .filter(r -> r.getRating() != null)
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0.0);
            dto.setAverageRating(Math.round(avgRating * 10.0) / 10.0);
        } else {
            dto.setReviews(new ArrayList<>());
            dto.setTotalReviews(0);
            dto.setAverageRating(0.0);
        }
        
        return dto;
    }
    
    /**
     * Convert Product entity to ProductSearchDto for listings.
     */
    public ProductSearchDto toProductSearchDto(Product product, Integer stockQuantity, Double avgRating, Integer reviewCount) {
        ProductSearchDto dto = new ProductSearchDto();
        dto.setProductId(product.getProductId());
        dto.setProductName(product.getProductName());
        dto.setPrice(product.getPrice());
        dto.setDiscountedPrice(product.getDiscountedPrice());
        dto.setFeatureImage(product.getFeatureImage());
        
        // Category info
        if (product.getCategoryId() != null) {
            dto.setCategoryId(product.getCategoryId().getCategoryId());
            dto.setCategoryName(product.getCategoryId().getCategoryName());
        }
        
        // Stock info
        dto.setInStock(stockQuantity != null && stockQuantity > 0);
        
        // Review info
        dto.setAverageRating(avgRating != null ? avgRating : 0.0);
        dto.setTotalReviews(reviewCount != null ? reviewCount : 0);
        
        return dto;
    }
    
    /**
     * Convert Review entity to ReviewDto.
     */
    public ReviewDto toReviewDto(Review review) {
        ReviewDto dto = new ReviewDto();
        dto.setReviewId(review.getReviewId());
        dto.setRating(review.getRating());
        dto.setReviewText(review.getReviewText());
        dto.setReviewDate(review.getReviewDate());
        dto.setFlaggedAsSpam(review.getFlaggedAsSpam());
        
        // Product info
        if (review.getProductId() != null) {
            dto.setProductId(review.getProductId().getProductId());
            dto.setProductName(review.getProductId().getProductName());
        }
        
        // Customer info
        if (review.getCustomerId() != null) {
            dto.setCustomerId(review.getCustomerId().getCustomerId());
            String customerName = review.getCustomerId().getFirstName();
            if (review.getCustomerId().getLastName() != null) {
                customerName += " " + review.getCustomerId().getLastName();
            }
            dto.setCustomerName(customerName);
        }
        
        return dto;
    }
    
    /**
     * Convert Inventory entity to StockStatusDto.
     */
    public StockStatusDto toStockStatusDto(Inventory inventory) {
        StockStatusDto dto = new StockStatusDto();
        
        if (inventory.getProductId() != null) {
            dto.setProductId(inventory.getProductId().getProductId());
            dto.setProductName(inventory.getProductId().getProductName());
        }
        
        dto.setQuantityInStock(inventory.getQuantityInStock());
        dto.setQuantityReserved(inventory.getQuantityReserved());
        dto.setReorderPoint(inventory.getReorderPoint());
        
        // Calculate status
        dto.calculateStatus();
        
        return dto;
    }
    
    /**
     * Convert Wishlist entity to WishlistItemDto.
     */
    public WishlistItemDto toWishlistItemDto(Wishlist wishlist, Integer stockQuantity) {
        WishlistItemDto dto = new WishlistItemDto();
        dto.setWishlistId(wishlist.getWishlistId());
        dto.setAddedDate(wishlist.getAddedDate());
        dto.setWishlistName(wishlist.getWishlistName());
        dto.setNotes(wishlist.getNotes());
        
        // Customer info
        if (wishlist.getCustomerId() != null) {
            dto.setCustomerId(wishlist.getCustomerId().getCustomerId());
        }
        
        // Product info
        if (wishlist.getProductId() != null) {
            Product product = wishlist.getProductId();
            dto.setProductId(product.getProductId());
            dto.setProductName(product.getProductName());
            dto.setProductDescription(product.getDescription());
            dto.setPrice(product.getPrice());
            dto.setDiscountedPrice(product.getDiscountedPrice());
            dto.setFeatureImage(product.getFeatureImage());
            
            if (product.getCategoryId() != null) {
                dto.setCategoryName(product.getCategoryId().getCategoryName());
            }
        }
        
        // Stock info
        dto.setInStock(stockQuantity != null && stockQuantity > 0);
        
        return dto;
    }
    
    /**
     * Convert list of Wishlist entities to WishlistItemDto list.
     */
    public List<WishlistItemDto> toWishlistItemDtoList(List<Wishlist> wishlists) {
        return wishlists.stream()
                .map(w -> toWishlistItemDto(w, null)) // Stock can be added separately if needed
                .collect(Collectors.toList());
    }
}
