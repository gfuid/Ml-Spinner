import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, ChevronRight, Leaf, Globe, Shield, Award, Factory, Sparkles } from 'lucide-react'
import ThreeCanvas from './components/ThreeCanvas'
import './App.css'

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
}
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
}
const slideRight = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
}
const slideLeft = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
}
const rotateIn = {
  hidden: { opacity: 0, rotate: -5, scale: 0.95 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
}

/* ─── Counter Hook ─── */
function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * end))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, inView])

  return { count, ref }
}

/* ─── Section Wrapper ─── */
function Section({ children, className = '', id = '' }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ─── Custom Cursor ─── */
function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 5}px`
        dotRef.current.style.top = `${e.clientY - 5}px`
      }
    }
    let raf
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x - 22}px`
        ringRef.current.style.top = `${ringPos.current.y - 22}px`
      }
      raf = requestAnimationFrame(animate)
    }
    const onOver = (e) => {
      if (e.target.closest('a, button, [data-hover]') && ringRef.current) {
        ringRef.current.classList.add('hovering')
      }
    }
    const onOut = () => ringRef.current?.classList.remove('hovering')

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block" />
      <div ref={ringRef} className="cursor-ring hidden lg:block" />
    </>
  )
}

/* ─── Loader ─── */
function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 12 + 3
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(onComplete, 600)
      }
      setProgress(Math.min(p, 100))
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Animated yarn spinning icon */}
      <div className="relative mb-10">
        <div className="w-20 h-20 rounded-full border-[3px] border-[#E8E9EC] border-t-[#FF6B5A] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-xl bg-[#1B2B4B] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">ML</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-[3px] bg-[#E8E9EC] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF6B5A] to-[#1B2B4B] rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Text */}
      <motion.p
        className="mt-5 text-[13px] text-[#9CA3AF] font-medium tracking-wider"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        Crafting your experience...
      </motion.p>
      <p className="mt-1 text-[11px] text-[#E8E9EC] font-medium tabular-nums">
        {Math.round(progress)}%
      </p>
    </motion.div>
  )
}

/* ─── Data ─── */
const PROCESS = [
  { num: '01', title: 'Cotton Selection', desc: 'Hand-picked premium long-staple organic cotton from certified farms.', icon: '🌿' },
  { num: '02', title: 'Fiber Cleaning', desc: 'Advanced pneumatic separation removes impurities preserving fiber integrity.', icon: '✨' },
  { num: '03', title: 'Precision Carding', desc: 'High-speed wire cylinders align fibers into uniform parallel arrays.', icon: '⚙️' },
  { num: '04', title: 'Drawing Frame', desc: 'Progressive drafting rollers blend slivers for perfect density.', icon: '📐' },
  { num: '05', title: 'Ring Spinning', desc: 'Precision twist at 14,800 RPM creates strong, consistent yarn.', icon: '🔄' },
  { num: '06', title: 'Quality Testing', desc: 'Dual-laser scanning verifies diameter, strength, and evenness.', icon: '🔬' },
  { num: '07', title: 'Cone Winding', desc: 'Cross-wound onto precision cones for seamless loom compatibility.', icon: '🧶' },
  { num: '08', title: 'Global Export', desc: 'Climate-controlled packaging and dispatch to 42+ countries.', icon: '🌍' },
]

const PRODUCTS = [
  { tag: 'Fine Knit', title: 'Ultra-Fine Merino Blend', desc: 'Blended with elastic fibers for exceptional thermal properties and buttery-smooth handle.', count: '120s', strength: '98%', hairiness: '0.82 cN' },
  { tag: 'Premium Shirting', title: 'Egyptian Giza Cotton', desc: 'Triple-carded ultra-long staple Giza fibers for impeccable surface finish and drape.', count: '100s', strength: '95%', hairiness: '0.91 cN' },
  { tag: 'Haute Couture', title: 'Silk-Yarn Hybrid', desc: 'Natural silk filaments woven with cotton for luminous sheen and structural bounce.', count: '140s', strength: '92%', hairiness: '0.65 cN' },
]

