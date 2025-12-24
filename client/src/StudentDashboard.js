import React, { useEffect, useState } from 'react';
import { ShoppingCart, LogOut, ChevronLeft, ChevronRight, User, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import './StudentDashboard.css';
import SearchBar from './components/searchbar';

import { disconnectSocket } from './socketManager';
import { getSocket, getOnlineUsers } from './socketManager';
import Chatbot from './components/chatbot';

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
  const [name, setname] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const carouselImages = [
    "https://img.freepik.com/free-photo/woman-working-office_144627-44195.jpg?t=st=1737640211~exp=1737643811~hmac=3402c5a94d17cbf396b615f26def61d535e02ccd2ee022e1b0ce1fa31d2f1fa9&w=996",
    "https://img.freepik.com/free-photo/crop-woman-writing-notepad_23-2147863488.jpg?t=st=1737640582~exp=1737644182~hmac=45b27cd8bdced3fd353803cb92a48049241faedfbc64b941117896d2577769f4&w=1060",
    "https://img.freepik.com/free-photo/programming-background-collage_23-2149901766.jpg?t=st=1737641210~exp=1737644810~hmac=664450102534678fe84699ae1ba5cee28e67ad390c113cfaf03933234a4ef6cd&w=996"
  ];

  const line = [
    "Explore, learn, and thrive with EduVerse.",
    "Empower your learning journey with EduVerse today.",
    "EduVerse: Best faculty, boundless opportunities."
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
        const socket = await getSocket();

        // Get list of online users
        console.log("socket", socket.connected);
        console.log(getOnlineUsers());
        setname(user.data.userName)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleNavigation = (courseId) => {
    navigate(`/coursedetails/${courseId}`);
  };

  const handleLogout = async (e) => {
    try {
      const res = await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: 'include',
      });

      if (res.ok) {
        console.log("Logged out");
        disconnectSocket();
        navigate("/");
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigateToChat = () => {
    navigate('/connect');
  };

  const navigateToCourses = () => {
    navigate('/user/my-courses');
  };

  const navigateToAllCourses = () => {
    navigate('/user/my-courses');
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <img id="idk" src={logo} alt="Logo" />
          <h1 id="yes">EduVerse</h1>
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

      <div className='student-navbar'>
        <div className='Search-option'>
          <SearchBar/>
        </div>
        <button className="menu-button" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </button>
        <div className={`nav-button ${menuOpen ? 'show' : 'hide'}`}>
          <ul className='basicbtn'>

            <li onClick={navigateToCourses}>

              <div className="nav-item">
                
                <span>All Courses</span>
              </div>
            </li>
            <li onClick={navigateToChat}>
              <div className="nav-item">
                
                <span>Chat</span>
              </div>
            </li>
            <li>
              <div className="nav-item">
                <span>Home</span>
              </div>
            </li>
            <li>
              <div className="nav-item">
                <span>Contact Us</span>
              </div>
            </li>
            <li>
              <div className="nav-item">
                <span>About</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

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
                  <h2>{line[index]}</h2>
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
      <Chatbot/>
    </div>
  );
};

export default StudentDashboard;
