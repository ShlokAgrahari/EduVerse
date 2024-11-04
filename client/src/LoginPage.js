// src/components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { FaGoogle, FaFacebook, FaGithub, FaUser, FaLock } from 'react-icons/fa';
import './LoginPage.css';

const LoginPage = () => {
    const [userEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setUserType] = useState('Student'); // Default to Student
    const [errmsg,setError] = useState('');
    const navigate = useNavigate(); // useNavigate hook


    const handleSubmit = async(e) => {
        e.preventDefault();
        // Logic for login goes here
        try{
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userEmail,password, role
                })
            });

            if (!res.ok) {
                const errorData = await res.json(); // Retrieve error message from response
                console.log(errorData.message);
                setError(errorData.message);
                throw new Error(errorData.message || "Something went wrong"); // Pass the error message to catch block
            }

            if (res.status === 404) {
                throw new Error("Endpoint not found");
            }else if (res.status === 422) {
                throw new Error("Something went wrong");
            }

            console.log("working");

            const data = await res.json();
            if (!data) {
                throw new Error("Unexpected response format");
            }


            setEmail("");
            setPassword("");
            navigate('/dashboard');
        }catch(error){
            console.log("error is ",error);
            setError(error.message);
        }
    };

    return (
        <div className="login-page">
            {/* Header */}
            <header className="header-box">
                <h1>ASHTRA</h1>
                <p>Best Teacher | Affordable Pricing | Exclusive Notes</p>
            </header>

            <div className="login-container">
                {/* User Type Selection */}
                <div className="user-type">
                    <button
                        onClick={() => setUserType('Student')}
                        className={`user-button ${role === 'Student' ? 'active' : ''}`}
                    >
                        Student
                    </button>
                    <button
                        onClick={() => setUserType('Instructor')}
                        className={`user-button ${role === 'Instructor' ? 'active' : ''}`}
                    >
                        Instructor
                    </button>
                </div>

                {/* Login Form */}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-icon-container">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                id="useremail"
                                placeholder="Enter your email"
                                value={userEmail}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-icon-container">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="login-button">Login</button>
                </form>

                {/* Other Login Options */}
                <div className="other-login-options">
                    <p>Other login options</p>
                    <div className="icon-container">
                        <FaGoogle className="login-icon google" />
                        <FaFacebook className="login-icon facebook" />
                        <FaGithub className="login-icon github" />
                    </div>
                </div>

                {/* Forgot Password Link */}
                <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
