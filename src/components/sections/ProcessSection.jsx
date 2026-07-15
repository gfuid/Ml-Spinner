import React, { useEffect, useRef } from 'react'
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

    mm.add({
      // Desktop query
      isDesktop: "(min-width: 768px)",
      // Mobile query
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop, isMobile } = context.conditions

      if (isDesktop) {
        // Reset any leftover styles from mobile viewport
        gsap.set(listEl.children, { clearProps: "all" })
        gsap.set(listEl, { clearProps: "all" })

        // Calculate how much we need to scroll horizontally
        const getScrollAmount = () => -(listEl.scrollWidth - window.innerWidth + 96)

        // 1. Main horizontal scroll tween
        const scrollTween = gsap.to(listEl, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: containerEl,
            start: 'top top',
            end: () => `+=${listEl.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1.2, // smoother scrub lag
            invalidateOnRefresh: true,
          }
        })

        // 2. Individual card scroll-based entrance reveals
        const cards = listEl.children
        Array.from(cards).forEach((card) => {
          const numEl = card.querySelector('.step-num')
          const iconEl = card.querySelector('.step-icon')

          // Smoothly fade-in, scale and lift the card container as it scrolls onto the viewport
          gsap.fromTo(card, 
            { scale: 0.9, opacity: 0.5, y: 25 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: 'left 95%',
                end: 'left 60%',
                scrub: true,
              }
            }
          )

          // Slide-in step numbers
          if (numEl) {
            gsap.fromTo(numEl,
              { x: -15, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: 'left 92%',
                  end: 'left 75%',
                  scrub: true,
                }
              }
            )
          }

          // Pulse icon
          if (iconEl) {
            gsap.fromTo(iconEl,
              { scale: 0.6, rotate: -15 },
              {
                scale: 1,
                rotate: 0,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: 'left 92%',
                  end: 'left 75%',
                  scrub: true,
                }
              }
            )
          }
        })

        return () => {
          // Explicitly kill desktop animations and clear styles
          gsap.killTweensOf(listEl)
          Array.from(listEl.children).forEach(card => {
            gsap.killTweensOf(card)
            const numEl = card.querySelector('.step-num')
            const iconEl = card.querySelector('.step-icon')
            if (numEl) gsap.killTweensOf(numEl)
            if (iconEl) gsap.killTweensOf(iconEl)
          })
          gsap.set(listEl, { clearProps: "all" })
          gsap.set(listEl.children, { clearProps: "all" })
        }
      }

      if (isMobile) {
        // Run on the next tick to ensure GSAP's desktop revert has fully completed
        const timer = setTimeout(() => {
          gsap.killTweensOf(listEl)
          gsap.set(listEl, { clearProps: "all", x: 0, y: 0 })
          gsap.set(containerEl, { clearProps: "all" })
          
          Array.from(listEl.children).forEach(card => {
            gsap.killTweensOf(card)
            gsap.set(card, { clearProps: "all", x: 0, y: 0, scale: 1, opacity: 1 })
            const numEl = card.querySelector('.step-num')
            const iconEl = card.querySelector('.step-icon')
            if (numEl) gsap.set(numEl, { clearProps: "all", x: 0, opacity: 1 })
            if (iconEl) gsap.set(iconEl, { clearProps: "all", scale: 1, rotate: 0 })
          })
          
          // Recalculate ScrollTrigger offsets to resolve overlaps
          ScrollTrigger.refresh()
        }, 50)

        // On mobile, just do a simple stagger entrance fade up of cards on scroll
        gsap.fromTo(listEl.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: listEl,
              start: "top 85%",
            }
          }
        )

        return () => {
          clearTimeout(timer)
          // Explicitly kill mobile animations and clear styles
          gsap.killTweensOf(listEl.children)
          gsap.set(listEl, { clearProps: "all" })
          gsap.set(listEl.children, { clearProps: "all" })
          gsap.set(containerEl, { clearProps: "all" })
        }
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative bg-cream overflow-x-hidden overflow-y-visible w-full py-16 md:py-0" id="process">
      <div className="min-h-screen md:h-screen flex flex-col justify-center noise">
        
        {/* Title Block */}
        <div className="container-editorial w-full px-4 md:px-8 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="text-left">
              <span className="text-[13px] text-coral font-semibold tracking-[0.15em] uppercase block mb-3">Our Process</span>
              <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading max-w-2xl">
                From raw cotton to world-class Ring Spun & OE yarns — in eight precision steps.
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-muted font-medium uppercase tracking-wider hidden md:inline">Scroll Down</span>
            </div>
          </div>
        </div>

        {/* Sliding List of Cards */}
        <div className="w-full">
          <div ref={listRef} className="flex flex-col md:flex-row gap-6 px-4 md:px-12 lg:px-24 w-full md:w-max">
            {PROCESS.map((step, i) => (
              <div
                key={i}
                className="w-full md:w-[330px] md:flex-shrink-0 bg-white rounded-3xl p-8 shadow-soft hover:shadow-float hover:-translate-y-2 transition-all duration-500 group border border-border/40 text-left"
                data-hover
                style={{ opacity: 0 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="step-num text-[48px] font-semibold text-border group-hover:text-coral transition-colors duration-500 leading-none tracking-tight">
                    {step.num}
                  </span>
                  <span className="step-icon text-3xl p-2.5 bg-cream rounded-2xl group-hover:bg-coral-soft transition-colors duration-500">
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-[18px] font-semibold text-heading tracking-tight">{step.title}</h3>
                <p className="text-[13.5px] text-text mt-3 leading-relaxed">{step.desc}</p>
                <div className="flex items-center gap-1 mt-6 text-[12px] text-coral font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  Explore Spec <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