const CLIENTS = ['Arvind Mills', 'Raymond', 'Vardhman', 'Welspun', 'Trident', 'Indo Count', 'Bombay Dyeing', 'Siyaram', 'Grasim', 'Alok Industries', 'Sutlej Textiles', 'Nahar Spinning']

/* ─── ProcessSection Component (GSAP ScrollTrigger version) ─── */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

function ProcessSection() {
  const containerRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const listEl = listRef.current
    const containerEl = containerRef.current
    if (!listEl || !containerEl) return

    // Calculate how much we need to scroll horizontally
    // (Total width of scrollable content minus viewport width)
    const getScrollAmount = () => -(listEl.scrollWidth - window.innerWidth + 96) // 96px safety padding

    const ctx = gsap.context(() => {
      gsap.to(listEl, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: containerEl,
          start: 'top top',
          end: () => `+=${listEl.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1, // Smooth scrolling transition
          invalidateOnRefresh: true, // Recalculate offsets on resize
        }
      })
    })

    return () => ctx.revert() // Cleanup GSAP animations on unmount
  }, [])

  return (
    <div ref={containerRef} className="relative bg-cream overflow-hidden" id="process">
      <div className="h-screen flex flex-col justify-center noise">
        
        {/* Title Block */}
        <div className="container-editorial mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <span className="text-[13px] text-coral font-semibold tracking-[0.15em] uppercase block mb-3">Our Process</span>
              <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading max-w-2xl">
                From raw cotton to world-class yarn — in eight precision steps.
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-muted font-medium uppercase tracking-wider">Scroll Down</span>
            </div>
          </div>
        </div>

        {/* Sliding List of Cards */}
        <div className="w-full">
          <div ref={listRef} className="flex gap-6 px-12 lg:px-24 w-max">
            {PROCESS.map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="flex-shrink-0 w-[290px] lg:w-[330px] bg-white rounded-3xl p-8 shadow-soft hover:shadow-float transition-shadow duration-500 group border border-border/40"
                data-hover
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[48px] font-semibold text-border group-hover:text-coral transition-colors duration-500 leading-none tracking-tight">
                    {step.num}
                  </span>
                  <span className="text-3xl p-2.5 bg-cream rounded-2xl group-hover:bg-coral-soft transition-colors duration-500">
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-[18px] font-semibold text-heading tracking-tight">{step.title}</h3>
                <p className="text-[13.5px] text-text mt-3 leading-relaxed">{step.desc}</p>
                <div className="flex items-center gap-1 mt-6 text-[12px] text-coral font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  Explore Spec <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}




/* ════════════════════════════════════════════════════════════ */
/*                         APP                                   */
/* ════════════════════════════════════════════════════════════ */

function App() {
  const [loading, setLoading] = useState(true)
  const [navScrolled, setNavScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], [0, -80])

  const years = useCounter(30, 2000)
  const countries = useCounter(42, 2500)
  const purity = useCounter(99, 2000)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* LOADER */}
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* CUSTOM CURSOR */}
      <CustomCursor />

      <div className="min-h-screen bg-white relative">

        {/* ═══ NAV ═══ */}
        <motion.nav
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: loading ? 0 : 1, y: loading ? -30 : 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 w-full z-50 px-4 pt-4"
        >
          <div className={`container-editorial mx-auto transition-all duration-500 rounded-full px-6 lg:px-8 py-3 flex items-center justify-between ${
            navScrolled ? 'glass-strong shadow-lifted' : 'bg-white/50 backdrop-blur-sm'
          }`}>
            <a href="#" className="flex items-center gap-3 group" data-hover>
              <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center group-hover:bg-coral transition-colors duration-500">
                <span className="text-white text-[11px] font-bold tracking-wider">ML</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-heading font-semibold text-[15px] tracking-tight leading-none">ML Spinners</div>
                <div className="text-muted text-[10px] tracking-wider uppercase mt-0.5">Since 1993</div>
              </div>
            </a>
            <div className="hidden lg:flex items-center gap-1">
              {['About', 'Process', 'Products', 'Sustainability', 'Contact'].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} data-hover className="text-[14px] text-text hover:text-heading font-medium px-4 py-2 rounded-full hover:bg-cream transition-all">{l}</a>
              ))}
            </div>
            <a href="#contact" data-hover className="btn-primary text-[13px] py-2.5 px-5">Get in Touch</a>
          </div>
        </motion.nav>

        {/* ═══ HERO ═══ */}
        <section className="relative pt-36 pb-28 lg:pt-44 lg:pb-36 overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-coral-soft to-blue-soft opacity-40 blur-3xl pointer-events-none animate-blob" />
          <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-cream to-blue-soft opacity-30 blur-3xl pointer-events-none animate-blob-delay" />

          <div className="container-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left — Text */}
              <motion.div
                initial="hidden"
                animate={loading ? 'hidden' : 'visible'}
                variants={stagger}
                className="space-y-8 max-w-xl relative z-10"
              >
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-soft text-coral text-[13px] font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  Trusted by India's top textile brands
                </motion.div>

                <motion.h1 variants={fadeUp} className="text-[clamp(42px,5.5vw,78px)] font-semibold leading-[1.05] tracking-[-0.03em] text-heading">
                  Crafting the world's
                  <span className="text-coral"> finest yarn</span>,
                  since 1993.
                </motion.h1>

                <motion.p variants={fadeUp} className="text-lg text-text leading-relaxed max-w-md">
                  Three decades of precision spinning, sustainable sourcing, and relentless quality — delivering premium yarn to luxury fashion houses in 42 countries.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-2">
                  <a href="#process" className="btn-primary" data-hover>
                    <span>Explore Manufacturing</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#about" className="btn-secondary" data-hover>
                    <Play className="w-4 h-4" />
                    <span>Watch Factory Tour</span>
                  </a>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-4">
                  <div ref={years.ref} className="stat-card">
                    <div className="text-2xl font-semibold text-heading tracking-tight">{years.count}+</div>
                    <div className="text-[12px] text-muted font-medium mt-0.5">Years of Excellence</div>
                  </div>
                  <div ref={countries.ref} className="stat-card">
                    <div className="text-2xl font-semibold text-heading tracking-tight">{countries.count}</div>
                    <div className="text-[12px] text-muted font-medium mt-0.5">Countries Served</div>
                  </div>
                  <div ref={purity.ref} className="stat-card">
                    <div className="text-2xl font-semibold text-heading tracking-tight">{purity.count}.8%</div>
                    <div className="text-[12px] text-muted font-medium mt-0.5">Fiber Purity</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right — 3D Yarn Cone */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={loading ? {} : { opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-[420px] lg:h-[560px]"
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[360px] h-[360px] lg:w-[480px] lg:h-[480px] rounded-full bg-gradient-to-br from-blue-soft via-coral-soft to-cream opacity-60 blur-3xl" />
                </div>
                <ThreeCanvas />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ MARQUEE ═══ */}
        <Section className="py-14 border-t border-b border-border overflow-hidden bg-cream/30 noise" id="clients">
          <motion.div variants={fadeIn}>
            <p className="text-center text-[12px] text-muted font-medium tracking-[0.2em] uppercase mb-8">Trusted by leading manufacturers</p>
            <div className="relative overflow-hidden">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="animate-marquee flex items-center whitespace-nowrap py-4">
                {[...CLIENTS, ...CLIENTS].map((name, i) => (
                  <React.Fragment key={i}>
                    <span 
                      className="text-2xl font-semibold text-muted/30 hover:text-coral hover:scale-110 tracking-tight select-none flex-shrink-0 px-8 transition-all duration-300 cursor-pointer"
                      data-hover
                    >
                      {name}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-coral/20 flex-shrink-0 mx-2 group-hover:bg-coral/60 transition-all duration-300" />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        </Section>

        {/* ═══ ABOUT ═══ */}
        <Section className="py-28 lg:py-40 relative" id="about">
          <div className="container-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <motion.div variants={rotateIn} className="lg:col-span-7 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-float">
                  <motion.div style={{ y: heroImageY }}>
                    <img src="/about.png" alt="Premium cotton harvested at golden hour" className="w-full h-[400px] lg:h-[560px] object-cover" />
                  </motion.div>
                </div>
                <motion.div
                  variants={slideLeft}
                  className="absolute -bottom-8 right-4 lg:right-8 glass-strong rounded-2xl shadow-float p-6 max-w-[240px]"
                >
                  <div className="text-3xl font-semibold text-heading tracking-tight">3M+</div>
                  <div className="text-[13px] text-text mt-1">Spindles operating daily across our production facilities</div>
                </motion.div>
              </motion.div>

              <div className="lg:col-span-5 space-y-6">
                <motion.span variants={fadeUp} className="text-[13px] text-coral font-semibold tracking-[0.15em] uppercase block">About ML Spinners</motion.span>
                <motion.h2 variants={fadeUp} className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading">
                  Where tradition meets precision engineering.
                </motion.h2>
                <motion.p variants={fadeUp} className="text-base text-text leading-relaxed">
                  Founded in 1993, ML Spinners Pvt. Ltd. has grown from a single-unit spinning operation into one of India's most respected premium yarn manufacturers.
                </motion.p>
                <motion.p variants={fadeUp} className="text-base text-text leading-relaxed">
                  Our state-of-the-art facility houses over 45,000 spindles, producing yarns from Ne 16s to Ne 120s. Every fiber is traceable, every process monitored.
                </motion.p>
                <motion.div variants={stagger} className="grid grid-cols-2 gap-4 pt-4">
                  <motion.div variants={fadeUp} className="p-4 bg-cream rounded-xl hover:shadow-soft transition-shadow duration-500">
                    <Factory className="w-5 h-5 text-navy mb-2" />
                    <div className="text-[13px] font-semibold text-heading">45,000+ Spindles</div>
                    <div className="text-[12px] text-muted mt-0.5">Across our facility</div>
                  </motion.div>
                  <motion.div variants={fadeUp} className="p-4 bg-cream rounded-xl hover:shadow-soft transition-shadow duration-500">
                    <Award className="w-5 h-5 text-navy mb-2" />
                    <div className="text-[13px] font-semibold text-heading">ISO 9001:2015</div>
                    <div className="text-[12px] text-muted mt-0.5">Quality certified</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ PROCESS — Sticky Scroll-driven Horizontal Slide ═══ */}
        <ProcessSection />


        {/* ═══ PRODUCTS ═══ */}
        <Section className="py-28 lg:py-40" id="products">
          <div className="container-editorial">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
              <div>
                <motion.span variants={fadeUp} className="text-[13px] text-coral font-semibold tracking-[0.15em] uppercase block mb-4">Products</motion.span>
                <motion.h2 variants={fadeUp} className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading max-w-xl">
                  Premium yarn assemblies for the world's finest fabrics.
                </motion.h2>
              </div>
              <motion.p variants={fadeUp} className="text-base text-text max-w-md leading-relaxed">
                Each product is engineered for optimal texture, elasticity, and weave compatibility.
              </motion.p>
            </div>

            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRODUCTS.map((p, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  whileHover={{ y: -10, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                  className="group bg-white border border-border rounded-2xl p-8 hover:shadow-float transition-shadow duration-500"
                  data-hover
                >
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-cream text-[11px] font-semibold text-navy tracking-wide uppercase">{p.tag}</span>
                  <h3 className="text-xl font-semibold text-heading mt-5 tracking-tight">{p.title}</h3>
                  <p className="text-[14px] text-text mt-3 leading-relaxed">{p.desc}</p>
                  <div className="mt-8 pt-6 border-t border-border space-y-3">
                    {[['Yarn Count', p.count], ['Tensile Strength', p.strength], ['Hairiness Index', p.hairiness]].map(([l, v]) => (
                      <div key={l} className="flex justify-between items-center text-[13px]">
                        <span className="text-muted">{l}</span>
                        <span className="text-heading font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 mt-6 text-[13px] text-coral font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                    View specifications <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* ═══ NEW: SMART TEXTILE LAB (GLASSMORPHISM SHOWCASE) ═══ */}
        <Section className="py-28 lg:py-40 bg-gradient-to-b from-white to-[#F8F9FB] relative overflow-hidden" id="lab">
          {/* Decorative blur elements */}
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-soft/30 blur-3xl pointer-events-none animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-coral-soft/20 blur-3xl pointer-events-none animate-blob-delay" />

          <div className="container-editorial relative z-10">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <motion.span variants={fadeUp} className="text-[13px] text-coral font-semibold tracking-[0.15em] uppercase block mb-4">Innovation Lab</motion.span>
              <motion.h2 variants={fadeUp} className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading">
                Smart Textiles & Fiber Science Lab
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-text mt-4 leading-relaxed">
                Step inside our digital testing lab where we run stress diagnostics and thermal mapping on next-generation hybrid threads.
              </motion.p>
            </div>

            {/* Glassmorphic dashboard grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Terminal Panel - Col 7 */}
              <motion.div 
                variants={scaleIn}
                className="lg:col-span-7 glass rounded-3xl p-8 shadow-float flex flex-col justify-between border border-white/80 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent pointer-events-none" />
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/60 pb-5 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-coral animate-pulse-soft" />
                    <span className="text-[12px] font-semibold text-heading uppercase tracking-wider">Fiber Stress Simulator</span>
                  </div>
                  <span className="text-[11px] text-muted font-mono">STATUS: SIMULATING</span>
                </div>

                {/* Simulated Graph / Waveform */}
                <div className="h-48 bg-[#F0F1F3]/40 rounded-2xl p-6 relative overflow-hidden border border-border/40 flex items-end">
                  {/* Floating Tech Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-[10px] font-mono bg-white/80 px-2 py-0.5 rounded border border-border/40 text-heading">TEST_ID: #409B</span>
                    <span className="text-[10px] font-mono bg-white/80 px-2 py-0.5 rounded border border-border/40 text-coral font-medium">STRENGTH: HIGH</span>
                  </div>
                  
                  {/* Decorative Sine wave bars */}
                  <div className="w-full flex items-end justify-between h-24 gap-1">
                    {[35, 45, 60, 30, 75, 90, 45, 55, 65, 80, 95, 70, 50, 40, 60, 85, 99, 75, 60, 40, 20, 50, 70, 90, 80, 50, 30, 40, 65, 80].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-full bg-[#1B2B4B] rounded-t-sm"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.015, duration: 0.6, ease: "easeOut" }}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60 mt-6">
                  <div>
                    <span className="text-[11px] text-muted block">Elongation</span>
                    <span className="text-xl font-bold text-heading tracking-tight font-mono">14.82%</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-muted block">Elastic Modulus</span>
                    <span className="text-xl font-bold text-heading tracking-tight font-mono">1.64 GPa</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-muted block">Break Point</span>
                    <span className="text-xl font-bold text-coral tracking-tight font-mono">34.2 cN/tex</span>
                  </div>
                </div>
              </motion.div>

              {/* Side Panels - Col 5 */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Glass Card 1 */}
                <motion.div 
                  variants={fadeUp}
                  className="glass rounded-3xl p-6 shadow-lifted border border-white/80 hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-coral-soft text-coral flex items-center justify-center text-lg">🔬</div>
                    <div>
                      <h4 className="text-[16px] font-semibold text-heading tracking-tight">Thermal regulation thread</h4>
                      <p className="text-[13px] text-text mt-1 leading-relaxed">Phase-change smart materials integrated inside yarn cores to balance heat distribution.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Glass Card 2 */}
                <motion.div 
                  variants={fadeUp}
                  className="glass rounded-3xl p-6 shadow-lifted border border-white/80 hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-soft text-blue flex items-center justify-center text-lg">🛰️</div>
                    <div>
                      <h4 className="text-[16px] font-semibold text-heading tracking-tight">Traceable smart tagging</h4>
                      <p className="text-[13px] text-text mt-1 leading-relaxed">Microscopic organic tracers woven into yarn for 100% supply-chain traceability.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Glass Card 3 */}
                <motion.div 
                  variants={fadeUp}
                  className="glass rounded-3xl p-6 shadow-lifted border border-white/80 hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8E9EC] text-navy flex items-center justify-center text-lg">💡</div>
                    <div>
                      <h4 className="text-[16px] font-semibold text-heading tracking-tight">Aerospace composite fibers</h4>
                      <p className="text-[13px] text-text mt-1 leading-relaxed">Ultra-strength polymer spun blends for high-performance structural fabrics.</p>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </Section>

        {/* ═══ FACTORY IMAGE BREAK ═══ */}
        <Section className="py-6">
          <div className="container-editorial">
            <motion.div variants={scaleIn} className="relative rounded-3xl overflow-hidden shadow-float group" data-hover>
              <img src="/hero.png" alt="Modern textile manufacturing facility" className="w-full h-[340px] lg:h-[520px] object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
              <motion.div variants={slideRight} className="absolute bottom-0 left-0 p-10 lg:p-16 max-w-xl">
                <h3 className="text-white text-2xl lg:text-4xl font-semibold leading-tight tracking-tight">A factory built for the future of textiles.</h3>
                <p className="text-white/60 text-[14px] mt-3 leading-relaxed">Our production facility spans 200,000 sq ft — equipped with machinery from Rieter, Schlafhorst, and Toyota Industries.</p>
              </motion.div>
            </motion.div>
          </div>
        </Section>

        {/* ═══ SUSTAINABILITY ═══ */}
        <Section className="py-28 lg:py-40" id="sustainability">
          <div className="container-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <div className="lg:col-span-5 space-y-6">
                <motion.span variants={fadeUp} className="text-[13px] text-coral font-semibold tracking-[0.15em] uppercase block">Sustainability</motion.span>
                <motion.h2 variants={fadeUp} className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading">
                  Spinning a<br />greener future.
                </motion.h2>
                <motion.p variants={fadeUp} className="text-base text-text leading-relaxed">
                  From solar-powered facilities to zero-waste water recycling, sustainability isn't a department — it's our foundation.
                </motion.p>
                <motion.div variants={stagger} className="space-y-3 pt-4">
                  {[
                    { icon: <Leaf className="w-5 h-5" />, title: 'GOTS Certified Organic', desc: 'Globally recognized standard' },
                    { icon: <Globe className="w-5 h-5" />, title: '40% Solar Powered', desc: 'Clean energy production' },
                    { icon: <Shield className="w-5 h-5" />, title: 'Zero Discharge', desc: 'Complete water recycling' },
                  ].map((item, i) => (
                    <motion.div key={i} variants={fadeUp} whileHover={{ x: 6, transition: { duration: 0.3 } }} className="flex items-start gap-4 p-4 bg-cream rounded-xl hover:shadow-soft transition-shadow duration-500" data-hover>
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-navy flex-shrink-0 shadow-soft">{item.icon}</div>
                      <div>
                        <div className="text-[14px] font-semibold text-heading">{item.title}</div>
                        <div className="text-[13px] text-muted mt-0.5">{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <motion.div variants={rotateIn} className="lg:col-span-7 relative">
                <div className="rounded-3xl overflow-hidden shadow-float">
                  <img src="/sustainability.png" alt="Sustainable cotton agriculture" className="w-full h-[400px] lg:h-[560px] object-cover" />
                </div>
                <motion.div variants={slideRight} className="absolute -top-6 left-4 lg:left-8 glass-strong rounded-2xl shadow-float p-5">
                  <div className="text-[11px] text-muted font-medium uppercase tracking-wider">Carbon Footprint</div>
                  <div className="text-2xl font-semibold text-heading mt-1">-62%</div>
                  <div className="text-[12px] text-coral font-medium">Since 2018</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ═══ INFRASTRUCTURE ═══ */}
        <Section className="py-28 lg:py-40 bg-cream relative noise" id="infrastructure">
          <div className="container-editorial">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <motion.span variants={fadeUp} className="text-[13px] text-coral font-semibold tracking-[0.15em] uppercase block mb-4">Infrastructure</motion.span>
              <motion.h2 variants={fadeUp} className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading">
                Built to deliver excellence at scale.
              </motion.h2>
            </div>
            <motion.div variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { num: '200K', unit: 'sq ft', label: 'Production Facility' },
                { num: '45K+', unit: 'spindles', label: 'Total Capacity' },
                { num: '350+', unit: 'team', label: 'Skilled Workforce' },
                { num: '24/7', unit: 'ops', label: 'Continuous Production' },
              ].map((s, i) => (
                <motion.div key={i} variants={fadeUp} whileHover={{ y: -6, transition: { duration: 0.3 } }} className="bg-white rounded-2xl p-7 shadow-soft text-center hover:shadow-float transition-shadow duration-500" data-hover>
                  <div className="text-3xl lg:text-4xl font-semibold text-heading tracking-tight">{s.num}</div>
                  <div className="text-[11px] text-coral font-semibold uppercase tracking-wider mt-1">{s.unit}</div>
                  <div className="text-[13px] text-text mt-2">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={scaleIn} className="mt-14 rounded-3xl overflow-hidden shadow-float group" data-hover>
              <img src="/products.png" alt="Premium yarn cones" className="w-full h-[280px] lg:h-[400px] object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out" />
            </motion.div>
          </div>
        </Section>

        {/* ═══ CTA ═══ */}
        <Section className="py-28 lg:py-40" id="contact">
          <div className="container-editorial">
            <motion.div variants={scaleIn} className="relative bg-navy rounded-[32px] p-12 lg:p-20 text-center overflow-hidden">
              <div className="absolute top-[-50px] right-[-50px] w-[350px] h-[350px] rounded-full bg-coral/20 blur-3xl pointer-events-none animate-blob" />
              <div className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] rounded-full bg-blue/15 blur-3xl pointer-events-none animate-blob-delay" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <motion.h2 variants={fadeUp} className="text-[clamp(28px,3.5vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
                  Ready to elevate your textile sourcing?
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/50 text-base mt-5 leading-relaxed max-w-md mx-auto">
                  Connect with our team for custom specifications, factory visits, or premium samples.
                </motion.p>
                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                  <button data-hover className="inline-flex items-center gap-2 px-8 py-4 bg-coral text-white rounded-full font-medium text-[15px] hover:bg-white hover:text-heading transition-all duration-500 cursor-pointer shadow-lg hover:shadow-xl">
                    Request Samples <ArrowRight className="w-4 h-4" />
                  </button>
                  <button data-hover className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-medium text-[15px] hover:bg-white/20 transition-all duration-500 cursor-pointer">
                    Schedule a Visit
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ═══ FOOTER ═══ */}
        <footer className="border-t border-border py-16 lg:py-20">
          <div className="container-editorial">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
              <div className="col-span-2 lg:col-span-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center">
                    <span className="text-white text-[11px] font-bold">ML</span>
                  </div>
                  <span className="text-heading font-semibold tracking-tight">ML Spinners</span>
                </div>
                <p className="text-[13px] text-muted leading-relaxed max-w-xs">
                  Premium textile manufacturing with 30+ years of excellence. Crafting yarn that defines luxury.
                </p>
              </div>
              <div>
                <h4 className="text-[12px] font-semibold text-heading uppercase tracking-[0.15em] mb-5">Company</h4>
                <ul className="space-y-3">
                  {['About Us', 'Our Process', 'Infrastructure', 'Careers', 'Contact'].map((l) => (
                    <li key={l}><a href="#" className="text-[14px] text-muted hover:text-heading transition-colors" data-hover>{l}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[12px] font-semibold text-heading uppercase tracking-[0.15em] mb-5">Products</h4>
                <ul className="space-y-3">
                  {['Cotton Yarn', 'Blended Yarn', 'Organic Range', 'Specialty Yarn', 'Custom Orders'].map((l) => (
                    <li key={l}><a href="#" className="text-[14px] text-muted hover:text-heading transition-colors" data-hover>{l}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[12px] font-semibold text-heading uppercase tracking-[0.15em] mb-5">Certifications</h4>
                <ul className="space-y-3 text-[14px] text-muted">
                  <li>ISO 9001:2015</li>
                  <li>GOTS Certified</li>
                  <li>Oeko-Tex Standard 100</li>
                  <li>BCI Member</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center border-t border-border mt-14 pt-8">
              <span className="text-[13px] text-muted">© 2026 ML Spinners Pvt. Ltd. All rights reserved.</span>
              <div className="flex gap-8 mt-4 md:mt-0">
                {['Privacy Policy', 'Terms of Service'].map((l) => (
                  <a key={l} href="#" className="text-[13px] text-muted hover:text-heading transition-colors" data-hover>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>

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
