// src/App.js
import React, { useState } from 'react';
import StudentDashboard from './StudentDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage.js';
import HomePage from './HomePage.js';
import './App.css';
import InstructorDashboard from './InstructorDashboard.js';
import CourseDetails from './CourseDetails.js';
import Dashboard from './Dashboard.js';
import CreateCourse from './CreateCourse.js';
import CartDetail from './CartPage.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Cart from './CartPage.js';
import PrivateRoute from './PrivateRoute.js';
import LecturePage from './LecturePage.js'
import AllCourses from './AllCourses.js'


const App = () => {
  const [userRole, setUserRole] = useState('student');

  const GoogleAuthWrapper = ()=>(
      <GoogleOAuthProvider clientId='66074453410-0vfrbb3j0imhtqv8dpqbqmse47lep3uo.apps.googleusercontent.com'>
        <LoginPage></LoginPage>
      </GoogleOAuthProvider>
  )

  return (
    <div className="app">
    
      <div className="main-content" style={{marginLeft:0,marginRight:0,padding:0}}>
        <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<GoogleAuthWrapper/>} />
        <Route path="/signup" element={<SignupPage />} />
         {/* Route for Student Dashboard */}
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/coursedetails/:courseId" element={<CourseDetails />} />
        
        
        <Route path="/user" element = {<PrivateRoute/>}>
          <Route path="student-dashboard" element={<StudentDashboard />} />
          <Route path="instructor-dashboard" element={<InstructorDashboard/>} />
          <Route path="instructor/newcourse" element={<CreateCourse/>}/>
          <Route path="student-dashboard/cart" element={<CartDetail/>}/>
          <Route path="lecture/:courseId" element={<LecturePage />}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="my-courses" element={<AllCourses />} />
        </Route>
        </Routes>
      </div>
   
    </div>
  );
};

export default App;
