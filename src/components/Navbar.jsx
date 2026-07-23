import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoImg from '../assets/logo.png'

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
      <div className={`container-editorial mx-auto transition-all duration-500 rounded-full px-6 lg:px-8 py-3 flex items-center justify-between ${navScrolled
        ? 'bg-white/70 backdrop-blur-xl border border-white/40 shadow-lifted'
        : 'bg-white/35 backdrop-blur-xl border border-white/30 shadow-soft'
        }`}>

        {/* Left Side: Brand Logo box & Title */}
        <Link to="/" className="flex items-center gap-3 group" data-hover>
          <img src={logoImg} alt="ML Overseas logo" className="w-14 h-14 object-contain flex-shrink-0" />
          <div className="hidden sm:block text-left">
            <div className="text-heading font-bold text-[15px] tracking-tight leading-none font-serifHead">
              ML Overseas
            </div>
            <div className="text-muted text-[9px] tracking-wider uppercase font-semibold mt-1 font-sans">
              Since 2022
            </div>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            to="/"
            data-hover
            className={`text-[12px] font-medium uppercase tracking-[0.15em] font-sans px-4 py-2 rounded-full transition-all duration-300 ${location.pathname === '/' && !location.hash ? 'text-heading bg-cream/70 border border-border/30' : 'text-text hover:text-heading hover:bg-cream/50'
              }`}
          >
            Home
          </Link>
          <Link
            to="/about-us"
            data-hover
            className={`text-[12px] font-medium uppercase tracking-[0.15em] font-sans px-4 py-2 rounded-full transition-all duration-300 ${location.pathname === '/about-us' ? 'text-heading bg-cream/70 border border-border/30' : 'text-text hover:text-heading hover:bg-cream/50'
              }`}
          >
            About Us
          </Link>
          <Link
            to="/products"
            data-hover
            className={`text-[12px] font-medium uppercase tracking-[0.15em] font-sans px-4 py-2 rounded-full transition-all duration-300 ${location.pathname === '/products' ? 'text-heading bg-cream/70 border border-border/30' : 'text-text hover:text-heading hover:bg-cream/50'
              }`}
          >
            Products
          </Link>
          <Link
            to="/#process"
            data-hover
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault()
                const el = document.getElementById('process')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className={`text-[12px] font-medium uppercase tracking-[0.15em] font-sans px-4 py-2 rounded-full transition-all duration-300 ${location.hash === '#process' ? 'text-heading bg-cream/70 border border-border/30' : 'text-text hover:text-heading hover:bg-cream/50'
              }`}
          >
            Process
          </Link>
        </div>

        {/* Right Side: Primary CTA Action Button */}
        <div className="hidden md:flex items-center">
          <Link
            to="/contact-us"
            data-hover
            className="btn-primary text-[12px] py-2.5 px-6 rounded-full font-medium uppercase tracking-[0.15em] font-sans cursor-pointer transition-all duration-300 hover:shadow-soft"
          >
            Contact
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
            className="lg:hidden mx-auto mt-2 w-full max-w-sm bg-white/95 backdrop-blur-md border border-border/40 rounded-3xl p-5 shadow-lifted"
          >
            <div className="flex flex-col gap-1.5 text-center">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`text-[12px] font-medium uppercase tracking-[0.15em] font-sans py-3 px-4 rounded-2xl transition-all ${location.pathname === '/' && !location.hash ? 'text-heading bg-cream/70 border border-border/30' : 'text-text hover:text-heading hover:bg-cream/40'
                  }`}
              >
                Home
              </Link>
              <Link
                to="/about-us"
                onClick={() => setMenuOpen(false)}
                className={`text-[12px] font-medium uppercase tracking-[0.15em] font-sans py-3 px-4 rounded-2xl transition-all ${location.pathname === '/about-us' ? 'text-heading bg-cream/70 border border-border/30' : 'text-text hover:text-heading hover:bg-cream/40'
                  }`}
              >
                About Us
              </Link>
              <Link
                to="/products"
                onClick={() => setMenuOpen(false)}
                className={`text-[12px] font-medium uppercase tracking-[0.15em] font-sans py-3 px-4 rounded-2xl transition-all ${location.pathname === '/products' ? 'text-heading bg-cream/70 border border-border/30' : 'text-text hover:text-heading hover:bg-cream/40'
                  }`}
              >
                Products
              </Link>
              <Link
                to="/#process"
                onClick={(e) => {
                  setMenuOpen(false)
                  if (location.pathname === '/') {
                    e.preventDefault()
                    const el = document.getElementById('process')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className={`text-[12px] font-medium uppercase tracking-[0.15em] font-sans py-3 px-4 rounded-2xl transition-all ${location.hash === '#process' ? 'text-heading bg-cream/70 border border-border/30' : 'text-text hover:text-heading hover:bg-cream/40'
                  }`}
              >
                Process
              </Link>

              {/* Mobile CTA */}
              <div className="border-t border-border/30 pt-4 mt-2">
                <Link
                  to="/contact-us"
                  onClick={() => setMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center bg-navy hover:bg-coral text-white text-[12px] font-medium uppercase tracking-[0.15em] font-sans py-3.5 rounded-2xl transition-all"
                >
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}