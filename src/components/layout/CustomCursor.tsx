'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/admin')) return
    if (window.matchMedia("(max-width: 768px)").matches) return

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button'
      )
    }

    window.addEventListener('mousemove', updatePosition)
    return () => window.removeEventListener('mousemove', updatePosition)
  }, [pathname])

  if (pathname.startsWith('/admin')) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-[var(--color-gold)] pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: isPointer ? 1.5 : 1,
        backgroundColor: isPointer ? 'rgba(212, 175, 55, 1)' : 'transparent',
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
    />
  )
}
