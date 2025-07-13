package com.bookreviewhub.repository;

import com.bookreviewhub.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Επιστρέφει όλες τις κριτικές για ένα συγκεκριμένο βιβλίο
    List<Review> findByBookId(Long bookId);
}
