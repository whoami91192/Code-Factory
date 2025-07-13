package com.foodordering.repository;

import com.foodordering.entity.Product;
import com.foodordering.entity.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Repository interface for Product entity.
 * 
 * Provides data access methods for product management operations.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Find products by category.
     */
    List<Product> findByCategory(ProductCategory category);

    /**
     * Find available products.
     */
    List<Product> findByAvailableTrue();

    /**
     * Find products by category and availability.
     */
    List<Product> findByCategoryAndAvailable(ProductCategory category, boolean available);

    /**
     * Find products by name containing (case-insensitive).
     */
    List<Product> findByNameContainingIgnoreCase(String name);

    /**
     * Find products by description containing (case-insensitive).
     */
    List<Product> findByDescriptionContainingIgnoreCase(String description);

    /**
     * Find products by price range.
     */
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    /**
     * Find products by category and price range.
     */
    List<Product> findByCategoryAndPriceBetween(ProductCategory category, BigDecimal minPrice, BigDecimal maxPrice);

    /**
     * Find products by name or description containing (case-insensitive).
     */
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Product> findByNameOrDescriptionContainingIgnoreCase(@Param("searchTerm") String searchTerm);

    /**
     * Find available products by name or description containing (case-insensitive).
     */
    @Query("SELECT p FROM Product p WHERE p.available = true AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Product> findAvailableByNameOrDescriptionContainingIgnoreCase(@Param("searchTerm") String searchTerm);

    /**
     * Find products with pagination.
     */
    Page<Product> findAll(Pageable pageable);

    /**
     * Find available products with pagination.
     */
    Page<Product> findByAvailableTrue(Pageable pageable);

    /**
     * Find products by category with pagination.
     */
    Page<Product> findByCategory(ProductCategory category, Pageable pageable);

    /**
     * Find available products by category with pagination.
     */
    Page<Product> findByCategoryAndAvailableTrue(ProductCategory category, Pageable pageable);

    /**
     * Count products by category.
     */
    long countByCategory(ProductCategory category);

    /**
     * Count available products.
     */
    long countByAvailableTrue();

    /**
     * Count products by category and availability.
     */
    long countByCategoryAndAvailable(ProductCategory category, boolean available);
} 