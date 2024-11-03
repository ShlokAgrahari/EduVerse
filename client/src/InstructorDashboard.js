// src/components/InstructorDashboard.js

import React from 'react';
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaChartLine,
  FaBullhorn,
  FaEnvelope,
  FaCog,
  FaFolderOpen,
  FaCalendarAlt,
  FaBell,
  FaTasks
} from 'react-icons/fa';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1 className="header-title">Instructor Dashboard</h1>
        <button className="logout-button">Logout</button>
      </header>

      <main className="dashboard-main">
        <h2 className="welcome-message">Welcome, Instructor!</h2>

        {/* Overview Section */}
        <section className="overview-section">
          <div className="overview-card">
            <FaUserGraduate className="overview-icon" />
            <div>
              <h3>Enrolled Students</h3>
              <p>150</p>
            </div>
          </div>
          <div className="overview-card">
            <FaChartLine className="overview-icon" />
            <div>
              <h3>Courses Created</h3>
              <p>8</p>
            </div>
          </div>
          <div className="overview-card">
            <FaBell className="overview-icon" />
            <div>
              <h3>New Notifications</h3>
              <p>3</p>
            </div>
          </div>
          <div className="overview-card">
            <FaCalendarAlt className="overview-icon" />
            <div>
              <h3>Upcoming Events</h3>
              <p>2</p>
            </div>
          </div>
        </section>

        {/* Card Container */}
        <div className="card-container">
          <DashboardCard
            icon={<FaChalkboardTeacher />}
            title="Manage Courses"
            description="Create, edit, and organize your courses."
            buttonText="Manage"
          />
          <DashboardCard
            icon={<FaUserGraduate />}
            title="Student Management"
            description="View and manage your enrolled students."
            buttonText="View Students"
          />
          <DashboardCard
            icon={<FaChartLine />}
            title="Analytics & Reports"
            description="Track course performance and engagement."
            buttonText="View Reports"
          />
          <DashboardCard
            icon={<FaBullhorn />}
            title="Announcements"
            description="Post updates and announcements for students."
            buttonText="Post Announcement"
          />
          <DashboardCard
            icon={<FaEnvelope />}
            title="Messages & Feedback"
            description="Read and respond to student feedback."
            buttonText="Check Messages"
          />
          <DashboardCard
            icon={<FaCog />}
            title="Profile Settings"
            description="Update your profile and preferences."
            buttonText="Edit Profile"
          />
          <DashboardCard
            icon={<FaFolderOpen />}
            title="Resources"
            description="Upload and share materials with students."
            buttonText="Add Resources"
          />
          <DashboardCard
            icon={<FaTasks />}
            title="Task Management"
            description="Organize your tasks and to-do items."
            buttonText="View Tasks"
          />
        </div>
      </main>
    </div>
  );
};

// Reusable Card Component
const DashboardCard = ({ icon, title, description, buttonText }) => (
  <div className="card">
    <div className="card-icon">{icon}</div>
    <h3 className="card-title">{title}</h3>
    <p className="card-description">{description}</p>
    <button className="card-button">{buttonText}</button>
  </div>
);

export default InstructorDashboard;
