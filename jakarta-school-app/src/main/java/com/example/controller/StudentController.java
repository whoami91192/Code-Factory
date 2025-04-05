
package com.example.controller;

import com.example.model.Student;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/students")
public class StudentController extends HttpServlet {

    private List<Student> studentList = new ArrayList<>();

    @Override
    public void init() throws ServletException {
        studentList.add(new Student(1, "Μαρία", "Παπαδοπούλου", "A"));
        studentList.add(new Student(2, "Νίκος", "Πετρόπουλος", "B"));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("students", studentList);
        req.getRequestDispatcher("/WEB-INF/jsp/students.jsp").forward(req, resp);
    }
}
