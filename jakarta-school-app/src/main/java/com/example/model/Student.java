
package com.example.model;

public class Student {
    private int id;
    private String firstname;
    private String lastname;
    private String grade;

    public Student(int id, String firstname, String lastname, String grade) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.grade = grade;
    }

    public int getId() { return id; }
    public String getFirstname() { return firstname; }
    public String getLastname() { return lastname; }
    public String getGrade() { return grade; }
}
