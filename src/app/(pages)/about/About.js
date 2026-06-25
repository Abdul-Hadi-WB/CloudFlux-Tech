'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* ======================================================= */}
      {/* 1. HERO SECTION (Symmetric Tech Brand Layout)            */}
      {/* ======================================================= */}
      <section className="w-full bg-white min-h-screen flex items-center mt-25 relative overflow-hidden">
        {/* Background Premium Decorative Blur Circles */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content Framework */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
                {/* Primary Button with Glass Shimmer & Ping Effects */}
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
            
            {/* Right Column - Brand Creative Graphic Architecture */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center items-center h-[450px] md:h-[500px]"
            >
              <div className="absolute w-72 h-72 bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute w-80 h-80 border border-[#C9A227]/20 rounded-full"></div>
              <div className="absolute w-96 h-96 border border-dashed border-gray-200 rounded-full animate-[spin_60s_linear_infinite]"></div>
              
              <div className="relative z-10 w-full max-w-md h-auto aspect-square flex items-center justify-center">
                <Image
                  src="/images/transparent_image.png"
                  alt="About CloudFlux Tech Core Visual"
                  width={450}
                  height={450}
                  className="w-full h-auto object-contain drop-shadow-2xl filter saturate-110"
                  priority
                />
              </div>
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-[#C9A227]/30 hover:shadow-xl transition-all duration-300"
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-[#C9A227]/30 hover:shadow-xl transition-all duration-300"
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-[#C9A227]/30 hover:shadow-xl transition-all duration-300"
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-[#C9A227]/30 hover:shadow-xl transition-all duration-300"
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
      {/* 3. CORE BENEFITS & SHOWCASE SECTION (Warm-Tint Accent)   */}
      {/* ======================================================= */}
      <section className="w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="bg-[#FFF8E1] rounded-[2.5rem] p-8 md:p-14 border border-amber-100/40 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A227]/5 rounded-full blur-2xl"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Left Grid Side: Narrative Content Checkmarks */}
              <div className="lg:col-span-7 space-y-6">
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
              </div>

              {/* Right Grid Side: Interactive Tech Dashboard (Replaces image_303006.png placeholder) */}
              <div className="lg:col-span-5 w-full relative flex justify-center items-center">
                <div className="absolute inset-0 bg-[#C9A227]/10 blur-3xl rounded-full"></div>
                <div className="w-full aspect-[4/3] rounded-2xl bg-white/70 backdrop-blur-md border border-white p-2 shadow-xl overflow-hidden relative group">
                  
                  {/* Premium Live HTML/CSS Dashboard Integration */}
                  <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-950 to-black p-5 relative flex flex-col justify-between border border-gray-800">
                    {/* Decorative Glowing Orbs */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A227]/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-500/10 rounded-full blur-2xl"></div>
                    
                    {/* Tech Grid Background Effect */}
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
                      {/* Bar 1 */}
                      <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                        <div className="w-full bg-gray-800/30 rounded-t-md h-[40%] relative overflow-hidden border border-gray-700/30">
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-500 to-gray-400 h-full"></div>
                        </div>
                        <span className="text-[9px] font-mono text-gray-500">Scale</span>
                      </div>
                      {/* Bar 2 (Featured Gold Bar) */}
                      <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                        <div className="w-full bg-gray-800/30 rounded-t-md h-[85%] relative overflow-hidden border border-[#C9A227]/30 shadow-[0_0_15px_rgba(201,162,39,0.15)]">
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#C9A227] to-[#DAA520] h-full"></div>
                        </div>
                        <span className="text-[9px] font-mono text-[#C9A227] font-bold">Growth</span>
                      </div>
                      {/* Bar 3 */}
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

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* 4. ENTERPRISE CONVERSION CALL TO ACTION (CTA)           */}
      {/* ======================================================= */}
      <section className="w-full bg-white py-16 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-500 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Contact us today and let's discuss how we can engineer tailored workflows to scale your conversion metrics instantly.
          </p>

          {/* Dual Action CTA Buttons Overlay (Centered perfectly) */}
          <div className="flex flex-wrap gap-4 pt-2 justify-center">
            {/* Primary Button with Glass Shimmer & Ping Effects */}
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
              
        </div>
      </section>

    </div>
  )
}

export default About