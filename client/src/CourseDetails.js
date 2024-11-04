import React, { useEffect, useState } from 'react';
import './CourseDetails.css';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/courses/${courseId}`);
                if (!response.ok) throw new Error('Failed to fetch details');
                const data = await response.json();
                setCourse(data);
            } catch (error) {
                console.log("Some error occurred", error);
            }
        };
        fetchDetails();
    }, [courseId]);

    return (
        <div className="course-details-container">
            <header className="header">
                <h1>My Learning Platform</h1>
                <button className="cart-button">🛒 Cart</button>
            </header>
            <nav className="navbar">
                <button className="nav-link">Home</button>
                <button className="nav-link">Courses</button>
                <button className="nav-link">About</button>
                <button className="nav-link">Contact</button>
            </nav>
            <div className="course-title-section">
                <h2>{course?.title}</h2>
            </div>
            <div className="content-container">
                <div className="main-content">
                    <h3>Preview</h3>
                    <video width="100%" controls>
                        <source src={course?.previewVideo || "path-to-preview-video.mp4"} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <button className="preview-button">Play Sample Video</button>

                    <div className="what-you-will-learn">
                        <h2>What You'll Learn</h2>
                        <ul>
                            <li>Become a full stack developer</li>
                            <li>Master the JavaScript ecosystem</li>
                            <li>Build any project for your company or for freelance projects</li>
                            <li>Full stack with MERN, GIT, and many advanced topics</li>
                        </ul>
                    </div>

                    <div className="companies-section">
                        <h3>Top companies offer this course to their employees</h3>
                        <p>This course was selected for our collection of top-rated courses trusted by businesses worldwide. Learn more</p>
                        <div className="company-logos">
                            <img src="path-to-nasdaq-logo.png" alt="Nasdaq" />
                            <img src="path-to-volkswagen-logo.png" alt="Volkswagen" />
                            <img src="path-to-box-logo.png" alt="Box" />
                            <img src="path-to-netapp-logo.png" alt="NetApp" />
                            <img src="path-to-eventbrite-logo.png" alt="Eventbrite" />
                        </div>
                    </div>

                    <div className="enroll-container">
                        <button className="enroll-button">Enroll Now</button>
                    </div>
                </div>
                <div className="sidebar">
                    <h3>Course Includes:</h3>
                    <ul>
                        <li>10 Modules</li>
                        <li>50+ Lessons</li>
                        <li>Quizzes at the end of each module</li>
                        <li>Downloadable resources</li>
                        <li>Assignments to enhance learning</li>
                        <li>Access to a community forum</li>
                        <li>Certificates upon completion</li>
                        <li>Lifetime access to the course materials</li>
                        <li>Regular updates with new content</li>
                    </ul>
                </div>
            </div>
            <footer className="footer">
                <p>&copy; 2024 My Learning Platform. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default CourseDetails;
