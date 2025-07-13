package com.bookreviewhub.controller;

import com.bookreviewhub.model.Book;
import com.bookreviewhub.model.Review;
import com.bookreviewhub.repository.BookRepository;
import com.bookreviewhub.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;

    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<Review>> getReviewsByBook(@PathVariable Long bookId) {
        List<Review> reviews = reviewRepository.findByBookId(bookId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        if (review.getBook() == null || review.getBook().getId() == null) {
            return ResponseEntity.badRequest().build();
        }

        return bookRepository.findById(review.getBook().getId())
                .map(book -> {
                    review.setBook(book);
                    Review saved = reviewRepository.save(review);
                    return ResponseEntity.ok(saved);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        return reviewRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review updatedReview) {
        return reviewRepository.findById(id)
                .map(review -> {
                    review.setContent(updatedReview.getContent());
                    review.setRating(updatedReview.getRating());
                    Review saved = reviewRepository.save(review);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        return reviewRepository.findById(id)
                .map(review -> {
                    reviewRepository.delete(review);
                    return ResponseEntity.noContent().<Void>build(); // explicit type inference
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
