'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// Reusable 3D Tilt Wrapper Component for Big Images
const TiltImage3D = ({ children, className = "" }) => {
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
    <div className={`perspective-1000 ${className}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

const WebDevelopment = () => {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [portfolioIndex, setPortfolioIndex] = useState(0)

  const images = [
    '/images/site2.png.png',
    '/images/site3.png.png',
    '/images/site4.png.png',
    '/images/site1.png.png',
  ]

  const services = [
    { name: "Custom Website Development", icon: "💻", price: "Starting at $143" },
    { name: "E-Commerce Solutions", icon: "🛒", price: "Starting at $299" },
    { name: "Next.js & React Apps", icon: "⚛️", price: "Starting at $199" },
    { name: "CMS Integration", icon: "📝", price: "Starting at $99" },
  ]

  const mspServices = [
    {
      title: "MSP website design & development",
      description: "Get a custom-designed MSP website that's easy to use, amplifies your online presence, simplifies communication with prospects, and clearly showcases the benefits of your services.",
      icon: "💻"
    },
    {
      title: "SEO-ready design",
      description: "We build SEO-researched architecture and identify the best keyworded pages to add, based on your standing and competition.",
      icon: "🔍"
    },
    {
      title: "Easy to update",
      description: "Experience the ease of managing an advanced CMS without complexity. Expertise in WordPress and Elementor ensures a smooth process.",
      icon: "✏️"
    }
  ]

  // Smooth auto-scroll for Laptop Preview
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

  // Portfolio Auto-Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setPortfolioIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <>
      {/* 1. Hero / Main Section (Slides from Left) */}
      <motion.section 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-white py-24 relative overflow-hidden"
      >
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            <div className="flex flex-col space-y-6">
              <p className="text-sm uppercase font-bold mt-24" style={{ color: '#C9A227' }}>
                Website Development
              </p>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">
                Build Modern, Scalable<br/>Websites That Drive Results
              </h2>
              <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                We deliver high-performance websites that combine stunning design with powerful functionality.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {services.map((service, index) => (
                  <div key={index} className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:border-[#C9A227]/30 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{service.icon}</div>
                      <div>
                        <h3 className="font-semibold text-black">{service.name}</h3>
                        <p className="text-sm italic text-[#064cbe]">{service.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button className="group relative overflow-hidden bg-gradient-to-r from-[#C9A227] to-[#DAA520] text-black font-semibold px-6 py-3 rounded-full transition-all hover:scale-105">
                  <span className="relative z-10 flex items-center">START YOUR PROJECT →</span>
                </button>
              </div>
            </div>
            
            {/* BIG IMAGE 1: Laptop Preview Mockup with Dedicated 3D Interactive Effect */}
            <div className="sticky top-24">
              <TiltImage3D>
                <div className="relative w-full max-w-xl mx-auto z-10">
                  <div className="relative bg-gray-900 rounded-t-2xl p-4 shadow-2xl">
                    <div className="relative bg-black rounded-xl overflow-hidden aspect-[16/9]">
                      <div ref={scrollRef} className="w-full h-full overflow-y-auto scrollbar-hide">
                        {[...images, ...images].map((img, i) => (
                          <img key={i} src={img} className="w-full h-auto object-cover" alt="preview" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-b-2xl p-4 shadow-xl">
                    <div className="w-24 h-2 bg-gray-700 mx-auto rounded-full"></div>
                  </div>
                </div>
              </TiltImage3D>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 2. Portfolio Slider Section (Slides from Right) */}
      <motion.section 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-gray-50 py-24 overflow-hidden border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-5 text-center mb-12">
          <p className="text-sm uppercase font-bold" style={{ color: '#C9A227' }}>Our Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black mt-2">Our Recent Portfolio</h2>
        </div>
        <div className="max-w-4xl mx-auto px-5 relative">
          <div className="overflow-hidden rounded-2xl shadow-xl bg-white p-2">
            <motion.div 
              className="flex w-full" 
              animate={{ x: `-${portfolioIndex * 100}%` }} 
              transition={{ ease: "easeInOut", duration: 0.5 }}
            >
              {images.map((src, idx) => (
                <div key={idx} className="w-full shrink-0 aspect-[16/9] overflow-hidden rounded-xl bg-white flex items-center justify-center">
                  <img src={src} className="w-full h-full object-contain" alt="portfolio" />
                </div>
              ))}
            </motion.div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, idx) => (
              <button key={idx} onClick={() => setPortfolioIndex(idx)} className={`h-2.5 rounded-full transition-all ${portfolioIndex === idx ? 'bg-[#C9A227] w-6' : 'bg-gray-300 w-2.5'}`} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. MSP Services Card Grid (Slides from Left) */}
      <motion.section 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-white py-16 text-center overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Website design & development</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mspServices.map((service, index) => (
              <div key={index} className="p-6 border rounded-xl hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. CEO Expert Section (Slides from Right) */}
      <motion.section 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full py-16 bg-[#FFF8E1] overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="bg-gradient-to-r from-[#C9A227] to-[#a1831f] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start gap-8 shadow-lg">

            <div className="flex-shrink-0 flex flex-col items-center -mt-2">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src="/images/CEO@.jpeg"
                  alt="Abdul Hadi"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>
              <div className="mt-3 text-center">
                <h4 className="font-bold text-white text-base">Abdul Hadi</h4>
                <p className="text-white/80 text-xs">CEO - CloudFlux Tech</p>
                <p className="text-white/60 text-xs mt-1">Senior Web Design Expert</p>
              </div>
            </div>

            <div className="text-white flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Who you'll be speaking with:
              </h3>

              <ul className="space-y-2 mb-5">
                <li className="flex items-center gap-2"><span className="text-white">✔</span> 2+ Years in React & Next.js Development</li>
                <li className="flex items-center gap-2"><span className="text-white">✔</span> Expert in Node.js & Full Stack Development</li>
                <li className="flex items-center gap-2"><span className="text-white">✔</span> Specialized in Next.js Architecture & Performance Optimization</li>
                <li className="flex items-center gap-2"><span className="text-white">✔</span> 20+ Successful Projects for Startups & Small Businesses</li>
              </ul>

              <p className="italic text-sm md:text-base leading-relaxed mb-4">
                “I believe every startup deserves a website that works as hard as they do. With Next.js and modern React architecture, we build fast, scalable applications that grow with your business - without burning through your budget. Your vision, our expertise, and technology that delivers results.”
              </p>

              <p className="text-sm md:text-base leading-relaxed">
                At CloudFlux Tech, we're not just developers - we're your technical partners. We take the time to understand your business goals, your audience, and your unique challenges. From the first line of code to the final deployment, we ensure your Next.js application is built for performance, SEO, and long-term success. Let's turn your idea into reality.
              </p>
            </div>

          </div>
        </div>
      </motion.section>
      
      {/* 5. Next.js Expertise Section (Slides from Left) */}
      <motion.section 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-white py-16 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="flex flex-col space-y-6 order-1">
              <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>
                NEXT.JS EXPERTISE
              </p>
              
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">
                Modern web development<br/>demands cutting-edge expertise
              </h2>
              
              <div className="space-y-5">
                <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                  In today's digital landscape, your website is your brand's most powerful asset. We specialize in building high-performance Next.js applications that combine blazing-fast speed, seamless user experiences, and enterprise-grade scalability.
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
            
            {/* BIG IMAGE 2: Next.js Development Feature Graphic with 3D Mouse Tilt */}
            <div className="relative flex items-center justify-center w-full ml-auto max-w-2xl"> 
              <div className="absolute w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute w-[500px] h-[500px] border border-[#C9A227]/20 rounded-full"></div>
              
              <TiltImage3D className="w-full relative z-10">
                <Image
                  src="/images/Development.png"
                  alt="Next.js Expertise"
                  width={1200}
                  height={1200}
                  className="w-full h-auto object-contain drop-shadow-2xl" 
                />
              </TiltImage3D>
            </div>

          </div>
        </div>
      </motion.section>
      
      {/* 6. Tanzeela Waheed Expert Section (Slides from Right) */}
      <motion.section 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full py-16 bg-[#FFF8E1] overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="bg-gradient-to-r from-[#C9A227] to-[#a1831f] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start gap-8 shadow-lg">

            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src="/images/tanzeela-waheed.jpg"
                  alt="Tanzeela Waheed"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-bold text-white text-lg">Tanzeela Waheed</h4>
                <p className="text-white/80 text-sm">Senior Web Design Expert</p>
              </div>
            </div>

            <div className="text-white flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Who you'll be speaking with:
              </h3>

              <ul className="space-y-2 mb-5">
                <li className="flex items-center gap-2"><span className="text-white">✔</span> 2+ Years in React & Next.js Development</li>
                <li className="flex items-center gap-2"><span className="text-white">✔</span> Expert in Modern UI/UX Design Principles</li>
                <li className="flex items-center gap-2"><span className="text-white">✔</span> Specialized in Performance Optimization & Responsive Design</li>
              </ul>

              <p className="italic text-sm md:text-base leading-relaxed mb-4">
                “Great design is not just about how it looks, but how it works. Every pixel, every interaction, every animation should serve a purpose – to create meaningful experiences that users love and remember.”
              </p>

              <p className="text-sm md:text-base leading-relaxed">
                As a frontend specialist, I focus on translating your brand vision into seamless digital experiences. From responsive layouts to smooth animations, I ensure your website not only captures attention but also delivers exceptional performance across all devices. Let's build something beautiful together.
              </p>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 7. Pricing Section (Slides from Left) */}
      <motion.section 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-[#FFF8E1] py-24 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#C9A227]/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm uppercase font-bold tracking-wider mb-3 inline-block px-4 py-1.5 rounded-full bg-[#C9A227]/10" style={{ color: '#C9A227' }}>
              OUR PLANS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mt-4">
              MSP website pricing
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4">
              Choose the perfect package for your business needs. All plans include our expert design and development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 - Starter */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="p-8">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Starter</h3>
                <p className="text-gray-500 mb-6">Perfect for small businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">$2,900</span>
                  <span className="text-gray-500"> one-time</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Up to 10 pages</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Responsive design</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Basic SEO setup</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Contact forms</span></li>
                  <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">—</span><span className="text-gray-400">Custom animations</span></li>
                </ul>
                <button className="w-full py-3 rounded-full border-2 border-[#C9A227] text-black font-semibold hover:bg-[#C9A227] hover:text-white transition-all duration-300">
                  GET STARTED
                </button>
              </div>
            </div>
            
            {/* Card 2 - PRO WEBSITE */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[#C9A227]/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative">
              <div className="absolute top-0 inset-x-0 bg-[#C9A227] text-black text-center py-1.5 text-sm font-semibold tracking-wide">
                POPULAR CHOICE
              </div>
              <div className="p-8 pt-12">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">💼</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">PRO WEBSITE</h3>
                <p className="text-gray-500 mb-6">For growing businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">$5,500</span>
                  <span className="text-gray-500"> one-time</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">15 pages</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Responsive design</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Website SEO analysis</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Contact forms</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">SEO-informed site architecture</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Visual editor</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Copywriting that sells</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Project manager</span></li>
                </ul>
                <button className="w-full py-3 rounded-full bg-[#C9A227] text-black font-semibold hover:bg-[#B08C1F] transition-all duration-300 shadow-md flex items-center justify-center gap-2 group">
                  LEARN MORE 
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
            
            {/* Card 3 - Custom Website Design */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="p-8">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Custom Website</h3>
                <p className="text-gray-500 mb-6">Tailored to your needs</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">Custom</span>
                  <span className="text-gray-500"> pricing</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Custom website design</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Unlimited pages</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Advanced SEO strategy</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">E-commerce ready</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Dedicated team</span></li>
                </ul>
                <button className="w-full py-3 rounded-full border-2 border-[#C9A227] text-black font-semibold hover:bg-[#C9A227] hover:text-white transition-all duration-300">
                  CONTACT US
                </button>
              </div>
            </div>
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

export default WebDevelopment