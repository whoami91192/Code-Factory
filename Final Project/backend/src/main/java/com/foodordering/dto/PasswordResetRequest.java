package com.foodordering.dto;

public class PasswordResetRequest {
    private String newPassword;

    public PasswordResetRequest() {}

    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
} 