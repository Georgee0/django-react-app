import React from "react";
import { useState, useEffect } from "react";
import "./FormModal.css";

const FormModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({ ...initialData });

  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // useEffect(() => {
  //     if (initialData) {
  //       setUsername(initialData.username);
  //       setEmail(initialData.email);
  //       setPassword(initialData.password);
  //     }
  //   }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // handle form submission for data update
    onSubmit(formData);

    // close modal after submission
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "is-open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* username */}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />

            {/* email */}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            {/* password */}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
