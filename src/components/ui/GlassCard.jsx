import { motion } from 'motion/react'

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

export default function GlassCard({ children, className = '', hover = true, variant = 'cyan', brandColors, ...props }) {
  const hasBrand = Array.isArray(brandColors) && brandColors.length >= 2

  const variantClass = hasBrand
    ? 'panel'
    : ({
        cyan: 'panel',
        purple: 'panel panel-purple',
        green: 'panel panel-green',
        amber: 'panel panel-amber',
        dark: 'panel panel-dark',
        rose: 'panel panel-rose',
      }[variant] || 'panel')

  let brandStyle = {}
  let hoverGlow

  if (hasBrand) {
    const [r1, g1, b1] = hexToRgb(brandColors[0])
    const [r2, g2, b2] = hexToRgb(brandColors[1])
    brandStyle = {
      background: `linear-gradient(145deg, rgba(${r1},${g1},${b1}, 0.18), rgba(${r2},${g2},${b2}, 0.08))`,
      borderColor: `rgba(${r2},${g2},${b2}, 0.18)`,
      boxShadow: `0 8px 32px rgba(${r1},${g1},${b1}, 0.08), 0 0 40px rgba(${r2},${g2},${b2}, 0.04)`,
    }
    hoverGlow = `0 8px 40px rgba(${r1},${g1},${b1},0.2), 0 0 60px rgba(${r2},${g2},${b2},0.12)`
  } else {
    hoverGlow = {
      cyan: '0 8px 40px rgba(0,240,255,0.2), 0 0 60px rgba(0,240,255,0.08)',
      purple: '0 8px 40px rgba(139,92,246,0.2), 0 0 60px rgba(139,92,246,0.08)',
      green: '0 8px 40px rgba(0,255,136,0.2), 0 0 60px rgba(0,255,136,0.08)',
      amber: '0 8px 40px rgba(245,158,11,0.2), 0 0 60px rgba(245,158,11,0.08)',
      dark: '0 8px 40px rgba(255,255,255,0.04), 0 0 60px rgba(255,255,255,0.02)',
      rose: '0 8px 40px rgba(236,72,153,0.2), 0 0 60px rgba(236,72,153,0.08)',
    }[variant] || '0 8px 40px rgba(0,240,255,0.2), 0 0 60px rgba(0,240,255,0.08)'
  }

  return (
    <motion.div
      className={`${variantClass} ${className}`}
      style={brandStyle}
      whileHover={hover ? {
        y: -4,
        boxShadow: hoverGlow,
        borderColor: 'rgba(255,255,255,0.2)',
      } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
