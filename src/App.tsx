import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import FluentdConfigGenerator from './pages/FluentdConfigGenerator';
import Logs from './pages/Logs';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/projects' element={<Projects/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/configuration' element={<FluentdConfigGenerator/>}></Route>
          <Route path='/api/logs' element={<Logs/>}></Route>
        </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.querySelector('#app'));