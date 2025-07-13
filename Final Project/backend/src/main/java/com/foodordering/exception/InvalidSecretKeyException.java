package com.foodordering.exception;

public class InvalidSecretKeyException extends RuntimeException {
    public InvalidSecretKeyException(String message) {
        super(message);
    }
} 