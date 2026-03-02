import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useGoogleLogin } from "@react-oauth/google";
import { initializeSocket } from './socketManager';
import './LoginPage.css';

const LoginPage = () => {
    const [userEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [errmsg, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({ userEmail, password, role })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");
            initializeSocket(data.data.user._id);
            navigate(role === 'student'
                ? '/user/student-dashboard'
                : '/user/instructor-dashboard'
            );
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const responseGoogle = async (authResult) => {
        if (authResult.code) {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:8000/auth/google?code=${authResult.code}&role=${role}`,
                    { method: 'GET', credentials: "include" }
                );
                const data = await response.json();
                if (data?.data?.user) {
                    initializeSocket(data.data.user._id);
                    navigate(role === 'student'
                        ? '/user/student-dashboard'
                        : '/user/instructor-dashboard'
                    );
                }
            } catch {
                setError("Google authentication failed.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const googlelogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: () => setError("Google Login Failed"),
        flow: 'auth-code'
    });

    return (
        <div className="login-root">

            {/* ── LEFT PANEL ── */}
            <div className="login-left">
                <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
                    alt="Students studying"
                />
                <div className="login-left-content">
                    <h1>Master New Skills with EDUVERSE</h1>
                    <p>Join over 5,000+ students worldwide and start your learning journey with industry experts today.</p>
                </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="login-right">
                <div className="login-box">

                    <h2>Welcome Back</h2>
                    <p className="login-subtitle">Please enter your details to sign in.</p>

                    {/* Role Toggle */}
                    <div className="role-toggle">
                        <button
                            type="button"
                            className={role === 'student' ? 'active' : ''}
                            onClick={() => setRole('student')}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            className={role === 'instructor' ? 'active' : ''}
                            onClick={() => setRole('instructor')}
                        >
                            Instructor
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-wrap">
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={userEmail}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-wrap">
                                <FaLock className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
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

                        <div className="row-remember">
                            <label className="remember-label">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="forgot-link">
                                Forgot password?
                            </Link>
                        </div>

                        {errmsg && <p className="error-msg">{errmsg}</p>}

                        <button type="submit" className="btn-signin" disabled={isLoading}>
                            {isLoading ? "Verifying..." : "Sign in"}
                        </button>

                    </form>

                    <div className="divider">OR</div>

                    <button className="btn-google" onClick={() => googlelogin()}>
                        <FaGoogle className="google-icon" />
                        Sign in with Google
                    </button>

                    <p className="signup-row">
                        Don't have an account? <Link to="/signup">Create account</Link>
                    </p>

                </div>
            </div>

        </div>
    );
};

export default LoginPage;
