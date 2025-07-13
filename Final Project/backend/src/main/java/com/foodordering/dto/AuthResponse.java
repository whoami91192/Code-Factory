package com.foodordering.dto;

import com.foodordering.entity.UserRole;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for authentication responses.
 * 
 * Contains JWT tokens and user information for successful authentication.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
public class AuthResponse {

    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private Long userId;
    private String username;
    private String email;
    private UserRole role;
    private LocalDateTime expiresAt;

    // Constructors
    public AuthResponse() {}

    public AuthResponse(String accessToken, String refreshToken, Long userId, 
                       String username, String email, UserRole role, LocalDateTime expiresAt) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.role = role;
        this.expiresAt = expiresAt;
    }

    // Getters and Setters
    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    @Override
    public String toString() {
        return "AuthResponse{" +
                "accessToken='" + (accessToken != null ? "***" : null) + '\'' +
                ", refreshToken='" + (refreshToken != null ? "***" : null) + '\'' +
                ", tokenType='" + tokenType + '\'' +
                ", userId=" + userId +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", expiresAt=" + expiresAt +
                '}';
    }
} 