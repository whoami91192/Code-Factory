
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <button onClick={() => navigate("/admin/courses")}>📘 Μαθήματα</button>
      <button onClick={() => navigate("/admin/enrollments")}>👥 Εγγραφές</button>
      <button onClick={handleLogout}>🚪 Αποσύνδεση</button>
    </nav>
  );
};

export default AdminNavbar;
