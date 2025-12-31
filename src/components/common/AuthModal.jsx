// components/common/AuthModal.jsx

import React, { useState } from 'react';
import { FiX, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { GoogleLogin } from '@react-oauth/google';

const AuthModal = ({ onClose, onLoginSuccess }) => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    
    // Minimal state for demonstration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, this is where you call your backend API.
        if (email && password) {
            console.log(isSignIn ? 'Logging In...' : 'Signing Up...');
            // Simulate successful login/signup after a short delay
            setTimeout(onLoginSuccess, 500); 
        }
    };

    const handleGoogleSuccess = (credentialResponse) => {
        console.log('Google Sign-In Success:', credentialResponse);
        // Here you would send the credential to your backend
        // For now, we'll just simulate successful login
        setTimeout(onLoginSuccess, 500);
    };

    const handleGoogleError = () => {
        console.log('Google Sign-In Failed');
        alert('Google Sign-In failed. Please try again.');
    };

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const formTitle = isSignIn ? 'Sign In to MOFI' : 'Create Your Account';
    const submitButtonText = isSignIn ? 'Log In' : 'Sign Up';

    return (
        <div 
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity p-4"
            onClick={onClose} 
        >
            <div 
                className="relative bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-orange-900/70 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-sm md:max-w-md transform scale-100 border border-gray-800/50 transition-transform"
                onClick={e => e.stopPropagation()} 
            >
                <div className="flex justify-end">
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 p-2 rounded-full transition"
                        title="Close"
                    >
                        <FiX className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4 md:mb-6">{formTitle}</h2>

                {/* Toggle Tabs */}
                <div className="flex bg-gray-700/50 p-1 rounded-full mb-4 md:mb-6">
                    <button
                        onClick={() => setIsSignIn(true)}
                        className={`flex-1 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${
                            isSignIn ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-900/50' : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsSignIn(false)}
                        className={`flex-1 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${
                            !isSignIn ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-900/50' : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-amber-100 mb-2">
                            E-mail
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-0 top-1/2 transform -translate-y-1/2 text-amber-300/60 w-4 h-4 md:w-5 md:h-5" />
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-transparent border-b border-amber-700/50 text-white py-3 pl-7 pr-4 focus:outline-none focus:border-amber-500 transition-all text-sm md:text-base placeholder:text-amber-300/40"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-amber-100 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-0 top-1/2 transform -translate-y-1/2 text-amber-300/60 w-4 h-4 md:w-5 md:h-5" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-transparent border-b border-amber-700/50 text-white py-3 pl-7 pr-10 focus:outline-none focus:border-amber-500 transition-all text-sm md:text-base placeholder:text-amber-300/40"
                            />
                            <button 
                                type="button" 
                                onClick={togglePasswordVisibility} 
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-amber-300/60 hover:text-white transition"
                            >
                                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 md:py-3.5 rounded-lg shadow-lg hover:shadow-amber-900/50 transition-all duration-300 transform hover:scale-[1.02] text-sm md:text-base mt-6"
                    >
                        {submitButtonText}
                    </button>
                </form>

                <div className="my-5 md:my-6 flex items-center">
                    <hr className="flex-grow border-gray-600/50" />
                    <span className="mx-3 md:mx-4 text-gray-500 text-xs md:text-sm">OR</span>
                    <hr className="flex-grow border-gray-600/50" />
                </div>

                {/* Google Sign In */}
                <div className="w-full bg-gray-700/50 border border-gray-600 rounded-lg overflow-hidden hover:bg-gray-600/50 transition-all">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap
                        theme="filled_black"
                        size="large"
                        text="continue_with"
                        shape="rectangular"
                        width="100%"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
