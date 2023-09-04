import React from "react";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import { useState } from "react";
import Navigation from "../../../components/navbar/Navigation";
//import "./Login.css";


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
/*   const [ formData, setFormData ] = useState({
    username: "",
    password: ""
  }); */

/*   const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    });
  }; */

  const handleSubmit = async (e) =>{
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/login/", 
    {
      username: username,
      password: password,
    })
    .then((response) =>{

      // save token to local storage
      localStorage.setItem('token', response.data.token);

      //Redirected to a protected route or dashboard
      window.location.href ='/dashboard';
    })
    .catch((error) =>{
      console.error('Login failed: ', error);
    });
  };

  return (
    <>
    <Navigation />
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control required value={username} type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required   value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit">Login</Button>
      
    </Form>
    
    
    </>
  );
};
  
export default Login;
