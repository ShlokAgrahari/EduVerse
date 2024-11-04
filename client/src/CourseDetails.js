import React from 'react';
import './CourseDetails.css';

const CourseDetails = () => {
    const courseName = "Full Stack Development Masterclass";
    const instructorName = "John Doe";
    const coursePrice = "$199"; // Course price

    return (
        <div className="course-details-container">
            {/* Header Section */}
            <header className="header">
                <h1>My Learning Platform</h1>
            </header>
            
            {/* Navbar with Previous Content */}
            <nav className="navbar">
                <button className="nav-link">Home</button>
                <button className="nav-link">Courses</button>
                <button className="nav-link">Affiliates</button>

                <button className="nav-link">About</button>
                <button className="nav-link">Contact</button>
                <button className="nav-link cart-button">🛒 Cart</button>
            </nav>
            
            {/* Course Title Section */}
            <div className="course-title-section">
                <h2>{courseName}</h2>
            </div>
            
            {/* Content Container */}
            <div className="content-container">
                {/* Main Content */}
                <div className="main-content">
                    <h3>Preview</h3>
                    <video width="100%" controls>
                        <source src="path-to-preview-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                    <div className="what-you-will-learn">
                        <h2>What You'll Learn</h2>
                        <p>Become a full stack developer with essential skills...</p>
                    </div>

                    {/* Price and Enroll Section */}
                    <div className="enroll-price-container">
                        <div className="price-block">
                            <p>Price: <span className="course-price">{coursePrice}</span></p>
                        </div>
                        <button className="enroll-button">Enroll Now</button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="sidebar">
                    <h3>CREATED BY: <span className="instructor-name">{instructorName}</span></h3>
                    <h3>Course Includes:</h3>
                    <p>10 Modules, 50+ Lessons, Quizzes, Community access...</p>
                    
                    {/* New Add to Cart Button */}
                    <button className="add-to-cart-button">Add to Cart</button>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 My Learning Platform. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default CourseDetails;
