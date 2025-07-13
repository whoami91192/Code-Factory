package com.foodordering.repository;

import com.foodordering.entity.User;
import com.foodordering.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for User entity.
 * 
 * Provides data access methods for user management operations.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by username.
     */
    Optional<User> findByUsername(String username);

    /**
     * Find user by email.
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if username exists.
     */
    boolean existsByUsername(String username);

    /**
     * Check if email exists.
     */
    boolean existsByEmail(String email);

    /**
     * Find users by role.
     */
    List<User> findByRole(UserRole role);

    /**
     * Find active users.
     */
    List<User> findByActiveTrue();

    /**
     * Find users by role and active status.
     */
    List<User> findByRoleAndActive(UserRole role, boolean active);

    /**
     * Find users by username containing (case-insensitive).
     */
    @Query("SELECT u FROM User u WHERE LOWER(u.username) LIKE LOWER(CONCAT('%', :username, '%'))")
    List<User> findByUsernameContainingIgnoreCase(@Param("username") String username);

    /**
     * Find users by email containing (case-insensitive).
     */
    @Query("SELECT u FROM User u WHERE LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%'))")
    List<User> findByEmailContainingIgnoreCase(@Param("email") String email);

    /**
     * Count users by role.
     */
    long countByRole(UserRole role);

    /**
     * Count active users.
     */
    long countByActiveTrue();
} 