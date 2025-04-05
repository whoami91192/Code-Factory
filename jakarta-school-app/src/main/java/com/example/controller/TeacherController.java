
package com.example.controller;

import com.example.model.Teacher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/teachers")
public class TeacherController extends HttpServlet {

    private List<Teacher> teacherList = new ArrayList<>();

    @Override
    public void init() throws ServletException {
        teacherList.add(new Teacher(1, "Θανάσης", "Ανδρούτσος"));
        teacherList.add(new Teacher(2, "Γιάννης", "Καλογερόπουλος"));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("teachers", teacherList);
        req.getRequestDispatcher("/WEB-INF/jsp/teachers.jsp").forward(req, resp);
    }
}
