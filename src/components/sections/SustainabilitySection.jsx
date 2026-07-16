import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Globe, Shield } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}
const rotateIn = {
  hidden: { opacity: 0, rotate: 3, scale: 0.95 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
}
const slideRight = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const ITEMS = [
  { icon: <Leaf className="w-5 h-5" />, title: 'GOTS Certified Organic', desc: 'Globally recognized organic standard' },
  { icon: <Globe className="w-5 h-5" />, title: '40% Solar Powered', desc: 'Clean energy facility footprint' },
  { icon: <Shield className="w-5 h-5" />, title: 'Zero Discharge', desc: 'Complete water recycling & reuse' }
]

export default function SustainabilitySection() {
  return (
    <section className="w-full flex items-center justify-center relative bg-white py-16 md:py-24" id="sustainability">
      <div className="container-editorial w-full px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Content list */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <span className="text-[13px] text-coral font-semibold tracking-[0.15em] uppercase block mb-3">Sustainability</span>
              <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading">
                Spinning a<br />greener future.
              </h2>
            </div>
            
            <p className="text-base text-text leading-relaxed">
              At ML Overseas, sustainability is embedded in every revolution of our spindles. We demonstrate that large-scale textile operations can thrive without harming the environment. Our facility is powered by a 40% clean solar energy grid, and we operate an advanced zero-discharge Water Purification & Effluent Treatment Plant (ETP). This specialized plant purifies and recycles 100% of our dyeing water, ensuring zero chemical runoff enters local ecosystems or water tables.
            </p>
            
            {/* Eco stats blocks */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger} 
              className="space-y-3 pt-4"
            >
              {ITEMS.map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUp} 
                  whileHover={{ x: 6, transition: { duration: 0.3 } }} 
                  className="flex items-start gap-4 p-4 bg-cream rounded-xl hover:shadow-soft transition-all duration-300 border border-border/20" 
                  data-hover
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-border/30 flex items-center justify-center text-navy flex-shrink-0 shadow-soft">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-heading">{item.title}</div>
                    <div className="text-[13px] text-muted mt-0.5 font-medium">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Image & Floating overlay */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={rotateIn} 
            className="lg:col-span-7 relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-lifted h-[320px] md:h-[450px] lg:h-[520px]">
              <img 
                src="/sustainability_eco.png" 
                alt="Sustainable cotton agriculture" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Absolute overlay badge */}
            <motion.div 
              variants={slideRight} 
              className="absolute -top-6 left-4 lg:left-8 glass-strong rounded-2xl shadow-float p-5 text-left"
            >
              <div className="text-[11px] text-muted font-semibold uppercase tracking-wider">Carbon Footprint</div>
              <div className="text-2xl font-bold text-heading mt-1">-62%</div>
              <div className="text-[12px] text-coral font-semibold">Since 2018</div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
