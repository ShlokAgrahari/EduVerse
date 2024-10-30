import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './StudentDashboard.css';
import { Carousel } from 'react-bootstrap';

const StudentDashboard = () => {
    const courses = [
        { title: "JavaScript for Beginners", description: "Learn the basics of JavaScript.", price: "$19.99", image: "https://via.placeholder.com/300x200" },
        { title: "Advanced React Techniques", description: "Take your React skills to the next level.", price: "$29.99", image: "https://via.placeholder.com/300x200" },
        { title: "Python for Data Science", description: "Master Python for data analysis and visualization.", price: "$24.99", image: "https://via.placeholder.com/300x200" },
        { title: "Web Development Bootcamp", description: "Become a full-stack web developer.", price: "$34.99", image: "https://via.placeholder.com/300x200" },
    ];

    return (
        <div className="dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-left">
                    <img src="logo.png" alt="Logo" className="logo" />
                    <h2 className="welcome-message">Welcome, User!</h2>
                </div>
                <div className="user-icon">
                    <FontAwesomeIcon icon={faUser} />
                </div>
            </header>

            {/* Moving Bar */}
            <div className="moving-bar">
                <div className="moving-content">Welcome to the Student Dashboard! Check out your courses and resources!</div>
            </div>

            {/* Dashboard Content */}
            <div className="dashboard-content">
                {/* Search and Dropdowns */}
                <div className="search-container">
                    <input type="text" placeholder="Search courses..." className="search-input" />
                    <button className="search-button">Search</button>

                    {/* Dropdowns */}
                    <select className="dropdown">
                        <option value="">Select Category</option>
                        <option value="development">Development</option>
                        <option value="business">Business</option>
                        <option value="finance">Finance</option>
                        <option value="music">Music</option>
                    </select>

                    <select className="dropdown">
                        <option value="">Select Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>

                    <select className="dropdown">
                        <option value="">Select Format</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                    </select>
                </div>

                {/* Scrollable Content */}
                <div className="scrollable-container">
                    {/* Carousel Section */}
                    <Carousel variant="dark" className="full-width-carousel">
                        <Carousel.Item>
                            <img src="https://via.placeholder.com/1200x500" alt="Slide 1" />
                            <Carousel.Caption>
                                <h5>Slide One</h5>
                                <p>Details about Slide One.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="https://via.placeholder.com/1200x500" alt="Slide 2" />
                            <Carousel.Caption>
                                <h5>Slide Two</h5>
                                <p>Details about Slide Two.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>

                    {/* Courses Section */}
                    <div className="courses-section">
                        <h2>Popular Courses</h2>
                        <div className="courses-grid">
                            {courses.map((course, index) => (
                                <div key={index} className="course-card">
                                    <img src={course.image} alt={course.title} />
                                    <div className="course-info">
                                        <h3>{course.title}</h3>
                                        <p>{course.description}</p>
                                        <p className="course-price">{course.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                <p>Contact us at: support@yourcompany.com</p>
            </footer>
        </div>
    );
};

export default StudentDashboard;
