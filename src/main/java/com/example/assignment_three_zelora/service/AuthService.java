package com.example.assignment_three_zelora.service;

import com.example.assignment_three_zelora.dto.AuthResponse;
import com.example.assignment_three_zelora.dto.LoginRequest;
import com.example.assignment_three_zelora.dto.RegisterRequest;
import com.example.assignment_three_zelora.model.entitys.Customer;
import com.example.assignment_three_zelora.model.repos.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private CustomerRepository customerRepository;

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

        return new AuthResponse(
            customer.getCustomerId(),
            customer.getFirstName(),
            customer.getLastName(),
            customer.getEmail(),
            customer.getRole(),
            "Registration successful"
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

        return new AuthResponse(
            customer.getCustomerId(),
            customer.getFirstName(),
            customer.getLastName(),
            customer.getEmail(),
            customer.getRole(),
            "Login successful"
        );
    }
}
