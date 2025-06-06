
import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const AdminEnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newEnrollment, setNewEnrollment] = useState({ userId: "", courseId: "" });

  const fetchData = async () => {
    const [enrRes, usersRes, coursesRes] = await Promise.all([
      API.get("/enrollments"),
      API.get("/users"),
      API.get("/courses"),
    ]);
    setEnrollments(enrRes.data);
    setUsers(usersRes.data);
    setCourses(coursesRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    const user = users.find((u) => u.id === parseInt(newEnrollment.userId));
    const course = courses.find((c) => c.id === parseInt(newEnrollment.courseId));
    await API.post("/enrollments", { user, course });
    setNewEnrollment({ userId: "", courseId: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await API.delete("/enrollments/" + id);
    fetchData();
  };

  return (
    <div>
      <h2>Εγγραφές Φοιτητών</h2>

      <div>
        <select value={newEnrollment.userId} onChange={(e) => setNewEnrollment({ ...newEnrollment, userId: e.target.value })}>
          <option value="">-- Επιλογή Φοιτητή --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.username}</option>
          ))}
        </select>

        <select value={newEnrollment.courseId} onChange={(e) => setNewEnrollment({ ...newEnrollment, courseId: e.target.value })}>
          <option value="">-- Επιλογή Μαθήματος --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>

        <button onClick={handleCreate}>Εγγραφή</button>
      </div>

      <ul>
        {enrollments.map((e) => (
          <li key={e.id}>
            👤 {e.user?.username} ➡️ 📘 {e.course?.title}
            <button onClick={() => handleDelete(e.id)}>Διαγραφή</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminEnrollmentsPage;
