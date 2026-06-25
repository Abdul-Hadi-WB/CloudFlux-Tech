'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'

const GraphicDesigning = () => {
  const scrollRef = useRef(null)
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [portfolioIndex, setPortfolioIndex] = useState(0)

  // Exact Image Paths provided by you
  const images = [
    '/images/graphic1.jpeg',
    '/images/graphic2.jpeg',
    '/images/graphic3.jpeg',
    '/images/graphic4.jpeg',
  ]

  // Graphic Design Services Data
  const services = [
    { name: "Logo & Brand Identity", icon: "🎨", price: "Starting at $149" },
    { name: "Social Media Graphics", icon: "📱", price: "Starting at $99" },
    { name: "Print Design", icon: "🖨️", price: "Starting at $199" },
    { name: "UI/UX Design", icon: "✨", price: "Starting at $299" },
  ]

  const graphicServices = [
    {
      title: "Brand Identity Design",
      description: "Create a memorable brand with custom logos, color palettes, typography, and brand guidelines that tell your unique story.",
      icon: "🏷️"
    },
    {
      title: "Social Media Creatives",
      description: "Stand out on social platforms with eye-catching posts, stories, banners, and ad creatives designed to drive engagement.",
      icon: "📸"
    },
    {
      title: "Print & Packaging Design",
      description: "From business cards and brochures to product packaging, we create print materials that leave a lasting impression.",
      icon: "📦"
    }
  ]

  // Smooth auto-scroll for Laptop Preview (Vertical)
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

  // Portfolio Horizontal Auto-Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setPortfolioIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [images.length])

  // Mouse parallax effect logic
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
    <> {/* <--- Fixed: Added missing opening fragment */}
      {/* Main Graphic Design Section */}
      <section className="w-full bg-white py-24 relative overflow-hidden">
        
        {/* Background Decorative Elements */}
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
                Graphic Design
              </p>
              
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">
                Bring Your Brand Vision<br/>To Life With Stunning Design
              </h2>
              
              <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                From logos and brand identities to social media graphics and print materials, 
                we create visually compelling designs that capture attention.
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
                    START YOUR PROJECT
                    <span className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12">→</span>
                  </span>
                </button>
              </div>
            </motion.div>
            
            {/* Right Column - Laptop Mockup */}
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative flex justify-center items-center perspective-1000 sticky top-24"
              style={{ perspective: 1000 }}
            >
              <motion.div 
                className="relative w-full max-w-xl z-10"
                style={{ rotateX, rotateY }}
                transition={{ type: "spring", damping: 30 }}
              >
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-black/80 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-white font-medium">DESIGN PORTFOLIO</span>
                  </div>
                </div>
                
                <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-2xl p-4 shadow-2xl">
                  <div className="relative bg-black rounded-xl overflow-hidden shadow-inner aspect-[16/9]">
                    <div 
                      ref={scrollRef}
                      className="w-full h-full flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden"
                    >
                      {[...images, ...images].map((img, i) => (
                        <div key={i} className="w-full flex-shrink-0">
                          <img
                            src={img}
                            className="w-full h-auto object-cover"
                            alt={`Design preview ${i + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-2xl p-3 shadow-xl">
                  <div className="bg-gray-900 rounded-xl p-3">
                    <div className="w-24 h-2 bg-gray-700 mx-auto rounded-full"></div>
                  </div>
                </div>
                
                <div className="absolute -inset-4 bg-gradient-to-r from-[#C9A227]/20 via-transparent to-amber-500/20 blur-2xl -z-10 rounded-3xl" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Section: Recent Portfolio */}
      <section className="w-full bg-gray-50 py-24 overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-5 text-center mb-12">
          <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>
            Our Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-black mt-2">
            Our Recent Portfolio
          </h2>
        </div>

        <div className="max-w-4xl mx-auto px-5 relative">
          <div className="overflow-hidden rounded-2xl shadow-xl bg-white p-2 border border-gray-100">
            <motion.div 
              className="flex w-full" 
              animate={{ x: `-${portfolioIndex * 100}%` }} 
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              {images.map((src, idx) => (
                <div key={idx} className="w-full shrink-0 aspect-[16/9] overflow-hidden rounded-xl bg-white flex items-center justify-center">
                  <img 
                    src={src} 
                    className="w-full h-full object-contain" 
                    alt={`Graphic Design Project ${idx + 1}`} 
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setPortfolioIndex(idx)} 
                className={`h-2.5 rounded-full transition-all duration-300 ${portfolioIndex === idx ? 'bg-[#C9A227] w-6' : 'bg-gray-300 w-2.5'}`} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Graphic Design Services Section */}
      <section className="w-full bg-white py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
              Creative design solutions
            </h2>
            <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-3xl mx-auto mt-4">
              Get professional graphic design services that elevate your brand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {graphicServices.map((service, index) => (
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
      </section>

      {/* Expert Section - Graphic Design */}
      <section className="w-full py-16 bg-[#FFF8E1]">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="bg-gradient-to-r from-[#C9A227] to-[#a1831f] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start gap-8 shadow-lg">
            <div className="flex-shrink-0 flex flex-col items-center -mt-2">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src="/images/Founder@.jpeg"
                  alt="Ali"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-3 text-center">
                <h4 className="font-bold text-white text-base">Ali Haider</h4>
                <p className="text-white/80 text-xs">Founder - CloudFlux Tech</p>
                <p className="text-white/60 text-xs mt-1">Senior Graphic Designer & SEO Expert</p>
              </div>
            </div>

            <div className="text-white flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Who you'll be speaking with:
              </h3>
              <ul className="space-y-2 mb-5">
                <li className="flex items-center gap-2">
                  <span className="text-white">✔</span> 5+ Years in Graphic & Brand Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✔</span> Expert in Adobe Creative Suite & Figma
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✔</span> Specialized in Brand Identity & Visual Storytelling
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✔</span> 150+ Brands Designed & Launched
                </li>
              </ul>
              <p className="italic text-sm md:text-base leading-relaxed mb-4">
              “Design is more than just aesthetics—it's the silent ambassador of your brand. Every color, font, and shape tells a story. My passion is helping businesses find their visual voice and create designs that not only look beautiful but also build trust, evoke emotion, and drive action.”
              </p>
              <p className="text-sm md:text-base leading-relaxed">
              At CloudFlux Tech, we believe great design transforms businesses. We take time to understand your brand's personality, target audience, and goals before creating any visual element. From logo design to complete brand guidelines, every detail is crafted with purpose and precision. Let's create something beautiful that your customers will love.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Graphic Design Expertise Section */}
      <section className="w-full bg-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6 order-1">
              <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>
                DESIGN EXPERTISE
              </p>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">
                Visual storytelling<br/>that captures hearts
              </h2>
              <div className="space-y-5">
                <p className="text-xl md:text-xl font-medium text-gray-500 leading-relaxed max-w-lg">
                  In a world bombarded with content, exceptional design makes you unforgettable. We combine artistic creativity with strategic thinking to create visuals that not only grab attention but also communicate your brand message effectively across every touchpoint.
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
  {/* Background Glow */}
  <div className="absolute w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse"></div>
  
  {/* Background Border Circle */}
  <div className="absolute w-[500px] h-[500px] border border-[#C9A227]/20 rounded-full"></div>
  
  {/* Main Image */}
  <div className="relative">
    <Image
      src="/images/Designing.png"
      alt="Graphic Design Expertise"
      width={1200}
      height={1200}
      className="w-full h-auto object-contain relative z-10 drop-shadow-xl" 
    />
  </div>
</div>
          </div>
        </div>
      </section>
      
      

      {/* Graphic Design Pricing Section */}
      <section className="w-full bg-[#FFF8E1] py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm uppercase font-bold tracking-wider mb-3 inline-block px-4 py-1.5 rounded-full bg-[#C9A227]/10" style={{ color: '#C9A227' }}>
              OUR PLANS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mt-4">
              Design package pricing
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4">
              Choose the perfect design package for your brand. All packages include unlimited revisions and commercial rights.
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
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Basic Branding</h3>
                <p className="text-gray-500 mb-6">For new businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">$349</span>
                  <span className="text-gray-500"> one-time</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Custom logo design</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Color palette</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Basic brand guidelines</span></li>
                  <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">—</span><span className="text-gray-400">Social media kit</span></li>
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
                MOST POPULAR
              </div>
              <div className="p-8 pt-12">
                <div className="w-16 h-16 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Complete Brand Identity</h3>
                <p className="text-gray-500 mb-6">For established brands</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">$799</span>
                  <span className="text-gray-500"> one-time</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Custom logo + variations</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Complete color palette</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Typography system</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Social media kit</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Business card design</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Comprehensive brand guidelines</span></li>
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
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Premium Design</h3>
                <p className="text-gray-500 mb-6">For growing enterprises</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">Custom</span>
                  <span className="text-gray-500"> pricing</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Full brand identity suite</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Custom illustrations</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Packaging design</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Website UI/UX design</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#C9A227] mt-0.5">✓</span><span className="text-gray-600">Dedicated design team</span></li>
                </ul>
                <button className="w-full py-3 rounded-full border-2 border-[#C9A227] text-black font-semibold hover:bg-[#C9A227] hover:text-white transition-all duration-300">
                  CONTACT US
                </button>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm">
              Need a custom design package? <a href="#" className="text-[#C9A227] font-semibold hover:underline">Book a consultation →</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default GraphicDesigning