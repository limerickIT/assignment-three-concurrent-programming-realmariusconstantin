package com.example.assignment_three_zelora.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ImageUploadController {
    
    @Value("${app.upload.dir:src/main/resources/static/images/products}")
    private String uploadDir;
    
    @Value("${app.upload.base-url:http://localhost:8080/images/products}")
    private String baseUrl;
    
    /**
     * Upload a product image
     * @param file The image file to upload
     * @param productId Optional product ID to organize images
     * @return Response with the uploaded image URL
     */
    @PostMapping("/upload/image")
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "productId", required = false) Integer productId) {
        
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Please select a file to upload"));
            }
            
            // Validate file type
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Only image files are allowed"));
            }
            
            // Get file extension
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            
            // Generate unique filename
            String filename = UUID.randomUUID().toString() + extension;
            
            // Determine upload path
            String targetDir = uploadDir;
            String urlPath = "";
            
            if (productId != null) {
                targetDir = uploadDir + "/" + productId;
                urlPath = "/" + productId;
            }
            
            // Create directory if it doesn't exist
            Path uploadPath = Paths.get(targetDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            // Save file
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            // Build response URL
            String imageUrl = baseUrl + urlPath + "/" + filename;
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("url", imageUrl);
            response.put("filename", filename);
            response.put("message", "Image uploaded successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to upload image: " + e.getMessage()));
        }
    }
    
    /**
     * Upload multiple product images
     * @param files Array of image files
     * @param productId Product ID to organize images
     * @return Response with uploaded image URLs
     */
    @PostMapping("/upload/images")
    public ResponseEntity<?> uploadMultipleImages(
            @RequestParam("files") MultipartFile[] files,
            @RequestParam(value = "productId", required = false) Integer productId) {
        
        try {
            if (files == null || files.length == 0) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Please select files to upload"));
            }
            
            // Determine upload path
            String targetDir = uploadDir;
            String urlPath = "";
            
            if (productId != null) {
                targetDir = uploadDir + "/" + productId;
                urlPath = "/" + productId;
            }
            
            // Create directory if it doesn't exist
            Path uploadPath = Paths.get(targetDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            // Upload each file
            java.util.List<Map<String, String>> uploadedFiles = new java.util.ArrayList<>();
            
            for (MultipartFile file : files) {
                if (file.isEmpty()) continue;
                
                String contentType = file.getContentType();
                if (contentType == null || !contentType.startsWith("image/")) continue;
                
                String originalFilename = file.getOriginalFilename();
                String extension = "";
                if (originalFilename != null && originalFilename.contains(".")) {
                    extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                }
                
                String filename = UUID.randomUUID().toString() + extension;
                Path filePath = uploadPath.resolve(filename);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                
                String imageUrl = baseUrl + urlPath + "/" + filename;
                
                Map<String, String> fileInfo = new HashMap<>();
                fileInfo.put("url", imageUrl);
                fileInfo.put("filename", filename);
                uploadedFiles.add(fileInfo);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("files", uploadedFiles);
            response.put("count", uploadedFiles.size());
            response.put("message", uploadedFiles.size() + " image(s) uploaded successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to upload images: " + e.getMessage()));
        }
    }
    
    /**
     * Delete an uploaded image
     * @param filename The filename to delete
     * @param productId Optional product ID
     * @return Response indicating success or failure
     */
    @DeleteMapping("/upload/image/{filename}")
    public ResponseEntity<?> deleteImage(
            @PathVariable String filename,
            @RequestParam(value = "productId", required = false) Integer productId) {
        
        try {
            String targetDir = uploadDir;
            if (productId != null) {
                targetDir = uploadDir + "/" + productId;
            }
            
            Path filePath = Paths.get(targetDir, filename);
            
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Image deleted successfully"
                ));
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to delete image: " + e.getMessage()));
        }
    }
}
