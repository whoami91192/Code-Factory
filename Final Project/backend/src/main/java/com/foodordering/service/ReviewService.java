package com.foodordering.service;

import com.foodordering.entity.Review;
import com.foodordering.entity.Product;
import com.foodordering.entity.User;
import com.foodordering.exception.ResourceNotFoundException;
import com.foodordering.repository.ReviewRepository;
import com.foodordering.repository.ProductRepository;
import com.foodordering.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Review> getReviewsByProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
        return reviewRepository.findByProductWithUser(product);
    }

    public Review createReview(Long productId, Long userId, int rating, String comment) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Review review = new Review();
        review.setProduct(product);
        review.setUser(user);
        review.setRating(rating);
        review.setComment(comment);

        return reviewRepository.save(review);
    }

    public void deleteReview(Long reviewId, Long userId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + reviewId));
        
        if (!review.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only delete your own reviews");
        }
        
        reviewRepository.delete(review);
    }

    public List<Review> getAllReviewsWithUserAndProduct() {
        return reviewRepository.findAllWithUserAndProduct();
    }
} 