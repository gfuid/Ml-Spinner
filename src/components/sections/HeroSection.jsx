import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, ArrowRight, Play } from 'lucide-react'
import ThreeCanvas from '../ThreeCanvas'

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

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
}
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

export default function HeroSection({ loading }) {
  const years = useCounter(4, 2000)
  const countries = useCounter(42, 2500)
  const purity = useCounter(99, 2000)

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white pt-28 pb-16 lg:pt-32" id="home">
      {/* Background blobs */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-coral-soft to-blue-soft opacity-40 blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-cream to-blue-soft opacity-30 blur-3xl pointer-events-none animate-blob-delay" />

      <div className="container-editorial w-full relative z-10 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-12">
          {/* Left — Text */}
          <motion.div
            initial="hidden"
            animate={loading ? 'hidden' : 'visible'}
            variants={stagger}
            className="space-y-6 max-w-xl text-left"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-soft text-coral text-[13px] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Trusted by India's top textile brands
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[clamp(38px,5vw,72px)] font-semibold leading-[1.08] tracking-[-0.03em] text-heading">
              Crafting the world's
              <span className="text-coral"> finest yarn</span>,
              since 2022.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-text leading-relaxed max-w-md">
              Dedicated to precision spinning, premium Ring Spun and OE yarns, and relentless quality — delivering to luxury fashion networks in 42 countries.
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
                <div className="text-xl md:text-2xl font-semibold text-heading tracking-tight">{years.count}+</div>
                <div className="text-[11px] text-muted font-medium mt-0.5">Years of Excellence</div>
              </div>
              <div ref={countries.ref} className="stat-card">
                <div className="text-xl md:text-2xl font-semibold text-heading tracking-tight">{countries.count}</div>
                <div className="text-[11px] text-muted font-medium mt-0.5">Countries Served</div>
              </div>
              <div ref={purity.ref} className="stat-card">
                <div className="text-xl md:text-2xl font-semibold text-heading tracking-tight">{purity.count}.8%</div>
                <div className="text-[11px] text-muted font-medium mt-0.5">Fiber Purity</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — 3D Yarn Cone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={loading ? {} : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[360px] md:h-[420px] lg:h-[520px]"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] rounded-full bg-gradient-to-br from-blue-soft via-coral-soft to-cream opacity-60 blur-3xl" />
            </div>
            <ThreeCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
