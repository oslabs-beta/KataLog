import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import FluentdConfigGenerator from './pages/FluentdConfigGenerator';
import Logs from './pages/Logs';

const App = () => {
  return (
      <BrowserRouter>
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/configuration' element={<FluentdConfigGenerator/>} />
            <Route path='/api/logs' element={<Logs/>} />
            <Route path='/' element={<Login/>} />
          </Routes>
      </BrowserRouter>
  );
};

export default App;
