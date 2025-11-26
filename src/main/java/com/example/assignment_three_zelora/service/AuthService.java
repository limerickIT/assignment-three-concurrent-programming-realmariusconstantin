package com.example.assignment_three_zelora.service;

import com.example.assignment_three_zelora.dto.AuthResponse;
import com.example.assignment_three_zelora.dto.LoginRequest;
import com.example.assignment_three_zelora.dto.RegisterRequest;
import com.example.assignment_three_zelora.model.entitys.Customer;
import com.example.assignment_three_zelora.model.repos.CustomerRepository;
import com.example.assignment_three_zelora.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (customerRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(null, null, null, null, null, "Email already registered");
        }

        // Create new customer with minimal required info
        Customer customer = new Customer();
        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setEmail(request.getEmail());
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customer.setRole("USER");
        customer.setDateJoined(new Date());
        // All other fields are null - can be filled in during checkout

        customer = customerRepository.save(customer);

        // Generate JWT tokens
        String token = jwtUtil.generateToken(
            customer.getCustomerId(),
            customer.getEmail(),
            customer.getFirstName(),
            customer.getLastName(),
            customer.getRole()
        );
        String refreshToken = jwtUtil.generateRefreshToken(customer.getCustomerId(), customer.getEmail());

        return new AuthResponse(
            customer.getCustomerId(),
            customer.getFirstName(),
            customer.getLastName(),
            customer.getEmail(),
            customer.getRole(),
            "Registration successful",
            token,
            refreshToken,
            jwtUtil.getJwtExpiration()
        );
    }

    public AuthResponse login(LoginRequest request) {
        Optional<Customer> customerOpt = customerRepository.findByEmail(request.getEmail());

        if (customerOpt.isEmpty()) {
            return new AuthResponse(null, null, null, null, null, "Invalid email or password");
        }

        Customer customer = customerOpt.get();

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), customer.getPassword())) {
            return new AuthResponse(null, null, null, null, null, "Invalid email or password");
        }

        // Generate JWT tokens
        String token = jwtUtil.generateToken(
            customer.getCustomerId(),
            customer.getEmail(),
            customer.getFirstName(),
            customer.getLastName(),
            customer.getRole()
        );
        String refreshToken = jwtUtil.generateRefreshToken(customer.getCustomerId(), customer.getEmail());

        return new AuthResponse(
            customer.getCustomerId(),
            customer.getFirstName(),
            customer.getLastName(),
            customer.getEmail(),
            customer.getRole(),
            "Login successful",
            token,
            refreshToken,
            jwtUtil.getJwtExpiration()
        );
    }

    public AuthResponse refreshToken(String refreshToken) {
        try {
            // Validate refresh token
            String email = jwtUtil.extractUsername(refreshToken);
            Integer customerId = jwtUtil.extractCustomerId(refreshToken);

            if (!jwtUtil.isRefreshToken(refreshToken)) {
                return new AuthResponse(null, null, null, null, null, "Invalid refresh token");
            }

            Optional<Customer> customerOpt = customerRepository.findByEmail(email);
            if (customerOpt.isEmpty()) {
                return new AuthResponse(null, null, null, null, null, "User not found");
            }

            Customer customer = customerOpt.get();

            if (!jwtUtil.validateToken(refreshToken, email)) {
                return new AuthResponse(null, null, null, null, null, "Refresh token expired");
            }

            // Generate new tokens
            String newToken = jwtUtil.generateToken(
                customer.getCustomerId(),
                customer.getEmail(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getRole()
            );
            String newRefreshToken = jwtUtil.generateRefreshToken(customer.getCustomerId(), customer.getEmail());

            return new AuthResponse(
                customer.getCustomerId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getRole(),
                "Token refreshed successfully",
                newToken,
                newRefreshToken,
                jwtUtil.getJwtExpiration()
            );
        } catch (Exception e) {
            return new AuthResponse(null, null, null, null, null, "Invalid refresh token");
        }
    }

    public AuthResponse validateToken(String token) {
        try {
            String email = jwtUtil.extractUsername(token);
            Integer customerId = jwtUtil.extractCustomerId(token);
            String role = jwtUtil.extractRole(token);

            if (jwtUtil.validateToken(token, email)) {
                Optional<Customer> customerOpt = customerRepository.findByEmail(email);
                if (customerOpt.isPresent()) {
                    Customer customer = customerOpt.get();
                    return new AuthResponse(
                        customer.getCustomerId(),
                        customer.getFirstName(),
                        customer.getLastName(),
                        customer.getEmail(),
                        customer.getRole(),
                        "Token valid"
                    );
                }
            }
            return new AuthResponse(null, null, null, null, null, "Invalid token");
        } catch (Exception e) {
            return new AuthResponse(null, null, null, null, null, "Invalid token");
        }
    }
}
