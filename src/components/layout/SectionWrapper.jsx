import { motion } from 'motion/react'
import { staggerContainer } from '../../hooks/useInViewAnimation'

export default function SectionWrapper({ id, children, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`w-full ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
        {children}
      </div>
    </motion.section>
  )
}
