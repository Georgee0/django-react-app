import React from 'react';
import { Navbar, Nav } from 'rsuite';
import './Navigation.css';

const Navigation = () => {
  return (
    <div className='nav container'>
      <Navbar>
        <Nav>
          <Nav.Item as='a' href='./'>Home</Nav.Item>
          <Nav.Item as='a' href='/login'>Login</Nav.Item>
          <Nav.Item as='a' href='/SignUp'>Register</Nav.Item>
        </Nav>
      </Navbar>
    </div>
  )
}

export default Navigation;
