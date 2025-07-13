package com.foodordering.repository;

import com.foodordering.entity.Contact;
import com.foodordering.entity.ContactStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    
    List<Contact> findByStatus(ContactStatus status);
    
    List<Contact> findByEmail(String email);
    
    List<Contact> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT c FROM Contact c WHERE c.subject LIKE %:keyword% OR c.message LIKE %:keyword% OR c.name LIKE %:keyword%")
    List<Contact> findByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.status = :status")
    long countByStatus(@Param("status") ContactStatus status);
    
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.createdAt >= :date")
    long countByCreatedAtAfter(@Param("date") LocalDateTime date);
} 