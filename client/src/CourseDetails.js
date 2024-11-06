import React, { useEffect, useState } from 'react';
import './CourseDetails.css';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/coursedetails/${courseId}`);
                console.log(response)
                if (!response.ok) throw new Error('Failed to fetch details');
                const data = await response.json();
                console.log(data)
                setCourse(data);
            } catch (error) {
                console.log("Some error occurred", error);
            }
        };
        fetchDetails();
    }, [courseId]);


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
            
            <div className="course-title-section">
                <h2>{course?.title || "Course Title"}</h2>
            </div>
            
            {/* Content Container */}
            <div className="content-container">
                {/* Main Content */}
                <div className="main-content">
                    <h3>Preview</h3>
                    <video width="100%" controls>
                    <source src={course?.previewVideo } type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                    <div className="what-you-will-learn">
                        <h2>What You'll Learn</h2>
                        <p>{course?.description}</p>
                    </div>

                    {/* Price and Enroll Section */}
                    <div className="enroll-price-container">
                        <div className="price-block">
                            <p>Price: <span className="course-price">{course?.pricing}</span></p>
                        </div>
                        <button className="enroll-button">Enroll Now</button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="sidebar">
                <h3>CREATED BY: <span className="instructor-name">{course?.createdBy|| "John Doe"}</span></h3>
                    <h3>Course Includes:</h3>
                    <p>{course?.description}</p>
                    
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
