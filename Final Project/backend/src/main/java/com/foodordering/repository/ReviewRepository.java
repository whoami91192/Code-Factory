package com.foodordering.repository;

import com.foodordering.entity.Review;
import com.foodordering.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProduct(Product product);
    List<Review> findByProductId(Long productId);
    @Query("SELECT r FROM Review r JOIN FETCH r.user WHERE r.product = :product")
    List<Review> findByProductWithUser(@Param("product") Product product);
    @Query("SELECT r FROM Review r JOIN FETCH r.user JOIN FETCH r.product")
    List<Review> findAllWithUserAndProduct();
} 