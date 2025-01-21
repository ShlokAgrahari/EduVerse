// src/components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { FaGoogle,  FaUser, FaLock } from 'react-icons/fa';
import './LoginPage.css';
import {useGoogleLogin} from "@react-oauth/google";

const LoginPage = () => {
    const [userEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setUserType] = useState('student'); // Default to Student
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
                credentials: "include",
                body: JSON.stringify({
                  userEmail,password, role
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
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


            const navRole = (role === 'student') ? '/user/student-dashboard' : '/user/instructor-dashboard';
            navigate(`${navRole}`)
            setEmail("");
            setPassword("");
            

        }catch(error){
            console.log("error is ",error.message);
            setError(error.message);
        }
    };


    // for google login 

    const googleAuth = async (code,role) => {
        try {
            
            const response = await fetch(`http://localhost:8000/auth/google?code=${code}&role=${role}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:"include",
            });
        
            if (!response.ok) {
                throw new Error('Failed with Google');
            }
    
            const data = await response.json();
            console.log("googleauth",data);
            return data; 
        } catch (error) {
            console.error('Error during Google', error);
        }
    };


    const responseGoogle = async(authResult)=>{
        try {
            const result = await googleAuth(authResult.code,role);

            if (result && result.data && result.data.user) { // Check result validity
                const { email, name } = result.data.user;
                console.log(email);
                console.log(name);
            console.log(authResult);
            }

            const navRole = (role === 'student') ? '/user/student-dashboard' : '/user/instructor-dashboard';
            navigate(`${navRole}`)
        } catch (error) {
            console.log("google error is: ",error);
        }
    }

    const googlelogin = useGoogleLogin({
        onSuccess:responseGoogle,
        onError : responseGoogle,
        flow: 'auth-code'
    })



    return (
        <div className="login-page">
            {/* Header */}
            <header className="header-box">
                <h1>EDUVERSE</h1>
                <p>Best Teacher | Affordable Pricing | Exclusive Notes</p>
            </header>

            <div className="login-container">
                {/* User Type Selection */}
                <div className="user-type">
                    <button
                        onClick={() => setUserType('student')}
                        className={`user-button ${role === 'student' ? 'active' : ''}`}
                    >
                        Student
                    </button>
                    <button
                        onClick={() => setUserType('instructor')}
                        className={`user-button ${role === 'instructor' ? 'active' : ''}`}
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
                        <button onClick={googlelogin} className="google-login-button">
                            <FaGoogle className="google-icon" /> Login with Google
                        </button>
                    </div>
                </div>

                {/* Forgot Password Link */}
                <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                </Link>
            </div>
            <footer className="login-footer">
                <p>&copy; 2024 EDUVERSE. All Rights Reserved.</p>
                <div className="footer-links">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-of-service">Terms of Service</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>
            </footer>
        </div>
    );
};

export default LoginPage;
