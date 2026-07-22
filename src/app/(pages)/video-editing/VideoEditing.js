'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'

// Helper component for 3D Interactive Card Effect on Side Images
const Card3D = ({ children, className = '' }) => {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-150, 150], [12, -12])
  const rotateY = useTransform(x, [-150, 150], [-12, 12])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  )
}

const VideoEditing = () => {
  const containerRef = useRef(null)
  const heroSectionRef = useRef(null)
  const heroVideoRef = useRef(null)
  const portfolioVideoRef = useRef(null)

  const [heroMuted, setHeroMuted] = useState(true) // Default true rakha hai taake autoplay policy block na kare
  const [portfolioMuted, setPortfolioMuted] = useState(true)

  const videoPath = '/images/video1.mp4'

  // Video Editing Services Data
  const services = [
    { name: "Corporate Video Editing", icon: "🏢", price: "Starting at $199" },
    { name: "YouTube Content Editing", icon: "▶️", price: "Starting at $149" },
    { name: "Social Media Reels/Shorts", icon: "📱", price: "Starting at $99" },
    { name: "Motion Graphics & VFX", icon: "✨", price: "Starting at $299" },
  ]

  // Video Editing Specific Services
  const videoServices = [
    {
      title: "Professional Video Editing",
      description: "Transform raw footage into polished, engaging videos. From cutting and transitions to color grading and audio mixing, we deliver professional results that captivate your audience.",
      icon: "🎬"
    },
    {
      title: "Motion Graphics & Animation",
      description: "Add dynamic motion graphics, lower thirds, intros, outros, and animated elements that make your videos stand out and communicate your message effectively.",
      icon: "🎨"
    },
    {
      title: "Social Media Content Creation",
      description: "Eye-catching short-form content optimized for TikTok, Instagram Reels, YouTube Shorts, and Facebook. Trend-aware editing that stops the scroll and drives engagement.",
      icon: "📲"
    }
  ]

  // Force play video on mount or when ref is ready
  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch((error) => {
        console.log("Hero video autoplay prevented:", error)
      })
    }
  }, [])

  // Advanced Scroll Detection to Auto-Mute Hero Video
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setHeroMuted(true)
        }
      },
      { threshold: 0.15 }
    )

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Mouse parallax effect for hero mockup
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8])
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <>
      {/* Main Video Editing Section */}
      <motion.section 
        ref={heroSectionRef} 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-white py-24 relative overflow-hidden"
      >
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Services */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col space-y-6"
            >
              <p 
                className="text-sm uppercase font-bold mt-24"
                style={{ color: '#C9A227' }}
              >
                Video Editing
              </p>
              
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">
                Transform Your Raw Footage<br/>Into Captivating Stories
              </h2>
              
              <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                From corporate videos and YouTube content to social media reels and motion graphics, 
                we bring your vision to life with professional editing, stunning effects, and 
                engaging storytelling that keeps viewers coming back.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:border-[#C9A227]/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-black text-base mb-1">
                          {service.name}
                        </h3>
                        <p className="text-sm font-medium italic text-[#064cbe]">
                          {service.price}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <button className="group relative overflow-hidden bg-gradient-to-r from-[#C9A227] via-[#DAA520] to-[#C9A227] bg-[length:200%_100] hover:from-[#B08C1F] hover:via-[#C9A227] hover:to-[#B08C1F] text-black font-semibold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-white/40">
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
                  <span className="relative z-10 flex items-center">
                    START YOUR PROJECT
                    <span className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12">→</span>
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-black/60">
                    <span className="font-bold text-black">300+</span> Videos Edited
                  </p>
                  <p className="text-xs text-gray-400">10M+ Total Views</p>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column - Laptop Mockup with Live Video Streaming */}
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative flex justify-center items-center perspective-1000 sticky top-24"
            >
              <motion.div 
                className="relative w-full max-w-xl z-10"
                style={{ rotateX, rotateY }}
                transition={{ type: "spring", damping: 30 }}
              >
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-black/80 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-white font-medium">EDITING REEL</span>
                  </div>
                </div>
                
                <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-2xl p-4 shadow-2xl">
                  <div className="relative bg-black rounded-xl overflow-hidden shadow-inner aspect-[16/9]">
                    <video
                      ref={heroVideoRef}
                      src={videoPath}
                      autoPlay
                      loop
                      playsInline
                      muted={heroMuted}
                      preload="auto"
                      className="w-full h-full object-cover"
                    />

                    <button
                      onClick={() => setHeroMuted(!heroMuted)}
                      className="absolute bottom-3 right-3 z-30 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-black hover:scale-110 transition-all shadow-md"
                      title={heroMuted ? "Unmute Sound" : "Mute Sound"}
                    >
                      {heroMuted ? "🔇" : "🔊"}
                    </button>
                    
                    <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent" />
                    </div>
                  </div>
                  
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-black/80 rounded-full z-10">
                    <div className="w-2 h-2 bg-gray-600 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-2xl p-3 shadow-xl">
                  <div className="bg-gray-900 rounded-xl p-3">
                    <div className="grid grid-cols-12 gap-1 mb-3">
                      {[...Array(48)].map((_, i) => (
                        <div key={i} className="h-2 bg-gray-700 rounded-sm shadow-inner"></div>
                      ))}
                    </div>
                    <div className="grid grid-cols-8 gap-1 mb-2">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="h-2 bg-gray-700 rounded-sm"></div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-3 bg-gray-700 rounded-full"></div>
                      <div className="w-20 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      </div>
                      <div className="w-12 h-3 bg-gray-700 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -inset-4 bg-gradient-to-r from-[#C9A227]/20 via-transparent to-amber-500/20 blur-2xl -z-10 rounded-3xl" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* PORTFOLIO SHOWCASE */}
      <motion.section 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-gray-50 py-24 overflow-hidden border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-5 text-center mb-12">
          <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>
            Our Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-black mt-2">
            Our Recent Portfolio
          </h2>
        </div>

        <div className="max-w-4xl mx-auto px-5 relative">
          <div className="w-full overflow-hidden rounded-2xl shadow-xl bg-white p-2 border border-gray-100 relative group">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black">
              <video
                ref={portfolioVideoRef}
                src={videoPath}
                autoPlay
                loop
                playsInline
                muted={portfolioMuted}
                preload="auto"
                className="w-full h-full object-contain"
              />

              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={() => setPortfolioMuted(!portfolioMuted)}
                  className="w-11 h-11 rounded-full bg-black/80 border border-white/20 text-white text-lg flex items-center justify-center hover:bg-black hover:scale-110 transition-all shadow-lg"
                  title={portfolioMuted ? "Unmute Portfolio" : "Mute Portfolio"}
                >
                  {portfolioMuted ? "🔇" : "🔊"}
                </button>
              </div>

              <div className="absolute top-4 left-4 bg-black/70 border border-[#C9A227]/40 rounded px-3 py-1 text-xs text-white tracking-widest font-semibold backdrop-blur-sm">
                4K SHOWCASE PREVIEW
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Video Editing Services Section */}
      <motion.section 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-white py-16 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
              Professional video post-production
            </h2>
            <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-3xl mx-auto mt-4">
              Get professional video editing services that elevate your content, engage your audience, 
              and tell your story with cinematic quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {videoServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-[#C9A227]/10 rounded-full flex items-center justify-center">
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Expert Section - Video Editing */}
      <motion.section 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full py-16 bg-[#FFF8E1]"
      >
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="bg-gradient-to-r from-[#C9A227] to-[#a1831f] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start gap-8 shadow-lg">
            <div className="flex-shrink-0 flex flex-col items-center -mt-2">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src="/images/video-editor.jpg"
                  alt="Bilal Akhtar"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-3 text-center">
                <h4 className="font-bold text-white text-base">Bilal Akhtar</h4>
                <p className="text-white/80 text-xs">Lead Video Editor</p>
              </div>
            </div>

            <div className="text-white flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Who you'll be speaking with:
              </h3>
              <ul className="space-y-2 mb-5">
                <li className="flex items-center gap-2">
                  <span className="text-white">✔</span> 4+ Years in Video Editing & Post-Production
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✔</span> Expert in Premiere Pro, After Effects & DaVinci Resolve
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✔</span> Specialized in Color Grading & Audio Mixing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✔</span> 200+ YouTube & Social Media Videos Produced
                </li>
              </ul>
              <p className="italic text-sm md:text-base leading-relaxed mb-4">
              “Video is the most powerful medium for storytelling. My passion is taking raw footage and transforming it into compelling narratives that capture emotions, hold attention, and drive action. Every cut, transition, and effect serves the story we're telling together.”
              </p>
              <p className="text-sm md:text-base leading-relaxed">
              At CloudFlux Tech, we understand that great video editing can make or break your content. We work closely with you to understand your vision, brand voice, and target audience. From pacing and rhythm to color grading and sound design, every detail is meticulously crafted to deliver professional results that stand out in today's crowded digital landscape.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Video Editing Expertise Section with 3D Card Effect on Side Image */}
      <motion.section 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-white py-16 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6 order-1">
              <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>
                POST-PRODUCTION EXPERTISE
              </p>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">
                Cinematic quality<br/>that captures attention
              </h2>
              <div className="space-y-5">
                <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                  In a world where video content dominates, quality editing separates professionals from amateurs. We combine technical expertise with creative storytelling to produce videos that not only look stunning but also drive engagement, build trust, and convert viewers into customers.
                </p>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Side Image with 3D Card Effect */}
            <Card3D className="relative flex items-center justify-center w-full ml-auto max-w-2xl"> 
              <div className="absolute w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute w-[500px] h-[500px] border border-[#C9A227]/20 rounded-full"></div>
              
              <div className="relative">
                <Image
                  src="/images/Editing.png"
                  alt="Editing Expertise"
                  width={1200}
                  height={1200}
                  className="w-full h-auto object-contain relative z-10 drop-shadow-xl" 
                />
              </div>
            </Card3D>
          </div>
        </div>
      </motion.section>

      {/* Video Editing Pricing Section */}
      <motion.section 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-[#FFF8E1] py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm uppercase font-bold tracking-wider mb-3 inline-block px-4 py-1.5 rounded-full bg-[#C9A227]/10" style={{ color: '#C9A227' }}>
              OUR PLANS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mt-4">
              Video editing pricing
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4">
              Choose the perfect video editing package for your content needs. All packages include professional editing and rapid delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">📹</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Basic Edit</h3>
                <p className="text-gray-500 mb-6">For short-form content</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">$149</span>
                  <span className="text-gray-500"> per video</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Up to 5 minutes footage</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Basic cuts & transitions</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Audio syncing & mixing</span></li>
                  <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">—</span><span className="text-gray-400">Motion graphics</span></li>
                </ul>
              </div>
              <div className="p-8 pt-0">
                <button className="w-full py-3 rounded-full border-2 border-[#C9A227] text-black font-semibold hover:bg-[#C9A227] hover:text-white transition-all duration-300">
                  GET STARTED
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border-2 border-[#C9A227]/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative flex flex-col justify-between"
            >
              <div className="absolute top-0 inset-x-0 bg-[#C9A227] text-black text-center py-1.5 text-sm font-semibold tracking-wide">
                MOST POPULAR
              </div>
              <div className="p-8 pt-12">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🎬</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Pro Edit</h3>
                <p className="text-gray-500 mb-6">For YouTube & social media</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">$299</span>
                  <span className="text-gray-500"> per video</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Up to 15 minutes footage</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Advanced transitions & effects</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Color grading & correction</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Custom thumbnails</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Basic motion graphics</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Captions & subtitles</span></li>
                </ul>
              </div>
              <div className="p-8 pt-0">
                <button className="w-full py-3 rounded-full bg-[#C9A227] text-black font-semibold hover:bg-[#B08C1F] transition-all duration-300 shadow-md flex items-center justify-center gap-2 group">
                  LEARN MORE 
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🎥</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Premium Edit</h3>
                <p className="text-gray-500 mb-6">For professional projects</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">Custom</span>
                  <span className="text-gray-500"> pricing</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Unlimited footage length</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Advanced motion graphics & VFX</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Professional color grading</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">3D animations & effects</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Sound design & mastering</span></li>
                </ul>
              </div>
              <div className="p-8 pt-0">
                <button className="w-full py-3 rounded-full border-2 border-[#C9A227] text-black font-semibold hover:bg-[#C9A227] hover:text-white transition-all duration-300">
                  CONTACT US
                </button>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm">
              Need a custom video package? <a href="#" className="text-[#C9A227] font-semibold hover:underline">Book a consultation →</a>
            </p>
          </div>
        </div>
      </motion.section>
    </>
  )
}

export default VideoEditing