
import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminNavbar from "../../components/AdminNavbar";

const AdminDashboard = () => {
  const [courseCount, setCourseCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [enrollmentCount, setEnrollmentCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const [courses, users, enrollments] = await Promise.all([
        API.get("/courses"),
        API.get("/users"),
        API.get("/enrollments"),
      ]);
      setCourseCount(courses.data.length);
      setUserCount(users.data.length);
      setEnrollmentCount(enrollments.data.length);
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <h2>📊 Admin Dashboard</h2>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "2rem",
        gap: "2rem"
      }}>
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", flex: 1 }}>
          <h3>📘 Μαθήματα</h3>
          <p>{courseCount}</p>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", flex: 1 }}>
          <h3>👥 Χρήστες</h3>
          <p>{userCount}</p>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", flex: 1 }}>
          <h3>📝 Εγγραφές</h3>
          <p>{enrollmentCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
