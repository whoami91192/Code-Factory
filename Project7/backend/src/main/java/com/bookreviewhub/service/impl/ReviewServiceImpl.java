package com.bookreviewhub.service.impl;

import com.bookreviewhub.model.Review;
import com.bookreviewhub.repository.ReviewRepository;
import com.bookreviewhub.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    @Override
    public Review create(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public Review update(Long id, Review updatedReview) {
        return reviewRepository.findById(id)
                .map(existing -> {
                    existing.setContent(updatedReview.getContent());
                    existing.setRating(updatedReview.getRating());
                    return reviewRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Review not found"));
    }

    @Override
    public void delete(Long id) {
        reviewRepository.deleteById(id);
    }
}