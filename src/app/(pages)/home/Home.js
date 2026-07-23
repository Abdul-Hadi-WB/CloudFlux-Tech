'use client'
import React, { Suspense, useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// --- 1. Background 3D Particles Component ---
function ParticlesBackground() {
  const ref = useRef()
  const [coords] = useState(() => {
    const count = 1200
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  })

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={coords.length / 3}
            array={coords}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          transparent
          color="#C9A227"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </points>
    </group>
  )
}

// --- 2. Interactive 3D Tilt Wrapper for Images & Cards ---
function Card3D({ children, className = "", sensitivity = 15 }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    card.style.transform = `perspective(1000px) rotateX(${-y / sensitivity}deg) rotateY(${x / sensitivity}deg) scale3d(1.03, 1.03, 1.03)`
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

// --- 3. Existing 3D Robot Model Component ---
function Model({ url }) {
  const { scene, animations } = useGLTF(url)
  const modelRef = useRef()
  const mixerRef = useRef()
  const timeRef = useRef(0)

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                mat.color.setHex(0xC0C0C0)
                mat.roughness = 0.3
                mat.metalness = 0.9
                mat.emissive = new THREE.Color(0x222222)
                mat.emissiveIntensity = 0.1
              })
            } else {
              child.material.color.setHex(0xC0C0C0)
              child.material.roughness = 0.3
              child.material.metalness = 0.9
              child.material.emissive = new THREE.Color(0x222222)
              child.material.emissiveIntensity = 0.1
            }
          }
        }
      })
      
      if (animations && animations.length > 0) {
        mixerRef.current = new THREE.AnimationMixer(scene)
        animations.forEach((clip) => {
          const action = mixerRef.current.clipAction(clip)
          action.play()
        })
      }
    }
    
    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction()
        mixerRef.current = null
      }
    }
  }, [scene, animations])
  
  useFrame(({ mouse }, delta) => {
    if (modelRef.current) {
      timeRef.current += delta * 0.5
      const targetRotY = timeRef.current
      const targetRotX = 0
      const targetRotZ = 0
      
      modelRef.current.rotation.y += (targetRotY - modelRef.current.rotation.y) * 0.05
      modelRef.current.rotation.x += (targetRotX - modelRef.current.rotation.x) * 0.05
      modelRef.current.rotation.z += (targetRotZ - modelRef.current.rotation.z) * 0.05
    }
    
    if (mixerRef.current) {
      mixerRef.current.update(delta)
    }
  })
  
  return <primitive ref={modelRef} object={scene} scale={0.9} position={[0, -1.5, 0]} />
}

useGLTF.preload('/images/nexbot_by_aximoris_copy_copy.gltf')

