import { motion } from 'motion/react'
import { Link } from 'react-router'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import GlassCard from '../ui/GlassCard'

const insights = [
  {
    icon: '🐋',
    text: {
      it: 'Le whale stanno accumulando ETH (3 transazioni >$10M in 48h) mentre il sentiment \u00e8 a 72 (Avidit\u00e0)',
      en: 'Whales are accumulating ETH (3 transactions >$10M in 48h) while sentiment is at 72 (Greed)',
    },
    tokens: ['ETH'],
    link: '/crypto',
    linkText: { it: 'Vai a Crypto', en: 'Go to Crypto' },
  },
  {
    icon: '🔓',
    text: {
      it: 'Unlock SOL del 3.2% supply tra 5 giorni \u2014 storicamente il prezzo \u00e8 sceso del -4.8% nei 7 giorni successivi',
      en: 'SOL unlock of 3.2% supply in 5 days \u2014 historically price dropped -4.8% in the following 7 days',
    },
    tokens: ['SOL'],
    link: '/eventi',
    linkText: { it: 'Vai a Eventi', en: 'Go to Events' },
  },
  {
    icon: '⚖️',
    text: {
      it: "L'UE ha finalizzato MiCA \u2014 possibile impatto positivo su token regolamentati come LINK e AAVE",
      en: 'The EU has finalized MiCA \u2014 possible positive impact on regulated tokens like LINK and AAVE',
    },
    tokens: ['LINK', 'AAVE'],
    link: '/crypto',
    linkText: { it: 'Vai a Crypto', en: 'Go to Crypto' },
  },
  {
    icon: '📊',
    text: {
      it: 'Correlazione BTC-ETH ai minimi di 90 giorni (0.61) \u2014 possibile opportunit\u00e0 di diversificazione',
      en: 'BTC-ETH correlation at 90-day lows (0.61) \u2014 possible diversification opportunity',
    },
    tokens: ['BTC', 'ETH'],
    link: '/mercato',
    linkText: { it: 'Vai a Mercato', en: 'Go to Market' },
  },
  {
    icon: '🌡️',
    text: {
      it: 'Fear & Greed a 72: il mercato \u00e8 ottimista ma attenzione ai livelli di 80+ dove storicamente si verificano correzioni',
      en: 'Fear & Greed at 72: market is optimistic but watch for 80+ levels where corrections historically occur',
    },
    tokens: ['BTC'],
    link: '/mercato',
    linkText: { it: 'Vai a Mercato', en: 'Go to Market' },
  },
]

const disclaimer = {
  it: 'Questi insight sono generati automaticamente da dati pubblici. Non costituiscono consulenza finanziaria.',
  en: 'These insights are automatically generated from public data. They do not constitute financial advice.',
}

export default function ActionInsights() {
  const { lang } = useLanguage()

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <GlassCard variant="purple" hover={false} className="relative overflow-hidden">
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/60 to-transparent" />

        <div className="px-6 py-6 md:px-10 md:py-8 space-y-6">
          {/* Section title */}
          <motion.h3
            className="font-heading font-bold text-neon-purple text-glow-purple uppercase tracking-widest text-sm"
            style={{ letterSpacing: '0.15em' }}
            variants={fadeInUp}
          >
            {lang === 'it' ? 'COSA TENERE D\'OCCHIO' : 'WHAT TO WATCH'}
          </motion.h3>

          {/* Insight cards */}
          <motion.div className="space-y-4" variants={staggerContainer}>
            {insights.map((insight, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <GlassCard
                  variant="dark"
                  hover={true}
                  className="relative flex flex-col sm:flex-row sm:items-start gap-4 border-l-2 border-l-neon-purple/40"
                >
                  <div className="flex gap-4 items-start flex-1 min-w-0 px-5 pt-5 sm:pb-5">
                    <span
                      className="text-2xl flex-shrink-0 mt-0.5"
                      role="img"
                      aria-hidden="true"
                    >
                      {insight.icon}
                    </span>
                    <div className="flex-1 min-w-0 space-y-3">
                      <p className="font-body text-text-secondary text-sm leading-relaxed">
                        {l(insight.text, lang)}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {insight.tokens.map((token) => (
                          <span
                            key={token}
                            className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 text-text-primary/80 border border-white/10"
                          >
                            {token}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 px-5 pb-5 sm:pt-5 sm:pb-5 sm:pr-5 sm:pl-0">
                    <Link
                      to={insight.link}
                      className="inline-flex items-center gap-1.5 text-neon-purple text-sm font-body font-medium hover:underline transition-colors whitespace-nowrap"
                    >
                      {l(insight.linkText, lang)}
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            className="text-text-secondary/40 text-xs font-body text-center leading-relaxed pt-2 border-t border-white/5"
            variants={fadeInUp}
          >
            {l(disclaimer, lang)}
          </motion.p>
        </div>
      </GlassCard>
    </motion.div>
  )
}
