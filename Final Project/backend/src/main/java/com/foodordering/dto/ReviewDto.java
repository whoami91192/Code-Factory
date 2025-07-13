package com.foodordering.dto;

import java.time.LocalDateTime;

public class ReviewDto {
    private Long id;
    private int rating;
    private String comment;
    private String username;
    private LocalDateTime createdAt;
    private Long productId;
    private String productName;

    public ReviewDto() {}
    
    // Constructor for basic review data (5 parameters)
    public ReviewDto(Long id, int rating, String comment, String username, LocalDateTime createdAt) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.username = username;
        this.createdAt = createdAt;
    }
    
    // Constructor for full review data (7 parameters)
    public ReviewDto(Long id, int rating, String comment, String username, LocalDateTime createdAt, Long productId, String productName) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.username = username;
        this.createdAt = createdAt;
        this.productId = productId;
        this.productName = productName;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
} 