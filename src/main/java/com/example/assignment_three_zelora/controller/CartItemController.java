package com.example.assignment_three_zelora.controller;

import com.example.assignment_three_zelora.model.service.CartItemService;
import com.example.assignment_three_zelora.dto.AddToCartRequest;
import com.example.assignment_three_zelora.dto.UpdateQuantityRequest;
import com.example.assignment_three_zelora.dto.CartItemResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    // Get all items in cart for a user
    @GetMapping("/cart/{userId}")
    public List<CartItemResponse> getCart(@PathVariable Integer userId) {
        return cartItemService.getCartByUserId(userId);
    }

    // Add item to cart
    @PostMapping("/cart/add")
    public CartItemResponse addToCart(@RequestBody AddToCartRequest request) {
        return cartItemService.addToCart(
            request.getUserId(),
            request.getProductId(),
            request.getQuantity()
        );
    }

    // Update item quantity in cart
    @PutMapping("/cart/update")
    public CartItemResponse updateQuantity(@RequestBody UpdateQuantityRequest request) {
        return cartItemService.updateQuantity(
            request.getCartItemId(),
            request.getQuantity()
        );
    }

    // Remove item from cart
    @DeleteMapping("/cart/remove/{cartItemId}")
    public void removeFromCart(@PathVariable Integer cartItemId, 
                              @RequestParam Integer userId) {
        cartItemService.removeFromCart(cartItemId, userId);
    }

    // Get cart total for a user
    @GetMapping("/cart/total/{userId}")
    public Map<String, BigDecimal> getCartTotal(@PathVariable Integer userId) {
        BigDecimal total = cartItemService.getCartTotal(userId);
        return Map.of("total", total);
    }

    // Clear entire cart for a user
    @DeleteMapping("/cart/clear/{userId}")
    public void clearCart(@PathVariable Integer userId) {
        cartItemService.clearCart(userId);
    }
}
