// src/components/LoginPage.js
import React, { useState } from 'react';

import { FaUser, FaLock, FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    return (
        <div className="login-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Header */}
            <header className="header-box bg-blue-600 text-white w-full p-4 text-center">
                <h1 className="text-3xl">ASHTRA</h1>
                <p className="text-xl">Best Teacher | Affordable Pricing | Exclusive Notes</p>
            </header>

            {/* Login Container */}
            <div className="login-container bg-white rounded-lg shadow-lg p-6 w-full max-w-md mt-6">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group mb-4 flex items-center border border-gray-300 rounded-md">
                        <FaUser className="icon text-black m-2" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="flex-grow p-2 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="form-group mb-4 flex items-center border border-gray-300 rounded-md">
                        <FaLock className="icon text-black m-2" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-grow p-2 focus:outline-none"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button bg-blue-600 text-white rounded-md p-2 w-full hover:bg-blue-700 transition">
                        Login
                    </button>
                </form>

                <div className="other-login-options mt-4 text-center">
                    <p>Other login options</p>
                    <div className="icon-container flex justify-center mt-2">
                        <FaGoogle className="login-icon text-black m-2" size={24} />
                        <FaFacebook className="login-icon text-black m-2" size={24} />
                        <FaGithub className="login-icon text-black m-2" size={24} />
                    </div>
                </div>

                {/* Forgot Password Link */}
                <Link to="/forgot-password" className="forgot-password text-blue-600 hover:underline mt-2 block text-center">
                    Forgot Password?
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
