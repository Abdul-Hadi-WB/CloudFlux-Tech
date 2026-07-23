'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import Link from "next/link";
import { motion } from 'framer-motion';

// Simple particle system
const Particles = () => {
  const particlesRef = useRef();
  const count = 1500;

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 10 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count]);

  const colors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const color = new THREE.Color();
      color.setHSL(0.65, 0.4, 0.4);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    return colors;
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      particlesRef.current.rotation.x = time * 0.01;
      particlesRef.current.rotation.y = time * 0.005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
};

const ContactUs = () => {
  // Active User State for Auth Check
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const sessionUser = localStorage.getItem('cloudflux_active_user') || sessionStorage.getItem('cloudflux_active_user');
    if (sessionUser) {
      try {
        setActiveUser(JSON.parse(sessionUser));
      } catch (e) {
        console.error("Error parsing active user session:", e);
      }
    }
  }, []);

  // Handle Logout from Contact Us page
  const handleLogout = () => {
    localStorage.removeItem('cloudflux_active_user');
    sessionStorage.removeItem('cloudflux_active_user');
    setActiveUser(null);
  };

  // Project Form States
  const [projectForm, setProjectForm] = useState({
    name: '',
    email: '',
    service: 'Category',
    budget: '',
    details: ''
  });

  // Loading State for Project Form Submission
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);

  // Handle Project Form Inputs
  const handleProjectChange = (e) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  };

  // Submit Project Form to Email
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingProject(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/cloudfluxtech1@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Form_Type: "New Project Inquiry",
          Client_Name: projectForm.name,
          Client_Email: projectForm.email,
          Requested_Service: projectForm.service,
          Estimated_Budget: projectForm.budget,
          Project_Details: projectForm.details
        })
      });

      if (response.ok) {
        alert("Project Details submitted successfully! Check your email.");
        setProjectForm({ name: '', email: '', service: 'Category', budget: '', details: '' });
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network Error! Form submit nahi ho saka.");
    } finally {
      setIsSubmittingProject(false);
    }
  };

  return (
    <section className="w-full bg-white pt-12 pb-12 sm:pt-20 sm:pb-20 lg:py-24 px-4 sm:px-6 mt-12 sm:mt-16 lg:mt-20 overflow-hidden">
      <div className="max-w-full lg:max-w-6xl mx-auto">

        {/* Heading with Fade-in Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3 sm:mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-2 sm:px-0 text-sm sm:text-base">
            Team CloudFlux Tech is just a click away from you. Connect with us to get
            solutions to your business growth, market existence, and sustainability.
          </p>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-start">

          {/* LEFT SIDE: PROJECT FORM */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-5 sm:mb-6">
              Share your demands and Quries with us
            </h3>

            <form onSubmit={handleProjectSubmit} className="space-y-3 sm:space-y-4">
              <input 
                type="text" 
                name="name"
                value={projectForm.name}
                onChange={handleProjectChange}
                placeholder="Name" 
                required
                className="w-full border border-gray-300 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 outline-none hover:border-black focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 text-sm sm:text-base" 
              />
              
              <input 
                type="email"
                name="email"
                value={projectForm.email}
                onChange={handleProjectChange}
                placeholder="Email Address" 
                required
                className="w-full border border-gray-300 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 outline-none hover:border-black focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 text-sm sm:text-base" 
              />

              <select 
                name="service"
                value={projectForm.service}
                onChange={handleProjectChange}
                required
                className="w-full border border-gray-300 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 outline-none hover:border-black focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 text-gray-500 text-sm sm:text-base appearance-none bg-white pr-12 sm:pr-14 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siPjxwYXRoIGQ9Ik03IDEwbDUgNSA1LTV6Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem] bg-[length:30px]"
              >
                <option value="Category" disabled hidden>Category</option>
                <option value="Game Development">Game Development</option>
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
              </select>

              <input 
                type="text" 
                name="budget"
                value={projectForm.budget}
                onChange={handleProjectChange}
                placeholder="Approx Budget" 
                className="w-full border border-gray-300 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 outline-none hover:border-black focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 text-sm sm:text-base" 
              />

              <textarea 
                name="details"
                value={projectForm.details}
                onChange={handleProjectChange}
                placeholder="Project Details" 
                rows={4} 
                required
                className="w-full border border-gray-300 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 outline-none hover:border-black focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 resize-none text-sm sm:text-base"
              ></textarea>

              <button 
                type="submit"
                disabled={isSubmittingProject}
                className="bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:scale-105 transition w-full text-sm sm:text-base font-medium disabled:bg-gray-400"
              >
                {isSubmittingProject ? "Sending..." : "Submit Project"}
              </button>
            </form>
          </motion.div>

          {/* RIGHT SIDE: AUTH OR USER PROFILE & IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            {activeUser ? (
              <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md">
                  {activeUser.fullName ? activeUser.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <h3 className="text-lg font-bold text-gray-900">Welcome, {activeUser.fullName}!</h3>
                <p className="text-xs text-gray-500 mt-1">{activeUser.email}</p>
                <div className="mt-3 inline-block px-3 py-1 bg-white border border-gray-200 text-gray-800 text-xs font-semibold rounded-full shadow-2xs">
                  Active Session ({activeUser.role || 'Client'})
                </div>
                <div className="mt-5">
                  <button
                    onClick={handleLogout}
                    className="text-xs text-red-600 font-semibold hover:underline bg-white border border-red-200 px-4 py-2 rounded-full shadow-2xs transition"
                  >
                    Log Out from Session
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-lg sm:text-xl font-semibold mb-5 sm:mb-6">
                  Join or Access Your Account
                </h3>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <Link 
                    href="/signup" 
                    className="bg-black text-white text-center py-2.5 sm:py-3 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base"
                  >
                    Sign Up
                  </Link>

                  <Link 
                    href="/login" 
                    className="border border-black text-black text-center py-2.5 sm:py-3 rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300 text-sm sm:text-base"
                  >
                    Login
                  </Link>
                </div>
              </>
            )}

            {/* FULL SIZE IMAGE */}
            <div className="w-full flex justify-center">
              <img
                src="/images/Contactlogo.png"
                alt="Fantasy Characters"
                className="w-full h-auto object-contain mt-2 sm:mt-4 lg:mt-6"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;