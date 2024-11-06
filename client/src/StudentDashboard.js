import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './StudentDashboard.css';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:8000/student-dashboard'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    const handleNavigation = (courseId) => {
        navigate(`/coursedetails/${courseId}`);
    };

    const handleLogout = async(e)=>{
        try {
            const res = await fetch("http://localhost:8000/logout",{
                method: "POST",
                credentials:'include',
            })

            if(res.ok){
                console.log("logged out");
            }
        } catch (error) {
            console.log("error is ",error);
        }
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-left">
                    <img src="logo.png" alt="Logo" className="logo" />
                    <h2 className="welcome-message">Welcome, User!</h2>
                </div>
                <div className="user-icon">
                    <FontAwesomeIcon icon={faUser} />
                </div>
            </header>

            <div className="moving-bar">
                <div className="moving-content">Welcome to the Student Dashboard! Check out your courses and resources!</div>
            </div>

            <div className="dashboard-content">
                <div className="search-container">
                    <input type="text" placeholder="Search courses..." className="search-input" />
                    <button className="search-button">Search</button>
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

                <div className="scrollable-container">
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

                    <div className="courses-section">
                        <h2>Popular Courses</h2>
                        <div className="courses-grid">
                            {courses.map((course) => (
                                <div key={course._id} className="course-card" onClick={() => handleNavigation(course._id)}>
                                    <img src={course.image || "https://via.placeholder.com/300x200"} alt={course.title} />
                                    <div className="course-info">
                                        <h3>{course.title}</h3>
                                        <p>{course.createdBy}</p>
                                        <p className="course-price">${course.pricing}</p>
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
