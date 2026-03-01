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
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-8 md:py-12 lg:py-16">
        {children}
      </div>
    </motion.section>
  )
}
