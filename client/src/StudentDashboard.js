import React, { useEffect, useState } from 'react';
import { ShoppingCart, LogOut, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import './StudentDashboard.css';

const CourseCard = ({ courseId, title, createdBy, pricing, image, handleNavigation }) => (
  <div className="course-card">
    <img src={image} alt={title} className="course-image" />
    <h3>{title}</h3>
    <p>{createdBy}</p>
    <div className="course-footer">
      <span>₹{pricing}</span>
      <button className="enroll-btn" onClick={() => handleNavigation(courseId)}>View More</button>
    </div>
  </div>
);

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [name,setname]=useState('')

  const carouselImages = [
    "https://media.istockphoto.com/id/1610418898/photo/online-survey-and-digital-form-checklist-by-laptop-computer-document-management-checking.webp?a=1&b=1&s=612x612&w=0&k=20&c=1TG9GIWnPyVXAGsIiXKkM3rHB_6MbENTTUu9ehIk4uo=",
    "https://media.istockphoto.com/id/2105091005/photo/young-student-taking-notes-while-e-learning-on-laptop-at-the-university.webp?a=1&b=1&s=612x612&w=0&k=20&c=frHL5Va1wVqHaWLaXsbmxqmkoJq3WxHbw7Qt6Q4vOfA=",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3R1ZHl8ZW58MHx8MHx8fDA%3D"
  ];


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/student-dashboard'); 
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
        const response2 = await fetch("http://localhost:8000/user", {
          method: "GET",
          credentials: "include", // Ensure cookies are included in the request
      });
  
      if (!response2.ok) throw new Error("Failed to fetch user details");
      const user = await response2.json(); 
      console.log(user.data.phone)
      console.log(user.data.userEmail)
      setname(user.data.userName)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }

    };
    fetchCourses();
  }, []);

  const handleNavigation = (courseId) => {
    navigate(`/user/coursedetails/${courseId}`);
  };

  const handleLogout = async (e) => {
    try {
      const res = await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: 'include',
      });

      if (res.ok) {
        console.log("Logged out");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
        <img id="idk" src={logo} alt="Logo" />
          <h1 id="yes">EduLearn</h1>
        </div>
        <div className="header-actions">
          <button className="cart-button" onClick={() => navigate('/user/cart')}>
            <ShoppingCart size={24} />
            <span>Cart</span>
          </button>
          <div className="user-info">
            <User size={24} className="user-icon" />
            <span className="username">{name}</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={24} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="carousel-container">
          <div className="carousel-content">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`carousel-image ${currentSlide === index ? 'active' : ''}`}
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="carousel-text">
                  <h2>Explore Online Courses</h2>
                  <p>Learn from the best instructors worldwide.</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-button prev" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>
          <button className="carousel-button next" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>
          <div className="carousel-indicators">
            {carouselImages.map((_, index) => (
              <span
                key={index}
                className={`indicator ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>

        <section className="dashboard-stats">
          <div className="stat-card">
            <h3>Enrolled Courses</h3>
            <p>4</p>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <p>2</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p>1</p>
          </div>
        </section>

        <section className="featured-courses">
          <h2>Featured Courses</h2>
          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                courseId={course._id}
                title={course.title}
                createdBy={course.createdBy}
                pricing={course.pricing}
                image={course.image}
                handleNavigation={handleNavigation}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Empowering students through online education</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>support@edulearn.com</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#">Twitter</a>
              <a href="#">Facebook</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 EduLearn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;
