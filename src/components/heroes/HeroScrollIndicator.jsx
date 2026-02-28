import { motion } from 'motion/react'

export default function HeroScrollIndicator() {
  return (
    <motion.div
      className="relative z-10 flex justify-center pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <motion.div
        className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-1 h-2 bg-neon-cyan/60 rounded-full" />
      </motion.div>
    </motion.div>
  )
}
