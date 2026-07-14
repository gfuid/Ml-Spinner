import React, { useEffect, useState } from 'react'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Home from './components/Home/Home'
import AboutUs from './components/AboutUs/AboutUs'
import Applications from './components/Applications/Applications'
import ContactUs from './components/ContactUs/ContactUs'
import FooterSection from './components/sections/FooterSection'
import logoImg from './assets/logo.png'
import './App.css'

/* ─── Scroll Reset Helper ─── */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/* ─── Route Metadata Manager for SEO ─── */
function RouteMetadataManager() {
  const location = useLocation()

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = "ML Spinners Pvt. Ltd. — High Tenacity Industrial Yarns"
        updateMetaDescription("ML Spinners Pvt. Ltd. is a leading manufacturer of premium High Tenacity industrial yarns since 1996. Equipped with advanced European machinery to deliver superior carded and combed yarns globally.")
        break
      case '/about-us':
        document.title = "About Us — ML Spinners Pvt. Ltd. | Spinning Since 1996"
        updateMetaDescription("Get informed about ML Spinners Pvt. Ltd., leading manufacturer of High Tenacity industrial yarns. Discover our European machinery, ISO standards, and custom solution testing labs.")
        break
      case '/applications':
        document.title = "Yarn Applications & Products — ML Spinners Pvt. Ltd."
        updateMetaDescription("Explore our precision yarn products, cotton-polyester blends, and industrial end-use applications including socks, towels, ropes, carpets, and geo-textiles.")
        break
      case '/contact-us':
        document.title = "Contact Us — ML Spinners Pvt. Ltd. | Customer Support"
        updateMetaDescription("Need customer support? Feel free to contact ML Spinners on our email mlspinnerspvtltd@gmail.com, phone +91-8168680884, or visit our Mini Secretariat office in Gohana.")
        break
      default:
        break
    }
  }, [location])

  return null
}

function updateMetaDescription(content) {
  let metaDesc = document.querySelector('meta[name="description"]')
  if (!metaDesc) {
    metaDesc = document.createElement('meta')
    metaDesc.name = 'description'
    document.head.appendChild(metaDesc)
  }
  metaDesc.setAttribute('content', content)
}

/* ─── Loader ─── */
const LOADER_STEPS = [
  { threshold: 12, label: "Selecting premium organic cotton fibers...", icon: "🌿" },
  { threshold: 25, label: "Carding fibers into thin aligned webs...", icon: "✨" },
  { threshold: 38, label: "Drawing and blending slivers for density...", icon: "📐" },
  { threshold: 50, label: "Feeding slivers to drafting system...", icon: "⚙️" },
  { threshold: 65, label: "Ring spinning: Twisting at 14,800 RPM...", icon: "🔄" },
  { threshold: 78, label: "Laser-scanning yarn for imperfections...", icon: "🔬" },
  { threshold: 90, label: "Winding onto precision cross-wound cones...", icon: "🧶" },
  { threshold: 100, label: "Climate-controlled packaging & export...", icon: "🌍" }
]

