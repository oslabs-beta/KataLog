import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// import Homepage from './pages/Homepage.jsx';
// import Login from './pages/Login.jsx';
// import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard';
import FluentdConfigGenerator from './pages/FluentdConfigGenerator';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/configuration' element={<FluentdConfigGenerator/>}></Route>
          {/* <Route exact path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.querySelector('#app'));
