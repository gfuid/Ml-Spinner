import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 4}px`
        dotRef.current.style.top = `${e.clientY - 4}px`
      }
    }

    // Smooth ring follow via rAF
    let raf
    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x - 20}px`
        ringRef.current.style.top = `${ringPos.current.y - 20}px`
      }
      raf = requestAnimationFrame(animateRing)
    }

    // Hover detection — grow ring on interactive elements
    const handleOver = (e) => {
      const target = e.target.closest('a, button, [data-hover]')
      if (target && ringRef.current) {
        ringRef.current.classList.add('hovering')
      }
    }
    const handleOut = () => {
      if (ringRef.current) ringRef.current.classList.remove('hovering')
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)
    raf = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block" />
      <div ref={ringRef} className="cursor-ring hidden lg:block" />
    </>
  )
}
