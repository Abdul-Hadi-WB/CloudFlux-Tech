'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const Consultation = () => {
  // State to switch between CEO (Abdul Hadi) and Founder (Ali Haider)
  const [activeTab, setActiveTab] = useState('ceo') // 'ceo' or 'founder'

  // Form input states
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [selectedService, setSelectedService] = useState('Web Development')
  const [projectDetails, setProjectDetails] = useState('')

  // Team Member Data with Updated WhatsApp Numbers
  const teamData = {
    ceo: {
      name: 'Abdul Hadi',
      role: 'Chief Executive Officer',
      whatsapp: '923027262793',
      image: '/images/CEO1.png',
      desc: 'Expert in technical strategy, software architectures, and scaling digital enterprises globally.'
    },
    founder: {
      name: 'Ali Haider',
      role: 'Founder & Visionary',
      whatsapp: '923116176345',
      image: '/images/FOUNDER.png',
      desc: 'Focused on brand positioning, high-end creative direction, and expanding strategic business avenues.'
    }
  }

  const currentMember = teamData[activeTab]

  // Handle WhatsApp Form Submission
  const handleWhatsAppRedirect = (e) => {
    e.preventDefault()

    if (!clientName || !projectDetails) {
      alert('Please fill in your name and project details!')
      return
    }

    const message = `Hello ${currentMember.name} (${currentMember.role}),\n\nI want to book a consultation session with you.\n\n*Name:* ${clientName}\n*Email:* ${clientEmail || 'N/A'}\n*Service:* ${selectedService}\n*Project Details:* ${projectDetails}`
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${currentMember.whatsapp}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20 relative overflow-hidden flex items-center justify-center">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-5 w-full relative z-10">

        {/* MAIN INTERACTIVE BOX CONTAINER */}
        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* TOP HEADING INSIDE THE FORM CONTAINER */}
          <div className="pt-8 px-8 pb-4 text-center border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-2xl md:text-3xl font-bold text-black tracking-wide">
              BOOK A CONSULTATION
            </h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
              Choose your preferred leader below and fill out the details to connect instantly on WhatsApp.
            </p>
          </div>

          {/* SWITCH BUTTONS BAR */}
          <div className="bg-gray-100 p-3 flex gap-3 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('ceo')}
              className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'ceo'
                  ? 'bg-black text-[#C9A227] shadow-lg scale-[1.02]'
                  : 'text-gray-600 hover:text-black hover:bg-gray-200/60'
              }`}
            >
              Abdul Hadi <span className="text-xs opacity-75 font-normal">(CEO)</span>
            </button>
            
            <button
              onClick={() => setActiveTab('founder')}
              className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'founder'
                  ? 'bg-black text-[#C9A227] shadow-lg scale-[1.02]'
                  : 'text-gray-600 hover:text-black hover:bg-gray-200/60'
              }`}
            >
              Ali Haider <span className="text-xs opacity-75 font-normal">(Founder)</span>
            </button>
          </div>

          {/* CONTENT & FORM AREA */}
          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                
                {/* Left Side: Member Profile Card Details */}
                <div className="lg:col-span-5 flex flex-col items-center text-center bg-gradient-to-br from-gray-50 to-[#FFF8E1]/40 p-6 rounded-2xl border border-amber-100/50">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4 bg-gray-200">
                    <Image
                      src={currentMember.image}
                      alt={currentMember.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-black">{currentMember.name}</h3>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#C9A227]/10 text-[#C9A227] mt-1">
                    {currentMember.role}
                  </span>
                  
                  <p className="text-gray-500 text-xs md:text-sm mt-3 leading-relaxed">
                    {currentMember.desc}
                  </p>

                  <div className="mt-5 w-full pt-4 border-t border-gray-200/60 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 py-2 rounded-xl">
                    <span>🟢 WhatsApp Direct Connect Ready</span>
                  </div>
                </div>

                {/* Right Side: Interactive Consultation Form */}
                <div className="lg:col-span-7">
                  <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
                    <h4 className="text-lg font-bold text-black border-b pb-2">
                      Session Details with {currentMember.name}
                    </h4>

                    {/* Name Input */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                       Name
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Enter your Name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A227] text-sm bg-gray-50/50 transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="Enter your Email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A227] text-sm bg-gray-50/50 transition-colors"
                      />
                    </div>

                    {/* Service Selection Dropdown */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Select Consultation Domain
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A227] text-sm bg-gray-50/50 transition-colors"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="Social Media Marketing">Social Media Marketing</option>
                        <option value="Video Editing">Video Editing</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Custom Tech Solution">Custom Tech Solution</option>
                      </select>
                    </div>

                    {/* Project Details Textarea */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Project Details / Discussion Topics
                      </label>
                      <textarea
                        required
                        rows="3"
                        value={projectDetails}
                        onChange={(e) => setProjectDetails(e.target.value)}
                        placeholder="Enter your briefly description project requirements..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A227] text-sm bg-gray-50/50 transition-colors resize-none"
                      ></textarea>
                    </div>

                    {/* WhatsApp Submit Action Button */}
                    <button
                      type="submit"
                      className="bg-black w-full py-4 rounded-xl text-[#C9A227] scale-[1.02] font-bold text-baseshadow-lg shadow-emerald-600/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      <span>Send Request to WhatsApp</span>
                      <span className="text-xl">→</span>
                    </button>
                  </form>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Consultation