package com.foodordering.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Data Transfer Object for authentication requests.
 * 
 * Used for login and registration requests.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
public class AuthRequest {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;

    // For registration
    private String email;

    // Constructors
    public AuthRequest() {}

    public AuthRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public AuthRequest(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "AuthRequest{" +
                "username='" + username + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
} 