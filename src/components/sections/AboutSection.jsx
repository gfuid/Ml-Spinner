import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck, Award, Disc } from 'lucide-react'

// Import assets from the assets/About folder
import cottonPolyesterBlendImg from '../../assets/About/Cotton - Polyestor Blend Yarns.png'
import polyesterRegeneratedImg from '../../assets/About/Polyester Regenerated Yarn.png'
import customOnDemandImg from '../../assets/About/Custom On Demand Blends.png'

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
}
const rotateIn = {
  hidden: { opacity: 0, rotate: -3, scale: 0.95 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
}
const slideLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}
const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}
const slideInBottom = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const SOLUTIONS = [
  {
    num: '01',
    title: 'Ring Spun Yarns',
    desc: 'Single and Multi Ply Ring Spun Yarns spun on high-speed modern frames.',
    img: cottonPolyesterBlendImg
  },
  {
    num: '02',
    title: 'Open End (OE) Yarns',
    desc: 'Uniform carded Open End yarns designed for durability and denim/heavy knitting.',
    img: polyesterRegeneratedImg
  },
  {
    num: '03',
    title: 'Custom Blend Yarns',
    desc: 'Customer-specific blend ratios, count ranges, and tensile strengths.',
    img: customOnDemandImg
  }
]

/* ─── Interactive Yarn Image Card with 3D Tilt & Dhaar (Thread) Hover Animation ─── */
function InteractiveYarnCard({ imageY }) {
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5, rotateX: 0, rotateY: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateY = (x - 0.5) * 16
    const rotateX = (0.5 - y) * 16
    setMousePos({ x, y, rotateX, rotateY })
  }

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => {
    setHovered(false)
    setMousePos({ x: 0.5, y: 0.5, rotateX: 0, rotateY: 0 })
  }

  const curveOffset = hovered ? (mousePos.x - 0.5) * 80 : 0
  const curveYOffset = hovered ? (mousePos.y - 0.5) * 60 : 0

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
      style={{ perspective: '1000px' }}
      data-hover
    >
      <div 
        className="relative rounded-3xl overflow-hidden shadow-lifted h-[320px] md:h-[450px] lg:h-[500px] transition-transform duration-300 ease-out border border-white/40"
        style={{
          transform: hovered 
            ? `rotateX(${mousePos.rotateX}deg) rotateY(${mousePos.rotateY}deg) scale(1.02)` 
            : 'rotateX(0deg) rotateY(0deg) scale(1)'
        }}
      >
        <motion.div style={{ y: imageY }} className="h-full w-full">
          <img 
            src="/about_factory.png" 
            alt="ML Overseas premium factory tour view" 
            loading="lazy"
            className="w-full h-[120%] object-cover absolute -top-[10%] transition-transform duration-700 ease-out group-hover:scale-105" 
          />
        </motion.div>

        {/* Dynamic Flashlight Cursor Glow */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 107, 90, 0.25), transparent 70%)`
          }}
        />

        {/* Interactive Thread Strands ("Dhaaro / Dhaaga" SVG Overlay) */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-20 transition-opacity duration-500"
          viewBox="0 0 400 500"
          preserveAspectRatio="none"
          style={{ opacity: hovered ? 0.95 : 0.3 }}
        >
          <defs>
            <linearGradient id="threadGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B5A" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FF6B5A" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="threadGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF6B5A" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Dynamic Thread Strand 1 */}
          <path
            d={`M -20,${110 + curveYOffset * 0.5} Q ${200 + curveOffset},${170 + curveYOffset} 420,${130 - curveYOffset * 0.3}`}
            fill="none"
            stroke="url(#threadGrad1)"
            strokeWidth={hovered ? "3" : "1.5"}
            strokeDasharray={hovered ? "10 6" : "none"}
            className={hovered ? "animate-dash-scroll" : ""}
            style={{ transition: 'd 0.15s ease-out' }}
          />

          {/* Dynamic Thread Strand 2 */}
          <path
            d={`M -20,${230 - curveYOffset * 0.4} Q ${180 - curveOffset * 0.8},${290 + curveYOffset * 1.2} 420,${250 + curveYOffset * 0.6}`}
            fill="none"
            stroke="url(#threadGrad2)"
            strokeWidth={hovered ? "3.5" : "1.5"}
            strokeDasharray={hovered ? "14 8" : "none"}
            className={hovered ? "animate-thread-wiggle" : ""}
            style={{ transition: 'd 0.15s ease-out' }}
          />

          {/* Dynamic Thread Strand 3 */}
          <path
            d={`M -20,${350 + curveYOffset * 0.3} Q ${220 + curveOffset * 1.1},${330 - curveYOffset * 0.7} 420,${390 + curveYOffset * 0.4}`}
            fill="none"
            stroke="url(#threadGrad1)"
            strokeWidth={hovered ? "2.5" : "1"}
            strokeDasharray={hovered ? "8 5" : "none"}
            style={{ transition: 'd 0.15s ease-out' }}
          />

          {/* Interactive Sparkle Fiber Nodes */}
          {hovered && (
            <>
              <circle cx={120 + curveOffset * 0.5} cy={160 + curveYOffset * 0.6} r="4.5" fill="#FF6B5A" className="animate-ping" />
              <circle cx={280 - curveOffset * 0.4} cy={270 + curveYOffset * 0.8} r="5" fill="#FFF" className="animate-pulse" />
              <circle cx={200 + curveOffset * 0.8} cy={340 - curveYOffset * 0.5} r="4" fill="#FF6B5A" />
            </>
          )}
        </svg>

        {/* Shimmer sweep effect */}
        <div 
          className="absolute inset-0 pointer-events-none transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full z-30"
        />
      </div>

      {/* Absolute overlay badge */}
      <motion.div
        variants={slideLeft}
        className={`absolute -bottom-6 right-4 lg:right-8 glass-strong rounded-2xl shadow-float p-5 md:p-6 max-w-[250px] transition-all duration-300 z-40 ${
          hovered ? 'scale-105 border-coral/50 shadow-coral/20 -translate-y-2' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="text-2xl md:text-3xl font-bold text-heading tracking-tight font-serifHead">2022</div>
          <div className={`p-2 rounded-xl bg-coral/10 text-coral transition-transform duration-700 ${hovered ? 'rotate-180 scale-110 bg-coral text-white' : ''}`}>
            <Disc className="w-5 h-5 animate-spin-slow" />
          </div>
        </div>
        <div className="text-[12px] text-text mt-1.5 font-semibold leading-relaxed">
          Delivering cutting-edge yarn solutions globally since 2022
        </div>
      </motion.div>
    </div>
  )
}

