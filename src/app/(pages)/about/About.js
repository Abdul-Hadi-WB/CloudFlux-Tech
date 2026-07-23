'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const About = () => {
  // -------------------------------------------------------------
  // 3D Perspective Hover Logic (Hero Section Style)
  // -------------------------------------------------------------
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg'])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // -------------------------------------------------------------
  // Separate Motion Values for Founder / CEO to avoid hook conflicts
  // -------------------------------------------------------------
  const fx = useMotionValue(0)
  const fy = useMotionValue(0)
  const fMouseXSpring = useSpring(fx, { stiffness: 150, damping: 15 })
  const fMouseYSpring = useSpring(fy, { stiffness: 150, damping: 15 })
  const fRotateX = useTransform(fMouseYSpring, [-0.5, 0.5], ['12deg', '-12deg'])
  const fRotateY = useTransform(fMouseXSpring, [-0.5, 0.5], ['-12deg', '12deg'])

  const handleFounderMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    fx.set((e.clientX - rect.left) / rect.width - 0.5)
    fy.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleFounderMouseLeave = () => { fx.set(0); fy.set(0); }

  const cx = useMotionValue(0)
  const cy = useMotionValue(0)
  const cMouseXSpring = useSpring(cx, { stiffness: 150, damping: 15 })
  const cMouseYSpring = useSpring(cy, { stiffness: 150, damping: 15 })
  const cRotateX = useTransform(cMouseYSpring, [-0.5, 0.5], ['12deg', '-12deg'])
  const cRotateY = useTransform(cMouseXSpring, [-0.5, 0.5], ['-12deg', '12deg'])

  const handleCeoMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    cx.set((e.clientX - rect.left) / rect.width - 0.5)
    cy.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleCeoMouseLeave = () => { cx.set(0); cy.set(0); }

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      
      {/* ======================================================= */}
      {/* BACKGROUND FLOATING PARTICLES                           */}
      {/* ======================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#C9A227]/30 blur-[1px]"
            style={{
              width: `${(i % 3) * 4 + 4}px`,
              height: `${(i % 3) * 4 + 4}px`,
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* ======================================================= */}
      {/* 1. HERO SECTION (Symmetric Tech Brand Layout)           */}
      {/* ======================================================= */}
      <section className="w-full bg-white min-h-screen flex items-center mt-25 relative overflow-hidden">
        {/* Background Premium Decorative Blur Circles */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content Framework */}
            <motion.div 
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col space-y-6"
            >
              <p 
                className="text-sm uppercase font-bold mt-24 animate-fade-in"
                style={{ color: '#C9A227' }}
              >
                WHO WE ARE
              </p>
              
              <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">
                Welcome to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#DAA520]">
                  CloudFlux Tech
                </span>
              </h1>
              
              <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                We provide innovative solutions in Web Development, Digital Marketing,
                Video Editing, and Graphic Designing. Your success is our mission. We craft sophisticated digital solutions that amplify your brand.
              </p>
              
              {/* Dual Action CTA Buttons Overlay */}
              <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                <Link href="/contact" className="group relative overflow-hidden bg-gradient-to-r from-[#C9A227] via-[#DAA520] to-[#C9A227] bg-[length:200%_100] text-black font-semibold text-base px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-white/40">
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
                  <span className="relative z-10 flex items-center">
                    GET STARTED
                    <span className="ml-2 text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12">→</span>
                  </span>
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="absolute inset-0 rounded-full animate-ping bg-[#C9A227]/30"></span>
                  </span>
                </Link>
              </div>
              
              {/* User Trust Avatars Indicator */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                  ))}
                </div>
                <p className="text-sm text-black/60 font-medium">
                  Trusted by <span className="font-bold text-black">50+</span> Global Tech Partners
                </p>
              </div>
            </motion.div>
            
            {/* Right Column - 3D INTERACTIVE TILT IMAGE ARCHITECTURE */}
            <motion.div 
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative flex justify-center items-center h-[450px] md:h-[500px]"
              style={{ perspective: 1200 }}
            >
              {/* Interactive 3D Wrapper */}
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d"
                }}
                className="relative w-full max-w-md h-auto aspect-square flex items-center justify-center cursor-pointer group"
              >
                {/* 3D Depth Rings & Background Orbs */}
                <div 
                  className="absolute w-72 h-72 bg-[#C9A227]/20 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-110"
                  style={{ transform: "translateZ(-80px)" }}
                ></div>
                
                <div
                  className="absolute w-80 h-80 border-2 border-[#C9A227]/30 rounded-full transition-transform duration-500 group-hover:border-[#C9A227]/60"
                  style={{ transform: "translateZ(-40px)" }}
                ></div>

                <div 
                  className="absolute w-96 h-96 border border-dashed border-[#C9A227]/20 rounded-full animate-[spin_60s_linear_infinite]"
                  style={{ transform: "translateZ(-20px)" }}
                ></div>

                {/* Main 3D Floating Image with Pop Effect */}
                <motion.div 
                  className="relative z-10 w-full h-full flex items-center justify-center"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <Image
                    src="/images/transparent_image.png"
                    alt="About CloudFlux Tech Core Visual"
                    width={450}
                    height={450}
                    className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(201,162,39,0.25)] filter saturate-110 transition-all duration-300 group-hover:drop-shadow-[0_35px_45px_rgba(201,162,39,0.4)]"
                    priority
                  />
                </motion.div>

                {/* 3D Floating Glass Accent Badge */}
                <motion.div
                  className="absolute -bottom-2 -right-2 bg-white/80 backdrop-blur-md border border-[#C9A227]/30 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 z-20 pointer-events-none"
                  style={{ transform: "translateZ(90px)" }}
                >
                  <span className="w-3 h-3 rounded-full bg-[#C9A227] animate-ping"></span>
                  <span className="text-xs font-bold text-black tracking-wide">3D Tech Architecture</span>
                </motion.div>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* 2. SERVICES CAPABILITIES GRID SECTION                   */}
      {/* ======================================================= */}
      <section className="w-full bg-gray-50 py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>
              OUR CAPABILITIES
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-black mt-2 leading-tight">
              Driving Digital Transformation Through <br className="hidden md:block"/> Professional Services
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Capability Item: Web Development */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, rotateX: 5, rotateY: -5 }}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-[#C9A227]/30 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                💻
              </div>
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#C9A227] transition-colors">
                Web Development
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Modern websites and highly scalable custom web applications built using latest bleeding-edge frameworks.
              </p>
            </motion.div>

            {/* Capability Item: Social Media Marketing */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, rotateX: 5, rotateY: -5 }}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-[#C9A227]/30 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                📱
              </div>
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#C9A227] transition-colors">
                Social Media
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Grow your brand footprint and engagement metrics exponentially with strategic conversion funnels.
              </p>
            </motion.div>

            {/* Capability Item: Video Editing */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8, rotateX: 5, rotateY: 5 }}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-[#C9A227]/30 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                🎬
              </div>
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#C9A227] transition-colors">
                Video Editing
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                High-end cinematic video post-production tailored flawlessly for enterprise assets and social handles.
              </p>
            </motion.div>

            {/* Capability Item: Graphic Design */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -8, rotateX: 5, rotateY: 5 }}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-[#C9A227]/30 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                🎨
              </div>
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#C9A227] transition-colors">
                Graphic Design
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Stunning vector illustrations and pixel-perfect brand identities that make your product standout instantly.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* FOUNDER SECTION WITH 3D TILT EFFECT                     */}
      {/* ======================================================= */}
      <section className="w-full bg-white py-20 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col space-y-6 order-1"
            >
              <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>FOUNDER&apos;S VISION</p>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">Meet The Mind Behind <br/> CloudFlux Tech</h2>
              <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                Ali Haider, the Founder of CloudFlux Tech, established this venture with a clear vision to redefine digital excellence. His leadership focuses on scaling technical boundaries and fostering top-tier solutions.
              </p>
              <div>
                <span className="text-2xl font-bold italic text-black" style={{ color: '#C9A227' }}>ALI HAIDER - FOUNDER</span>
              </div>
            </motion.div>
            
            {/* Founder 3D Interactive Container */}
            <motion.div 
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative flex flex-col items-center justify-center order-2"
              style={{ perspective: 1200 }}
            >
              <div className="absolute w-64 h-64 bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse"></div>
              
              <motion.div
                onMouseMove={handleFounderMouseMove}
                onMouseLeave={handleFounderMouseLeave}
                style={{
                  rotateX: fRotateX,
                  rotateY: fRotateY,
                  transformStyle: "preserve-3d"
                }}
                className="relative z-10 flex flex-col items-center cursor-pointer group"
              >
                <motion.div style={{ transform: "translateZ(50px)" }}>
                  <Image
                    src="/images/FOUNDER.png"
                    alt="Founder Ali Haider"
                    width={420}
                    height={480}
                    className="w-full h-auto max-w-sm object-contain drop-shadow-2xl transition-all duration-300 group-hover:drop-shadow-[0_25px_35px_rgba(201,162,39,0.35)]"
                    priority
                  />
                </motion.div>
                {/* Professional Bottom Line Effect */}
                <motion.div 
                  style={{ transform: "translateZ(30px)" }}
                  className="w-48 h-1.5 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent mt-[-10px] rounded-full shadow-[0_5px_15px_rgba(201,162,39,0.6)]"
                ></motion.div>
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* CEO SECTION WITH 3D TILT EFFECT                         */}
      {/* ======================================================= */}
      <section className="w-full bg-white py-20 overflow-hidden relative z-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* CEO 3D Interactive Container */}
            <motion.div 
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative flex flex-col items-center justify-center order-2 md:order-1"
              style={{ perspective: 1200 }}
            >
              <div className="absolute w-64 h-64 bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse"></div>
              
              <motion.div
                onMouseMove={handleCeoMouseMove}
                onMouseLeave={handleCeoMouseLeave}
                style={{
                  rotateX: cRotateX,
                  rotateY: cRotateY,
                  transformStyle: "preserve-3d"
                }}
                className="relative z-10 flex flex-col items-center cursor-pointer group"
              >
                <motion.div style={{ transform: "translateZ(50px)" }}>
                  <Image
                    src="/images/CEO1.png"
                    alt="CEO Abdul Hadi"
                    width={420}
                    height={480}
                    className="w-full h-auto max-w-sm object-contain drop-shadow-2xl transition-all duration-300 group-hover:drop-shadow-[0_25px_35px_rgba(201,162,39,0.35)]"
                    priority
                  />
                </motion.div>
                {/* Professional Bottom Line Effect */}
                <motion.div 
                  style={{ transform: "translateZ(30px)" }}
                  className="w-48 h-1.5 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent mt-[-10px] rounded-full shadow-[0_5px_15px_rgba(201,162,39,0.6)]"
                ></motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col space-y-6 order-1 md:order-2"
            >
              <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>CEO'S VISION</p>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">Meet The Visionary Behind <br/> CloudFlux Tech</h2>
              <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                Abdul Hadi, the CEO of CloudFlux Tech, leads company operations and development strategies. Under his guidance, the agency delivers cutting-edge tech architectures worldwide.
              </p>
              <div>
                <span className="text-2xl font-bold italic text-black" style={{ color: '#C9A227' }}>ABDUL HADI - CEO</span>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* 3. CORE BENEFITS & SHOWCASE SECTION (Warm-Tint Accent)   */}
      {/* ======================================================= */}
      <section className="w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="bg-[#FFF8E1] rounded-[2.5rem] p-8 md:p-14 border border-amber-100/40 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A227]/5 rounded-full blur-2xl"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Left Grid Side: Narrative Content Checkmarks */}
              <motion.div 
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 space-y-6"
              >
                <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>
                  THE CLOUDFLUX ADVANTAGE
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
                  Why Leading Tech Companies <br className="hidden md:block" /> Choose CloudFlux Tech
                </h2>
                <p className="text-gray-600 font-medium leading-relaxed max-w-2xl">
                  We are a dedicated core group of high-performance developers and elite designers obsessed with constructing pixel-perfect web layouts and result-driven marketing funnels to scale businesses linearly.
                </p>
                
                {/* Clean Feature Checked Grid Stack */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <li className="flex items-center gap-3 text-black/80 font-semibold">
                    <span className="w-6 h-6 rounded-full bg-[#C9A227]/20 flex items-center justify-center text-xs text-black" style={{ color: '#B08C1F' }}>✓</span>
                    Expert Team Members
                  </li>
                  <li className="flex items-center gap-3 text-black/80 font-semibold">
                    <span className="w-6 h-6 rounded-full bg-[#C9A227]/20 flex items-center justify-center text-xs text-black" style={{ color: '#B08C1F' }}>✓</span>
                    100% Client Satisfaction
                  </li>
                  <li className="flex items-center gap-3 text-black/80 font-semibold">
                    <span className="w-6 h-6 rounded-full bg-[#C9A227]/20 flex items-center justify-center text-xs text-black" style={{ color: '#B08C1F' }}>✓</span>
                    Affordable Pricing Models
                  </li>
                  <li className="flex items-center gap-3 text-black/80 font-semibold">
                    <span className="w-6 h-6 rounded-full bg-[#C9A227]/20 flex items-center justify-center text-xs text-black" style={{ color: '#B08C1F' }}>✓</span>
                    24/7 Dedicated Support
                  </li>
                </ul>
              </motion.div>

              {/* Right Grid Side: Interactive Tech Dashboard with 3D Hover Tilt */}
              <motion.div 
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 w-full relative flex justify-center items-center"
              >
                <div className="absolute inset-0 bg-[#C9A227]/10 blur-3xl rounded-full"></div>
                <motion.div 
                  whileHover={{ rotateY: -10, rotateX: 8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-full aspect-[4/3] rounded-2xl bg-white/70 backdrop-blur-md border border-white p-2 shadow-2xl overflow-hidden relative group cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  
                  {/* Premium Live HTML/CSS Dashboard Integration */}
                  <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-950 to-black p-5 relative flex flex-col justify-between border border-gray-800">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A227]/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-500/10 rounded-full blur-2xl"></div>
                    
                    <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                    {/* Top Row: Header & Status */}
                    <div className="relative z-10 flex justify-between items-center border-b border-gray-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/40 inline-block"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40 inline-block"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/40 inline-block"></span>
                        </div>
                        <span className="text-[10px] font-mono text-gray-500 ml-2">cloudflux_infra v2.6</span>
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/20 animate-pulse">
                        Live Status
                      </span>
                    </div>

                    {/* Middle Row: Charts & Data Visualization */}
                    <div className="relative z-10 grid grid-cols-3 gap-3 my-auto items-end h-28 pt-2">
                      <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                        <div className="w-full bg-gray-800/30 rounded-t-md h-[40%] relative overflow-hidden border border-gray-700/30">
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-500 to-gray-400 h-full"></div>
                        </div>
                        <span className="text-[9px] font-mono text-gray-500">Scale</span>
                      </div>
                      
                      <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                        <div className="w-full bg-gray-800/30 rounded-t-md h-[85%] relative overflow-hidden border border-[#C9A227]/30 shadow-[0_0_15px_rgba(201,162,39,0.15)]">
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#C9A227] to-[#DAA520] h-full"></div>
                        </div>
                        <span className="text-[9px] font-mono text-[#C9A227] font-bold">Growth</span>
                      </div>

                      <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                        <div className="w-full bg-gray-800/30 rounded-t-md h-[60%] relative overflow-hidden border border-gray-700/30">
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-500 to-gray-400 h-full"></div>
                        </div>
                        <span className="text-[9px] font-mono text-gray-500">Funnels</span>
                      </div>
                    </div>

                    {/* Bottom Row: Metrics Footer */}
                    <div className="relative z-10 border-t border-gray-800/80 pt-3 flex justify-between items-center font-mono text-[10px]">
                      <div className="text-gray-500">
                        ⚡ Latency: <span className="text-white font-bold">12ms</span>
                      </div>
                      <div className="text-gray-500">
                        Uptime: <span className="text-[#C9A227] font-bold">99.9%</span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
      
      {/* ======================================================= */}
      {/* 4. ENTERPRISE CONVERSION CALL TO ACTION (CTA)           */}
      {/* ======================================================= */}
      <section className="w-full bg-white py-16 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-500 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Contact us today and let&apos;s discuss how we can engineer tailored workflows to scale your conversion metrics instantly.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 justify-center">
              <Link href="/contact" className="group relative overflow-hidden bg-gradient-to-r from-[#C9A227] via-[#DAA520] to-[#C9A227] bg-[length:200%_100] text-black font-semibold text-base px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-white/40">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
                <span className="relative z-10 flex items-center">
                  GET STARTED
                  <span className="ml-2 text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12">→</span>
                </span>
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute inset-0 rounded-full animate-ping bg-[#C9A227]/30"></span>
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default About