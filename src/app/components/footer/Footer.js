'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#C9A227] text-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <Image
            src="/images/CloudFluxTech.png"
            alt="CloudFlux Tech Logo"
            width={200}
            height={90}
            className="object-contain"
          />
          <p className="text-black/80 text-sm leading-relaxed">
            CloudFlux Tech provides innovative solutions in Web Development, Digital Marketing, Video Editing, and Graphic Designing. Your success is our mission.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-2">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="p-2 rounded-full bg-black/10 hover:bg-black hover:text-[#C9A227] transition-all duration-300"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg" style={{ color: 'black' }}>Quick Links</h3>
          {['Home','About','Services','Contact'].map((item,i)=>(
            <Link key={i} href="#" className="text-black/80 hover:text-black transition duration-300">
              {item}
            </Link>
          ))}
        </div>

        {/* Services */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg" style={{ color: 'black' }}>Services</h3>
          {[
            'Web Development',
            'Social Media Marketing',
            'Video Editing',
            'Graphic Designing'
          ].map((item,i)=>(
            <Link key={i} href="#" className="text-black/80 hover:text-black transition duration-300">
              {item}
            </Link>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg" style={{ color: 'black' }}>Contact</h3>
          <p className="text-black/80">Email: info@cloudfluxtech.com</p>
          <p className="text-black/80">Phone: +92 300 1234567</p>
          <p className="text-black/80">Address: 123 Tech Street, Karachi, Pakistan</p>

          <Link
            href="#"
            className="mt-3 inline-block px-5 py-2.5 rounded-full bg-black text-[#C9A227] font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-md"
          >
            Subscribe
          </Link>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-black/20 pt-6 text-center text-black/70 text-sm">
        © {new Date().getFullYear()} 
        <span className="font-semibold"> CloudFlux Tech</span>. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer