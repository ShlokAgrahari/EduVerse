// src/components/SignupPage.js
import React, { useState } from 'react';
import './SignupPage.css';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Student');

  const handleSignup =async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Username:", username);
    console.log("Password:", password);
    try {
      const res=await fetch("/signup",{
        method:"POST",
        header:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email,phone,username,password,userType
        })
      })
      const data=await res.json();

      if(res.status===422 || !data){
        throw new Error("Something went wrong");
      }

      setEmail('');
    setPhone('');
    setUsername('');
    setPassword('');
    } catch (error) {
      console.log(error.message);
    }
    
  };

  return (
    
    <div className="signup-page">
      <div className="signup-box">
      <div className="user-type">
      
      <div className="user-type">
                    <button
                        onClick={() => setUserType('Student')}
                        className={`user-button ${userType === 'Student' ? 'active' : ''}`}
                    >
                        Student
                    </button>
                    <button
                        onClick={() => setUserType('Instructor')}
                        className={`user-button ${userType === 'Instructor' ? 'active' : ''}`}
                    >
                        Instructor
                    </button>
                </div>
                </div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-container">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit">Sign Up</button>
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
