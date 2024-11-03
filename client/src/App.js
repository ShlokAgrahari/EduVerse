// src/App.js
import React, { useState } from 'react';
import StudentDashboard from './components/StudentDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage.js';
import HomePage from './components/HomePage.js';
import './App.css';
import InstructorDashboard from './components/InstructorDashboard';
import CourseDetails from './components/CourseDetails';
import Dashboard from './components/Dashboard';

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
        <Route path="/dashboard" element={<StudentDashboard />} /> {/* Route for Student Dashboard */}
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/instructor-dashboard" component={InstructorDashboard} />
        </Routes>
      </div>
   
    </div>
  );
};

export default App;
