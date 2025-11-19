package com.example.assignment_three_zelora.model.service;

import com.example.assignment_three_zelora.model.entitys.CartItem;
import com.example.assignment_three_zelora.model.entitys.Product;
import com.example.assignment_three_zelora.model.repos.CartItemRepository;
import com.example.assignment_three_zelora.model.repos.ProductRepository;
import com.example.assignment_three_zelora.dto.CartItemResponse;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartItemService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartItemService(CartItemRepository cartItemRepository, ProductRepository productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    private CartItemResponse convertToResponse(CartItem item) {
        CartItemResponse.ProductSummary productSummary = new CartItemResponse.ProductSummary(
            item.getProductId().getProductId(),
            item.getProductId().getProductName(),
            item.getProductId().getDescription(),
            item.getProductId().getFeatureImage()
        );
        
        return new CartItemResponse(
            item.getCartItemId(),
            item.getUserId(),
            productSummary,
            item.getQuantity(),
            item.getPrice(),
            item.getSubtotal()
        );
    }

    // Add item to cart or update quantity if already exists
    public CartItemResponse addToCart(Integer userId, Integer productId, Integer quantity) {
        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndProductId(userId, productId);
        
        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartItemRepository.save(item);
            return convertToResponse(item);
        }
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        CartItem newItem = new CartItem();
        newItem.setUserId(userId);
        newItem.setProductId(product);
        newItem.setQuantity(quantity);
        newItem.setPrice(product.getPrice());
        
        cartItemRepository.save(newItem);
        return convertToResponse(newItem);
    }

    // Update quantity of an item in cart
    public CartItemResponse updateQuantity(Integer cartItemId, Integer newQuantity) {
        Optional<CartItem> item = cartItemRepository.findById(cartItemId);
        if (item.isPresent()) {
            CartItem cartItem = item.get();
            cartItem.setQuantity(newQuantity);
            cartItemRepository.save(cartItem);
            return convertToResponse(cartItem);
        }
        throw new RuntimeException("Cart item not found");
    }

    // Remove item from cart
    public void removeFromCart(Integer cartItemId, Integer userId) {
        cartItemRepository.deleteByCartItemIdAndUserId(cartItemId, userId);
    }

    // Get all items in user's cart
    public List<CartItemResponse> getCartByUserId(Integer userId) {
        return cartItemRepository.findByUserId(userId)
            .stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }

    // Calculate total price for entire cart
    public BigDecimal getCartTotal(Integer userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);
        BigDecimal total = BigDecimal.ZERO;
        for (CartItem item : items) {
            total = total.add(item.getSubtotal());
        }
        return total;
    }

    // Clear entire cart for a user
    public void clearCart(Integer userId) {
        cartItemRepository.deleteByUserId(userId);
    }
}
