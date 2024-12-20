'use client'

import React, { useEffect, useState } from 'react'
import { Trash2,  Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom';





function Cart() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [val,setVal]=useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart=async()=>{
      try {
        console.log("Fetching cart data...");
        setLoading(true);
        const resp = await fetch("http://localhost:8000/student-dashboard/cart", {
          method: "GET",
          credentials: "include",
        });
        if (!resp.ok) {
          throw new Error('Failed to fetch cart detail');
        }
        const data = await resp.json();
        setCourses(data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
    }finally {
      setLoading(false); // End loading
    }
    };
    fetchCart();
  },[]); 
    useEffect(() => {
      console.log("Updated courses:", courses);
    }, [courses]);
    

    const deleteCart = (_id) => {
      return new Promise(async (resolve, reject) => {
        try {
          const respond = await fetch(`http://localhost:8000/student-dashboard/cart/${_id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ _id }),
          });
    
          if (!respond.ok) {
            throw new Error("Something went wrong");
          }
    
          const data = await respond.json();
          console.log(data);
    
          // Resolve the promise with a success message or any required data
          resolve(_id);
          setVal(val + 1);  
        } catch (error) {
          console.error("Delete cart error:", error);
          // Reject the promise with the error
          reject(error);
        }
      });
    };
    
  

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
    key: "rzp_test_ZNoTNPhp37NzKO", 
    amount: data.order.amount, 
    currency: "INR",
    name: "EduVerse", 
    description: "Test Transaction",
    image: "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
    order_id: data.order.id, 
    callback_url: "http://localhost:8000/payment-verification",
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
  if (loading) {
    return <div>Loading...</div>;
  }
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
            <div className="course-list3">
              {courses.map((course) => (
                <div key={course.courseId} className="course-card3">
                  <img src={course.imageUrl} alt={course.title} className="course-thumbnail" />
                  <div className="course-details">
                    <h3 className="course-title">{course.title}</h3>
                    <div className="course-rating">
                      <Star className="star-icon" />
                      <span>4.3</span>
                    </div>
                    <p className="course-price1">₹{course.price}</p>
                  </div>
                  <button
  className="remove-button1"
  aria-label={`Remove ${course.title} from cart`}
  onClick={() => {window.location.reload();
    deleteCart(course._id)
      .then((_id) => {
        // Update the state only after the deletion is confirmed
        setCourses((prevCourses) => prevCourses.filter((course) => course._id !== _id));
        console.log("Course deleted:", _id);
      })
      .catch((error) => {
        console.error("Failed to delete course:", error);
      });
  }}
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
              <span>₹{totalPrice.toFixed(2)}</span>
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
    margin: 0;
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
    text-align: left;
  }

  .cart-content {
    padding: 1.5rem;
    
  }

  .empty-cart-message {
    text-align: center;
    color: #4b5563;
    font-size: 1.125rem;
  }

  .course-list3 {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .course-card3 {
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

  .course-price1 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e40af;
  }

  .remove-button1 {
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
