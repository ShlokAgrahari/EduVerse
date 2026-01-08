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
    try {
      const res = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userName, phone, userEmail, password, role })
      });

      const nav =
        role === "student"
          ? "/user/student-dashboard"
          : "/user/instructor-dashboard";

      navigate(nav);
    } catch (err) {
      console.log(err.message);
    }
  };

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
            <span>Join 5,000+ Students Today</span>
          </div>
          <h1 className="text-6xl font-extrabold mb-6 leading-tight tracking-tighter">
            Begin Your <br />
            <span className="text-blue-400">Journey.</span>
          </h1>
          <p className="text-xl text-blue-100/80 max-w-md leading-relaxed">
            Create an account to unlock personalized learning paths and expert-led certifications.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white relative overflow-y-auto">

        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="w-full max-w-[440px] space-y-6 py-10">

          <div className="space-y-2 text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h2>
            <p className="text-slate-500 font-medium">Start your learning experience with Eduverse.</p>
          </div>
          <div className="flex p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/50">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${role === "student"
                  ? 'bg-white text-[#03045e] shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                  : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("instructor")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${role === "instructor"
                  ? 'bg-white text-[#03045e] shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
                  : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              Instructor
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#03045e]" />
                  <input
                    type="text"
                    placeholder="User123"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#03045e] outline-none transition-all"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Phone</label>
                <div className="relative group">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#03045e]" />
                  <input
                    type="tel"
                    placeholder="+1 234..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#03045e] outline-none transition-all"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#03045e]" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#03045e] outline-none transition-all"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#03045e]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#03045e] outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-2 rounded-2xl shadow-lg shadow-blue-900/10 font-bold text-white bg-[#03045e] hover:bg-[#02034a] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="relative flex items-center justify-center py-2">
            <div className="w-full border-t border-slate-100"></div>
            <span className="absolute px-4 bg-white text-[11px] text-slate-400 uppercase tracking-widest font-bold">Or register with</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <FaGoogle className="text-[#DB4437]" />
            </button>
            <button className="flex items-center justify-center py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <FaFacebook className="text-[#4267B2]" />
            </button>
            <button className="flex items-center justify-center py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <FaGithub className="text-[#333]" />
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 font-medium pt-2">
            Already have an account? {' '}
            <Link to="/login" className="text-[#03045e] font-bold hover:underline underline-offset-4">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
