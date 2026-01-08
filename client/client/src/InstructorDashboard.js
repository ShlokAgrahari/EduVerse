// InstructorDashboard.js
import React, { useEffect, useState } from 'react';
import logo from './logo.png';

import { 
  LogOut, Bell, Twitter, Github, Linkedin, 
  Users, BookOpen, DollarSign, Plus ,  User,IndianRupee
} from 'lucide-react';
import './InstructorDashboard.css';
import { useNavigate } from 'react-router-dom';


const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [name,setname]=useState("")
  const navigate=useNavigate();
  const [students,setStudents]=useState(0)
  const [earning,setEarnings]=useState(0)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/instructor-dashboard',{
          method:"GET",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials:"include"
        }); 
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        console.log(data)
        setCourses(data);
        const response2 = await fetch("http://localhost:8000/user", {
          method: "GET",
          credentials: "include", // Ensure cookies are included in the request
      });
  
      if (!response2.ok) throw new Error("Failed to fetch user details");
      const user = await response2.json(); 
      console.log(user.data.phone)
      console.log(user.data.userEmail)
      console.log(user.data.userName)
      setname(user.data.userName)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);


  useEffect(() => {
    const calculateUniqueStudents = () => {
      const studentSet = new Set();
  
      courses.forEach(course => {
        if (course.students && Array.isArray(course.students)) {
          course.students.forEach(student => studentSet.add(student.studentId)); 
        }
      });
  
      console.log(studentSet); 
      setStudents(studentSet.size); 
    };
  
    calculateUniqueStudents();
  }, [courses]);
  

  useEffect(()=>{
    const calculateEarnings=()=>{
      const totalEarnings=courses.reduce(
        (total,course)=>total+(course.pricing*course.students.length),0
      );
      setEarnings(totalEarnings)
    }
    calculateEarnings();
  },[courses])

  const stats = [
    { 
      icon: <Users className="stats-icon" />,
      title: 'Total Students',
      value: students
    },
    {
      icon: <BookOpen className="stats-icon" />,
      title: 'Active Courses',
      value: courses.length
    },
    {
      icon: <IndianRupee className="stats-icon" />, // Dollar sign icon for the price
      title: 'Total Earnings',
      value: earning
    }
  ];


  return (

    <div className="dashboard-container1">
      {/* Navbar */}
      <nav className="navbar2">
        <div className="navbar-content2">
          <div className="logo2">
          <img id="idk" src={logo} alt="Logo" />

            <h2 id="sitename2">Eduverse</h2>
            
          </div>
          <div className="nav-actions2">
            <button className="icon-button2">
              <Bell size={20} />
            </button>
            <div className="profile-menu2">
            <User className="user-icon2" size={24} /> {/* User icon */}
              <span>{name}</span>
            </div>
            <button className="logout-button2" onClick={()=>navigate('/HomePage')}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content2">
      
        {/* Header */}
        <div className="dashboard-header1">
          <h1>Instructor Dashboard</h1>
          <button className="create-course-button1" onClick={() => navigate('/user/instructor/newcourse')}>
            <Plus size={20} />
            <span>Create New Course</span>
          </button>
        </div>
        <section className="community-section1">
          <div className="community-content1">
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvbW11bml0eXxlbnwwfDB8MHx8fDA%3D" 
              alt="Community" 
              className="community-image1"
            />
            <div className="community-text1">
              <h2>Join the Community</h2>
              <p>Become a part of our thriving community of learners and educators. Share knowledge, participate in discussions, and grow together!</p>
            </div>
          </div>
        </section>


        {/* Stats Grid */}
        <div className="stats-grid1">
          {stats.map((stat, index) => (
            <div key={index} className="stats-card1">
              <div className="stats-icon-wrapper1">
                {stat.icon}
              </div>
              <div className="stats-info1">
                <p className="stats-title1">{stat.title}</p>
                <p className="stats-value1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>


        {/* Courses Grid */}
        <div className="courses-grid1">
          {courses.map((course, index) => (
            <div key={index} className="course-card1">
              <img 
                src={course.image} 
                alt="Course thumbnail" 
                className="course-image1"
              />
              <div className="course-content1">
                <h3 className="course-title1">{course.title}</h3>
                <p className="course-description1">{course.category}</p>
                <div className="course-footer1">
                  <span className="price-badge1">
            PRICE: Rs.{course.pricing}
          </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer1">
        <div className="footer-content1">
          <div className="footer-section1">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Teaching Resources</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          <div className="footer-section1">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-section1">
            <h3>Connect</h3>
            <div className="social-links1">
              <a href="#"><Twitter size={24} /></a>
              <a href="#"><Github size={24} /></a>
              <a href="#"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InstructorDashboard;