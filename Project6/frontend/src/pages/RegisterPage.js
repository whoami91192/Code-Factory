
import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "USER",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/register", formData);
      setSuccess(true);
      setError("");
    } catch (err) {
      setError("Αποτυχία εγγραφής.");
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Εγγραφή Νέου Χρήστη</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit">Εγγραφή</button>
      </form>
      {success && <p>✅ Εγγραφή επιτυχής!</p>}
      {error && <p>❌ {error}</p>}
    </div>
  );
};

export default RegisterPage;
