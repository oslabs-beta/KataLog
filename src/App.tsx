import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login2 from './pages/Login2';
import Signup2 from './pages/SignUp2';
import Dashboard from './pages/Dashboard';
import FluentdConfigGenerator from './pages/FluentdConfigGenerator';
import Logs from './pages/Logs';
import HomePage from './pages/HomePage';

const App = () => {
  return (
      <BrowserRouter>
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/login' element={<Login2/>} />
            <Route path='/signup' element={<Signup2/>} />
            <Route path='/configuration' element={<FluentdConfigGenerator/>} />
            <Route path='/api/logs' element={<Logs/>} />
            <Route path='/' element={<HomePage/>} />
          </Routes>
      </BrowserRouter>
  );
};

export default App;
