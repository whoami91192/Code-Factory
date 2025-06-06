
package com.example.coursemanager.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "enrollments")
@IdClass(Enrollment.EnrollmentId.class)
public class Enrollment {

    @Id
    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @Id
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    public static class EnrollmentId implements Serializable {
        private Long student;
        private Long course;

        public EnrollmentId() {}
        public EnrollmentId(Long student, Long course) {
            this.student = student;
            this.course = course;
        }

        // hashCode, equals
    }

    // Getters and setters
}
