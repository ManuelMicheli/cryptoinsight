import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'

export default function SectionHeading({ title, subtitle, glowColor = 'cyan' }) {
  const glowClass = glowColor === 'purple' ? 'text-glow-purple text-neon-purple' : 'text-glow-cyan text-neon-cyan'

  return (
    <motion.div
      className="w-full text-center mb-10 md:mb-12"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h2
        className={`font-heading font-bold ${glowClass} mb-6`}
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
