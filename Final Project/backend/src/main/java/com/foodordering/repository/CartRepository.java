package com.foodordering.repository;

import com.foodordering.entity.Cart;
import com.foodordering.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for Cart entity.
 * 
 * Provides data access methods for cart management operations.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    /**
     * Find cart by user.
     */
    Optional<Cart> findByUser(User user);

    /**
     * Find cart by user ID.
     */
    Optional<Cart> findByUserId(Long userId);

    /**
     * Check if cart exists for user.
     */
    boolean existsByUser(User user);

    /**
     * Check if cart exists for user ID.
     */
    boolean existsByUserId(Long userId);

    /**
     * Delete cart by user.
     */
    void deleteByUser(User user);

    /**
     * Delete cart by user ID.
     */
    void deleteByUserId(Long userId);

    /**
     * Find cart with items by user ID.
     */
    @Query("SELECT c FROM Cart c LEFT JOIN FETCH c.items ci LEFT JOIN FETCH ci.product WHERE c.user.id = :userId")
    Optional<Cart> findByUserIdWithItems(@Param("userId") Long userId);
} 