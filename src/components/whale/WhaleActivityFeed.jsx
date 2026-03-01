import { motion } from 'motion/react'
import { staggerContainer } from '../../hooks/useInViewAnimation'
import WhaleTransactionCard from './WhaleTransactionCard'

export default function WhaleActivityFeed({ transactions }) {
  return (
    <motion.div
      className="max-h-[600px] overflow-y-auto space-y-3 pr-1 scrollbar-thin"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.1) transparent',
      }}
    >
      {transactions.map(tx => (
        <WhaleTransactionCard key={tx.id} tx={tx} />
      ))}
    </motion.div>
  )
}
