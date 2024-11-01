// src/components/LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import './LoginPage.css';

const LoginPage = () => {
    const [userType, setUserType] = useState('Student');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for login goes here
        console.log('Logging in', { username, password, userType });
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
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className="input-icon-container">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="input-icon-container">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
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
