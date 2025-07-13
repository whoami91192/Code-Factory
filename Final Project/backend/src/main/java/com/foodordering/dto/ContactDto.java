package com.foodordering.dto;

import com.foodordering.entity.ContactStatus;
import java.time.LocalDateTime;

public class ContactDto {
    private Long id;
    private String name;
    private String email;
    private String subject;
    private String message;
    private String phoneNumber;
    private ContactStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public ContactDto() {}
    
    public ContactDto(String name, String email, String subject, String message, String phoneNumber) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.phoneNumber = phoneNumber;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public ContactStatus getStatus() { return status; }
    public void setStatus(ContactStatus status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
} 