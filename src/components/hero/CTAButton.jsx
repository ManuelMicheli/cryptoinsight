import { motion } from 'motion/react'
import { Link } from 'react-router'

export default function CTAButton({ children, onClick, to }) {
  const className = "relative inline-block px-8 py-4 rounded-xl font-heading text-sm font-semibold tracking-wider text-bg-primary overflow-hidden group"

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(to right, var(--hero-secondary), var(--hero-primary), var(--hero-secondary))' }}
      />
    </>
  )

  const btnStyle = { backgroundColor: 'var(--hero-secondary)' }

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ scale: { type: 'spring', stiffness: 400, damping: 25 } }}
      className="rounded-xl cta-glow"
    >
      {to ? (
        <Link to={to} className={className} style={btnStyle}>{inner}</Link>
      ) : (
        <button onClick={onClick} className={className} style={btnStyle}>{inner}</button>
      )}
    </motion.div>
  )
}
