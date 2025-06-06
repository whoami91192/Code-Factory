
package com.example.coursemanager.service;

import com.example.coursemanager.model.Enrollment;
import com.example.coursemanager.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepo;

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepo.findAll();
    }

    public List<Enrollment> getUserEnrollments(Long userId) {
        return enrollmentRepo.findByUserId(userId);
    }

    public Enrollment getEnrollment(Long id) {
        return enrollmentRepo.findById(id).orElseThrow();
    }

    public Enrollment createEnrollment(Enrollment enrollment) {
        return enrollmentRepo.save(enrollment);
    }

    public Enrollment updateEnrollment(Long id, Enrollment enrollmentDetails) {
        Enrollment enrollment = getEnrollment(id);
        enrollment.setUser(enrollmentDetails.getUser());
        enrollment.setCourse(enrollmentDetails.getCourse());
        return enrollmentRepo.save(enrollment);
    }

    public void deleteEnrollment(Long id) {
        enrollmentRepo.deleteById(id);
    }
}
