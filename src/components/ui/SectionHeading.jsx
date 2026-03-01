import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'

export default function SectionHeading({ title, subtitle, glowColor = 'cyan' }) {
  const glowClass = {
    cyan: 'text-glow-cyan text-neon-cyan',
    purple: 'text-glow-purple text-neon-purple',
    green: 'text-glow-green text-neon-green',
    amber: 'text-glow-amber text-neon-amber',
    rose: 'text-glow-rose text-neon-rose',
  }[glowColor] || 'text-glow-cyan text-neon-cyan'

  return (
    <motion.div
      className="w-full text-center mb-10 md:mb-12"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h2
        className={`font-heading typo-h1 font-bold ${glowClass} mb-6`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary typo-body-lg max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
