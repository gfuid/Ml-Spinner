import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

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

export default function ProcessSection() {
  const containerRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const listEl = listRef.current
    const containerEl = containerRef.current
    if (!listEl || !containerEl) return

    // Calculate how much we need to scroll horizontally
    const getScrollAmount = () => -(listEl.scrollWidth - window.innerWidth + 96)

    const ctx = gsap.context(() => {
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

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative bg-cream overflow-hidden w-full" id="process">
      <div className="h-screen flex flex-col justify-center noise">
        
        {/* Title Block */}
        <div className="container-editorial w-full px-4 md:px-8 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="text-left">
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
                className="flex-shrink-0 w-[280px] lg:w-[330px] bg-white rounded-3xl p-8 shadow-soft hover:shadow-float transition-all duration-500 group border border-border/40 text-left"
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
