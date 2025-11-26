package com.example.assignment_three_zelora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.assignment_three_zelora.model.entitys.Supplier;
import com.example.assignment_three_zelora.model.repos.SupplierRepository;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class SupplierController {
    
    @Autowired
    private SupplierRepository supplierRepository;
    
    // Get all suppliers
    @GetMapping("/suppliers")
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }
    
    // Get supplier by ID
    @GetMapping("/suppliers/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable Integer id) {
        Optional<Supplier> supplier = supplierRepository.findById(id);
        if (supplier.isPresent()) {
            return ResponseEntity.ok(supplier.get());
        }
        return ResponseEntity.notFound().build();
    }
    
    // Create new supplier
    @PostMapping("/suppliers")
    public ResponseEntity<Supplier> createSupplier(@RequestBody Supplier supplier) {
        try {
            Integer maxId = supplierRepository.findMaxSupplierId();
            supplier.setSupplierId(maxId + 1);
            Supplier saved = supplierRepository.save(supplier);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Update supplier
    @PutMapping("/suppliers/{id}")
    public ResponseEntity<Supplier> updateSupplier(@PathVariable Integer id, @RequestBody Supplier supplierDetails) {
        Optional<Supplier> supplier = supplierRepository.findById(id);
        if (supplier.isPresent()) {
            Supplier s = supplier.get();
            if (supplierDetails.getSupplierName() != null) s.setSupplierName(supplierDetails.getSupplierName());
            if (supplierDetails.getContactName() != null) s.setContactName(supplierDetails.getContactName());
            if (supplierDetails.getContactEmail() != null) s.setContactEmail(supplierDetails.getContactEmail());
            if (supplierDetails.getContactPhone() != null) s.setContactPhone(supplierDetails.getContactPhone());
            if (supplierDetails.getAddress() != null) s.setAddress(supplierDetails.getAddress());
            if (supplierDetails.getWebsite() != null) s.setWebsite(supplierDetails.getWebsite());
            if (supplierDetails.getDescription() != null) s.setDescription(supplierDetails.getDescription());
            Supplier saved = supplierRepository.save(s);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Delete supplier
    @DeleteMapping("/suppliers/{id}")
    public ResponseEntity<Void> deleteSupplier(@PathVariable Integer id) {
        if (supplierRepository.existsById(id)) {
            supplierRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
