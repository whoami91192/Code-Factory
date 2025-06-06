package com.example.coursemanager.model;

import jakarta.persistence.*;

@Entity
public class Course {
    @Id @GeneratedValue
    private Long id;
    private String title;
    private String description;

    // getters and setters
}