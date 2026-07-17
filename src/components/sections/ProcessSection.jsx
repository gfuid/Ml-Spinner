import React, { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROCESS = [
  { num: '01', title: 'Cotton Selection', desc: 'Hand-picked premium long-staple organic cotton from certified farms.', icon: '🌿' },
  { num: '02', title: 'Fiber Cleaning', desc: 'Advanced pneumatic separation removes impurities preserving fiber integrity.', icon: '✨' },
  { num: '03', title: 'Precision Carding', desc: 'High-speed wire cylinders align fibers into uniform parallel arrays.', icon: '⚙️' },
  { num: '04', title: 'Drawing Frame', desc: 'Progressive drafting rollers blend slivers for perfect density.', icon: '📐' },
  { num: '05', title: 'Ring & OE Spinning', desc: 'Precision twist on modern ring frames and high-speed rotor spinning machines.', icon: '🔄' },
  { num: '06', title: 'Quality Testing', desc: 'Dual-laser scanning verifies diameter, strength, and evenness.', icon: '🔬' },
  { num: '07', title: 'Cone Winding', desc: 'Cross-wound onto precision cones for seamless loom compatibility.', icon: '🧶' },
  { num: '08', title: 'Global Export', desc: 'Climate-controlled packaging and dispatch to 42+ countries.', icon: '🌍' },
]

export default function ProcessSection() {
  const containerRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const listEl = listRef.current
    const containerEl = containerRef.current
    if (!listEl || !containerEl) return

    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      const getScrollAmount = () => {
        const listWidth = listEl.scrollWidth
        const windowWidth = window.innerWidth
        return -(listWidth - windowWidth + 192)
      }

      gsap.to(listEl, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: containerEl,
          start: 'top top',
          end: () => `+=${listEl.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      })
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative bg-cream/30 w-full overflow-hidden" id="process">
      <div className="flex flex-col justify-center py-16 lg:py-20 lg:min-h-screen noise">
        
        {/* Title Block */}
        <div className="container-editorial w-full px-4 md:px-8 mb-12 text-left">
          <div>
            <span className="text-[12px] text-coral font-medium uppercase tracking-[0.15em] block mb-3 font-sans">
              Our Process
            </span>
            <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading max-w-2xl font-serifHead uppercase">
              Eight steps of precision manufacturing.
            </h2>
          </div>
        </div>

        {/* Desktop View - Sliding Horizontal Cards with GSAP */}
        <div className="hidden lg:block w-full overflow-hidden">
          <div ref={listRef} className="flex gap-6 px-24 w-max">
            {PROCESS.map((step, i) => (
              <div
                key={i}
                className="w-[320px] flex-shrink-0 bg-white rounded-3xl p-8 shadow-soft border border-border/40 hover:border-coral/50 hover:shadow-float transition-all duration-500 text-left flex flex-col justify-between"
                data-hover
              >
                <div>
                  <div className="flex items-start justify-between mb-8">
                    <span className="text-[44px] font-semibold text-border/70 group-hover:text-coral transition-colors duration-500 leading-none tracking-tight font-serifHead">
                      {step.num}
                    </span>
                    <span className="text-3xl p-3 bg-cream rounded-2xl">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="text-[16px] uppercase tracking-wider font-semibold text-heading font-sans">
                    {step.title}
                  </h3>
                  <p className="text-[13.5px] text-text mt-4 leading-relaxed font-sans font-normal">
                    {step.desc}
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5 mt-8 text-[12px] text-coral font-semibold uppercase tracking-wider">
                  Explore Spec <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View - Vertical Stack with Framer Motion (AOS-style) */}
        <div className="block lg:hidden w-full px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {PROCESS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-3xl p-8 shadow-soft border border-border/40 hover:border-coral/50 hover:shadow-float transition-all duration-500 text-left flex flex-col justify-between"
                data-hover
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[40px] font-semibold text-border/70 hover:text-coral transition-colors duration-500 leading-none tracking-tight font-serifHead">
                      {step.num}
                    </span>
                    <span className="text-2xl p-3 bg-cream rounded-2xl">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="text-[16px] uppercase tracking-wider font-semibold text-heading font-sans">
                    {step.title}
                  </h3>
                  <p className="text-[13.5px] text-text mt-3 leading-relaxed font-sans font-normal">
                    {step.desc}
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5 mt-6 text-[12px] text-coral font-semibold uppercase tracking-wider">
                  Explore Spec <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
