import React from 'react'
import { motion } from 'framer-motion'

const CLIENTS = [
  'Arvind Mills', 'Raymond', 'Vardhman', 'Welspun', 
  'Trident', 'Indo Count', 'Bombay Dyeing', 'Siyaram', 
  'Grasim', 'Alok Industries', 'Sutlej Textiles', 'Nahar Spinning'
]

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

export default function ClientsSection() {
  // Split CLIENTS into two lists for dual-direction marquee
  const half = Math.ceil(CLIENTS.length / 2)
  const group1 = CLIENTS.slice(0, half)
  const group2 = CLIENTS.slice(half)

  return (
    <section className="w-full flex flex-col justify-center items-center relative overflow-hidden bg-cream/20 noise border-t border-b border-border py-16 md:py-20" id="clients">
      {/* Background blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-soft/20 to-coral-soft/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-editorial w-full px-4 md:px-8 text-center relative z-10 space-y-16">
        <div>
          <span className="text-[13px] text-coral font-semibold tracking-[0.15em] uppercase block mb-3">Our Network</span>
          <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading max-w-2xl mx-auto">
            Trusted by the architects of modern apparel.
          </h2>
          <p className="text-base text-text mt-4 max-w-md mx-auto leading-relaxed">
            We partner with leading textile mills and retail giants to bring premium yarn assemblies to fabrics worldwide.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="w-full space-y-6"
        >
          {/* Marquee 1 - Moves Left */}
          <div className="relative overflow-hidden w-full py-2">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cream/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cream/80 to-transparent z-10 pointer-events-none" />
            <div className="animate-marquee flex items-center whitespace-nowrap gap-4">
              {[...group1, ...group1, ...group1].map((name, i) => (
                <React.Fragment key={`g1-${i}`}>
                  <span 
                    className="text-[20px] md:text-[28px] font-semibold text-muted/40 hover:text-coral hover:scale-105 tracking-tight select-none flex-shrink-0 px-6 transition-all duration-300 cursor-pointer"
                    data-hover
                  >
                    {name}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-coral/20 flex-shrink-0 mx-2" />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Marquee 2 - Moves Right */}
          <div className="relative overflow-hidden w-full py-2">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cream/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cream/80 to-transparent z-10 pointer-events-none" />
            
            {/* We can reverse the direction in CSS using animation-direction: reverse */}
            <div className="animate-marquee flex items-center whitespace-nowrap gap-4" style={{ animationDirection: 'reverse' }}>
              {[...group2, ...group2, ...group2].map((name, i) => (
                <React.Fragment key={`g2-${i}`}>
                  <span 
                    className="text-[20px] md:text-[28px] font-semibold text-muted/40 hover:text-navy hover:scale-105 tracking-tight select-none flex-shrink-0 px-6 transition-all duration-300 cursor-pointer"
                    data-hover
                  >
                    {name}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-navy/20 flex-shrink-0 mx-2" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Supporting statement */}
        <div className="text-[12px] text-muted tracking-widest uppercase font-medium">
          Manufacturing Premium Ring Spun and Open End (OE) Yarns
        </div>
      </div>
    </section>
  )
}
