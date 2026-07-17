import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const PRODUCTS = [
  { tag: 'Ring Spun', title: '100% Combed Cotton Yarn', desc: 'Premium long-staple combed cotton spun on ring frames for maximum tensile strength, softness, and durability.', count: 'Ne 16s - 40s', strength: '2400+ CSP', hairiness: 'Low Hairiness' },
  { tag: 'Open End', title: 'OE Cotton & Blended Yarn', desc: 'Highly uniform Open End yarns spun for optimal bulkiness and absorption, perfect for denim and heavy knits.', count: 'Ne 10s - 24s', strength: '1600+ CSP', hairiness: 'Standard' },
  { tag: 'Custom Blend', title: 'Polyester-Cotton Blends', desc: 'Engineered blends combining cotton comfort with polyester strength, tailored to client specification ratios.', count: 'Ne 12s - 30s', strength: '1900+ CSP', hairiness: 'Low-to-Mid' },
]

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
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

export default function ProductsSection() {
  return (
    <section className="w-full flex items-center justify-center relative bg-white py-16 md:py-24" id="products">
      <div className="container-editorial w-full px-4 md:px-8">
        
        {/* Title Block */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="text-left">
            <span className="text-[13px] text-coral font-semibold tracking-[0.15em] uppercase block mb-3">Products</span>
            <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading max-w-xl">
              Premium yarn assemblies for the world's finest fabrics.
            </h2>
          </div>
          <p className="text-base text-text max-w-md leading-relaxed text-left">
            Each product is engineered for optimal texture, elasticity, and weave compatibility. We select raw inputs rigorously to meet custom specification tolerances.
          </p>
        </div>

        {/* Product Cards Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger} 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={i}
              variants={i === 0 ? slideInLeft : i === 2 ? slideInRight : slideInBottom}
              whileHover={{ y: -10, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="group bg-white border border-border rounded-2xl p-8 hover:shadow-float transition-all duration-500 text-left"
              data-hover
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-cream text-[11px] font-semibold text-navy tracking-wide uppercase">
                {p.tag}
              </span>
              <h3 className="text-xl font-semibold text-heading mt-5 tracking-tight">{p.title}</h3>
              <p className="text-[14px] text-text mt-3 leading-relaxed min-h-[72px]">
                {p.desc}
              </p>
              
              <div className="mt-8 pt-6 border-t border-border space-y-3">
                {[
                  ['Yarn Count', p.count], 
                  ['Tensile Strength', p.strength], 
                  ['Hairiness Index', p.hairiness]
                ].map(([l, v]) => (
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
    </section>
  )
}
