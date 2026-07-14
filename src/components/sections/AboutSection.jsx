import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck, Award } from 'lucide-react'

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
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
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
      
      {/* ─── PART 1: WHO WE ARE (100vh) ─── */}
      <section className="min-h-screen w-full flex items-center justify-center relative bg-white py-16" id="about">
        <div className="container-editorial w-full px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Column - Parallax Image & Highlight Badge */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={rotateIn}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-lifted h-[320px] md:h-[450px] lg:h-[500px]">
                <motion.div style={{ y: imageY }} className="h-full w-full">
                  <img 
                    src="/about.png" 
                    alt="ML Overseas premium factory tour view" 
                    loading="lazy"
                    className="w-full h-[120%] object-cover absolute -top-[10%]" 
                  />
                </motion.div>
              </div>
              
              {/* Absolute overlay badge */}
              <motion.div
                variants={slideLeft}
                className="absolute -bottom-6 right-4 lg:right-8 glass-strong rounded-2xl shadow-float p-6 max-w-[240px]"
              >
                <div className="text-2xl md:text-3xl font-semibold text-heading tracking-tight">2022</div>
                <div className="text-[12px] text-text mt-1 font-semibold leading-normal">
                  Delivering cutting-edge yarn solutions globally since 2022
                </div>
              </motion.div>
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
                <p className="text-[18px] text-heading font-semibold leading-relaxed">
                  We’re in the business since 2022 providing cutting edge solutions.
                </p>
                <p>
                  ML Overseas is a leading manufacturer of premium Ring Spun and OE Yarns, based near the capital of India, New Delhi. ML Overseas utilizes advanced technology and modern machinery to produce superior quality cotton and blended yarns.
                </p>
                <p>
                  With the ability and capacity to produce and deliver large quantities of excellent yarns, we are equipped to cater to multiple requirements of both international and domestic clients with ease, competence and efficiency.
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

      {/* ─── PART 2: SOLUTIONS (100vh) ─── */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center relative bg-cream/20 noise border-t border-border/30 py-20" id="solutions">
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
                variants={scaleIn}
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
