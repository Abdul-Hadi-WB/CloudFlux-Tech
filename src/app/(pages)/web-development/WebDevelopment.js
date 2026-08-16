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
  const portfolioRef = useRef(null)
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

  // Portfolio Projects Data
  const projects = [
    {
      id: 1,
      category: "E-COMMERCE",
      title: "FashionStore Pro",
      subtitle: "Full-featured online store",
      stats: "500+ products • 10k+ users",
      description: "A modern e-commerce platform with advanced filtering, real-time inventory, and seamless checkout built with Next.js and Stripe.",
      technologies: ["Next.js", "Tailwind", "Stripe", "MongoDB"],
      image: "/images/project1.png",
      demoLink: "https://example.com"
    },
    {
      id: 2,
      category: "SAAS PLATFORM",
      title: "TaskFlow Manager",
      subtitle: "Collaborative project management",
      stats: "50+ teams • 5k+ tasks",
      description: "A powerful task management tool with real-time collaboration, drag-and-drop boards, and detailed analytics to boost team productivity.",
      technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
      image: "/images/project2.png",
      demoLink: null
    },
    {
      id: 3,
      category: "CORPORATE",
      title: "CloudFlux Tech Hub",
      subtitle: "Enterprise digital presence",
      stats: "100+ pages • 50k+ monthly visits",
      description: "A comprehensive corporate website with a custom CMS, multi-language support, and integrated analytics for a global technology company.",
      technologies: ["Next.js", "GraphQL", "Tailwind", "Vercel"],
      image: "/images/project3.png",
      demoLink: "https://example.com"
    },
    {
      id: 4,
      category: "MOBILE APP",
      title: "HealthTrack",
      subtitle: "Fitness & wellness platform",
      stats: "10k+ downloads • 4.8★ rating",
      description: "A responsive web app for tracking fitness goals with real-time progress monitoring, social sharing, and personalized workout plans.",
      technologies: ["React", "Firebase", "Chart.js", "Tailwind"],
      image: "/images/project4.png",
      demoLink: null
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

  return (
    <>
      {/* Global styles to hide scrollbars and prevent horizontal overflow */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        body {
          overflow-x: hidden;
          max-width: 100vw;
        }
      `}</style>

      {/* ================================================================
         1. HERO / MAIN SECTION (Slides from Left)
      ================================================================ */}
      <motion.section 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-white py-24 relative overflow-x-hidden"
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
            
            {/* Laptop Preview Mockup */}
            <div className="sticky top-24">
              <TiltImage3D>
                <div className="relative w-full max-w-xl mx-auto z-10">
                  <div className="relative bg-gray-900 rounded-t-2xl p-4 shadow-2xl">
                    <div className="relative bg-black rounded-xl overflow-hidden aspect-[16/9]">
                      <div 
                        ref={scrollRef} 
                        className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide"
                      >
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

      {/* ================================================================
         2. NEW PORTFOLIO SECTION - ALTERNATING LAYOUT
      ================================================================ */}
      <motion.section
        ref={portfolioRef}
        className="py-8 md:py-12 px-4 md:px-6 w-full overflow-x-hidden bg-gray-50"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-6xl w-full">
          {/* HEADING */}
          <motion.div 
            className="text-center mb-8 md:mb-12 w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-4 md:mb-6">
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
              >
                OUR <span className="text-[#C9A227]">PROJECTS</span>
              </motion.h2>
            </div>
            
            <motion.div 
              className="bg-white/70 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-gray-200/50 mt-4 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                Showcasing our latest web development projects with modern design and cutting-edge technology.
              </p>
            </motion.div>
          </motion.div>

          {/* PROJECTS LIST */}
          {projects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.1
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-8 bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {index % 2 === 0 ? (
                  <>
                    {/* EVEN – Content left, Image right (desktop) */}
                    <motion.div 
                      className="order-1 md:order-1"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <span className="inline-block mb-3 text-xs font-bold tracking-widest text-[#C9A227]">{project.category}</span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-[#C9A227] font-semibold mb-2 text-sm sm:text-base">{project.subtitle}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4">{project.stats}</p>
                      <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">{project.description}</p>
                      <ul className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                        {project.technologies.map((tech, i) => (
                          <li key={i} className="px-3 py-1 sm:px-4 sm:py-2 text-xs font-bold bg-gray-100 rounded-full">
                            {tech}
                          </li>
                        ))}
                      </ul>
                      
                      {/* Live Demo / View Project Button */}
                      {project.demoLink ? (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A227] to-[#DAA520] hover:from-[#B08C1F] hover:to-[#C9A227] text-black font-semibold text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                            <span>🔗</span> Live Demo
                          </button>
                        </a>
                      ) : (
                        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed text-white font-semibold text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 rounded-xl opacity-70">
                          <span>⏳</span> Coming Soon
                        </button>
                      )}
                    </motion.div>

                    <motion.div 
                      className="order-2 md:order-2 relative w-full h-[280px] sm:h-[320px] md:h-[480px]"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Image src={project.image} alt={project.title} fill className="object-contain" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    {/* ODD – Image left, Content right (desktop) */}
                    <motion.div 
                      className="order-2 md:order-1 relative w-full h-[280px] sm:h-[320px] md:h-[480px]"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Image src={project.image} alt={project.title} fill className="object-contain" />
                    </motion.div>

                    <motion.div 
                      className="order-1 md:order-2"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <span className="inline-block mb-3 text-xs font-bold tracking-widest text-[#C9A227]">{project.category}</span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-[#C9A227] font-semibold mb-2 text-sm sm:text-base">{project.subtitle}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4">{project.stats}</p>
                      <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">{project.description}</p>
                      <ul className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                        {project.technologies.map((tech, i) => (
                          <li key={i} className="px-3 py-1 sm:px-4 sm:py-2 text-xs font-bold bg-gray-100 rounded-full">
                            {tech}
                          </li>
                        ))}
                      </ul>
                      
                      {project.demoLink ? (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A227] to-[#DAA520] hover:from-[#B08C1F] hover:to-[#C9A227] text-black font-semibold text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                            <span>🔗</span> Live Demo
                          </button>
                        </a>
                      ) : (
                        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed text-white font-semibold text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 rounded-xl opacity-70">
                          <span>⏳</span> Coming Soon
                        </button>
                      )}
                    </motion.div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ================================================================
         3. MSP SERVICES CARD GRID (Slides from Left)
      ================================================================ */}
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

      {/* ================================================================
         4. CEO EXPERT SECTION (Slides from Right)
      ================================================================ */}
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
                <div className="mt-3">
                  <a 
                    href="tel:03027262793" 
                    className="inline-block bg-black text-[#C9A227] text-xs font-bold px-3 py-1.5 rounded-full hover:bg-white hover:text-black transition duration-300 shadow-sm"
                  >
                    📞 0302 7262793
                  </a>
                </div>
              </div>
            </div>

            <div className="text-white flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-4">Who you'll be speaking with:</h3>
              <ul className="space-y-2 mb-5">
                <li className="flex items-center gap-2"><span className="text-white">✔</span> 5+ Years in React & Next.js Development</li>
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
      
      {/* ================================================================
         5. NEXT.JS EXPERTISE SECTION (Slides from Left)
      ================================================================ */}
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
              <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>NEXT.JS EXPERTISE</p>
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
      
      {/* ================================================================
         6. TANZEELA WAHEED EXPERT SECTION (Slides from Right)
      ================================================================ */}
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
                <div className="mt-3">
                  <a 
                    href="tel:03004802356" 
                    className="inline-block bg-black text-[#C9A227] text-xs font-bold px-3 py-1.5 rounded-full hover:bg-white hover:text-black transition duration-300 shadow-sm"
                  >
                    📞 0300 4802356
                  </a>
                </div>
              </div>
            </div>

            <div className="text-white flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-4">Who you'll be speaking with:</h3>
              <ul className="space-y-2 mb-5">
                <li className="flex items-center gap-2"><span className="text-white">✔</span> 4+ Years in React & Next.js Development</li>
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

      {/* ================================================================
         7. PRICING SECTION - UPDATED PER PDF
      ================================================================ */}
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
              Website Development Pricing
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4">
              Choose the perfect package for your business needs. All plans include our expert design and development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* ---------- STARTER PLAN ---------- */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col">
              <div className="p-8 flex-1 flex flex-col">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Starter Website</h3>
                <p className="text-gray-500 mb-4">Perfect for small businesses &amp; personal brands</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-black">$99</span>
                  <span className="text-gray-500 text-lg ml-1">one-time</span>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Up to 5 pages</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Modern &amp; clean design</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Fully responsive (Mobile, Tablet &amp; Desktop)</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Custom business branding</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Contact form + WhatsApp integration</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Basic on-page SEO setup</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Social media links</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Website deployment</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Basic performance optimization</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">2 revision rounds</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Delivery: 5-7 business days</span></li>
                </ul>
                <div className="text-sm text-gray-400 mb-4 italic">* Domain &amp; hosting not included</div>
                <button className="w-full py-3 rounded-full border-2 border-[#C9A227] text-black font-semibold hover:bg-[#C9A227] hover:text-white transition-all duration-300">
                  GET STARTED
                </button>
              </div>
            </div>

            {/* ---------- PRO PLAN ---------- */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[#C9A227]/30 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col relative">
              <div className="absolute top-0 inset-x-0 bg-[#C9A227] text-black text-center py-1.5 text-sm font-semibold tracking-wide uppercase">
                Most Popular
              </div>
              <div className="p-8 pt-12 flex-1 flex flex-col">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">💼</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Pro Website</h3>
                <p className="text-gray-500 mb-4">Perfect for growing businesses</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-black">$249</span>
                  <span className="text-gray-500 text-lg ml-1">one-time</span>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Up to 10-12 pages</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Premium custom UI/UX design</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Fully responsive</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Next.js / React development</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Advanced animations &amp; interactions</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Advanced on-page SEO setup</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">WhatsApp + Contact form integration</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Google Maps integration</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Social media integration</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Performance optimization</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Vercel deployment included</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600 font-semibold">1-year .com domain included</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Custom domain configuration + SSL/HTTPS</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">3-4 revision rounds</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Delivery: 7-10 business days</span></li>
                </ul>
                <div className="text-sm text-gray-400 mb-4 italic">* Domain included for 1 year; renewal costs apply.</div>
                <button className="w-full py-3 rounded-full bg-[#C9A227] text-black font-semibold hover:bg-[#B08C1F] transition-all duration-300 shadow-md flex items-center justify-center gap-2 group">
                  LEARN MORE 
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>

            {/* ---------- CUSTOM PLAN ---------- */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col">
              <div className="p-8 flex-1 flex flex-col">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Custom Website</h3>
                <p className="text-gray-500 mb-4">For businesses requiring advanced &amp; completely custom solutions</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-black">$399</span>
                  <span className="text-gray-500 text-lg ml-1">+</span>
                  <span className="text-gray-500 text-sm block mt-1">final price depends on project scope</span>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Fully custom design &amp; development</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Unlimited pages &amp; features</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Advanced functionality (E‑commerce, custom apps, etc.)</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">1-year domain included</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Full project management &amp; dedicated team</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Enterprise-grade performance &amp; security</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Ongoing support &amp; maintenance options</span></li>
                </ul>
                <div className="text-sm text-gray-400 mb-4 italic">* Domain included for 1 year; renewal costs apply.</div>
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