'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const savedUsers = localStorage.getItem('cloudflux_users');
    if (savedUsers) {
      try {
        setRegisteredUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error("Error parsing users from LocalStorage:", error);
      }
    } else {
      // Seed default demo user if none exists in LocalStorage
      const initialUsers = [
        {
          fullName: 'Demo Client',
          email: 'client@cloudflux.com',
          password: 'password123',
          role: 'Client',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('cloudflux_users', JSON.stringify(initialUsers));
      setRegisteredUsers(initialUsers);
    }

    // Check existing active session
    const activeSession = localStorage.getItem('cloudflux_active_user') || sessionStorage.getItem('cloudflux_active_user');
    if (activeSession) {
      try {
        setLoggedInUser(JSON.parse(activeSession));
      } catch (e) {
        console.error("Error reading active session:", e);
      }
    }
  }, []);

  const showAlert = (type, text) => {
    setAlertMessage({ type, text });
    setTimeout(() => {
      setAlertMessage({ type: '', text: '' });
    }, 4000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const inputEmail = formData.email.trim().toLowerCase();
    const inputPassword = formData.password;

    // 1. Verify if email exists in frontend stored users
    const foundUser = registeredUsers.find(
      (user) => user.email.toLowerCase() === inputEmail
    );

    if (!foundUser) {
      showAlert('error', 'This email is not registered! Please sign up first.');
      setIsLoading(false);
      return;
    }

    // 2. Verify password match
    if (foundUser.password !== inputPassword) {
      showAlert('error', 'Incorrect password! Please try again.');
      setIsLoading(false);
      return;
    }

    // 3. Successful Login session persistence
    if (formData.rememberMe) {
      localStorage.setItem('cloudflux_active_user', JSON.stringify(foundUser));
    } else {
      sessionStorage.setItem('cloudflux_active_user', JSON.stringify(foundUser));
    }

    // 🔴 YAHAN ADD KIYA HAI: Yeh event Navbar ko foran notify karega taake button gayab ho jaye
    window.dispatchEvent(new Event('authChange'));

    setLoggedInUser(foundUser);
    showAlert('success', `Welcome back, ${foundUser.fullName}! Redirecting to home...`);
    
    // Reset password field
    setFormData((prev) => ({ ...prev, password: '' }));
    setIsLoading(false);

    // 4. Redirect to Home Page after a short delay
    setTimeout(() => {
      router.push('/');
    }, 1200);
  };

  const handleLogout = () => {
    localStorage.removeItem('cloudflux_active_user');
    sessionStorage.removeItem('cloudflux_active_user');

    // 🔴 YAHAN BHI ADD KIYA HAI: Logout par bhi Navbar ko notify karne ke liye
    window.dispatchEvent(new Event('authChange'));

    setLoggedInUser(null);
    showAlert('info', 'You have been logged out successfully.');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-black selection:text-white">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-2xl rounded-3xl border border-gray-100 sm:px-10 relative overflow-hidden">
          
          {/* Brand Header Inside White Box */}
          <div className="text-center mb-8">
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
              Login Form
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Enter your registered credentials to access your portal
            </p>
          </div>

          {/* Custom Notification Alert Banner */}
          {alertMessage.text && (
            <div
              className={`mb-6 p-4 rounded-2xl text-sm font-medium transition-all duration-300 text-center ${
                alertMessage.type === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : alertMessage.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}
            >
              {alertMessage.text}
            </div>
          )}

          {loggedInUser ? (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg ring-4 ring-gray-100">
                {loggedInUser.fullName ? loggedInUser.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900">{loggedInUser.fullName}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{loggedInUser.email}</p>
                <span className="inline-block mt-3 px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full border border-gray-200">
                  Role: {loggedInUser.role || 'Client'}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl text-left text-xs space-y-1.5 text-gray-600 border border-gray-100">
                <p><strong>Status:</strong> Active Authenticated Session</p>
                {loggedInUser.createdAt && (
                  <p><strong>Registered On:</strong> {new Date(loggedInUser.createdAt).toLocaleDateString()}</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full bg-black text-white py-3.5 rounded-full font-medium hover:bg-gray-800 active:scale-[0.98] transition duration-300 text-sm shadow-md"
              >
                Log Out
              </button>

              <div className="pt-2 text-center">
                <a href="/" className="text-xs font-semibold text-gray-500 hover:text-black transition">
                  ← Return to Home Page
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Email Address Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your Email"
                  required
                  className="w-full border border-gray-300 rounded-full px-5 py-3 outline-none bg-white hover:border-black focus:border-black focus:ring-2 focus:ring-black/10 text-sm transition-all duration-200"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    className="w-full border border-gray-300 rounded-full px-5 py-3 pr-14 outline-none bg-white hover:border-black focus:border-black focus:ring-2 focus:ring-black/10 text-sm transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-black transition"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1 px-1">
                <label className="flex items-center space-x-2 text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="rounded text-black focus:ring-black border-gray-300 accent-black"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    showAlert('info', 'Password reset instructions have been sent to your email.');
                  }}
                  className="text-black font-semibold hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3.5 rounded-full font-medium hover:bg-gray-800 active:scale-[0.99] transition duration-300 text-sm shadow-md mt-4 disabled:bg-gray-400"
              >
                {isLoading ? 'Verifying Credentials...' : 'Log In'}
              </button>

              {/* Link to Sign Up */}
              <div className="mt-8 text-center border-t border-gray-100 pt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="/signup" className="text-black font-bold hover:underline">
                   Sign Up
                  </a>
                </p>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;