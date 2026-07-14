import React from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const LAB_CARDS = [
  { icon: '🔬', title: 'Thermal regulation thread', desc: 'Phase-change smart materials integrated inside yarn cores to balance heat distribution.' },
  { icon: '🛰️', title: 'Traceable smart tagging', desc: 'Microscopic organic tracers woven into yarn for 100% supply-chain traceability.' },
  { icon: '💡', title: 'Aerospace composite fibers', desc: 'Ultra-strength polymer spun blends for high-performance structural fabrics.' }
]

export default function LabSection() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center relative bg-gradient-to-b from-white to-[#F8F9FB] py-16 overflow-hidden" id="lab">
      {/* Decorative blur elements */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-soft/30 blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-coral-soft/20 blur-3xl pointer-events-none animate-blob-delay" />

      <div className="container-editorial w-full px-4 md:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-[13px] text-coral font-semibold tracking-[0.15em] uppercase block mb-3">Innovation Lab</span>
          <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading">
            Smart Textiles & Fiber Science Lab
          </h2>
          <p className="text-base text-text mt-4 leading-relaxed max-w-lg mx-auto">
            Step inside our digital testing lab where we run stress diagnostics and thermal mapping on next-generation hybrid threads.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Stress Simulator Terminal Panel - Col 7 */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={scaleIn}
            className="lg:col-span-7 glass rounded-3xl p-6 md:p-8 shadow-float flex flex-col justify-between border border-white/80 relative overflow-hidden group text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent pointer-events-none" />
            
            {/* Simulator Header */}
            <div>
              <div className="flex items-center justify-between border-b border-border/60 pb-5 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-coral animate-pulse" />
                  <span className="text-[12px] font-semibold text-heading uppercase tracking-wider">Fiber Stress Simulator</span>
                </div>
                <span className="text-[11px] text-muted font-mono">STATUS: SIMULATING</span>
              </div>

              {/* Simulated Sine Wave Graph */}
              <div className="h-44 md:h-48 bg-[#F0F1F3]/40 rounded-2xl p-6 relative overflow-hidden border border-border/40 flex items-end">
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-[10px] font-mono bg-white/80 px-2 py-0.5 rounded border border-border/40 text-heading">TEST_ID: #409B</span>
                  <span className="text-[10px] font-mono bg-white/80 px-2 py-0.5 rounded border border-border/40 text-coral font-medium">STRENGTH: HIGH</span>
                </div>
                
                {/* Live wave bars */}
                <div className="w-full flex items-end justify-between h-24 gap-[2px] md:gap-1">
                  {[35, 45, 60, 30, 75, 90, 45, 55, 65, 80, 95, 70, 50, 40, 60, 85, 99, 75, 60, 40, 20, 50, 70, 90, 80, 50, 30, 40, 65, 80].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-full bg-[#1B2B4B] rounded-t-[1px]"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.012, duration: 0.5, ease: "easeOut" }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60 mt-6">
              <div>
                <span className="text-[11px] text-muted block">Elongation</span>
                <span className="text-[18px] md:text-xl font-bold text-heading tracking-tight font-mono">14.82%</span>
              </div>
              <div>
                <span className="text-[11px] text-muted block">Elastic Modulus</span>
                <span className="text-[18px] md:text-xl font-bold text-heading tracking-tight font-mono">1.64 GPa</span>
              </div>
              <div>
                <span className="text-[11px] text-muted block">Break Point</span>
                <span className="text-[18px] md:text-xl font-bold text-coral tracking-tight font-mono">34.2 cN/tex</span>
              </div>
            </div>
          </motion.div>

          {/* Cards Column - Col 5 */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 md:gap-6 text-left">
            {LAB_CARDS.map((card, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                className="glass rounded-3xl p-5 md:p-6 shadow-lifted border border-white/80 hover:-translate-y-1 transition-all duration-300"
                data-hover
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cream border border-border/40 text-navy flex items-center justify-center text-lg flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-[15px] md:text-[16px] font-semibold text-heading tracking-tight">
                      {card.title}
                    </h4>
                    <p className="text-[13px] text-text mt-1 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
