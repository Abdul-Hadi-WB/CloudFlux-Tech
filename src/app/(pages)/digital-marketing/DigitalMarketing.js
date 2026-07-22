'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'

const DigitalMarketing = () => {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)

  // Portfolio Carousel Images
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const portfolioImages = [
    '/images/pic1.jpeg',
    '/images/pic2.jpeg'
  ]

  // Campaign Dashboard Images
  const images = [
    '/images/pic1.jpeg',
    '/images/pic2.jpeg',
  ]

  // Digital Marketing Services Data
  const services = [
    { name: "SEO Optimization", icon: "🔍", price: "Starting at $299/mo" },
    { name: "Social Media Marketing", icon: "📱", price: "Starting at $399/mo" },
    { name: "PPC Campaigns", icon: "💰", price: "Starting at $499/mo" },
    { name: "Content Marketing", icon: "✍️", price: "Starting at $249/mo" },
  ]

  // Digital Marketing Specific Services
  const marketingServices = [
    {
      title: "Data-Driven SEO Strategy",
      description: "Boost your search rankings with our comprehensive SEO approach. We analyze your market, competitors, and audience to create a custom strategy that drives organic traffic and qualified leads.",
      icon: "📈"
    },
    {
      title: "Social Media Growth",
      description: "Build a powerful social media presence across platforms. From content creation to community management, we help you engage with your audience and convert followers into customers.",
      icon: "📊"
    },
    {
      title: "Conversion-Focused Ads",
      description: "Maximize your ROI with targeted PPC campaigns. Our data-backed approach ensures your ad spend delivers measurable results through strategic keyword targeting and compelling ad copy.",
      icon: "🎯"
    }
  ]

  // Smooth auto-scroll for Campaign Dashboard Mockup
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId
    let lastTimestamp = 0
    const scrollSpeed = 0.6
    let currentScroll = 0

    const smoothScroll = (timestamp) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp
        animationFrameId = requestAnimationFrame(smoothScroll)
        return
      }

      const deltaTime = Math.min(32, timestamp - lastTimestamp)
      currentScroll += scrollSpeed * (deltaTime / 16)
      
      const maxScroll = scrollContainer.scrollHeight / 2
      if (currentScroll >= maxScroll) {
        currentScroll = 0
        scrollContainer.scrollTop = 0
      } else {
        scrollContainer.scrollTop = currentScroll
      }

      const sectionHeight = scrollContainer.clientHeight
      if (sectionHeight > 0) {
        const newIndex = Math.floor(currentScroll / sectionHeight) % images.length
        setActiveIndex(newIndex)
      }

      lastTimestamp = timestamp
      animationFrameId = requestAnimationFrame(smoothScroll)
    }

    animationFrameId = requestAnimationFrame(smoothScroll)
    return () => cancelAnimationFrame(animationFrameId)
  }, [images.length])

  // Automatic Portfolio Carousel Sliding
  useEffect(() => {
    const timer = setInterval(() => {
      setPortfolioIndex((prevIndex) => (prevIndex + 1) % portfolioImages.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [portfolioImages.length])

  // Mouse parallax effect for 3D card
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [12, -12])
  const rotateY = useTransform(mouseX, [-300, 300], [-12, 12])

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

  // Animation Variant for Sliding Sections
  const sectionVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] } 
    }
  }

  return (
    <>
      {/* 1. Main Digital Marketing Section */}
      <motion.section 
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full bg-white py-24 relative overflow-hidden"
      >
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column - Services */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col space-y-6"
            >
              <p className="text-sm uppercase font-bold mt-24" style={{ color: '#C9A227' }}>
                Digital Marketing
              </p>
              
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">
                Grow Your Business With<br/>Data-Driven Marketing
              </h2>
              
              <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                From SEO and social media to PPC campaigns and content strategy, 
                we deliver results-driven marketing solutions that increase visibility, 
                drive qualified traffic, and boost your bottom line.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
                    START GROWING TODAY
                    <span className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12">→</span>
                  </span>
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="absolute inset-0 rounded-full animate-ping bg-[#C9A227]/30"></span>
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
                    <span className="font-bold text-black">100+</span> Campaigns Managed
                  </p>
                  <p className="text-xs text-gray-400">300% Average ROI</p>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column - 3D Card laptop mockup */}
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, scale: 0.85, rotateY: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative flex justify-center items-center sticky top-24 preserve-3d"
              style={{ perspective: 1200 }}
            >
              <motion.div 
                className="relative w-full max-w-xl z-10 transform-gpu shadow-2xl rounded-2xl"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                transition={{ type: "spring", damping: 25, stiffness: 150 }}
              >
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-black/80 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-white font-medium">CAMPAIGN DASHBOARD</span>
                  </div>
                </div>
                
                <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-2xl p-4 shadow-2xl border-t border-l border-white/20">
                  <div className="relative bg-black rounded-xl overflow-hidden shadow-inner" style={{ aspectRatio: '16/9' }}>
                    <div 
                      ref={scrollRef}
                      className="w-full h-full flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
                    >
                      {[...images, ...images].map((img, i) => (
                        <div key={i} className="w-full flex-shrink-0 relative group/image">
                          <img
                            src={img}
                            className="w-full h-auto object-top object-cover transition-transform duration-300 group-hover/image:scale-105"
                            alt={`Marketing preview ${i + 1}`}
                            loading="lazy"
                            draggable={false}
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
                      {images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            activeIndex === idx 
                              ? 'bg-[#C9A227] w-4'
                              : 'bg-white w-2 opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent" />
                    </div>
                  </div>
                  
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-black/80 rounded-full z-10">
                    <div className="w-2 h-2 bg-gray-600 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-2xl p-3 shadow-xl border-b border-l border-white/10">
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
                        <div className="w-3 h-3 rounded-full bg-gray-500"></div>
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

      {/* 2. PORTFOLIO SECTION (No 3D/Card animation effect on cards as requested) */}
      <motion.section 
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full bg-gray-50 py-24 overflow-hidden border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 mb-12 text-center">
          <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>
            Our Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-black mt-2">
            Our Recent Portfolio
          </h2>
        </div>

        <div className="max-w-4xl mx-auto px-5 md:px-10 relative">
          <div className="w-full overflow-hidden rounded-2xl shadow-xl bg-white p-2 border border-gray-100">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
              <motion.div
                className="flex w-full h-full"
                animate={{ x: `-${portfolioIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              >
                {portfolioImages.map((src, idx) => (
                  <div key={idx} className="w-full h-full shrink-0 relative">
                    <img
                      src={src}
                      alt={`Portfolio project ${idx + 1}`}
                      className="w-full h-full object-cover select-none"
                      draggable={false}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="flex justify-center gap-2.5 mt-6">
            {portfolioImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPortfolioIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  portfolioIndex === idx 
                    ? 'bg-[#C9A227] w-6' 
                    : 'bg-gray-300 w-2.5 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. Digital Marketing Services Section */}
      <motion.section 
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full bg-white py-16 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
              Comprehensive marketing solutions
            </h2>
            <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-3xl mx-auto mt-4">
              Get a complete digital marketing strategy that amplifies your online presence, 
              generates quality leads, and maximizes your return on investment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {marketingServices.map((service, index) => (
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
      
      {/* 4. Expert Section */}
      <motion.section 
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full py-16 bg-[#FFF8E1]"
      >
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="bg-gradient-to-r from-[#C9A227] to-[#a1831f] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start gap-8 shadow-lg">
            <div className="flex-shrink-0 flex flex-col items-center -mt-2">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src="/images/marketing-expert.jpg"
                  alt="Sarah Khan"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-3 text-center">
                <h4 className="font-bold text-white text-base">Sarah Khan</h4>
                <p className="text-white/80 text-xs">Digital Marketing Strategist</p>
              </div>
            </div>

            <div className="text-white flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Who you'll be speaking with:
              </h3>
              <ul className="space-y-2 mb-5">
                <li className="flex items-center gap-2">
                  <span className="text-white">✔</span> 4+ Years in SEO & Digital Marketing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✔</span> Expert in Google Ads & Social Media Campaigns
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✔</span> Specialized in Data Analytics & Conversion Optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✔</span> 50+ Successful Marketing Campaigns Delivered
                </li>
              </ul>
              <p className="italic text-sm md:text-base leading-relaxed mb-4">
                “In today's digital world, visibility is everything. My passion is helping businesses cut through the noise and connect with their ideal customers. Whether it's SEO, social media, or paid ads, I create data-driven strategies that deliver real, measurable growth - not just vanity metrics.”
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                At CloudFlux Tech, we don't believe in one-size-fits-all marketing. We take time to understand your unique brand voice, target audience, and business goals. From keyword research to campaign optimization, every decision is backed by data and focused on ROI. Let's turn your digital presence into your biggest asset.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* 5. Marketing Expertise Section with FIXED Side Image (No white box) */}
      <motion.section 
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full bg-white py-16 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6 order-1">
              <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>
                MARKETING EXPERTISE
              </p>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">
                Data-driven marketing<br/>that delivers real results
              </h2>
              <div className="space-y-5">
                <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                  Stop guessing and start growing with our analytics-first approach. We combine cutting-edge marketing tools with proven strategies to help you reach the right audience, at the right time, with the right message. Our campaigns are continuously optimized for maximum performance and ROI.
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
            
            {/* Side Image - FIXED: No white box, border, or backdrop blur */}
            <div className="relative flex items-center justify-center w-full ml-auto max-w-2xl perspective-1000"> 
              <div className="absolute w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute w-[500px] h-[500px] border border-[#C9A227]/20 rounded-full"></div>
              
              <motion.div 
                whileHover={{ rotateY: -12, rotateX: 6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative z-10" // Removed background, padding, border, blur
              >
                <Image
                  src="/images/Marketing.png"
                  alt="Marketing Expertise"
                  width={1200}
                  height={1200}
                  className="w-full h-auto object-contain relative z-10 drop-shadow-xl" // Kept only shadow
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 6. Pricing Section */}
      <motion.section 
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full bg-[#FFF8E1] py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm uppercase font-bold tracking-wider mb-3 inline-block px-4 py-1.5 rounded-full bg-[#C9A227]/10" style={{ color: '#C9A227' }}>
              OUR PLANS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mt-4">
              Marketing package pricing
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4">
              Choose the perfect marketing package for your business goals. All plans include strategy, execution, and regular reporting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">📈</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Starter SEO</h3>
                <p className="text-gray-500 mb-6">For local businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">$399</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Keyword research</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">On-page optimization</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Monthly reporting</span></li>
                  <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">—</span><span className="text-gray-400">Link building</span></li>
                </ul>
                <button className="w-full py-3 rounded-full border-2 border-[#C9A227] text-black font-semibold hover:bg-[#C9A227] hover:text-white transition-all duration-300">
                  GET STARTED
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border-2 border-[#C9A227]/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative"
            >
              <div className="absolute top-0 inset-x-0 bg-[#C9A227] text-black text-center py-1.5 text-sm font-semibold tracking-wide">
                BEST VALUE
              </div>
              <div className="p-8 pt-12">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Pro Marketing</h3>
                <p className="text-gray-500 mb-6">For growing brands</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">$799</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Advanced SEO strategy</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Social media management</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Content creation</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Monthly analytics report</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Email marketing</span></li>
                </ul>
                <button className="w-full py-3 rounded-full bg-[#C9A227] text-black font-semibold hover:bg-[#B08C1F] transition-all duration-300 shadow-md flex items-center justify-center gap-2 group">
                  LEARN MORE 
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Enterprise</h3>
                <p className="text-gray-500 mb-6">For large businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">Custom</span>
                  <span className="text-gray-500"> pricing</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Full-service marketing</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">PPC campaign management</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Dedicated account manager</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Custom strategy & reporting</span></li>
                </ul>
                <button className="w-full py-3 rounded-full border-2 border-[#C9A227] text-black font-semibold hover:bg-[#C9A227] hover:text-white transition-all duration-300">
                  CONTACT US
                </button>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm">
              Need a custom plan? <a href="#" className="text-[#C9A227] font-semibold hover:underline">Book a consultation →</a>
            </p>
          </div>
        </div>
      </motion.section>
    </>
  )
}

export default DigitalMarketing