import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from "./pages/auth/login/Login";
import LayoutPage from './pages/LayoutPage';
import SignUp from './pages/auth/register/SignUp';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='./' element={<LayoutPage />} />
          <Route index element={<Home />} />
          <Route path='./' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
