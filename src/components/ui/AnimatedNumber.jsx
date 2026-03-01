import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

export default function AnimatedNumber({ value, formatFn, duration = 1.5, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const numValue = typeof value === 'number' ? value : parseFloat(value) || 0

    let start = 0
    const startTime = performance.now()
    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease out cubic
      const current = start + (numValue - start) * eased
      setDisplay(current)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {formatFn ? formatFn(display) : display.toFixed(0)}
    </motion.span>
  )
}
