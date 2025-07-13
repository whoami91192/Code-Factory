package com.foodordering.controller;

import com.foodordering.entity.Review;
import com.foodordering.service.ReviewService;
import com.foodordering.service.UserService;
import com.foodordering.dto.ReviewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    @GetMapping("/{productId}/reviews")
    public ResponseEntity<List<ReviewDto>> getReviewsByProduct(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getReviewsByProduct(productId);
        List<ReviewDto> dtos = reviews.stream().map(r -> new ReviewDto(
            r.getId(),
            r.getRating(),
            r.getComment(),
            r.getUser() != null ? r.getUser().getUsername() : null,
            r.getCreatedAt()
        )).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/all-reviews")
    public ResponseEntity<List<ReviewDto>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviewsWithUserAndProduct();
        List<ReviewDto> dtos = reviews.stream().map(r -> new ReviewDto(
            r.getId(),
            r.getRating(),
            r.getComment(),
            r.getUser() != null ? r.getUser().getUsername() : null,
            r.getCreatedAt(),
            r.getProduct() != null ? r.getProduct().getId() : null,
            r.getProduct() != null ? r.getProduct().getName() : null
        )).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/{productId}/reviews")
    public ResponseEntity<ReviewDto> createReview(
            @PathVariable Long productId,
            @RequestBody Map<String, Object> request,
            Authentication authentication) {
        // Προσθήκη ελέγχου για anonymous χρήστη
        if (authentication == null || !authentication.isAuthenticated() || authentication.getName().equals("anonymousUser")) {
            return ResponseEntity.status(401).build();
        }
        String username = authentication.getName();
        Long userId = userService.findByUsername(username).getId();
        int rating = (Integer) request.get("rating");
        String comment = (String) request.get("comment");
        Review review = reviewService.createReview(productId, userId, rating, comment);
        ReviewDto dto = new ReviewDto(
            review.getId(),
            review.getRating(),
            review.getComment(),
            review.getUser() != null ? review.getUser().getUsername() : null,
            review.getCreatedAt()
        );
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long reviewId,
            Authentication authentication) {
        
        String username = authentication.getName();
        Long userId = userService.findByUsername(username).getId();
        
        reviewService.deleteReview(reviewId, userId);
        return ResponseEntity.ok().build();
    }
} 