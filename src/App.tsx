import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Login2 from './pages/Login2';
import Signup from './pages/Signup';
import Signup2 from './pages/SignUp2';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import FluentdConfigGenerator from './pages/FluentdConfigGenerator';
import Logs from './pages/Logs';
import HomePage from './pages/HomePage';
import SplashPage from './pages/SplashPage';

const App = () => {
  return (
      <BrowserRouter>
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/login' element={<Login2/>}></Route>
            <Route path='/signup' element={<Signup2/>}></Route>
            <Route path='/projects' element={<Projects/>}></Route>
            <Route path='/configuration' element={<FluentdConfigGenerator/>}></Route>
            <Route path='/api/logs' element={<Logs/>}></Route>
            <Route path='/' element={<HomePage/>}></Route>
          </Routes>
      </BrowserRouter>
  );
};

render(<App />, document.querySelector('#app'));