package com.bookreviewhub.service;

import com.bookreviewhub.model.Review;
import java.util.List;
import java.util.Optional;

public interface ReviewService {
    List<Review> getAllReviews();
    Optional<Review> getReviewById(Long id);
    Review create(Review review);
    Review update(Long id, Review updatedReview);
    void delete(Long id);
}