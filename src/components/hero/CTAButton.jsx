import { motion } from 'motion/react'
import { Link } from 'react-router'

export default function CTAButton({ children, onClick, to }) {
  const className = "relative inline-block px-8 py-4 rounded-xl font-heading text-sm font-semibold tracking-wider text-bg-primary bg-neon-cyan overflow-hidden group"

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </>
  )

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        boxShadow: [
          '0 0 20px rgba(0,240,255,0.3), 0 0 60px rgba(0,240,255,0.1)',
          '0 0 30px rgba(0,240,255,0.5), 0 0 80px rgba(0,240,255,0.2)',
          '0 0 20px rgba(0,240,255,0.3), 0 0 60px rgba(0,240,255,0.1)',
        ],
      }}
      transition={{ boxShadow: { duration: 2, repeat: Infinity }, scale: { type: 'spring', stiffness: 400 } }}
      className="rounded-xl"
    >
      {to ? (
        <Link to={to} className={className}>{inner}</Link>
      ) : (
        <button onClick={onClick} className={className}>{inner}</button>
      )}
    </motion.div>
  )
}
