'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react' // Mobile icons add kar diye hain

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false) // Desktop dropdown state
  const [isMobileOpen, setIsMobileOpen] = useState(false) // Mobile drawer state
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false) // Mobile services submenu state

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm">
      {/* Top Strip with Gradient - Blackish to #C9A227 */}
      <div className="w-full bg-gradient-to-r from-[#8B6B1E] to-[#C9A227] py-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-end items-center">
          {/* Right side - Make a Referral | Client Login */}
          <div className="flex items-center gap-3 text-sm">
            <Link href="/referral" className="text-black font-medium hover:underline">
              MAKE A REFERRAL
            </Link>
            <span className="text-black/50">|</span>
            <Link href="/login" className="text-black font-medium hover:underline">
              CLIENT LOGIN
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-[#C9A227]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            {/* Logo - Link to home */}
            <Link href="/home" className="cursor-pointer group flex items-center">
              <Image
                src="/images/cloudfluxlogo.png"
                alt="CloudFlux Tech Logo"
                width={250}
                height={110}
                priority
                className="w-[180px] sm:w-[220px] md:w-[250px] h-auto object-contain transition duration-500 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Menu - Hidden on mobile, visible on desktop */}
            <div className="hidden md:flex items-center gap-10 font-semibold text-black">
              <Link 
                href="/home" 
                className="relative hover:text-[#C9A227] transition duration-300 group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A227] transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link 
                href="/about" 
                className="relative hover:text-[#C9A227] transition duration-300 group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A227] transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Services Dropdown - PROFESSIONAL VERSION */}
              <div 
                className="relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <button className="relative flex items-center gap-1 hover:text-[#C9A227] transition duration-300 group">
                  Services
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#C9A227]' : ''}`}
                  />
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#C9A227] transition-all duration-300 ${isOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>

                {/* PROFESSIONAL DROPDOWN WITH ANIMATION */}
                <div 
                  className={`absolute top-12 left-0 w-64 transition-all duration-300 transform ${
                    isOpen 
                      ? 'opacity-100 translate-y-0 visible' 
                      : 'opacity-0 -translate-y-2 invisible'
                  }`}
                >
                  <div className="bg-white border border-[#C9A227]/20 rounded-xl shadow-xl overflow-hidden">
                    {/* Decorative top border */}
                    <div className="h-1 bg-gradient-to-r from-[#8B6B1E] to-[#C9A227]"></div>
                    
                    {/* Menu items with hover effects */}
                    <div className="p-2">
                      <Link 
                        href="/web-development" 
                        className="block px-4 py-3 rounded-lg hover:bg-[#C9A227] hover:text-white transition-all duration-200 transform hover:translate-x-1"
                      >
                        <div className="font-medium">Web Development</div>
                        <div className="text-xs text-gray-500 hover:text-white/80">Custom websites & apps</div>
                      </Link>
                    
                      <Link 
                        href="/digital-marketing" 
                        className="block px-4 py-3 rounded-lg hover:bg-[#C9A227] hover:text-white transition-all duration-200 transform hover:translate-x-1"
                      >
                        <div className="font-medium">Social Media Marketing</div>
                        <div className="text-xs text-gray-500 hover:text-white/80">Grow your audience</div>
                      </Link>
                      
                      <Link 
                        href="/video-editing" 
                        className="block px-4 py-3 rounded-lg hover:bg-[#C9A227] hover:text-white transition-all duration-200 transform hover:translate-x-1"
                      >
                        <div className="font-medium">Video Editing</div>
                        <div className="text-xs text-gray-500 hover:text-white/80">Professional post-production</div>
                      </Link>
                      
                      <Link
                        href="/graphic-designing" 
                        className="block px-4 py-3 rounded-lg hover:bg-[#C9A227] hover:text-white transition-all duration-200 transform hover:translate-x-1"
                      >
                        <div className="font-medium">Graphic Designing</div>
                        <div className="text-xs text-gray-500 hover:text-white/80">Brand identity & visuals</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link 
                href="/contact" 
                className="relative hover:text-[#C9A227] transition duration-300 group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A227] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Desktop Right Side Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/consultation">
                <button className="px-6 py-2 rounded-full bg-[#C9A227] text-black font-semibold hover:bg-black hover:text-[#C9A227] transition duration-300">
                  BOOK A CONSULTATION
                </button>
              </Link>
            </div>

            {/* Mobile Hamburger Menu Button - Visible only on mobile */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="text-black hover:text-[#C9A227] transition duration-300 focus:outline-none"
              >
                {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-down Panel */}
      <div
        className={`md:hidden bg-white border-b border-[#C9A227]/40 transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileOpen ? 'max-h-[80vh] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className="px-6 py-5 space-y-4 font-semibold text-black overflow-y-auto max-h-[calc(80vh-2rem)]">
          <Link
            href="/home"
            onClick={() => setIsMobileOpen(false)}
            className="block hover:text-[#C9A227] transition duration-300 py-1"
          >
            Home
          </Link>
          
          <Link
            href="/about"
            onClick={() => setIsMobileOpen(false)}
            className="block hover:text-[#C9A227] transition duration-300 py-1"
          >
            About
          </Link>

          {/* Mobile Accordion Dropdown for Services */}
          <div className="py-1">
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="w-full flex items-center justify-between hover:text-[#C9A227] transition duration-300 text-left font-semibold"
            >
              <span>Services</span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180 text-[#C9A227]' : ''}`}
              />
            </button>
            
            <div
              className={`pl-4 border-l-2 border-[#C9A227]/30 transition-all duration-300 ease-in-out overflow-hidden ${
                isMobileServicesOpen ? 'max-h-80 opacity-100 mt-3 space-y-3' : 'max-h-0 opacity-0'
              }`}
            >
              <Link
                href="/web-development"
                onClick={() => setIsMobileOpen(false)}
                className="block font-medium text-sm text-gray-700 hover:text-[#C9A227]"
              >
                Web Development
              </Link>
              <Link
                href="/digital-marketing"
                onClick={() => setIsMobileOpen(false)}
                className="block font-medium text-sm text-gray-700 hover:text-[#C9A227]"
              >
                Social Media Marketing
              </Link>
              <Link
                href="/video-editing"
                onClick={() => setIsMobileOpen(false)}
                className="block font-medium text-sm text-gray-700 hover:text-[#C9A227]"
              >
                Video Editing
              </Link>
              <Link
                href="/graphic-designing"
                onClick={() => setIsMobileOpen(false)}
                className="block font-medium text-sm text-gray-700 hover:text-[#C9A227]"
              >
                Graphic Designing
              </Link>
            </div>
          </div>

          <Link
            href="/contact"
            onClick={() => setIsMobileOpen(false)}
            className="block hover:text-[#C9A227] transition duration-300 py-1"
          >
            Contact
          </Link>

          {/* Divider line before CTA */}
          <div className="border-t border-gray-100 my-2"></div>

          {/* Consultation Button for Mobile */}
          <div className="pt-2">
            <Link href="/consultation" onClick={() => setIsMobileOpen(false)}>
              <button className="w-full px-6 py-2.5 rounded-full bg-[#C9A227] text-black font-semibold hover:bg-black hover:text-[#C9A227] transition duration-300 text-center text-sm">
                BOOK A CONSULTATION
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar