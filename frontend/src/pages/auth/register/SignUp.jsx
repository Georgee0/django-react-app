import React from 'react';
import axios from 'axios'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Navigation from '../../../components/navbar/Navigation';

const SignUp = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData((prevState) =>({
            ...prevState,
            [name]: value
        }));
    };
    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data);

        axios.post('http://127.0.0.1:8000/signup/', data)
        .then(response=>{
            alert(`You have successfully signed up!`);
            console.log("success", response);

            // redirect to login page
            window.location.href = '/login';
        }
        )
        .catch((error)=>{
            console.error('Error signing up:', error);
            }
        );
    };
    
  return (
    <>
    <Navigation />
    <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicUsername' >
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={data.username} onChange={handleChange} name="username" placeholder="Enter Username" />
        </Form.Group>
  

        <Form.Group className='mb-3' controlId='formBasicEmail' >
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={data.email} onChange={handleChange} name="email" placeholder="Enter Email" />
        </Form.Group>


        <Form.Group className='mb-3' controlId='formBasicPassword' >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={data.password} onChange={handleChange} name="password" placeholder="Password" />
        </Form.Group>

        <Button variant='primary' type='submit'>Register</Button>
    </Form>

    </>
  )
}


export default SignUp;
