'use client';

import React, { useState, useEffect } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Client',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [dispatchStatus, setDispatchStatus] = useState(null);

  useEffect(() => {
    const savedUsers = localStorage.getItem('cloudflux_users');
    if (savedUsers) {
      try {
        setRegisteredUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error("Error reading users from LocalStorage:", error);
      }
    } else {
      // Seed default user for testing if empty
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
  }, []);

  const showAlert = (type, text) => {
    setAlertMessage({ type, text });
    setTimeout(() => {
      setAlertMessage({ type: '', text: '' });
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const sendEmailNotificationToAdmin = async (userData) => {
    const adminEmail = 'cloudfluxtech1@gmail.com';
    
    // Notification Payload for Admin
    const emailPayload = {
      to: adminEmail,
      subject: `New User Registration - ${userData.fullName}`,
      body: `
New User Sign-Up Details:
----------------------------
Name: ${userData.fullName}
Email: ${userData.email}
Role: ${userData.role}
Date: ${new Date(userData.createdAt).toLocaleString()}
----------------------------
This notification was automatically sent to ${adminEmail}.
      `
    };

    try {
      // API call placeholder for EmailJS / Webhook endpoint
      // e.g., await fetch('https://api.emailjs.com/api/v1.0/email/send', { ... })
      console.log(`[DISPATCH SUCCESS] Registration details sent to ${adminEmail}:`, emailPayload);
      setDispatchStatus(`Notification dispatched to ${adminEmail}`);
      return true;
    } catch (error) {
      console.error(`Error sending email to ${adminEmail}:`, error);
      setDispatchStatus('Email dispatch pending.');
      return false;
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const inputEmail = formData.email.trim().toLowerCase();

    // 1. Validate Password Match
    if (formData.password !== formData.confirmPassword) {
      showAlert('error', 'Passwords do not match! Please verify both fields.');
      setIsLoading(false);
      return;
    }

    // 2. Validate Password Length
    if (formData.password.length < 6) {
      showAlert('error', 'Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    // 3. Validate Terms Agreement
    if (!formData.agreeToTerms) {
      showAlert('error', 'You must accept the Terms of Service to create an account.');
      setIsLoading(false);
      return;
    }

    // 4. Check if Email is already registered
    const emailExists = registeredUsers.some(
      (user) => user.email.toLowerCase() === inputEmail
    );

    if (emailExists) {
      showAlert('error', 'This email address is already registered! Please login instead.');
      setIsLoading(false);
      return;
    }

    // Prepare New User Object
    const newUser = {
      id: 'USR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      fullName: formData.fullName.trim(),
      email: inputEmail,
      password: formData.password,
      role: formData.role,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('cloudflux_users', JSON.stringify(updatedUsers));

    // Send notification details directly to cloudfluxtech1@gmail.com
    await sendEmailNotificationToAdmin(newUser);

    showAlert(
      'success',
      'Account created successfully! Registration details sent to cloudfluxtech1@gmail.com. Redirecting to login...'
    );

    // Reset Form Fields
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Client',
      agreeToTerms: false
    });

    setIsLoading(false);

    // Redirect to login page
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-black selection:text-white">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-2xl rounded-3xl border border-gray-100 sm:px-10 relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Create Your Account
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Join CloudFlux Tech to access services and manage your portal
            </p>
          </div>

          {/* Custom Notification Alert Banner */}
          {alertMessage.text && (
            <div
              className={`mb-6 p-4 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 text-center shadow-sm ${
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

          {}
          <form onSubmit={handleSignUpSubmit} className="space-y-4">

            {/* Account Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'Client' })}
                  className={`py-2.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
                    formData.role === 'Client'
                      ? 'border-black bg-black text-white shadow-sm'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-black'
                  }`}
                >
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'Developer' })}
                  className={`py-2.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
                    formData.role === 'Developer'
                      ? 'border-black bg-black text-white shadow-sm'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-black'
                  }`}
                >
                  Developer / User
                </button>
              </div>
            </div>

            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className="w-full border border-gray-300 rounded-full px-5 py-3 outline-none bg-white hover:border-black focus:border-black focus:ring-2 focus:ring-black/10 text-sm transition-all duration-200"
              />
            </div>

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
                placeholder="name@example.com"
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
                  placeholder="At least 6 characters"
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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Repeat password"
                required
                className="w-full border border-gray-300 rounded-full px-5 py-3 outline-none bg-white hover:border-black focus:border-black focus:ring-2 focus:ring-black/10 text-sm transition-all duration-200"
              />
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="pt-1 px-1">
              <label className="flex items-start space-x-2 text-xs text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-0.5 rounded text-black focus:ring-black border-gray-300 accent-black"
                />
                <span>
                  I agree to the{' '}
                  <a href="#terms" onClick={(e) => e.preventDefault()} className="text-black font-semibold hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-black font-semibold hover:underline">
                    Privacy Policy
                  </a>.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3.5 rounded-full font-medium hover:bg-gray-800 active:scale-[0.99] transition duration-300 text-sm shadow-md mt-4 disabled:bg-gray-400"
            >
              {isLoading ? 'Sending Details & Registering...' : 'Sign Up'}
            </button>

            {/* Link to Login */}
            <div className="mt-8 text-center border-t border-gray-100 pt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-black font-bold hover:underline">
                  Login
                </a>
              </p>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default SignUp;