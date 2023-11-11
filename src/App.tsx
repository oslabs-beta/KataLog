import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
// import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import FluentdConfigGenerator from './pages/FluentdConfigGenerator';
import Logs from './pages/Logs';

const App = () => {
  return (
      <BrowserRouter>
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            {/* <Route path='/projects' element={<Projects/>}></Route> */}
            <Route path='/configuration' element={<FluentdConfigGenerator/>}></Route>
            <Route path='/api/logs' element={<Logs/>}></Route>
            <Route path='/' element={<Login/>}></Route>
          </Routes>
      </BrowserRouter>
  );
};

render(<App />, document.querySelector('#app'));