function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 8 + 2
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(onComplete, 800)
      }
      setProgress(Math.min(p, 100))
    }, 70)
    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    let animFrame
    const tick = () => {
      setTime((t) => t + 1)
      animFrame = requestAnimationFrame(tick)
    }
    animFrame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animFrame)
  }, [])

  const currentStep = LOADER_STEPS.find((step) => progress <= step.threshold) || LOADER_STEPS[LOADER_STEPS.length - 1]
  const yarnWidth = 6 + 28 * (progress / 100)
  const yarnX = 50 - yarnWidth / 2
  const oscillatingY = 55 + Math.sin(time * 0.08) * 30

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <img src={logoImg} alt="ML Spinners logo" className="w-12 h-12 object-contain mb-2" />
      <span className="text-[11px] text-coral font-bold tracking-[0.2em] uppercase mb-4">ML Spinner Mills</span>

      <div className="relative mb-6 flex items-center justify-center w-40 h-40">
        {/* Floating cotton fiber particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cream rounded-full border border-border"
              style={{
                left: `calc(50% - 40px + ${Math.sin(i * 1.5) * 15}px)`,
                bottom: '10%',
              }}
              animate={{
                y: [-10, -100],
                x: [0, Math.cos(i) * 12],
                opacity: [0, 0.8, 0],
                scale: [0.6, 1.1, 0.4]
              }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Spindle winding SVG */}
        <svg viewBox="0 0 100 120" className="w-32 h-32 text-navy relative z-10">
          <defs>
            <pattern id="yarn-pattern" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#FFF0EE" strokeWidth="1.2" opacity="0.45" />
            </pattern>
          </defs>

          {/* Bobbin spindle holder base and top pin */}
          <rect x="47" y="5" width="6" height="110" rx="3" fill="#E8E9EC" />
          <rect x="42" y="105" width="16" height="10" rx="2" fill="#9CA3AF" />
          <ellipse cx="50" cy="5" rx="5" ry="2" fill="#9CA3AF" />

          {/* The actual yarn package (wound yarn) that grows in size */}
          {progress > 0 && (
            <>
              {/* Main solid yarn shape */}
              <rect
                x={yarnX}
                y="20"
                width={yarnWidth}
                height="80"
                rx="6"
                fill="var(--color-coral)"
                style={{ transition: 'all 0.1s linear' }}
              />
              {/* Yarn pattern overlay for texture */}
              <rect
                x={yarnX}
                y="20"
                width={yarnWidth}
                height="80"
                rx="6"
                fill="url(#yarn-pattern)"
                style={{ transition: 'all 0.1s linear' }}
              />
            </>
          )}

          {/* Winding traveler ring (moves vertically and wraps thread) */}
          {progress > 0 && progress < 100 && (
            <>
              {/* Oscillating guide thread */}
              <line
                x1="20"
                y1="65"
                x2="50"
                y2={oscillatingY}
                stroke="var(--color-coral)"
                strokeWidth="1.5"
                className="animate-thread-wiggle"
              />
              {/* Traveler ring wrapping yarn */}
              <ellipse
                cx="50"
                cy={oscillatingY}
                rx={yarnWidth / 2 + 3}
                ry="3"
                fill="none"
                stroke="var(--color-navy)"
                strokeWidth="1.5"
              />
              <circle
                cx={50 - yarnWidth / 2 - 3}
                cy={oscillatingY}
                r="2"
                fill="var(--color-coral)"
              />
            </>
          )}

          {/* Eyelet thread guide on the side */}
          <circle cx="20" cy="65" r="4" fill="none" stroke="var(--color-navy)" strokeWidth="2" />
          <circle cx="20" cy="65" r="1.5" fill="var(--color-coral)" />

          {/* Feed thread going from bottom to eyelet */}
          <line
            x1="20"
            y1="120"
            x2="20"
            y2="69"
            stroke="var(--color-coral)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-dash-scroll"
          />
        </svg>
      </div>

      {/* Progress bar */}
      <div className="w-56 h-[3px] bg-[#E8E9EC] rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF6B5A] to-[#1B2B4B] rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Step Description */}
      <div className="flex items-center gap-3 h-8">
        <span className="text-xl">{currentStep.icon}</span>
        <span className="text-[13px] text-navy font-semibold tracking-wide">
          {currentStep.label}
        </span>
      </div>

      <p className="mt-1 text-[11px] text-[#9CA3AF] font-bold tabular-nums">
        {Math.round(progress)}%
      </p>
    </motion.div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()

  return (
    <>
      {/* LOADER */}
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* CUSTOM CURSOR */}
      <CustomCursor />

      {/* Scroll Position Reset */}
      <ScrollToTop />

      {/* Dynamic SEO Metadata Updates */}
      <RouteMetadataManager />

      <div className="min-h-screen bg-white relative flex flex-col">
        {/* NAV */}
        {!loading && <Navbar />}

        {/* PAGES / ROUTING */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home loading={loading} />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </main>

        {/* GLOBAL FOOTER */}
        {!loading && <FooterSection />}

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-coral to-navy z-[60] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </>
  )
}

export default App
