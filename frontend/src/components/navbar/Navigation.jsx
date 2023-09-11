import React from 'react';
//import { Navbar, Nav } from 'rsuite';
import { Navbar, Nav } from 'react-bootstrap';
import './Navigation.css';

const Navigation = () => {
  return (
    // <div className='nav-container'>
    //   <Navbar>
    //     <Nav>
    //       <div className='nav-links'>
    //         <p>
    //         <Nav.Item as='a' href='./'>Home</Nav.Item>
    //         <Nav.Item as='a' href='./'>Home</Nav.Item>
    //         <Nav.Item as='a' href='./'>Home</Nav.Item>
    //         </p>
    //       </div>

    //       <div className='nav-auth'>
    //         <Nav.Item as='a' href='/login'>Login</Nav.Item>
    //         <Nav.Item as='a' href='/SignUp'>Register</Nav.Item>
            
    //       </div>
    //     </Nav>
    //   </Navbar>
    // </div>
    <>
    <Navbar bg='primary' variant='dark'>
      <Navbar.Brand href='/'>Django-React</Navbar.Brand>
      <Nav className="mr-auto" d- justify-content-md-center>
        <Nav.Link href='/'>Home</Nav.Link>
        <Nav.Link href='/signup'>Register</Nav.Link>
        <Nav.Link href='/login'>Login</Nav.Link>
      </Nav>
    </Navbar>
    </>
  )
}

export default Navigation;
