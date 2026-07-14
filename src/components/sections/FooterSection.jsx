import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import logoImg from '../../assets/logo.png'

export default function FooterSection() {
  return (
    <footer className="w-full bg-[#FCFCFC] border-t border-border py-16 lg:py-24 text-left">
      <div className="container-editorial w-full px-4 md:px-8">
        
        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          
          {/* Column 1: Logo & Brand details */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3.5">
              <img 
                src={logoImg} 
                alt="ML Overseas logo" 
                className="w-10 h-10 object-contain flex-shrink-0" 
              />
              <span className="text-[#0B1528] font-bold tracking-tight text-[16px] uppercase leading-none">
                ML OVERSEAS
              </span>
            </Link>
            
            <div className="space-y-3 font-semibold text-[13px] text-[#7A8293]">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-coral flex-shrink-0" />
                <span>PHONE : +91-7422030303</span>
              </div>
              <div className="flex items-center gap-2.5 break-all">
                <Mail className="w-4 h-4 text-coral flex-shrink-0" />
                <span>EMAIL : Mloverseasoffice@gmail.com</span>
              </div>
              <div className="text-[11px] text-[#7A8293] mt-1 font-mono uppercase">
                GSTIN: 06ACAFM9287H1ZV
              </div>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h4 className="text-[12px] font-bold text-[#0B1528] uppercase tracking-[0.18em] mb-5">
              COMPANY
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about-us' },
                { name: 'Our Process', href: '/applications' },
                { name: 'Infrastructure', href: '/about-us' },
                { name: 'Contact Us', href: '/contact-us' }
              ].map((l) => (
                <li key={l.name}>
                  <Link 
                    to={l.href} 
                    className="text-[14px] text-[#7A8293] hover:text-[#0B1528] transition-colors font-medium" 
                    data-hover
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h4 className="text-[12px] font-bold text-[#0B1528] uppercase tracking-[0.18em] mb-5">
              PRODUCTS
            </h4>
            <ul className="space-y-3">
              {[
                'Ring Spun Yarns', 
                'Open End (OE) Yarns', 
                'Combed Cotton Yarns', 
                'Polyester Cotton Blends', 
                'Custom Yarns'
              ].map((l) => (
                <li key={l}>
                  <Link 
                    to="/applications" 
                    className="text-[14px] text-[#7A8293] hover:text-[#0B1528] transition-colors font-medium" 
                    data-hover
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Connected & Address details */}
          <div className="space-y-6">
            <div>
              <h4 className="text-[12px] font-bold text-[#0B1528] uppercase tracking-[0.18em] mb-4">
                WANT TO STAY CONNECTED!
              </h4>
              <a 
                href="mailto:office@mloverseas.com"
                className="inline-flex items-center justify-between px-5 py-3.5 bg-[#F5F6F8] rounded-[18px] text-[13.5px] text-[#0B1528] font-bold w-full hover:bg-cream hover:shadow-soft transition-all duration-300"
                data-hover
              >
                <span className="break-all">office@mloverseas.com</span>
                <ArrowUpRight className="w-4 h-4 text-[#0B1528] flex-shrink-0" />
              </a>
            </div>

            <div className="space-y-5 text-[13px] text-[#7A8293] font-medium">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-[#0B1528] block tracking-wide uppercase">
                    ADDRESS
                  </span>
                  <span className="leading-relaxed block">
                    Khevat no. 251, Khatoni no. 275, Balana Road, VPO Naultha, Panipat - 132145, Haryana, India
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-[#0B1528] block tracking-wide uppercase">
                    CONTACT NUMBER
                  </span>
                  <a 
                    href="tel:+917422030303" 
                    className="hover:text-coral transition-colors font-bold block text-[#7A8293]"
                  >
                    +91-7422 030303
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-border mt-14 pt-8 text-[13px] text-[#7A8293] font-medium">
          <span>© 2026 ML Overseas. All rights reserved.</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service'].map((l) => (
              <a key={l} href="#" className="hover:text-[#0B1528] transition-colors" data-hover>
                {l}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
