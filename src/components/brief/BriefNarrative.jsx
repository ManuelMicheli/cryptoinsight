import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { l } from '../../i18n/translations'

export default function BriefNarrative({ narrative, pullQuote, lang }) {
  const text = l(narrative, lang)
  const paragraphs = text.split('\n\n').filter(Boolean)
  const quote = l(pullQuote, lang)

  // Insert pull quote after 2nd paragraph
  const insertQuoteAfter = Math.min(1, paragraphs.length - 1)

  return (
    <motion.div className="space-y-4" variants={fadeInUp}>
      <h4
        className="font-heading font-semibold text-text-primary text-sm uppercase tracking-widest"
        style={{ letterSpacing: '0.15em' }}
      >
        {lang === 'it' ? 'Analisi della Settimana' : 'Weekly Analysis'}
      </h4>

      <div className="space-y-6">
        {paragraphs.map((paragraph, index) => (
          <div key={index}>
            <p className="font-body text-text-secondary text-base leading-[1.85] tracking-wide">
              {paragraph}
            </p>

            {/* Pull quote inserted after the right paragraph */}
            {index === insertQuoteAfter && quote && (
              <motion.blockquote
                className="my-8 pl-6 border-l-2 border-neon-purple"
                style={{
                  boxShadow: '-2px 0 20px rgba(139,92,246,0.15)',
                }}
                variants={fadeInUp}
              >
                <p
                  className="font-body italic text-text-primary typo-body-lg"
                >
                  &ldquo;{quote}&rdquo;
                </p>
              </motion.blockquote>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
