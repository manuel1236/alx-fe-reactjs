import React, { useState } from "react";

const RegistrationForm = () => {
  // State to manage form inputs
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Form validation logic
  const validate = () => {
    const newErrors = {};
    if (!formValues.username) newErrors.username = "Username is required";
    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formValues.password) {
      newErrors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Display errors
    } else {
      console.log("Form Submitted:", formValues);
      alert(`Registration successful! Welcome, ${formValues.username}!`);
      setFormValues({
        username: "",
        email: "",
        password: "",
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formValues.username}
          onChange={handleChange}
        />
        {errors.username && (
          <div style={{ color: "red", fontSize: "14px" }}>{errors.username}</div>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        {errors.email && (
          <div style={{ color: "red", fontSize: "14px" }}>{errors.email}</div>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        {errors.password && (
          <div style={{ color: "red", fontSize: "14px" }}>{errors.password}</div>
        )}
      </div>

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;