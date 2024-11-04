// src/App.js
import React, { useState } from 'react';
import StudentDashboard from './StudentDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage.js';
import HomePage from './HomePage.js';
import './App.css';
import InstructorDashboard from './InstructorDashboard.js';
import CourseDetails from './CourseDetails.js';
import Dashboard from './Dashboard.js';

const App = () => {
  const [userRole, setUserRole] = useState('student');

  return (
    <div className="app">
    
      <div className="main-content">
        <Routes>
        <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
        <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} /> {/* Route for Student Dashboard */}
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard/>} />
        </Routes>
      </div>
   
    </div>
  );
};

export default App;
