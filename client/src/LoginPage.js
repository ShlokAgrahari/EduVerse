import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import './LoginPage.css';
import { useGoogleLogin } from "@react-oauth/google";

import { initializeSocket } from './socketManager';

const LoginPage = () => {
    const [userEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [errmsg, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        <div className="flex h-screen w-screen overflow-hidden bg-[#f8fafc]">
            <div className="hidden lg:flex lg:w-1/2 relative h-full bg-[#03045e]">
                <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
                    alt="Students studying"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
                <div className="w-full max-w-[440px] space-y-8">

                    <h2 className="text-3xl font-bold">Login</h2>

                    <div className="flex p-1.5 bg-slate-100 rounded-2xl">
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            className={`flex-1 py-2 rounded-xl ${role === 'student' ? 'bg-white font-bold' : ''}`}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('instructor')}
                            className={`flex-1 py-2 rounded-xl ${role === 'instructor' ? 'bg-white font-bold' : ''}`}
                        >
                            Instructor
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                value={userEmail}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label>Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {errmsg && <p className="text-red-500">{errmsg}</p>}

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Verifying..." : "Sign In"}
                        </button>
                    </form>

                    <button onClick={() => googlelogin()}>
                        <FaGoogle /> Google
                    </button>

                    <p className="text-center text-sm">
                        Don't have an account?
                        <Link to="/signup"> Create account</Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export { LoginPage };
