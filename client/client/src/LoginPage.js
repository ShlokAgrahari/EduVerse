import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
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
            const navPath = (role === 'student') ? '/user/student-dashboard' : '/user/instructor-dashboard';
            navigate(navPath);
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
                const response = await fetch(`http://localhost:8000/auth/google?code=${authResult.code}&role=${role}`, {
                    method: 'GET',
                    credentials: "include",
                });
                const data = await response.json();
                if (data?.data?.user) {
                    initializeSocket(data.data.user._id);
                    navigate(role === 'student' ? '/user/student-dashboard' : '/user/instructor-dashboard');
                }
            } catch (err) {
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
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Students studying" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="relative z-10 flex flex-col justify-center px-24 text-white">
                    <div className="mb-8 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-white/20 text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                        <span>Now enrolling for 2025</span>
                    </div>
                    <h1 className="text-6xl font-extrabold mb-6 leading-tight tracking-tighter">
                        Unlock Your <br />
                        <span className="text-blue-400">Potential.</span>
                    </h1>
                    <p className="text-xl text-blue-100/80 max-w-md leading-relaxed">
                        Join EDUVERSE to access premium courses and a global community of learners.
                    </p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white relative">

                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>
                
                <div className="w-full max-w-[440px] space-y-8">

                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Login</h2>
                        <p className="text-slate-500 font-medium">Welcome back! Please enter your details.</p>
                    </div>

                    <div className="flex p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/50">
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${role === 'student' ? 'bg-white text-[#03045e] shadow-[0_4px_12px_rgba(0,0,0,0.05)] translate-y-0' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('instructor')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${role === 'instructor' ? 'bg-white text-[#03045e] shadow-[0_4px_12px_rgba(0,0,0,0.05)]' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Instructor
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                            <div className="relative group">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#03045e] transition-colors" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={userEmail}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#03045e] outline-none transition-all placeholder:text-slate-400"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                            <div className="relative group">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#03045e] transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#03045e] outline-none transition-all placeholder:text-slate-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link to="/forgot-password" size="sm" className="text-sm font-bold text-[#03045e] hover:text-blue-700 transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        {errmsg && (
                            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[13px] font-medium rounded-xl text-center">
                                {errmsg}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-2xl shadow-lg shadow-blue-900/10 font-bold text-white bg-[#03045e] hover:bg-[#02034a] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Verifying...
                                </span>
                            ) : "Sign In"}
                        </button>
                    </form>

                    <div className="relative flex items-center justify-center py-2">
                        <div className="w-full border-t border-slate-100"></div>
                        <span className="absolute px-4 bg-white text-[11px] text-slate-400 uppercase tracking-widest font-bold">Or login with</span>
                    </div>
                    <button
                        onClick={() => googlelogin()}
                        className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-slate-200 rounded-2xl bg-white hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-slate-700 shadow-sm"
                    >
                        <FaGoogle className="text-[#DB4437]" />
                        <span>Google</span>
                    </button>

                    <p className="text-center text-sm text-slate-500 font-medium pt-2">
                        Don't have an account? {' '}
                        <Link to="/signup" className="text-[#03045e] font-bold hover:underline underline-offset-4">Create account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
export { LoginPage };
