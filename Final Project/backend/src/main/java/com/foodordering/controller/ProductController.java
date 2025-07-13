package com.foodordering.controller;

import com.foodordering.dto.ProductDto;
import com.foodordering.entity.Product;
import com.foodordering.entity.ProductCategory;
import com.foodordering.repository.ProductRepository;
import com.foodordering.repository.ReviewRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * Product Controller for handling product-related operations.
 * 
 * Provides endpoints for product management and catalog operations.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@RestController
@RequestMapping("/products")
@Tag(name = "Products", description = "Product management APIs")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    /**
     * Get all products.
     */
    @GetMapping
    @Operation(summary = "Get all products", description = "Retrieves all available products")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Products retrieved successfully",
                    content = @Content(schema = @Schema(implementation = ProductDto.class)))
    })
    public ResponseEntity<List<ProductDto>> getAllProducts(
            @Parameter(description = "Product category filter")
            @RequestParam(required = false) ProductCategory category,
            @Parameter(description = "Search term")
            @RequestParam(required = false) String search) {
        
        List<Product> products;
        
        if (category != null) {
            products = productRepository.findByCategoryAndAvailable(category, true);
        } else if (search != null && !search.trim().isEmpty()) {
            products = productRepository.findAvailableByNameOrDescriptionContainingIgnoreCase(search.trim());
        } else {
            products = productRepository.findByAvailableTrue();
        }
        
        List<ProductDto> productDtos = products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(productDtos);
    }

    /**
     * Get all products (admin only, includes unavailable).
     */
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProductDto>> getAllProductsAdmin() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> productDtos = products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productDtos);
    }

    /**
     * Get product by ID.
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID", description = "Retrieves a specific product by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product retrieved successfully",
                    content = @Content(schema = @Schema(implementation = ProductDto.class))),
        @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<ProductDto> getProductById(
            @Parameter(description = "Product ID", required = true)
            @PathVariable Long id) {
        
        Product product = productRepository.findById(id)
                .orElse(null);
        
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(convertToDto(product));
    }

    /**
     * Create a new product (Admin only).
     */
    @PostMapping
    @Operation(summary = "Create product", description = "Creates a new product (Admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Product created successfully",
                    content = @Content(schema = @Schema(implementation = ProductDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<ProductDto> createProduct(
            @Parameter(description = "Product data", required = true)
            @Valid @RequestBody ProductDto productDto) {
        
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setCategory(productDto.getCategory());
        product.setImageUrl(productDto.getImageUrl());
        product.setAvailable(productDto.isAvailable());
        product.setStockQuantity(productDto.getStockQuantity());
        
        Product savedProduct = productRepository.save(product);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDto(savedProduct));
    }

    /**
     * Update product (Admin only).
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update product", description = "Updates an existing product (Admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product updated successfully",
                    content = @Content(schema = @Schema(implementation = ProductDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "404", description = "Product not found"),
        @ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<ProductDto> updateProduct(
            @Parameter(description = "Product ID", required = true)
            @PathVariable Long id,
            @Parameter(description = "Updated product data", required = true)
            @Valid @RequestBody ProductDto productDto) {
        
        Product product = productRepository.findById(id)
                .orElse(null);
        
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setCategory(productDto.getCategory());
        product.setImageUrl(productDto.getImageUrl());
        product.setAvailable(productDto.isAvailable());
        product.setStockQuantity(productDto.getStockQuantity());
        
        Product updatedProduct = productRepository.save(product);
        
        return ResponseEntity.ok(convertToDto(updatedProduct));
    }

    /**
     * Delete product (Admin only).
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete product", description = "Deletes a product (Admin only)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Product deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Product not found"),
        @ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<Void> deleteProduct(
            @Parameter(description = "Product ID", required = true)
            @PathVariable Long id) {
        
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        productRepository.deleteById(id);
        
        return ResponseEntity.noContent().build();
    }

    /**
     * Convert Product entity to ProductDto.
     */
    private ProductDto convertToDto(Product product) {
        ProductDto dto = new ProductDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getCategory(),
                product.getImageUrl(),
                product.isAvailable(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
        dto.setStockQuantity(product.getStockQuantity());
        // Calculate average rating
        var reviews = reviewRepository.findByProductId(product.getId());
        if (reviews != null && !reviews.isEmpty()) {
            double avg = reviews.stream().mapToInt(r -> r.getRating()).average().orElse(Double.NaN);
            dto.setAverageRating(Double.isNaN(avg) ? null : avg);
        } else {
            dto.setAverageRating(null);
        }
        return dto;
    }
} 