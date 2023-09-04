import React from 'react';
import { Outlet } from 'react-router-dom' ;
import Navbar from '../components/navbar/Navigation';

const LayoutPage = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default LayoutPage
