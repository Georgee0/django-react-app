import React from "react";
import axios from "axios";
import Navigation from "../../components/navbar/Navigation";
import { useState, useEffect } from "react";
import FormModal from "../../components/formModal/FormModal";
import { Form, Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);

  const selectedUserId = null;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (userId) => {
    const selectedUser = data.find((item) => item.id === userId);
    setSelectedUser(selectedUser || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Getting data from the backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/getusers/")
      .then((response) => {
        const userData = response.data;
        setData(userData);
        SetLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //handle change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Sending data to the db
  const handleSubmit = (event) => {
    event.preventDefault();
    addUsers(form);
    console.log(form);
  };

  const addUsers = (form) => {
    axios
      .post("http://127.0.0.1:8000/createusers/", {
        username: [form.username],
        email: [form.email],
        password: [form.password],
      })
      .then((response) => {
        const newData = response.data;
        console.log(newData);
        setData([newData, ...data]);
        console.log(data);
        setForm((prev) => ({
          ...prev,
          username: "",
          email: "",
          password: "",
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // deleting users from the database
  const deleteUser = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/deleteusers/${id}/`)
      .then((response) => {
        console.log("User deleted successfully");
        // confirm("Are you sure you want to delete this user");
        alert("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error in deleting user: ", error);
      });
  };

  // updating users info from database
  const handleupdatedData = (updatedUser) => {
    axios
      .put(`http://127.0.0.1:8000/updateuser/${selectedUserId}/`, updatedUser)
      .then((response) => {
        const updatedUsers = data.map((item) =>
          item.id === selectedUserId ? response.data : item
        );
        setData(updatedUsers);
        setIsModalOpen(false);
        console.log("User updated successfully");
      })
      .catch((err) => {
        console.error("Error in updating users: ", err);
      });
  };

  return (
    <div>
      <Navigation />
      <div className="home container">
        <h1>Home</h1>

        <Form onSubmit={handleSubmit} style={{ width: 300, margin: '10px 0', padding: '15px 10px', }}>
          <Form.Group className='mb-3' ControlId='formBasicUsername'>
            <Form.Control
              required
              name="username"
              placeholder="Username"
              type="text"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-3' ControlId='formBasicUsername'>
            <Form.Control
              required
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-3' ControlId='formBasicUsername'>
            <Form.Control
              required
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" name="submit_btn" type="submit">
            Add User
          </Button>
        </Form>

        <div className="home_table">
          {loading ? (
            "Loading......"
          ) : (
            <>
              <Table striped bordered hover variant="dark" style={{ width: 550}}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USERNAME</th>
                    <th>EMAIL</th>
                    {/* <th>PASSWORD</th> */}
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <>
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        {/* <td>{item.password}</td> */}
                        <td>
                          {/* Deleting user */}
                          <button
                            onClick={() => {
                            deleteUser(item.id);
                            }}
                          >
                            Delete
                          </button>

                          {/* Updating user */}
                          <button onClick={() => handleOpenModal(item.id)}>
                            Edit
                          </button>
                          <FormModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            initialData={selectedUser}
                            onSubmit={handleupdatedData}
                          />
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
