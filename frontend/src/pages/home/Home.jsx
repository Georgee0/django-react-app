import React from "react";
import axios from "axios";
import Navigation from "../../components/navbar/Navigation";
import { useState, useEffect } from "react";
import FormModal from "../../components/formModal/FormModal";
import './Home.css';

const Home = () => {
  
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const selectedUserId = null;
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const handleOpenModal = (userId) =>{
    const selectedUser = data.find((item) => item.id === userId)
    setSelectedUser(selectedUser || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () =>{
    setIsModalOpen(false);
  };
  


  // Getting data from the backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/getusers/')
      .then(response => {
        const userData = response.data
        setData(userData);
        
        
      })
      .catch(error => {
        console.error(error);
      });
    }, []);
    

  


  // Sending data to the db
  const handleSubmit = (event) => {
    event.preventDefault();
    addUsers(username, email, password);
  };

  const addUsers = (username, email, password) => {
    axios
      .post('http://127.0.0.1:8000/createusers/', {
        username: username,
        email: email,
        password: password,
      })
      .then(response => {
        setData([response.data, ...data]);
        setUsername('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  


  // deleting users from the database
  const deleteUser = (id) =>{
    axios.delete(`http://127.0.0.1:8000/deleteusers/${id}/`)
    .then(response =>{
      console.log("User deleted successfully");
     // confirm("Are you sure you want to delete this user");
      alert("User deleted successfully");
    })
    .catch(error =>{
      console.error("Error in deleting user: ",error);
  });
    

  }


  // updating users info from database
  const handleupdatedData = (updatedUser) =>{
    axios.put(`http://127.0.0.1:8000/updateuser/${selectedUserId}/`, updatedUser)
    .then(response =>{

      const updatedUsers = data.map((item) =>
        item.id === selectedUserId ? response.data : item
      );
      setData(updatedUsers);
      setIsModalOpen(false);
      console.log("User updated successfully");
    })
    .catch(err =>{
      console.error("Error in updating users: ", err);
    })
  }



  
    

    
  return (
    <div>
      <Navigation />
      <div className="home container">
        <h1>Home</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />

          <input
            name="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />

          <input
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />

          <button
            name="submit_btn"
            type="submit"
          >
            Add User
          </button>
        </form>

        <div className="home_table">
          <table>
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
              {data.map(item => (
                <>
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  {/* <td>{item.password}</td> */}
                  <td>
                    {/* Deleting user */}
                    <button
                    onClick={()=>{deleteUser(item.id)}}
                    >Delete</button>

                    {/* Updating user */}
                    <button onClick={() =>handleOpenModal(item.id)}>Edit</button>
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
