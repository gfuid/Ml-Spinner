import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = ['About', 'Process', 'Products', 'Sustainability', 'Contact']

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-4 pt-4"
    >
      <div className={`container-xl mx-auto transition-all duration-500 rounded-full px-6 lg:px-8 py-3 flex items-center justify-between ${
        scrolled
          ? 'glass-strong shadow-lifted'
          : 'bg-white/40 backdrop-blur-sm'
      }`}>
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" data-hover>
          <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center group-hover:bg-coral transition-colors duration-500">
            <span className="text-white text-[11px] font-bold tracking-wider">ML</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-heading font-semibold text-[15px] tracking-tight leading-none">ML Spinners</div>
            <div className="text-muted text-[10px] tracking-wider uppercase mt-0.5">Since 1993</div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              data-hover
              className="relative text-[14px] text-text hover:text-heading transition-colors font-medium tracking-tight px-4 py-2 rounded-full hover:bg-cream"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            data-hover
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white rounded-full text-[13px] font-medium hover:bg-coral transition-all duration-500 hover:shadow-lg hover:shadow-coral/20"
          >
            Get in Touch
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 rounded-full bg-cream flex items-center justify-center"
            data-hover
          >
            <div className="flex flex-col gap-1.5">
              <span className={`w-4 h-0.5 bg-heading rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`w-4 h-0.5 bg-heading rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mt-2 mx-4 glass-strong rounded-2xl p-6 shadow-float"
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-[15px] text-text hover:text-heading font-medium py-3 px-4 rounded-xl hover:bg-cream transition-colors"
              >
                {link}
              </a>
            ))}
            <a href="#contact" className="mt-3 text-center px-5 py-3 bg-navy text-white rounded-full text-[14px] font-medium">
              Get in Touch
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