export default function AboutSection() {
  const sectionRef = useRef(null)
  
  // Parallax Scroll Effect for the Who We Are image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <div ref={sectionRef} className="w-full">
      
      {/* ─── PART 1: WHO WE ARE ─── */}
      <section className="w-full flex items-center justify-center relative bg-white py-16 md:py-24" id="about">
        <div className="container-editorial w-full px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Column - Interactive Image & Highlight Badge */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={rotateIn}
              className="lg:col-span-6 relative"
            >
              <InteractiveYarnCard imageY={imageY} />
            </motion.div>

            {/* Right Column - Who We Are Narrative */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div>
                <span className="text-[13px] text-coral font-bold tracking-[0.2em] uppercase block mb-3">
                  Get informed
                </span>
                <h1 className="text-[clamp(32px,3.8vw,52px)] font-bold leading-[1.05] tracking-[-0.03em] text-heading">
                  WHO ARE WE
                </h1>
              </div>
              
              <div className="space-y-4 text-base text-text leading-relaxed font-medium">
                <p className="text-[18px] text-heading font-semibold leading-relaxed font-serifHead uppercase tracking-wider">
                  SPINNING WORLD-CLASS QUALITY SINCE 2022
                </p>
                <p>
                  Established in 2022, ML Overseas was founded with a clear vision: to redefine the global textile landscape by manufacturing premium-grade Ring Spun and Open End (OE) yarns while maintaining a carbon-neutral manufacturing footprint. Operating from our state-of-the-art facility located in the textile hub of Panipat, Haryana, near New Delhi, we utilize the world's most advanced automated spinning technologies from Swiss and German manufacturers.
                </p>
                <p>
                  Our factory is built to deliver unmatched consistency, tensile strength, and quality in every single package. With high production capacities and rigorous quality testing, we are fully equipped to serve the complex requirements of both domestic apparel houses and international sourcing partners with absolute precision, speed, and efficiency.
                </p>
              </div>

              {/* Quality Standards Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-cream rounded-2xl border border-border/20 flex items-start gap-4 hover:shadow-soft transition-all duration-300" data-hover>
                  <ShieldCheck className="w-5 h-5 text-coral mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-[14px] font-bold text-heading">Consistent Quality</h4>
                    <p className="text-[12px] text-muted mt-1 leading-relaxed">
                      Customer Driven Solutions at Competitive Costs.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-cream rounded-2xl border border-border/20 flex items-start gap-4 hover:shadow-soft transition-all duration-300" data-hover>
                  <Award className="w-5 h-5 text-coral mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-[14px] font-bold text-heading">High Technical Standards</h4>
                    <p className="text-[12px] text-muted mt-1 leading-relaxed">
                      Equipped with In-House Testing Labs.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── PART 2: SOLUTIONS ─── */}
      <section className="w-full flex flex-col justify-center items-center relative bg-cream/20 noise border-t border-border/30 py-16 md:py-24" id="solutions">
        <div className="container-editorial w-full px-4 md:px-8 text-center">
          
          {/* Header Block */}
          <div className="max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[13px] text-coral font-bold tracking-[0.2em] uppercase block">
              Innovative Blends
            </span>
            <h2 className="text-[clamp(30px,3.5vw,52px)] font-bold text-heading tracking-tight leading-none">
              We Provide Top Solutions<br />From Every Angle.
            </h2>
          </div>

          {/* Solutions Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
          >
            {SOLUTIONS.map((item, i) => (
              <motion.div
                key={i}
                variants={i === 0 ? slideInLeft : i === 2 ? slideInRight : slideInBottom}
                whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                className="flex flex-col group bg-white border border-border/40 rounded-[32px] overflow-hidden shadow-soft hover:shadow-float transition-all duration-500 text-left"
                data-hover
              >
                {/* Image frame */}
                <div className="h-56 overflow-hidden bg-cream relative">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Floating Number Badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center font-bold text-[15px]">
                    {item.num}
                  </div>
                </div>

                {/* Info Text Area */}
                <div className="p-7 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-[18px] font-bold text-heading tracking-tight group-hover:text-coral transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] text-text leading-relaxed mt-2.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

    </div>
  )
}
