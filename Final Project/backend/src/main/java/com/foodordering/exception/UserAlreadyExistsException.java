package com.foodordering.exception;

/**
 * Exception thrown when attempting to create a user that already exists.
 * 
 * @author Food Ordering Team
 * @version 1.0.0
 */
public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException(String message) {
        super(message);
    }

    public UserAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
} 