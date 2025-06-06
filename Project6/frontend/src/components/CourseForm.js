
import React, { useState, useEffect } from "react";

const CourseForm = ({ course, onSave }) => {
  const [title, setTitle] = useState(course?.title || "");
  const [description, setDescription] = useState(course?.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...course, title, description });
  };

  useEffect(() => {
    setTitle(course?.title || "");
    setDescription(course?.description || "");
  }, [course]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Τίτλος"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Περιγραφή"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Αποθήκευση</button>
    </form>
  );
};

export default CourseForm;
