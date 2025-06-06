
import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import CourseForm from "../../components/CourseForm";

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res.data);
  };

  const handleSave = async (course) => {
    if (course.id) {
      await API.put(`/courses/${course.id}`, course);
    } else {
      await API.post("/courses", course);
    }
    setEditing(null);
    fetchCourses();
  };

  const handleDelete = async (id) => {
    await API.delete(`/courses/${id}`);
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Διαχείριση Μαθημάτων</h2>
      <CourseForm course={editing} onSave={handleSave} />
      <ul>
        {courses.map((c) => (
          <li key={c.id}>
            {c.title} - {c.description}
            <button onClick={() => setEditing(c)}>Επεξεργασία</button>
            <button onClick={() => handleDelete(c.id)}>Διαγραφή</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCoursesPage;
