import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaGoogle,
    FaFacebook,
    FaGithub,
    FaUser,
    FaLock,
    FaEyeSlash,
    FaEye,
    FaEnvelope,
    FaPhone
} from "react-icons/fa";
import "./SignupPage.css";

const SignupPage = () => {
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userName, setUserName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState("student");

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ userName, phone, userEmail, password, role })
            });

            const nav = role === "student"
                ? "/user/student-dashboard"
                : "/user/instructor-dashboard";

            navigate(nav);
        } catch (err) {
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-root">

            {/* ── LEFT PANEL ── */}
            <div className="signup-left">
                <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Students studying"
                />
                <div className="signup-left-content">
                    <div className="signup-badge">
                        <span className="signup-badge-dot"></span>
                        Join 5,000+ Students Today
                    </div>
                    <h1>
                        Begin Your <br />
                        <span>Journey.</span>
                    </h1>
                    <p>
                        Create an account to unlock personalized learning paths and expert-led certifications.
                    </p>
                </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="signup-right">
                <div className="signup-right-blob"></div>

                <div className="signup-box">

                    <h2>Create Account</h2>
                    <p className="signup-subtitle">Start your learning experience with Eduverse.</p>

                    {/* Role Toggle */}
                    <div className="role-toggle">
                        <button
                            type="button"
                            className={role === "student" ? "active" : ""}
                            onClick={() => setRole("student")}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            className={role === "instructor" ? "active" : ""}
                            onClick={() => setRole("instructor")}
                        >
                            Instructor
                        </button>
                    </div>

                    {/* Form */}
                    <form className="signup-form" onSubmit={handleSignup}>

                        <div className="form-grid">
                            {/* Username */}
                            <div className="form-group">
                                <label>Username</label>
                                <div className="input-wrap">
                                    <FaUser className="input-icon" />
                                    <input
                                        type="text"
                                        placeholder="User123"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="form-group">
                                <label>Phone</label>
                                <div className="input-wrap">
                                    <FaPhone className="input-icon" />
                                    <input
                                        type="tel"
                                        placeholder="+1 234..."
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label>Email</label>
                            <div className="input-wrap">
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-wrap">
                                <FaLock className="input-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="eye-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-create"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="divider">
                        <span>Or register with</span>
                    </div>

                    {/* Social Buttons */}
                    <div className="social-grid">
                        <button className="btn-social">
                            <FaGoogle className="icon-google" />
                        </button>
                        <button className="btn-social">
                            <FaFacebook className="icon-facebook" />
                        </button>
                        <button className="btn-social">
                            <FaGithub className="icon-github" />
                        </button>
                    </div>

                    <p className="login-row">
                        Already have an account?{' '}
                        <Link to="/login">Log In</Link>
                    </p>

                </div>
            </div>

        </div>
    );
};

export default SignupPage;
