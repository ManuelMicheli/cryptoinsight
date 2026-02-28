import { motion } from 'motion/react'

export default function GlassCard({ children, className = '', hover = true, variant = 'cyan', ...props }) {
  const variantClass = {
    cyan: 'panel',
    purple: 'panel panel-purple',
    green: 'panel panel-green',
    amber: 'panel panel-amber',
  }[variant] || 'panel'

  return (
    <motion.div
      className={`${variantClass} ${className}`}
      whileHover={hover ? {
        y: -4,
        boxShadow: '0 8px 40px rgba(0,240,255,0.2), 0 0 60px rgba(0,240,255,0.08)',
        borderColor: 'rgba(255,255,255,0.2)',
      } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
