package com.example.assignment_three_zelora.controller;

import com.example.assignment_three_zelora.dto.AuthResponse;
import com.example.assignment_three_zelora.dto.LoginRequest;
import com.example.assignment_three_zelora.dto.RegisterRequest;
import com.example.assignment_three_zelora.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        
        if (response.getCustomerId() == null) {
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        
        if (response.getCustomerId() == null) {
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        
        if (refreshToken == null || refreshToken.isEmpty()) {
            return ResponseEntity.badRequest().body(
                new AuthResponse(null, null, null, null, null, "Refresh token is required")
            );
        }

        AuthResponse response = authService.refreshToken(refreshToken);
        
        if (response.getCustomerId() == null) {
            return ResponseEntity.status(401).body(response);
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate")
    public ResponseEntity<AuthResponse> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body(
                new AuthResponse(null, null, null, null, null, "Invalid authorization header")
            );
        }

        String token = authHeader.substring(7);
        AuthResponse response = authService.validateToken(token);
        
        if (response.getCustomerId() == null) {
            return ResponseEntity.status(401).body(response);
        }
        
        return ResponseEntity.ok(response);
    }
}
