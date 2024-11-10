
// InstructorDashboard.js
import React from 'react';
import { 
  LogOut, Bell, Twitter, Github, Linkedin, 
  Users, BookOpen, DollarSign, Plus ,  User
} from 'lucide-react';
import './InstructorDashboard.css';

const InstructorDashboard = () => {

  const courses = [
    {
      title: 'Advanced Web Development',
      description: 'Learn modern web development techniques including React, Node.js, and cloud deployment.',
      students: 328,
      status: 'active',
      price: 120,
      imageUrl: 'https://plus.unsplash.com/premium_photo-1663040355610-20350fe375ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Machine Learning Fundamentals',
      description: 'Master the basics of ML algorithms, data preprocessing, and model evaluation.',
      students: 245,
      price: 150,
      status: 'active',
      imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWR1Y2F0aW9ufGVufDB8fDB8fHww'
    },
    {
      title: 'Database Design',
      description: 'Comprehensive guide to database modeling, SQL, and optimization techniques.',
      students: 196,
      status: 'draft',
      price: 100,
      imageUrl: 'https://plus.unsplash.com/premium_photo-1663040355610-20350fe375ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];

  const totalCoursePrice = courses.reduce((total, course) => total + course.price, 0);
  const stats = [
    { 
      icon: <Users className="stats-icon" />,
      title: 'Total Students',
      value: '1,234'
    },
    {
      icon: <BookOpen className="stats-icon" />,
      title: 'Active Courses',
      value: '8'
    },
    {
      icon: <DollarSign className="stats-icon" />, // Dollar sign icon for the price
      title: 'Total Earnings',
      value: `$${totalCoursePrice}`
    }
  ];


  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">
          <img id="idk" src="./logo.png" />
            <h2 id="sitename">Eduverse</h2>
            
          </div>
          <div className="nav-actions">
            <button className="icon-button">
              <Bell size={20} />
            </button>
            <div className="profile-menu">
            <User className="user-icon" size={24} /> {/* User icon */}
              <span>Shlok Agr</span>
            </div>
            <button className="logout-button">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
      
        {/* Header */}
        <div className="dashboard-header">
          <h1>Instructor Dashboard</h1>
          <button className="create-course-button">
            <Plus size={20} />
            <span>Create New Course</span>
          </button>
        </div>
        <section className="community-section">
          <div className="community-content">
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvbW11bml0eXxlbnwwfDB8MHx8fDA%3D" 
              alt="Community" 
              className="community-image"
            />
            <div className="community-text">
              <h2>Join the Community</h2>
              <p>Become a part of our thriving community of learners and educators. Share knowledge, participate in discussions, and grow together!</p>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stats-card">
              <div className="stats-icon-wrapper">
                {stat.icon}
              </div>
              <div className="stats-info">
                <p className="stats-title">{stat.title}</p>
                <p className="stats-value">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <img 
                src={course.imageUrl} 
                alt="Course thumbnail" 
                className="course-image"
              />
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-footer">
                  <span className="student-count">
                    {course.students} students
                  </span>
                  <span className="price-badge">
            PRICE: Rs.{course.price}
          </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Teaching Resources</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <div className="social-links">
              <a href="#"><Twitter size={24} /></a>
              <a href="#"><Github size={24} /></a>
              <a href="#"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InstructorDashboard;
