import React, { useEffect, useState } from 'react';
import './CourseDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import logo from './logo.png';

const CourseDetails = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    const [isInCart, setIsInCart] = useState(false);

  
  const checkCartStatus = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/cart/status/${courseId}`,
        { credentials: "include" }
      );

      if (!res.ok) return;

      const data = await res.json();

      console.log("isInCart from backend:", data);
      setIsInCart(data.isInCart);
    } catch (err) {
      console.log(err);
    }
  };

 useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/coursedetails/${courseId}`);
                if (!response.ok) throw new Error('Failed to fetch details');
                const data = await response.json();
                console.log(data.previewVideo)
                setCourse(data);
                checkCartStatus();
            } catch (error) {
                console.log("Some error occurred", error);
            }
        };
        fetchDetails();
    }, [courseId]);
    const handleCart = async () => {
  try {
    const res = await fetch(
      `http://localhost:8000/coursedetails/${courseId}/cart`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ courseId }),
      }
    );

    if (!res.ok) throw new Error("Failed");

    setIsInCart(true); 
  } catch (err) {
    console.log(err);
  }
};

    const handleNavClick = ()=>{
        navigate("/user/student-dashboard/cart");
    }



    return (
        <div className="course-details-container">
            <header className="course-header">
                <div className="logo" style={{marginLeft:"20px"}}>
                    <img id="idk1" src={logo} alt="Logo" />
                    <h1 id="yes1" style={{color:'white'}}>EduVerse</h1>
                </div>
            </header>
            

            {/* Navbar with Previous Content */}
   
            <nav className="navbar5">
                <button className="nav-link1">Home</button>
                <button className="nav-link1">Courses</button>
                <button className="nav-link1">Affiliates</button>
                <button className="nav-link1">About</button>
                <button className="nav-link1">Contact</button>
                <button className="nav-link1 cart-button" onClick={() => navigate("/user/cart")}>🛒 Cart</button>
            </nav>
            
            <div className="content-container">
                {/* Main Content */}
                <div className="main-content10">
                    <h3>Preview Video</h3>
                    {course?.previewVideo && (
                    <video width="100%" controls>
                        <source src={course.previewVideo} type="video/mp4" />
                         Your browser does not support the video tag.
                    </video>
                    )}



                    <div className = "course-heading">
                        <h2>{course?.title || "Course Title"}</h2>    
                        <div className="course-info">
                            <p>Created by: <span className="instructor-name">{course?.createdBy || "John Doe"}</span></p>
                            <p className="course-price" style={{textAlign:"right"}}>Price: ₹{course?.pricing || "49.99"} only</p>
                            <p>Rating : ⭐⭐⭐⭐</p>
                            <p style={{textAlign:"right"}}>Category: {course?.category || "Education"}</p>
                        </div>
                    </div>
                    
                </div>

                {/* Sidebar */}
                <div className="sidebar">
                    <h3>Course Includes:</h3>
                    {course?.description}
                    <button
  onClick={isInCart ? handleNavClick : handleCart}
  disabled={isInCart}
  className="add-to-cart-button"
>
  {isInCart ? "✅ Added to Cart" : "➕ Add to Cart"}
</button>

                </div>
            </div>

            {/* Footer */}
            <footer className="footer10">
                <p style={{textAlign:"center"}}>&copy; 2024 My Learning Platform. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default CourseDetails;
