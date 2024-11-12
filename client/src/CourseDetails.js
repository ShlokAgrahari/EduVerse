import React, { useEffect, useState } from 'react';
import './CourseDetails.css';
import { useNavigate, useParams } from 'react-router-dom';

const CourseDetails = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/coursedetails/${courseId}`);
                if (!response.ok) throw new Error('Failed to fetch details');
                const data = await response.json();
                setCourse(data);
            } catch (error) {
                console.log("Some error occurred", error);
            }
        };
        fetchDetails();
    }, [courseId]);

    const handleCart = async () => {
        try {
            const res = await fetch(`http://localhost:8000/coursedetails/${courseId}/cart`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({ courseId })
            });
            if (!res.ok) throw new Error((await res.json()).message || "Something went wrong");
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className="course-details-container">
            <header className="header">
                <h1>My Learning Platform</h1>
            </header>
            
            <nav className="navbar">
                <button className="nav-link">Home</button>
                <button className="nav-link">Courses</button>
                <button className="nav-link">Affiliates</button>
                <button className="nav-link">About</button>
                <button className="nav-link">Contact</button>
                <button className="nav-link cart-button" onClick={() => navigate("/cart")}>🛒 Cart</button>
            </nav>
            
            <div className="content-container">
                {/* Main Content */}
                <div className="main-content">
                    <h3>Preview</h3>
                    <video width="100%" controls>
                        <source src={course?.previewVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className = "course-heading">
                    <h2>{course?.title || "Course Title"}</h2>    
                    <div className="course-info">
                        
                        <p>Created by: <span className="instructor-name">{course?.createdBy || "John Doe"}</span></p>
                        <p className="course-price">Price: ${course?.pricing || "49.99"}</p>
                    </div>
                    </div>
                    
                </div>

                {/* Sidebar */}
                <div className="sidebar">
                    <h3>Course Includes:</h3>
                    <ul>
                        <li>Access on mobile and desktop</li>
                        <li>Certificate of completion</li>
                        <li>Full lifetime access</li>
                        <li>Hands-on projects</li>
                    </ul>
                    <div className="add-to-cart-container">
                        <button onClick={handleCart} className="add-to-cart-button">Add to Cart</button>
                    </div>
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
