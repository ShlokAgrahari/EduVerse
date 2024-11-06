// src/components/InstructorDashboard.js

import React from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import './InstructorDashboard.css';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
  const navigate = useNavigate();

  // Sample courses created by the instructor
  const courses = [
    { title: 'React Basics', students: 120, price: '$50' },
    { title: 'Advanced Node.js', students: 80, price: '$75' },
    { title: 'CSS Flexbox and Grid', students: 60, price: '$40' },
    { title: 'JavaScript Essentials', students: 200, price: '$30' },
  ];

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1 className="header-title">Instructor Dashboard</h1>
        <div className="header-buttons">
          <button className="profile-button" onClick={() => navigate('/instructor/profile')}>
            Profile Update
          </button>
          <button className="logout-button">Logout</button>
        </div>
      </header>

      {/* Create Course Section */}
      <div className="create-course-section">
        <h2>Create Courses</h2>
        <button 
          className="create-course-button" 
          onClick={() => navigate('/instructor/newcourse')}>
          <FaChalkboardTeacher /> Start Creating
        </button>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <h2 className="welcome-message">Your Courses</h2>
        <div className="course-list">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-info">Students Enrolled: {course.students}</p>
              <p className="course-info">Price: {course.price}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2024 Rap Battle App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default InstructorDashboard;
