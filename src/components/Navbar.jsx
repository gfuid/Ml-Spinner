import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoImg from '../assets/logo.png'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Applications', href: '/applications' },
  { label: 'Contact Us', href: '/contact-us' }
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setNavScrolled(true)
      } else {
        setNavScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-4 pt-4"
    >
      {/* Floating Glass Capsule */}
      <div className={`container-editorial mx-auto transition-all duration-500 rounded-full px-6 lg:px-8 py-3 flex items-center justify-between ${
        navScrolled ? 'glass-strong shadow-lifted border border-border/30' : 'bg-white/60 backdrop-blur-md border border-white/40'
      }`}>
        
        {/* Left Side: Brand Logo box & Title */}
        <Link to="/" className="flex items-center gap-3 group" data-hover>
          <img src={logoImg} alt="ML Overseas logo" className="w-9 h-9 object-contain flex-shrink-0" />
          <div className="hidden sm:block text-left">
            <div className="text-heading font-bold text-[15px] tracking-tight leading-none">
              ML Overseas
            </div>
            <div className="text-muted text-[9px] tracking-wider uppercase font-semibold mt-1">
              Since 2022
            </div>
          </div>
        </Link>

        {/* Center: Navigation Links in proper-case */}
        <div className="hidden lg:flex items-center gap-1.5">
          {LINKS.map((link) => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.label}
                to={link.href}
                data-hover
                className={`text-[14px] font-bold px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive ? 'text-heading bg-cream' : 'text-text hover:text-heading hover:bg-cream/50'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right Side: Primary CTA Action Button */}
        <div className="hidden md:flex items-center">
          <Link 
            to="/contact-us" 
            data-hover 
            className="btn-primary text-[13px] py-2.5 px-6 rounded-full font-bold cursor-pointer transition-all duration-300 hover:shadow-soft"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-9 h-9 rounded-full bg-cream/60 flex items-center justify-center text-heading hover:bg-cream"
          data-hover
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`w-4 h-0.5 bg-heading rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`w-4 h-0.5 bg-heading rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </div>
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden mx-auto mt-2 max-w-sm bg-white/95 backdrop-blur-md border border-border/40 rounded-3xl p-5 shadow-lifted"
          >
            <div className="flex flex-col gap-1.5 text-center">
              {LINKS.map((link) => {
                const isActive = location.pathname === link.href
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-[14px] font-bold py-3 px-4 rounded-2xl transition-all ${
                      isActive ? 'text-heading bg-cream' : 'text-text hover:text-heading hover:bg-cream/40'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              
              {/* Mobile CTA */}
              <div className="border-t border-border/30 pt-4 mt-2">
                <Link
                  to="/contact-us"
                  onClick={() => setMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center bg-navy hover:bg-coral text-white font-bold py-3.5 rounded-2xl transition-all"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
