// src/components/SignupPage.js
import React, { useState } from 'react';
import './SignupPage.css';
import { FaGoogle, FaFacebook, FaGithub, FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
 


const SignupPage = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); 
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Email:", userEmail);
    console.log("Phone:", phone);
    console.log("Username:", userName);
    console.log("Password:", password);
    try {
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
          userName,phone, userEmail, password, role
        })
      });
      if (res.status === 404) {
        throw new Error("Endpoint not found");
      } else if (res.status === 422) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      if (!data) {
        throw new Error("Unexpected response format");
      }
      const navRole = (role === 'student') ? '/student-dashboard' : '/instructor-dashboard';
      navigate(`${navRole}`)


      setUserEmail('');
      setPhone('');
      setUserName('');
      setPassword('');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <div className="user-type">
          <button
            onClick={() => setRole('student')}
            className={`user-button ${role === 'student' ? 'active' : ''}`}
          >
            Student
          </button>
          <button
            onClick={() => setRole('instructor')}
            className={`user-button ${role === 'instructor' ? 'active' : ''}`}
          >
            Instructor
          </button>
        </div>
        <h2>Sign Up</h2>
        <form>
          <div className="input-container">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <FaPhone className="icon" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={handleSignup}>Sign Up</button>
          <div className="other-login-options">
            <p>Other login options</p>
            <div className="icon-container">
              <FaGoogle className="login-icon" />
              <FaFacebook className="login-icon" />
              <FaGithub className="login-icon" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
