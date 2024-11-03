// src/components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { FaGoogle, FaFacebook, FaGithub, FaUser, FaLock } from 'react-icons/fa';
import './LoginPage.css';

const LoginPage = ({ setUserRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Student'); // Default to Student
    const navigate = useNavigate(); // useNavigate hook

    const handleLogin = (e) => {
        e.preventDefault();
        setUserRole(userType.toLowerCase()); // Set the role based on user selection (student/instructor)
        navigate('/dashboard'); // Redirect to dashboard
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

                {/* Login Form */}
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <div className="input-icon-container">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
