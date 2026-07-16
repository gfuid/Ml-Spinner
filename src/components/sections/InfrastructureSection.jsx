import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const STATS = [
  { num: '200K', unit: 'sq ft', label: 'Production Facility' },
  { num: '45K+', unit: 'spindles', label: 'Total Capacity' },
  { num: '350+', unit: 'team', label: 'Skilled Workforce' },
  { num: '24/7', unit: 'ops', label: 'Continuous Production' },
]

const GALLERY = [
  { src: '/hero.png', alt: 'Modern textile manufacturing facility', caption: 'Our facility is equipped with automated systems from Rieter (Switzerland), Schlafhorst (Germany), and Toyota.' },
  { src: '/products.png', alt: 'Premium yarn cones ready for delivery', caption: 'Cones are wound, verified for density, and packed in climate-controlled environments.' }
]

export default function InfrastructureSection() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <section className="w-full flex items-center justify-center relative bg-cream py-16 md:py-24 noise border-t border-b border-border/40" id="infrastructure">
      <div className="container-editorial w-full px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Stats grid & title */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="text-[13px] text-coral font-semibold tracking-[0.15em] uppercase block mb-3">Infrastructure</span>
              <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading">
                Built to deliver excellence at scale.
              </h2>
              <p className="text-base text-text mt-4 leading-relaxed">
                Spanning across 200,000 sq ft, our manufacturing hub combines high-speed precision machinery with rigorous human oversight.
              </p>
            </div>

            {/* Core Stats Grid */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="grid grid-cols-2 gap-4"
            >
              {STATS.map((s, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUp} 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-5 shadow-soft border border-border/20"
                  data-hover
                >
                  <div className="text-2xl md:text-3xl font-bold text-heading tracking-tight">{s.num}</div>
                  <div className="text-[11px] text-coral font-bold uppercase tracking-wider mt-0.5">{s.unit}</div>
                  <div className="text-[12px] text-text mt-2 font-medium">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Interactive Gallery Show */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={scaleIn}
            className="lg:col-span-7 space-y-6"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-float h-[300px] md:h-[420px] bg-navy group">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeSlide}
                  src={GALLERY[activeSlide].src}
                  alt={GALLERY[activeSlide].alt}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent pointer-events-none" />

              {/* Slide controls overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10 text-left">
                <div className="max-w-[80%]">
                  <h4 className="text-white text-[15px] font-semibold tracking-wide">
                    {GALLERY[activeSlide].alt}
                  </h4>
                  <p className="text-white/60 text-[12px] mt-1.5 leading-relaxed font-medium">
                    {GALLERY[activeSlide].caption}
                  </p>
                </div>

                <div className="flex gap-2">
                  {GALLERY.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        activeSlide === idx ? 'bg-coral w-6' : 'bg-white/40 hover:bg-white/80'
                      }`}
                      aria-label={`Show slide ${idx + 1}`}
                      data-hover
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
