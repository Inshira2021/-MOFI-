// components/common/AuthModal.jsx

import React, { useState } from 'react';
import { FiX, FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import { GoogleLogin } from '@react-oauth/google';

const AuthModal = ({ onClose, onLoginSuccess }) => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Minimal state for demonstration
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isSignIn) {
            if (email && password) {
                console.log('Logging In...');
                setTimeout(onLoginSuccess, 500);
            }
        } else {
            if (username && email && password) {
                setIsLoading(true);
                try {
                    const requestData = {
                        username: username,
                        email: email,
                        password: password
                    };
                    
                    console.log('Sending registration data:', requestData);
                    
                    // Send registration data to API
                    const response = await fetch('http://localhost:8000/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestData)
                    });

                    console.log('Response status:', response.status);
                    
                    // Try to parse JSON response to get error details
                    let data;
                    try {
                        data = await response.json();
                        console.log('Server response:', data);
                    } catch (jsonError) {
                        console.log('No JSON response from server');
                        data = {};
                    }

                    if (response.ok) {
                        console.log('Registration successful!');
                        // After successful registration, automatically log in and redirect to dashboard
                        setTimeout(() => {
                            onLoginSuccess();
                        }, 500);
                    } else {
                        setIsLoading(false);
                        // Show detailed error for debugging
                        const errorMsg = data.detail || data.message || `Server error: ${response.status}`;
                        console.error('Registration failed:', errorMsg, data);
                        alert(`Registration failed: ${JSON.stringify(errorMsg)}`);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.error('Registration error:', error);
                    alert('Registration failed: ' + error.message);
                }
            } else {
                alert('Please fill in all fields');
            }
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
    const submitButtonText = isSignIn ? 'Log In' : 'Register';

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

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    {/* Username Input - Only show for registration */}
                    {!isSignIn && (
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-amber-100 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-0 top-1/2 transform -translate-y-1/2 text-amber-300/60 w-4 h-4 md:w-5 md:h-5" />
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full bg-transparent border-b border-amber-700/50 text-white py-3 pl-7 pr-4 focus:outline-none focus:border-amber-500 transition-all text-sm md:text-base placeholder:text-amber-300/40"
                                />
                            </div>
                        </div>
                    )}

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
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 md:py-3.5 rounded-lg shadow-lg hover:shadow-amber-900/50 transition-all duration-300 transform hover:scale-[1.02] text-sm md:text-base mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? 'Processing...' : submitButtonText}
                    </button>
                </form>

                {/* Toggle between Sign In and Register */}
                <div className="text-center mt-4">
                    <p className="text-amber-100/80 text-sm">
                        {isSignIn ? (
                            <>
                                Don't have an account?{' '}
                                <button
                                    onClick={() => setIsSignIn(false)}
                                    className="text-amber-400 hover:text-amber-300 font-semibold underline transition-colors"
                                >
                                    Register
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    onClick={() => setIsSignIn(true)}
                                    className="text-amber-400 hover:text-amber-300 font-semibold underline transition-colors"
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                    </p>
                </div>

                {isSignIn && (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