// --- Main Page Component ---
const Home = () => {
  return (
    <div className="bg-white min-h-screen relative overflow-hidden">

      {/* Global 3D Theme Particles Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ParticlesBackground />
        </Canvas>
      </div>

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
                Power Up Your Digital<br/> Growth With Smart<br/> Technology
              </h1>
                
              <p className="text-xl md:text-xl font-medium text-gray-200 leading-relaxed max-w-lg">
                Entrust Cloud Flux Tech with your web development, graphic design, 
                digital marketing, and SEO projects. We craft sophisticated digital 
                solutions that amplify your brand and drive measurable growth
                delivering results that matter.
              </p>
              
              <div className="pt-3">
                <button className="group relative overflow-hidden bg-gradient-to-r from-[#C9A227] via-[#DAA520] to-[#C9A227] bg-[length:200%_100] hover:from-[#B08C1F] hover:via-[#C9A227] hover:to-[#B08C1F] text-black font-semibold text-base px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-white/40"
                        style={{ backgroundSize: '200% 100%' }}>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
                  <span className="relative z-10 flex items-center">
                    REQUEST A CONSULTATION
                    <span className="ml-2 text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12">→</span>
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
                <p className="text-sm text-gray-200">
                  <span className="font-bold text-white">50+</span> Happy Clients
                </p>
              </div>
            </motion.div>
            
            {/* Right Column - 3D Canvas */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center items-center h-[500px] md:h-[550px]"
            >
              <div className="absolute w-64 h-64 bg-[#C9A227]/20 rounded-full blur-3xl animate-pulse"></div>
              
              <Canvas 
                dpr={[1, 2]} 
                camera={{ fov: 45, position: [0, 0, 8] }} 
                style={{ touchAction: 'none', background: 'transparent' }}
              >
                <Suspense fallback={
                  <mesh>
                    <boxGeometry args={[1,1,1]} />
                    <meshStandardMaterial color="#C9A227" />
                  </mesh>
                }>
                  <Model url="/images/nexbot_by_aximoris_copy_copy.gltf" />
                </Suspense>
                
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
                <directionalLight position={[-5, 5, 0]} intensity={0.8} color="#e0e0e0" />
                <pointLight position={[0, 3, 2]} intensity={0.6} color="#ffffff" />
                <pointLight position={[2, 2, 3]} intensity={0.4} color="#a0a0a0" />
                <pointLight position={[-2, 1, 2]} intensity={0.3} color="#888888" />
                <directionalLight position={[0, 2, -4]} intensity={0.6} color="#ffffff" />
                <pointLight position={[0, -2, 0]} intensity={0.3} color="#cccccc" />
              </Canvas>
            </motion.div>
            
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full bg-white py-8 mt-15 mb-15 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="bg-[#FFF8E1] rounded-full shadow-lg p-6 md:p-8 border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 relative">
              <div className="hidden md:block absolute left-1/4 top-1/4 bottom-1/4 w-px bg-gray-200"></div>
              <div className="hidden md:block absolute left-2/4 top-1/4 bottom-1/4 w-px bg-gray-200"></div>
              <div className="hidden md:block absolute left-3/4 top-1/4 bottom-1/4 w-px bg-gray-200"></div>
              
              <div className="text-center relative">
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                  </svg>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-black mb-1">1+</div>
                <p className="text-sm uppercase font-bold" style={{ color: '#C9A227' }}>Years in Business</p>
              </div>
              
              <div className="text-center relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gray-200 md:hidden"></div>
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2h6v2h-6V6zm0 4h6v2h-6v-2zm-6 0h4v2H6v-2zm10 4h-4v-2h4v2zm-10 0h4v2H6v-2z"/>
                  </svg>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-black mb-1">10+</div>
                <p className="text-sm uppercase font-bold" style={{ color: '#C9A227' }}>Websites Managed</p>
              </div>
              
              <div className="text-center relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gray-200 md:hidden"></div>
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 6.5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-9 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm10.5 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-9 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm11 4.5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-9 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/>
                  </svg>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-black mb-1">20+</div>
                <p className="text-sm uppercase font-bold" style={{ color: '#C9A227' }}>Reseller Partners</p>
              </div>
            
              <div className="text-center relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gray-200 md:hidden"></div>
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-1 .05 1.16.84 2 1.87 2 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-black mb-1">15+</div>
                <p className="text-sm uppercase font-bold" style={{ color: '#C9A227' }}>Employees</p>
              </div>
              
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Awards & Recognition Section (Wrapped with Card3D for Tilt) */}
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
            
            {/* Image Block (With 3D Card Effect) */}
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
            
            {/* Content Block */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-6 order-1 md:order-2"
            >
              <p className="text-sm uppercase font-bold tracking-wider animate-fade-in" style={{ color: '#C9A227' }}>ABOUT US</p>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">
                 The biggest team of<br/>tech experts to<br/>empower your brand
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
            
            {/* Content Slide from Left */}
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-6 order-1"
            >
              <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>WEBSITE DEVELOPMENT</p>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">We design & build your <br/> custom website</h2>
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
            
            {/* Image (With 3D Tilt) */}
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
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">Drive Real Business Growth with<br/>Strategic Marketing</h2>
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
      
{/* Digital Marketing Section */}
      <section className="w-full bg-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="relative flex justify-center items-center order-2 md:order-1">
              <div className="absolute w-64 h-64 bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute w-80 h-80 border border-[#C9A227]/20 rounded-full"></div>
              <div className="relative">
                <Image
                  src="/images/image.png"
                  alt="Digital Marketing"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-md object-contain relative z-10 drop-shadow-xl"
                />
              </div>
            </div>
            
            <div className="flex flex-col space-y-6 order-1 md:order-2">
              <p className="text-sm uppercase font-bold tracking-wider" style={{ color: '#C9A227' }}>DIGITAL MARKETING</p>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">Drive Real Business Growth with<br/>Strategic Marketing</h2>
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
      
      {/* Testimonials Section */}
      <section className="w-full bg-[#FFF8E1] py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="text-center mb-20">
            <p className="text-sm font-bold uppercase tracking-wider" style={{ color: '#C9A227' }}>CLIENT TESTIMONIALS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-black mt-2">What Our Clients Say</h2>
          </div>
          <div className="flex flex-col gap-16">
            {/* Card 1 */}
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
            {/* Card 2 */}
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
            {/* Card 3 */}
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