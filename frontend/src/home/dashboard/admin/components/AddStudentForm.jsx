// AddStudentForm.jsx
import React, { useState } from "react";
import axios from "axios";

const AddStudentForm = () => {
  const [form, setForm] = useState({ name: "", email: "", roll: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/admin/students", form);
    alert("Student Added!");
    setForm({ name: "", email: "", roll: "" });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="roll" value={form.roll} onChange={handleChange} placeholder="Roll No" />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
