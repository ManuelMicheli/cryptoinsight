import { motion } from 'motion/react'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'
import { l } from '../../i18n/translations'

export default function BriefExecutiveSummary({ items, lang }) {
  return (
    <motion.div className="space-y-4" variants={fadeInUp}>
      <h4
        className="font-heading font-semibold text-text-primary text-sm uppercase tracking-widest"
        style={{ letterSpacing: '0.15em' }}
      >
        {lang === 'it' ? 'Executive Summary' : 'Executive Summary'}
      </h4>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={staggerContainer}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="panel panel-dark p-5 flex gap-4 items-start"
            variants={fadeInUp}
          >
            <span
              className="text-2xl flex-shrink-0 mt-0.5"
              role="img"
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <p className="font-body text-text-secondary text-sm leading-relaxed">
              {l(item.text, lang)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
