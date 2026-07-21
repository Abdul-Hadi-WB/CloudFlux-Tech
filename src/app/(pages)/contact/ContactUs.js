'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import Link from "next/link";

// Simple particle system (future use if needed)
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
    <section className="w-full bg-white pt-12 pb-12 sm:pt-20 sm:pb-20 lg:py-24 px-4 sm:px-6 mt-12 sm:mt-16 lg:mt-20">
      <div className="max-w-full lg:max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3 sm:mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-2 sm:px-0 text-sm sm:text-base">
            Team CloudFlux Tech is just a click away from you. Connect with us to get
            solutions to your business growth, market existence, and sustainability.
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16">

          {/* LEFT SIDE: PROJECT FORM */}
          <div>
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
          </div>

          {/* RIGHT SIDE: AUTH BUTTONS & LARGE IMAGE */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-5 sm:mb-6">
              Join or Access Your Account
            </h3>

            {/* SIGN UP & LOGIN BUTTONS */}
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

            {/* FULL SIZE IMAGE */}
            <div className="w-full flex justify-center">
              <img
                src="/images/Contactlogo.png"
                alt="Fantasy Characters"
                className="w-full h-auto object-contain mt-6 sm:mt-8 lg:mt-10"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;