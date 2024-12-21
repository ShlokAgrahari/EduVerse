import React, { useState } from 'react';
import { BookOpen, Clock, Star, User, Bell, Search, ChevronDown } from 'lucide-react';
import './AllCourses.css';

const AllCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock user data
  const user = {
    name: "Sarah Parker",
    role: "Student",
    courses: [
      {
        id: 1,
        title: "Advanced Web Development",
        instructor: "John Smith",
        duration: "12 hours",
        rating: 4.8,
        category: "Development",
        enrolled: "Oct 15, 2024",
        image: "https://media.istockphoto.com/id/2122148349/photo/writing-an-exam-at-the-university.webp?a=1&b=1&s=612x612&w=0&k=20&c=fJNH1q1N1NJ6IbQTvftt_k6W1ZKOSp10KCSNHnwiTRc="
      },
      {
        id: 2,
        title: "UX/UI Design Fundamentals",
        instructor: "Emma Wilson",
        duration: "8 hours",
        rating: 4.9,
        category: "Design",
        enrolled: "Nov 1, 2024",
        image: "https://media.istockphoto.com/id/2122148349/photo/writing-an-exam-at-the-university.webp?a=1&b=1&s=612x612&w=0&k=20&c=fJNH1q1N1NJ6IbQTvftt_k6W1ZKOSp10KCSNHnwiTRc="
      },
      {
        id: 3,
        title: "Data Science Essentials",
        instructor: "Michael Chen",
        duration: "15 hours",
        rating: 4.7,
        category: "Data Science",
        enrolled: "Sep 28, 2024",
        image: "https://media.istockphoto.com/id/2122148349/photo/writing-an-exam-at-the-university.webp?a=1&b=1&s=612x612&w=0&k=20&c=fJNH1q1N1NJ6IbQTvftt_k6W1ZKOSp10KCSNHnwiTRc="
      }
    ]
  };

  const handleOpenCourse = (courseId) => {
    console.log(`Opening course: ${courseId}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="brand">
            <BookOpen className="brand-icon" />
            <span className="brand-name">EduLearn Pro</span>
          </div>

          <div className="search-container">
            <div className="search-wrapper">
              <div className="search-icon-wrapper">
                <Search />
              </div>
              <input
                type="text"
                className="search-input"
                placeholder="Search courses, instructors, or topics..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="user-menu">
            <button className="notification-button">
              <Bell className="notification-icon" />
            </button>
            <div className="user-profile">
              <div className="avatar">
                <User className="avatar-icon" />
              </div>
              <span className="user-name">{user.name}</span>
              <ChevronDown />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">My Learning Dashboard</h1>
          <p className="page-description">Explore your courses and continue learning</p>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {user.courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-image-container">
                <img
                  src={course.image}
                  alt={course.title}
                  className="course-image"
                />
                <span className="course-category">{course.category}</span>
              </div>

              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>

                <div className="course-meta">
                  <div className="meta-item">
                    <User className="meta-icon" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="meta-item">
                    <Clock className="meta-icon" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="meta-item">
                    <Star className="meta-icon" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <div className="course-actions">
                  <button
                    className="action-button primary-button"
                    onClick={() => handleOpenCourse(course.id)}
                  >
                    Start Course
                  </button>
                  <button className="action-button secondary-button">
                    Rate Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllCourses;
