import React, { useEffect, useState, useCallback } from 'react';
import { ShoppingCart, LogOut, ChevronLeft, ChevronRight, User, MessageCircle, BookOpen, Clock, CheckCircle, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import SearchBar from './components/searchbar';
import { disconnectSocket } from './socketManager';
import { getSocket, getOnlineUsers } from './socketManager';
import Chatbot from './components/chatbot';

const CourseCard = ({ courseId, title, createdBy, pricing, image, handleNavigation }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
        <span className="text-[#03045e] font-bold text-sm">₹{pricing}</span>
      </div>
    </div>

    <div className="p-5">
      <h3 className="text-lg font-bold text-[#03045e] mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-[#0505a0] transition-colors">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 flex items-center">
        <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2 text-xs">👨‍🏫</span>
        {createdBy}
      </p>
      <button onClick={() => handleNavigation(courseId)}
        className="w-full bg-[#03045e] text-white py-2.5 rounded-lg font-medium hover:bg-[#02034a] transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
        View Details →
      </button>
    </div>
  </div>
);

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [recourse, setRecourse] = useState([]);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [name, setname] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const carouselImages = [
    "https://img.freepik.com/free-photo/woman-working-office_144627-44195.jpg?t=st=1737640211~exp=1737643811~hmac=3402c5a94d17cbf396b615f26def61d535e02ccd2ee022e1b0ce1fa31d2f1fa9&w=996",
    "https://img.freepik.com/free-photo/crop-woman-writing-notepad_23-2147863488.jpg?t=st=1737640582~exp=1737644182~hmac=45b27cd8bdced3fd353803cb92a48049241faedfbc64b941117896d2577769f4&w=1060",
    "https://img.freepik.com/free-photo/programming-background-collage_23-2149901766.jpg?t=st=1737641210~exp=1737644810~hmac=664450102534678fe84699ae1ba5cee28e67ad390c113cfaf03933234a4ef6cd&w=996"
  ];

  const line = [
    "Explore, learn, and thrive with EduVerse.",
    "Empower your learning journey with EduVerse today.",
    "EduVerse: Best faculty, boundless opportunities."
  ];

  useEffect(() => {
    const getRecCourse = async () => {
      try {
        const response = await fetch('http://localhost:8000/student-dashboard/recommend', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setRecourse(data.data);
        console.log("Recommended courses:", data);
      } catch (error) {
        console.log("Error fetching recommended courses:", error);
      }
    };
    getRecCourse();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/student-dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
        const response2 = await fetch("http://localhost:8000/user", {
          method: "GET",
          credentials: "include",
        });

        if (!response2.ok) throw new Error("Failed to fetch user details");
        const user = await response2.json();
        console.log(user.data.phone);
        console.log(user.data.userEmail);
        const socket = await getSocket();

        console.log("socket", socket.connected);
        console.log(getOnlineUsers());
        setname(user.data.userName);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleNavigation = (courseId) => {
    navigate(`/coursedetails/${courseId}`);
  };

  const handleLogout = async (e) => {
    try {
      const res = await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: 'include',
      });

      if (res.ok) {
        console.log("Logged out");
        disconnectSocket();
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  }, [carouselImages.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigateToChat = () => {
    navigate('/connect');
  };

  const navigateToCourses = () => {
    navigate('/user/my-courses');
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-[#03045e] shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg" />
              <span className="text-white text-2xl font-bold">EduVerse</span>
            </div>

            {/*NAV BUTTONS */}
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={navigateToCourses} className="text-white hover:text-gray-200 transition-colors font-medium">
                All Courses
              </button>
              <button onClick={navigateToChat} className="text-white hover:text-gray-200 transition-colors font-medium">
                Chat
              </button>
              <button className="text-white hover:text-gray-200 transition-colors font-medium">
                About
              </button>
              <button className="text-white hover:text-gray-200 transition-colors font-medium">
                Contact
              </button>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={navigateToChat} className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                <MessageCircle size={22} />
              </button>
              <button onClick={() => navigate('/user/cart')} className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                <ShoppingCart size={22} />
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                  <User className="text-[#03045e]" size={20} />
                </div>
                <span className="text-white font-medium">{name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={toggleMenu}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#02034a] border-t border-white/10">
            <div className="px-4 py-3 space-y-3">
              <button
                onClick={navigateToCourses}
                className="block w-full text-left text-white py-2 hover:bg-white/10 px-3 rounded"
              >
                All Courses
              </button>
              <button
                onClick={navigateToChat}
                className="block w-full text-left text-white py-2 hover:bg-white/10 px-3 rounded"
              >
                Chat
              </button>
              <button className="block w-full text-left text-white py-2 hover:bg-white/10 px-3 rounded">
                About
              </button>
              <button className="block w-full text-left text-white py-2 hover:bg-white/10 px-3 rounded">
                Contact
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-white py-2 hover:bg-white/10 px-3 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Search Bar Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Search Bar Container */}
            <div className="bg-gradient-to-br from-[#03045e] to-[#0505a0] rounded-2xl shadow-xl p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Main Search Input */}
                <div className="flex-1">
                  <SearchBar />
                </div>
                {/* Search Button */}
                <button className="bg-white text-[#03045e] px-12 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search</span>
                </button>
              </div>

              {/* Popular Searches */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-white/90 font-semibold flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Popular:
                  </span>
                  <button className="text-sm bg-white/95 text-[#03045e] px-4 py-2 rounded-full hover:bg-white transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Web Development
                  </button>
                  <button className="text-sm bg-white/95 text-[#03045e] px-4 py-2 rounded-full hover:bg-white transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Data Science
                  </button>
                  <button className="text-sm bg-white/95 text-[#03045e] px-4 py-2 rounded-full hover:bg-white transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    UI/UX Design
                  </button>
                  <button className="text-sm bg-white/95 text-[#03045e] px-4 py-2 rounded-full hover:bg-white transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Machine Learning
                  </button>
                  <button className="text-sm bg-white/95 text-[#03045e] px-4 py-2 rounded-full hover:bg-white transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Python
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats Below Search */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-[#03045e] mb-1">500+</div>
                <div className="text-sm text-gray-600 font-medium">Active Courses</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center border-t-4 border-green-500">
                <div className="text-3xl font-bold text-[#03045e] mb-1">50K+</div>
                <div className="text-sm text-gray-600 font-medium">Happy Students</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center border-t-4 border-purple-500">
                <div className="text-3xl font-bold text-[#03045e] mb-1">100+</div>
                <div className="text-sm text-gray-600 font-medium">Expert Instructors</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center border-t-4 border-yellow-500">
                <div className="text-3xl font-bold text-[#03045e] mb-1">4.8★</div>
                <div className="text-sm text-gray-600 font-medium">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[500px] overflow-hidden">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#03045e]/90 to-[#03045e]/50 z-10"></div>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center px-4 max-w-4xl">
                <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {line[index]}
                </h1>
                <p className="text-white/90 text-lg md:text-xl mb-8">
                  Transform your career with world-class online courses
                </p>
                <button
                  onClick={navigateToCourses}
                  className="bg-white text-[#03045e] px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg"
                >
                  Explore Courses
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        >
          <ChevronRight size={28} />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
              <div className="bg-[#03045e] p-4 rounded-lg">
                <BookOpen className="text-white" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-[#03045e]">4</div>
                <div className="text-gray-600 font-medium">Enrolled Courses</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl">
              <div className="bg-orange-500 p-4 rounded-lg">
                <Clock className="text-white" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">2</div>
                <div className="text-gray-600 font-medium">In Progress</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
              <div className="bg-green-500 p-4 rounded-lg">
                <CheckCircle className="text-white" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">1</div>
                <div className="text-gray-600 font-medium">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 text-center">
          <div className="inline-block mb-3">
            <span className="bg-blue-100 text-[#03045e] px-4 py-1 rounded-full text-sm font-semibold">Just For You</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#03045e] mb-3">Recommended For You</h2>
          <p className="text-gray-600 text-lg">Courses picked based on your interests and learning history</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recourse.map((course) => (
            <CourseCard
              key={course._id}
              courseId={course._id}
              title={course.title}
              createdBy={course.createdBy}
              pricing={course.pricing}
              image={course.image}
              handleNavigation={handleNavigation}
            />
          ))}
        </div>
      </div>

      {/* Featured Courses */}
      <div className="bg-gradient-to-b from-gray-100 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="inline-block mb-3">
              <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-semibold">⭐ Popular</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#03045e] mb-3">Featured Courses</h2>
            <p className="text-gray-600 text-lg">Explore our most popular courses from top instructors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                courseId={course._id}
                title={course.title}
                createdBy={course.createdBy}
                pricing={course.pricing}
                image={course.image}
                handleNavigation={handleNavigation}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#03045e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={logo} alt="EduVerse logo" className="w-10 h-10 rounded-lg" />
                <span className="text-2xl font-bold">EduVerse</span>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering students through quality online education and innovative learning experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/courses" className="text-gray-300 hover:text-white transition-colors">Courses</a></li>
                <li><a href="/instructors" className="text-gray-300 hover:text-white transition-colors">Instructors</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-gray-300 mb-2">support@eduverse.com</p>
              <p className="text-gray-300 mb-4">+91 123 456 7890</p>

              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <span className="text-sm font-bold">f</span>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <span className="text-sm font-bold">𝕏</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <span className="text-sm font-bold">in</span>
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 EduVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Chatbot />

    </div>
  );
};

export default StudentDashboard;
