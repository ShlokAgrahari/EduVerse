// src/App.js
import React from 'react';
import StudentDashboard from './components/StudentDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';


import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage.js';
import HomePage from './components/HomePage.js';
import './App.css';

const App = () => {
  
  return (
    <div className="app">
    
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/student-dashboard" component={StudentDashboard} />
        </Routes>
      </div>
   
    </div>
  );
};

export default App;
