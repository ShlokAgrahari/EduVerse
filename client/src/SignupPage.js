import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebook,
  FaGithub,
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone
} from "react-icons/fa";
import logo from "./logo.png";

const SignupPage = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/signup", {
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* ===== HEADER ===== */}
      <header className="bg-[#03045e] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Eduverse" className="w-12 h-12" />
            <div className="text-white">
              <h1 className="text-lg font-extrabold">Eduverse</h1>
              <p className="text-xs opacity-90">Learn • Grow • Excel</p>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <Link to="/about" className="text-white font-semibold text-sm">
              About Us
            </Link>
            <Link
              to="/login"
              className="border border-white text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-white/10"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-[#03045e] px-4 py-1.5 rounded-lg text-sm font-bold"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
          
          {/* ROLE SWITCH */}
          <div className="flex bg-indigo-50 rounded-xl overflow-hidden mb-6">
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-2 font-bold ${
                role === "student"
                  ? "bg-[#03045e] text-white"
                  : "text-[#03045e]"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole("instructor")}
              className={`flex-1 py-2 font-bold ${
                role === "instructor"
                  ? "bg-[#03045e] text-white"
                  : "text-[#03045e]"
              }`}
            >
              Instructor
            </button>
          </div>

          <h2 className="text-2xl font-extrabold text-center text-[#03045e] mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
              <FaEnvelope className="text-[#03045e]" />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
              <FaPhone className="text-[#03045e]" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
              <FaUser className="text-[#03045e]" />
              <input
                type="text"
                placeholder="Username"
                className="w-full outline-none"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
              <FaLock className="text-[#03045e]" />
              <input
                type="password"
                placeholder="Password"
                className="w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="w-full bg-[#03045e] text-white py-3 rounded-xl font-bold hover:opacity-95 transition">
              Sign Up
            </button>
          </form>

          {/* SOCIAL */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm mb-3">Or sign up with</p>
            <div className="flex justify-center gap-6 text-xl text-[#03045e]">
              <FaGoogle className="cursor-pointer hover:scale-110 transition" />
              <FaFacebook className="cursor-pointer hover:scale-110 transition" />
              <FaGithub className="cursor-pointer hover:scale-110 transition" />
            </div>
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#03045e] text-white text-center py-4 text-sm">
        © 2024 Eduverse. All rights reserved.
      </footer>
    </div>
  );
};

export default SignupPage;
