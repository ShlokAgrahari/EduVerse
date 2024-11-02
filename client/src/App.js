import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage';
import SignupPage from './SignupPage.js';
import HomePage from './HomePage.js';
import StudentDashboard from './StudentDashboard';
import CourseDetails from './CourseDetails.js';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/coursedetails" element={<CourseDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
