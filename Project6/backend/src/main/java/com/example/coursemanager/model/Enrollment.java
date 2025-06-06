package com.example.coursemanager.model;

import jakarta.persistence.*;

@Entity
public class Enrollment {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Course course;

    // getters and setters
}