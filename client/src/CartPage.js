'use client'

import React, { useEffect, useState } from 'react'
import { Trash2, Star, ShoppingCart, ArrowLeft, Tag, Clock, BookOpen, Award, Shield, CreditCard } from 'lucide-react'

function Cart() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [deletedCourse, setDeletedCourse] = useState(null);


  useEffect(() => {
    const fetchCart = async () => {
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
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);
    useEffect(() => {
    const mockCourses = [
      {
        _id: '1',
        courseId: 'course-1',
        title: 'Complete Web Development Bootcamp 2024',
        creator: 'John Doe',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
        price: 2999,
        originalPrice: 4999,
        lessons: 150,
        duration: 40,
        rating: 4.5,
        students: 12450,
        badge: 'Bestseller'
      },
      {
        _id: '2',
        courseId: 'course-2',
        title: 'Advanced JavaScript Mastery',
        creator: 'Jane Smith',
        imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
        price: 1999,
        originalPrice: 3499,
        lessons: 100,
        duration: 25,
        rating: 4.8,
        students: 8920,
        badge: 'Trending'
      },
      {
        _id: '3',
        courseId: 'course-3',
        title: 'React & Redux - Complete Guide',
        creator: 'Mike Johnson',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
        price: 2499,
        originalPrice: 3999,
        lessons: 120,
        duration: 30,
        rating: 4.6,
        students: 10230,
        badge: 'New'
      }
    ];
    setCourses(mockCourses);
  }, []);

  // ============================================
  // BACKEND INTEGRATION - Delete Course from Cart
  // ============================================
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
        resolve(_id);
      } catch (error) {
        console.error("Delete cart error:", error);
        reject(error);
      }
    });
  };

  const handleDelete = (_id) => {
    const courseToDelete = courses.find(c => c._id === _id);
    setDeletedCourse(courseToDelete);
    
    /*
    deleteCart(_id)
      .then(() => {
        setCourses((prevCourses) => prevCourses.filter((course) => course._id !== _id));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      })
      .catch((error) => {
        console.error("Failed to delete course:", error);
        alert("Failed to remove course. Please try again.");
      });
    */
    
    setCourses((prevCourses) => prevCourses.filter((course) => course._id !== _id));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleUndo = () => {
    if (deletedCourse) {
      setCourses(prev => [...prev, deletedCourse]);
      setDeletedCourse(null);
      setShowToast(false);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE20') {
      setDiscount(0.20);
      alert('Promo code applied! 20% discount added.');
    } else if (promoCode) {
      alert('Invalid promo code');
    }
  };


  const handlePayment = async (amount) => {
    try {
      // Create order on backend
      const response = await fetch("http://localhost:8000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();
      console.log(data.order.amount);
      
      // Fetch user details
      const response2 = await fetch("http://localhost:8000/user", {
        method: "GET",
        credentials: "include",
      });
      
      if (!response2.ok) throw new Error("Failed to fetch user details");
      const user = await response2.json();
      console.log(user.data.phone);
      console.log(user.data.userEmail);
      console.log(user.data.userName);
      
      // Razorpay options
      const options = {
        key: "rzp_test_ZNoTNPhp37NzKO",
        amount: data.order.amount,
        currency: "INR",
        name: "EduVerse",
        description: "Course Purchase",
        image: "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
        order_id: data.order.id,
        callback_url: "http://localhost:8000/payment-verification",
        prefill: {
          name: user.data.userName,
          email: user.data.userEmail,
          contact: user.data.phone
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#03045e"
        }
      };
      
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error.message);
      alert("Payment failed. Please try again.");
    }
  };

  const handleCheckoutClick = () => {
    // BACKEND: Use backend payment handler (UNCOMMENT WHEN READY)
    // handlePayment(Number(finalPrice.toFixed(2)));
    
    // FRONTEND ONLY: Alert for testing (COMMENT OUT WHEN USING BACKEND)
    alert(`Proceeding to checkout with total: ₹${finalPrice.toFixed(2)}`);
  };

  const subtotal = courses.reduce((sum, course) => sum + course.price, 0);
  const totalSavings = courses.reduce((sum, course) => sum + ((course.originalPrice || course.price) - course.price), 0);
  const discountAmount = subtotal * discount;
  const finalPrice = subtotal - discountAmount;
  const uniqueCreators = new Set(courses.map(course => course.creator)).size;
  const totalLessons = courses.reduce((sum, course) => sum + course.lessons, 0);
  const totalDuration = courses.reduce((sum, course) => sum + course.duration, 0);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#03045e] rounded-full animate-spin mb-4"></div>
        <p className="text-[#03045e] font-semibold text-lg">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-white border-l-4 border-green-500 rounded-lg shadow-2xl p-4 flex items-center gap-3">
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Course removed from cart</p>
            <p className="text-sm text-gray-600">{deletedCourse?.title}</p>
          </div>
          <button
            onClick={handleUndo}
            className="px-4 py-2 bg-[#03045e] text-white rounded-lg hover:bg-[#0077b6] transition-colors font-medium text-sm"
          >
            Undo
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-[#03045e] via-[#023e8a] to-[#0077b6] text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center gap-3">
                <ShoppingCart size={32} className="opacity-90" />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Shopping Cart</h1>
                  <p className="text-sm opacity-90 mt-1">
                    {courses.length} {courses.length === 1 ? 'course' : 'courses'} ready to learn
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <Shield size={20} />
              <span className="text-sm font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <ShoppingCart size={100} className="mx-auto text-gray-300 mb-6" />
              <h2 className="text-3xl font-bold text-[#03045e] mb-3">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Explore our courses and start your learning journey today!</p>
              <button className="px-8 py-3 bg-gradient-to-r from-[#03045e] to-[#0077b6] text-white rounded-xl font-semibold hover:shadow-xl transition-all">
                Browse Courses
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Course List */}
            <div className="lg:col-span-2 space-y-4">
              {/* Savings Banner */}
              {totalSavings > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <Tag className="text-green-600" size={24} />
                  <div>
                    <p className="font-semibold text-green-800">You're saving ₹{totalSavings.toLocaleString('en-IN')} on this order!</p>
                    <p className="text-sm text-green-700">Limited time discount applied</p>
                  </div>
                </div>
              )}

              {/* Course Cards */}
              <div className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.courseId}
                    className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      {/* Course Image */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="w-full sm:w-56 h-40 object-cover rounded-lg"
                        />
                        {course.badge && (
                          <span className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold ${
                            course.badge === 'Bestseller' ? 'bg-yellow-400 text-yellow-900' :
                            course.badge === 'Trending' ? 'bg-pink-500 text-white' :
                            'bg-blue-500 text-white'
                          }`}>
                            {course.badge}
                          </span>
                        )}
                      </div>

                      {/* Course Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-[#03045e] mb-2 hover:text-[#0077b6] cursor-pointer transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">by {course.creator}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Star size={16} className="text-yellow-400 fill-yellow-400" />
                              <span className="font-semibold text-yellow-600">{course.rating}</span>
                              {course.students && (
                                <span className="text-gray-500">({course.students.toLocaleString()} students)</span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock size={16} className="text-[#03045e]" />
                              <span>{course.duration} hours</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen size={16} className="text-[#03045e]" />
                              <span>{course.lessons} lessons</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-end justify-between mt-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-bold text-[#03045e]">
                                ₹{course.price.toLocaleString('en-IN')}
                              </span>
                              {course.originalPrice && course.originalPrice > course.price && (
                                <span className="text-lg text-gray-400 line-through">
                                  ₹{course.originalPrice.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 border-2 border-red-200 rounded-lg hover:bg-red-50 hover:border-red-400 transition-all duration-200 font-medium"
                          >
                            <Trash2 size={18} />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                {/* Promo Code */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="font-bold text-[#03045e] mb-4 flex items-center gap-2">
                    <Tag size={20} />
                    Promo Code
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#03045e] focus:outline-none"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-6 py-2 bg-[#03045e] text-white rounded-lg hover:bg-[#0077b6] transition-colors font-medium whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600 font-medium mt-2">✓ {discount * 100}% discount applied!</p>
                  )}
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-[#03045e] mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal ({courses.length} courses)</span>
                      <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount</span>
                        <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    
                    <div className="h-px bg-gray-200"></div>
                    
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold text-[#03045e]">Total</span>
                      <span className="text-3xl font-bold text-[#03045e]">
                        ₹{finalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Total Learning Time</span>
                      <span className="font-semibold text-[#03045e]">{totalDuration} hours</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Total Lessons</span>
                      <span className="font-semibold text-[#03045e]">{totalLessons}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Expert Instructors</span>
                      <span className="font-semibold text-[#03045e]">{uniqueCreators}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckoutClick}
                    className="w-full bg-gradient-to-r from-[#03045e] to-[#0077b6] text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg mb-4"
                  >
                    Proceed to Checkout
                  </button>

                  {/* Trust Badges */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-green-600" />
                      <span>30-Day Money-Back Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-blue-600" />
                      <span>Lifetime Access to Courses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-purple-600" />
                      <span>Secure Payment Processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
