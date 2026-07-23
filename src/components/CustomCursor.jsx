import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return

    // Position setters for instant translation with high-performance GSAP quickTo
    const setDotX = gsap.quickTo(dotRef.current, "x", { duration: 0.06, ease: "power3" })
    const setDotY = gsap.quickTo(dotRef.current, "y", { duration: 0.06, ease: "power3" })
    
    const setRingX = gsap.quickTo(ringRef.current, "x", { duration: 0.09, ease: "power3" })
    const setRingY = gsap.quickTo(ringRef.current, "y", { duration: 0.09, ease: "power3" })

    // Position centered
    gsap.set(dotRef.current, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 })
    gsap.set(ringRef.current, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 })

    const handleMouseMove = (e) => {
      setDotX(e.clientX)
      setDotY(e.clientY)
      setRingX(e.clientX)
      setRingY(e.clientY)
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-hover]')
      if (target) {
        gsap.to(ringRef.current, {
          scale: 1.6,
          borderColor: 'var(--color-coral)',
          backgroundColor: 'rgba(255, 107, 90, 0.06)',
          duration: 0.25,
          ease: "power2.out"
        })
        gsap.to(dotRef.current, {
          scale: 0.6,
          backgroundColor: 'var(--color-coral)',
          duration: 0.25,
          ease: "power2.out"
        })
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-hover]')
      if (target) {
        gsap.to(ringRef.current, {
          scale: 1,
          borderColor: 'var(--color-navy)',
          backgroundColor: 'transparent',
          duration: 0.25,
          ease: "power2.out"
        })
        gsap.to(dotRef.current, {
          scale: 1,
          backgroundColor: 'var(--color-coral)',
          duration: 0.25,
          ease: "power2.out"
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block fixed pointer-events-none z-[10000] w-2.5 h-2.5 rounded-full bg-coral left-0 top-0" style={{ mixBlendMode: 'difference' }} />
      <div ref={ringRef} className="cursor-ring hidden lg:block fixed pointer-events-none z-[9999] w-9 h-9 rounded-full border border-navy left-0 top-0 transition-none" />
    </>
  )
}
