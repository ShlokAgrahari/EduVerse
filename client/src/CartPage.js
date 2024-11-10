'use client'

import React, { useState } from 'react'
import { Trash2,  Star } from 'lucide-react'




function Cart() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Introduction to React', price: 49.99, creator: 'John Doe', lessons: 20, duration: 15, rating: 4.5, thumbnail: '/placeholder.svg?height=80&width=120', description: 'Learn the fundamentals of React and start building amazing UI!' },
    { id: 2, name: 'Advanced JavaScript Concepts', price: 69.99, creator: 'Jane Smith', lessons: 30, duration: 25, rating: 4.8, thumbnail: '/placeholder.svg?height=80&width=120', description: 'Dive deep into advanced JavaScript concepts and techniques.' },
    { id: 3, name: 'CSS Mastery', price: 39.99, creator: 'Alex Johnson', lessons: 15, duration: 10, rating: 4.2, thumbnail: '/placeholder.svg?height=80&width=120', description: 'Master CSS for creating responsive and beautiful designs.' },
  ])

  const removeCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id))
  }


  const handleCheckoutClick = () => {
    handlePayment(Number(totalPrice.toFixed(2)));
  };
  
  const handlePayment = async (amount) => {
    try {
      const response = await fetch("http://localhost:8000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json(); // Convert response to JSON
      console.log(data.order.amount);
      const response2 = await fetch("http://localhost:8000/user", {
        method: "GET",
        credentials: "include", // Ensure cookies are included in the request
    });

    if (!response2.ok) throw new Error("Failed to fetch user details");
    const user = await response2.json(); 
    console.log(user.data.phone)
    console.log(user.data.userEmail)
    console.log(user.data.userName)
const options = {
    key: "rzp_test_ZNoTNPhp37NzKO", // Enter the Key ID generated from the Dashboard
    amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "EduVerse", //your business name
    description: "Test Transaction",
    image: "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
    order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: "https://localhost:8000/paymentVerification",
    prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: user.data.userName, //your customer's name
        email: user.data.userEmail,
        contact: user.data.phone //Provide the customer's phone number for better conversion rates 
    },
    notes: {
        "address": "Razorpay Corporate Office"
    },
    theme: {
        color: "#3399cc"
    }
};

const razor=new window.Razorpay(options)
razor.open()

     
    } catch (error) {
      console.error(error.message);
    }
  };
  
  

  const totalPrice = courses.reduce((sum, course) => sum + course.price, 0)
  const uniqueCreators = new Set(courses.map(course => course.creator)).size
  const totalLessons = courses.reduce((sum, course) => sum + course.lessons, 0)
  const totalDuration = courses.reduce((sum, course) => sum + course.duration, 0)

  return (
    <div className="learning-cart">
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Your Learning Journey</h1>
        </div>
        <div className="cart-content">
          {courses.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty. Start adding courses to begin your learning journey!</p>
          ) : (
            <div className="course-list1">
              {courses.map((course) => (
                <div key={course.id} className="course-card1">
                  <img src={course.thumbnail} alt={course.name} className="course-thumbnail" />
                  <div className="course-details">
                    <h3 className="course-title">{course.name}</h3>
                    <p className="course-creator">{course.creator}</p>
                    <div className="course-rating">
                      <Star className="star-icon" />
                      <span>{course.rating.toFixed(1)}</span>
                    </div>
                    <p className="course-price">${course.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="remove-button"
                    aria-label={`Remove ${course.name} from cart`}

                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {courses.length > 0 && (
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-item">
              <span>Courses:</span>
              <span>{courses.length}</span>
            </div>
            <div className="summary-item">
              <span>Unique Creators:</span>
              <span>{uniqueCreators}</span>
            </div>
            <div className="summary-item">
              <span>Total Lessons:</span>
              <span>{totalLessons}</span>
            </div>
            <div className="summary-item">
              <span>Total Duration:</span>
              <span>{totalDuration} hours</span>
            </div>
            <div className="total-price">
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-button" onClick={handleCheckoutClick}>
             Proceed to Checkout
            </button>

          </div>
        )}
      </div>
      <style jsx>{`
  .learning-cart {
    background-color: #f3f4f6;
    padding: 2rem;
    overflow-y: hidden; /* Prevents additional scroll bar */
  }

  .cart-container {
    width: 100%;
    margin: 0 auto;
    background-color: white;
    border-radius: 0.5rem;
    border: 2px solid black;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .cart-header {
    background: linear-gradient(135deg, #1e88e5, #1565c0);
    color: white;
    padding: 1.5rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .cart-title {
    font-size: 1.875rem;
    font-weight: bold;
    text-align: center;
  }

  .cart-content {
    padding: 1.5rem;
    
  }

  .empty-cart-message {
    text-align: center;
    color: #4b5563;
    font-size: 1.125rem;
  }

  .course-list1 {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .course-card1 {
    display: flex;
    align-items: center;
    border: 2px solid black;
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .course-thumbnail {
    width: 100px;
    height: auto;
    object-fit: cover;
    border-radius: 0.25rem;
  }

  .course-details {
    flex-grow: 1;
  }

  .course-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e40af;
    text-align: center;
  }

  .course-creator {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
  }

  .course-rating {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: #fbbf24;
    margin-bottom: 0.25rem;
  }

  .star-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
  }

  .course-price {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e40af;
  }

  .remove-button {
    color: #ef4444;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .order-summary {
    background-color: #f9fafb;
    padding: 1.5rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  .summary-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1e40af;
    margin-bottom: 1rem;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    color: #4b5563;
    margin-bottom: 0.5rem;
  }

  .total-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #1e40af;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  .checkout-button {
    width: 100%;
    background-color: #2563eb;
    color: white;
    font-weight: bold;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
    font-size: 1.125rem;
  }

  .checkout-button:hover {
    background-color: #1d4ed8;
  }
`}</style>


    </div>
  )
}
export default Cart
