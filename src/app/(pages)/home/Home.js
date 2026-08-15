'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Code, 
  Palette, 
  Rocket, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  Users,
  Briefcase,
  Award,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'

// --- Interactive 3D Tilt Wrapper for Images & Cards ---
function Card3D({ children, className = "", sensitivity = 15 }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    card.style.transform = `perspective(1000px) rotateX(${-y / sensitivity}deg) rotateY(${x / sensitivity}deg) scale3d(1.05, 1.05, 1.05)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out preserve-3d cursor-pointer ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

// --- Flip Card Component - FIXED ---
function FlipCard({ children, delay = 0 }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full w-full"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className="relative w-full h-full transition-all duration-700"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '280px'
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

// --- Main Page Component ---
const Home = () => {
  return (
    <div className="bg-white min-h-screen relative overflow-hidden">

      {/* 1st Hero Section with Video Background */}
      <section className="w-full min-h-screen flex items-center relative overflow-hidden py-20 z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="/images/PixVerse_V6_Image_Text_540P_Use_the_uploaded_s.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/40 z-[1]"></div>

        <div className="absolute top-20 right-0 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl z-[1]"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl z-[1]"></div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-5"
            >
              <p className="text-sm uppercase font-bold animate-fade-in tracking-wider" style={{ color: '#C9A227' }}>
                DIGITAL & TECH AGENCY
              </p>

              <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Power Up Your Digital<br /> Growth With Smart<br /> Technology
              </h1>

              <p className="text-xl md:text-xl font-medium text-gray-200 leading-relaxed max-w-lg">
                Entrust CloudFlux Tech with your web development, graphic design,
                digital marketing, and SEO projects. We craft sophisticated digital
                solutions that amplify your brand and drive measurable growth
                delivering results that matter.
              </p>

              <div className="pt-3">
                <Link
                  href="/consultations"
                  className="group relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#C9A227] via-[#DAA520] to-[#C9A227] bg-[length:200%_100] hover:from-[rgb(176,140,31)] hover:via-[#C9A227] hover:to-[#B08C1F] text-black font-semibold text-base px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-white/40"
                  style={{ backgroundSize: '200% 100%' }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
                  <span className="relative z-10 flex items-center">
                    REQUEST A CONSULTATION
                    <span className="ml-2 text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12">→</span>
                  </span>
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="absolute inset-0 rounded-full animate-ping bg-[#C9A227]/30"></span>
                  </span>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                  ))}
                </div>
                <p className="text-sm text-gray-200">
                  <span className="font-bold text-white">50+</span> Happy Clients
                </p>
              </div>
            </motion.div>

            {/* Right Column - Empty Container / Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center items-center h-[500px] md:h-[550px]"
            >
              <div className="absolute w-64 h-64 bg-[#C9A227]/20 rounded-full blur-3xl animate-pulse"></div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Section - Flip Cards - FIXED */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full bg-white py-12 md:py-16 relative z-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="bg-[#FFF8E1] rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
          
            {/* Decorative Background */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#C9A227]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#C9A227]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
              
              {/* Card 1 - 1+ Years */}
              <FlipCard delay={0}>
                {/* Front Side */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 w-full h-full flex flex-col items-center justify-center group hover:border-[#C9A227]/30">
                    <div className="flex justify-center mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A227]/20 to-[#C9A227]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Clock className="w-7 h-7 text-[#C9A227]" />
                      </div>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-black mb-1 bg-gradient-to-r from-[#C9A227] to-[#DAA520] bg-clip-text text-transparent">
                      1+
                    </div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Years in Business</p>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#C9A227] to-transparent mx-auto mt-3 rounded-full group-hover:w-16 transition-all duration-300"></div>
                    <p className="text-xs text-gray-400 mt-2">Hover to flip →</p>
                  </div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="bg-gradient-to-br from-[#C9A227]/10 to-[#DAA520]/10 rounded-2xl shadow-xl p-6 md:p-8 text-center border border-[#C9A227]/20 w-full h-full flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A227] to-[#DAA520] flex items-center justify-center mb-4 shadow-lg shadow-[#C9A227]/30">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2">Established 2026</h3>
                    <p className="text-sm text-gray-600">Building trust and delivering excellence since day one.</p>
                    <div className="mt-3 inline-block px-3 py-1 bg-[#C9A227]/10 rounded-full">
                      <span className="text-[10px] font-semibold text-[#C9A227] tracking-wider">★ TRUSTED</span>
                    </div>
                  </div>
                </div>
              </FlipCard>

              {/* Card 2 - 10+ Websites */}
              <FlipCard delay={0.1}>
                {/* Front Side */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 w-full h-full flex flex-col items-center justify-center group hover:border-[#C9A227]/30">
                    <div className="flex justify-center mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A227]/20 to-[#C9A227]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-[#C9A227]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2h6v2h-6V6zm0 4h6v2h-6v-2zm-6 0h4v2H6v-2zm10 4h-4v-2h4v2zm-10 0h4v2H6v-2z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-black mb-1 bg-gradient-to-r from-[#C9A227] to-[#DAA520] bg-clip-text text-transparent">
                      10+
                    </div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Websites Managed</p>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#C9A227] to-transparent mx-auto mt-3 rounded-full group-hover:w-16 transition-all duration-300"></div>
                    <p className="text-xs text-gray-400 mt-2">Hover to flip →</p>
                  </div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="bg-gradient-to-br from-[#C9A227]/10 to-[#DAA520]/10 rounded-2xl shadow-xl p-6 md:p-8 text-center border border-[#C9A227]/20 w-full h-full flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A227] to-[#DAA520] flex items-center justify-center mb-4 shadow-lg shadow-[#C9A227]/30">
                      <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2">Live Projects</h3>
                    <p className="text-sm text-gray-600">Successfully launched and managing 10+ websites.</p>
                    <div className="mt-3 inline-block px-3 py-1 bg-[#C9A227]/10 rounded-full">
                      <span className="text-[10px] font-semibold text-[#C9A227] tracking-wider">✓ ACTIVE</span>
                    </div>
                  </div>
                </div>
              </FlipCard>

              {/* Card 3 - 20+ Partners */}
              <FlipCard delay={0.2}>
                {/* Front Side */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 w-full h-full flex flex-col items-center justify-center group hover:border-[#C9A227]/30">
                    <div className="flex justify-center mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A227]/20 to-[#C9A227]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-7 h-7 text-[#C9A227]" />
                      </div>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-black mb-1 bg-gradient-to-r from-[#C9A227] to-[#DAA520] bg-clip-text text-transparent">
                      20+
                    </div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Reseller Partners</p>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#C9A227] to-transparent mx-auto mt-3 rounded-full group-hover:w-16 transition-all duration-300"></div>
                    <p className="text-xs text-gray-400 mt-2">Hover to flip →</p>
                  </div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="bg-gradient-to-br from-[#C9A227]/10 to-[#DAA520]/10 rounded-2xl shadow-xl p-6 md:p-8 text-center border border-[#C9A227]/20 w-full h-full flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A227] to-[#DAA520] flex items-center justify-center mb-4 shadow-lg shadow-[#C9A227]/30">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2">Global Network</h3>
                    <p className="text-sm text-gray-600">Trusted by 20+ partners worldwide.</p>
                    <div className="mt-3 inline-block px-3 py-1 bg-[#C9A227]/10 rounded-full">
                      <span className="text-[10px] font-semibold text-[#C9A227] tracking-wider">🌍 GLOBAL</span>
                    </div>
                  </div>
                </div>
              </FlipCard>

              {/* Card 4 - 15+ Employees */}
              <FlipCard delay={0.3}>
                {/* Front Side */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 w-full h-full flex flex-col items-center justify-center group hover:border-[#C9A227]/30">
                    <div className="flex justify-center mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A227]/20 to-[#C9A227]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="w-7 h-7 text-[#C9A227]" />
                      </div>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-black mb-1 bg-gradient-to-r from-[#C9A227] to-[#DAA520] bg-clip-text text-transparent">
                      15+
                    </div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Employees</p>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#C9A227] to-transparent mx-auto mt-3 rounded-full group-hover:w-16 transition-all duration-300"></div>
                    <p className="text-xs text-gray-400 mt-2">Hover to flip →</p>
                  </div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="bg-gradient-to-br from-[#C9A227]/10 to-[#DAA520]/10 rounded-2xl shadow-xl p-6 md:p-8 text-center border border-[#C9A227]/20 w-full h-full flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A227] to-[#DAA520] flex items-center justify-center mb-4 shadow-lg shadow-[#C9A227]/30">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2">Expert Team</h3>
                    <p className="text-sm text-gray-600">15+ dedicated professionals ready to serve you.</p>
                    <div className="mt-3 inline-block px-3 py-1 bg-[#C9A227]/10 rounded-full">
                      <span className="text-[10px] font-semibold text-[#C9A227] tracking-wider">⚡ EXPERT</span>
                    </div>
                  </div>
                </div>
              </FlipCard>

            </div>
          </div>
        </div>
      </motion.section>

      {/* Awards & Recognition Section */}
      <motion.section
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full bg-white py-16 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="bg-transparent">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">

              <Card3D className="flex justify-center" sensitivity={10}>
                <Image
                  src="/images/design-rush-website-design-agencies.png"
                  alt="Award"
                  width={140}
                  height={140}
                  className="object-contain drop-shadow-md"
                />
              </Card3D>

              <Card3D className="flex justify-center" sensitivity={10}>
                <Image
                  src="/images/web-excellence-awards.png"
                  alt="Award"
                  width={140}
                  height={140}
                  className="object-contain drop-shadow-md"
                />
              </Card3D>

              <Card3D className="flex justify-center" sensitivity={10}>
                <Image
                  src="/images/the-manifest-most-reviewe-digital-agencies.png"
                  alt="Award"
                  width={120}
                  height={120}
                  className="object-contain drop-shadow-md"
                />
              </Card3D>

              <Card3D className="flex justify-center" sensitivity={10}>
                <Image
                  src="/images/clutch-B2B-companies-washington-2021.png"
                  alt="Award"
                  width={140}
                  height={140}
                  className="object-contain drop-shadow-md"
                />
              </Card3D>

              <Card3D className="flex justify-center" sensitivity={10}>
                <Image
                  src="/images/BES-featured-image-1.webp"
                  alt="Award"
                  width={140}
                  height={140}
                  className="object-contain drop-shadow-md"
                />
              </Card3D>

            </div>
          </div>
        </div>
      </motion.section>

      {/* About Us Section */}
      <section className="w-full bg-white py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center items-center order-2 md:order-1"
            >
              <div className="absolute w-64 h-64 bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute w-80 h-80 border border-[#C9A227]/20 rounded-full"></div>

              <Card3D className="relative z-10">
                <Image
                  src="/images/transparent_image.png"
                  alt="About CloudFlux Tech"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-md object-contain relative z-10 drop-shadow-xl"
                />
              </Card3D>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-6 order-1 md:order-2"
            >
              <p className="text-sm uppercase font-bold tracking-wider animate-fade-in" style={{ color: '#C9A227' }}>ABOUT US</p>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">
                The biggest team of<br />tech experts to<br />empower your brand
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                  Abdul Hadi (CEO) and Ali Haider (Founder) of CloudFlux Tech established the company
                  in Lahore's Arfa Tower. With their combined expertise and a dedicated team of tech
                  professionals, they've spent the past year building CloudFlux Tech and serving
                  clients across the globe. The mission remains the same:
                </p>
                <p className="text-base md:text-lg font-medium text-black/80 italic border-l-4 pl-4" style={{ borderColor: '#C9A227' }}>
                  "Empower businesses with cutting-edge web development, creative graphic design,
                  result-driven digital marketing, and SEO strategies that deliver real growth."
                </p>
              </div>
              <div className="pt-4">
                <button className="group relative overflow-hidden bg-gradient-to-r from-[#C9A227] via-[#DAA520] to-[#C9A227] bg-[length:200%_100] hover:from-[#B08C1F] hover:via-[#C9A227] hover:to-[#B08C1F] text-black font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-white/40"
                  style={{ backgroundSize: '200% 100%' }}>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
                  <span className="relative z-10 flex items-center">
                    ABOUT US
                    <span className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12">→</span>
                  </span>
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="absolute inset-0 rounded-full animate-ping bg-[#C9A227]/30"></span>
                  </span>
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Website Development Section */}
      <section className="w-full bg-white py-16 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-6 order-1"
            >
              <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>WEBSITE DEVELOPMENT</p>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">We design & build your <br /> custom website</h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                  We build high-performance, custom-coded Next.js websites with modern UI/UX design that are fully responsive and drive business growth. Our expert team delivers fast, secure, and scalable digital solutions tailored to your brand.
                </p>
              </div>
              <div className="pt-2">
                <span className="text-2xl md:text-2xl font-bold italic text-[#064cbe]">STARTING AT $143</span>
              </div>
              <div className="pt-4">
                <button className="group relative overflow-hidden bg-gradient-to-r from-[#C9A227] via-[#DAA520] to-[#C9A227] bg-[length:200%_100] hover:from-[#B08C1F] hover:via-[#C9A227] hover:to-[#B08C1F] text-black font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-white/40"
                  style={{ backgroundSize: '200% 100%' }}>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
                  <span className="relative z-10 flex items-center">
                    GET A CUSTOM WEBSITE
                    <span className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12">→</span>
                  </span>
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="absolute inset-0 rounded-full animate-ping bg-[#C9A227]/30"></span>
                  </span>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center items-center order-2"
            >
              <div className="absolute w-64 h-64 bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute w-80 h-80 border border-[#C9A227]/20 rounded-full"></div>

              <Card3D className="relative z-10">
                <Image
                  src="/images/Web.png"
                  alt="Website Development"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-md object-contain relative z-10 drop-shadow-xl"
                />
              </Card3D>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Digital Marketing Section */}
      <section className="w-full bg-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div className="relative flex justify-center items-center order-2 md:order-1">
              <div className="absolute w-64 h-64 bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute w-80 h-80 border border-[#C9A227]/20 rounded-full"></div>

              <Card3D className="relative z-10">
                <Image
                  src="/images/image.png"
                  alt="Digital Marketing"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-md object-contain relative z-10 drop-shadow-xl"
                />
              </Card3D>
            </div>

            <div className="flex flex-col space-y-6 order-1 md:order-2">
              <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>DIGITAL MARKETING</p>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">Drive Real Business Growth with<br />Strategic Marketing</h2>
              <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                Transform your online presence with our comprehensive digital marketing services from technical SEO and content strategy to paid advertising and social media growth. We help businesses drive traffic, leads & revenue with lasting brand awareness.
              </p>
              <div className="pt-2">
                <span className="text-2xl md:text-3xl font-bold italic text-[#064cbe]">STARTING AT $200</span>
              </div>
              <div className="pt-4">
                <button className="group relative overflow-hidden bg-gradient-to-r from-[#C9A227] via-[#DAA520] to-[#C9A227] bg-[length:200%_100] hover:from-[#B08C1F] hover:via-[#C9A227] hover:to-[#B08C1F] text-black font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-white/40"
                  style={{ backgroundSize: '200% 100%' }}>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
                  <span className="relative z-10 flex items-center">
                    BOOK A CONSULTATION
                    <span className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12">⚙️</span>
                  </span>
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="absolute inset-0 rounded-full animate-ping bg-[#C9A227]/30"></span>
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE CLOUDFLUX TECH - Gold & Black Theme
      ===================================================== */}
      <section className="bg-white py-10 md:py-16 relative z-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">

          <div className="mb-10 md:mb-14 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#C9A227] px-4 py-1.5 rounded-full mb-4">
                Why Choose Us
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-black"
            >
              Why Choose{" "}
              <span className="text-[#C9A227] relative">
                CloudFlux Tech
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#C9A227] to-[#DAA520] rounded-full"></span>
              </span>
              ?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4"
            >
              We deliver cutting-edge digital solutions through modern web development, creative design, and data-driven marketing strategies that help businesses thrive in the digital landscape.
            </motion.p>
          </div>

          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Code,
                title: "Expert Web Developers",
                description:
                  "Our team builds high-performance, custom-coded Next.js applications with modern UI/UX design that are fully responsive and scalable.",
              },
              {
                icon: Palette,
                title: "Creative Design Studio",
                description:
                  "From branding to graphic design, we create visually stunning assets that capture your brand identity and engage your audience.",
              },
              {
                icon: Rocket,
                title: "Performance Optimized",
                description:
                  "We deliver lightning-fast websites and applications optimized for speed, SEO, and user experience to maximize your digital impact.",
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description:
                  "All our solutions are built with security best practices and deployed on Vercel for enterprise-grade reliability and global scale.",
              },
              {
                icon: Zap,
                title: "Modern Tech Stack",
                description:
                  "Leveraging Next.js, React, Tailwind CSS, and the latest technologies to build future-proof digital solutions that drive growth.",
              },
              {
                icon: Globe,
                title: "Global Digital Presence",
                description:
                  "We help businesses establish a powerful online presence with strategic marketing, SEO, and content that reaches global audiences.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative rounded-2xl bg-white p-7 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl overflow-hidden cursor-pointer border border-gray-100/50"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#C9A227]/5 via-[#DAA520]/5 to-transparent"></div>
                <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-700 group-hover:scale-150 bg-[#C9A227]"></div>
                <div className="absolute top-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-700 bg-gradient-to-r from-[#C9A227] to-[#DAA520]"></div>

                <div className="relative z-10">
                  <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br from-[#C9A227]/10 to-[#DAA520]/10 text-[#C9A227] group-hover:bg-gradient-to-br group-hover:from-[#C9A227] group-hover:to-[#DAA520] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#C9A227]/25">
                    <item.icon size={26} className="transition-all duration-300 group-hover:scale-110" />
                  </div>
                </div>

                <h4 className="relative z-10 mb-2 text-lg font-bold text-black transition-all duration-300 group-hover:text-[#C9A227]">
                  {item.title}
                </h4>
                <p className="relative z-10 text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-700">
                  {item.description}
                </p>

                <div className="relative z-10 mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#C9A227] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:gap-3">
                  <span>Learn More</span>
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r from-[#C9A227] to-[#DAA520]"></div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/services"
              className="group relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#C9A227] via-[#DAA520] to-[#C9A227] bg-[length:200%_100] hover:from-[#B08C1F] hover:via-[#C9A227] hover:to-[#B08C1F] text-black font-semibold text-base px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-white/40"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
              <span className="relative z-10 flex items-center">
                Explore Our Services
                <span className="ml-2 text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12">→</span>
              </span>
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="absolute inset-0 rounded-full animate-ping bg-[#C9A227]/30"></span>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-[#FFF8E1] py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="text-center mb-20">
            <p className="text-sm font-bold uppercase tracking-wider" style={{ color: '#C9A227' }}>CLIENT TESTIMONIALS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-black mt-2">What Our Clients Say</h2>
          </div>
          <div className="flex flex-col gap-16">
            <div className="flex justify-start">
              <div className="bg-white shadow-2xl rounded-3xl p-10 w-full md:w-[70%] relative border border-gray-100">
                <div className="absolute -top-5 left-8 bg-[#C9A227] text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl">“</div>
                <div className="flex items-start gap-6">
                  <img src="/images/passport-photo-man-welldressed-caucasian-businessman-suit-tie-smiling-id-portrait_817921-61256.jpg" className="w-20 h-20 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-xl text-black">John Anderson</h4>
                    <p className="text-sm font-semibold" style={{ color: '#C9A227' }}>Anderson Enterprises</p>
                    <p className="text-gray-600 mt-3 text-lg">CloudFlux Tech completely revolutionized our digital strategy. Their team built us a cutting-edge website that perfectly represents our brand.</p>
                  </div>
                </div>
                <div className="absolute bottom-5 right-8 text-[#C9A227] text-3xl">”</div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-white shadow-2xl rounded-3xl p-10 w-full md:w-[70%] relative border border-gray-100">
                <div className="absolute -top-5 left-8 bg-[#C9A227] text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl">“</div>
                <div className="flex items-start gap-6">
                  <img src="/images/dp-wealth-advisory-dan-marks-900px.jpg" className="w-20 h-20 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-xl text-black">Dan Marks</h4>
                    <p className="text-sm font-semibold" style={{ color: '#C9A227' }}>DP Wealth Advisory</p>
                    <p className="text-gray-600 mt-3 text-lg">CloudFlux Tech has been instrumental in growing our digital footprint. Their team understood our unique needs and delivered excellence.</p>
                  </div>
                </div>
                <div className="absolute bottom-5 right-8 text-[#C9A227] text-3xl">”</div>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white shadow-2xl rounded-3xl p-10 w-full md:w-[70%] relative border border-gray-100">
                <div className="absolute -top-5 left-8 bg-[#C9A227] text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl">“</div>
                <div className="flex items-start gap-6">
                  <img src="/images/Kevin-LaPorte.jpg" className="w-20 h-20 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-xl text-black">Kevin LaPorte</h4>
                    <p className="text-sm font-semibold" style={{ color: '#C9A227' }}>LaPorte Media</p>
                    <p className="text-gray-600 mt-3 text-lg">Incredible experience working with CloudFlux Tech. Their technical skills and marketing strategies exceeded our expectations.</p>
                  </div>
                </div>
                <div className="absolute bottom-5 right-8 text-[#C9A227] text-3xl">”</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home