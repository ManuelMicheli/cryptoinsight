import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import { sentimentData } from '../../data/sentimentData'
import { healthData } from '../../data/healthData'
import { whaleTransactions } from '../../data/whaleData'
import { unlockEvents } from '../../data/unlockData'
import GlassCard from '../ui/GlassCard'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'

/**
 * Generates contextual insights based on combined data signals.
 */
function generateInsights(coinId, coin, lang) {
  const insights = []
  const sentiment = sentimentData[coinId]
  const health = healthData[coinId]
  const whaleMovements = whaleTransactions.filter((tx) => tx.asset === coinId)
  const upcomingUnlocks = unlockEvents.filter((e) => e.coinId === coinId)

  const isAccumulating = whaleMovements.some((tx) => tx.type === 'accumulo')
  const isDistributing = whaleMovements.some((tx) => tx.type === 'distribuzione')
  const hasUnlock = upcomingUnlocks.length > 0
  const bigUnlock = upcomingUnlocks.some((e) => e.percentSupply > 5)
  const priceDown = coin?.price_change_percentage_24h < 0

  // Signal: high sentiment + whale accumulating
  if (sentiment && sentiment.score >= 65 && isAccumulating) {
    insights.push({
      icon: '\u{1F4C8}',
      text: {
        it: 'Smart money sta accumulando in un momento di sentiment positivo. Questo allineamento di segnali e\' storicamente favorevole.',
        en: 'Smart money is accumulating during positive sentiment. This signal alignment is historically favorable.',
      },
      color: 'text-neon-green',
    })
  }

  // Signal: low sentiment + upcoming unlock
  if (sentiment && sentiment.score < 45 && hasUnlock) {
    insights.push({
      icon: '\u{26A0}\u{FE0F}',
      text: {
        it: 'Attenzione: unlock significativo in arrivo con sentiment gia\' negativo. Il mercato potrebbe reagire in modo amplificato.',
        en: 'Warning: significant unlock coming with already negative sentiment. The market might react in an amplified way.',
      },
      color: 'text-neon-red',
    })
  }

  // Signal: good health + price down
  if (health && health.score >= 80 && priceDown) {
    insights.push({
      icon: '\u{1F50D}',
      text: {
        it: 'Il progetto ha fondamentali solidi nonostante il calo di prezzo. Le metriche on-chain e di sviluppo rimangono forti.',
        en: 'The project has solid fundamentals despite the price drop. On-chain and development metrics remain strong.',
      },
      color: 'text-neon-cyan',
    })
  }

  // Signal: whale distributing
  if (isDistributing) {
    insights.push({
      icon: '\u{1F40B}',
      text: {
        it: 'Le whale stanno distribuendo, possibile pressione di vendita nel breve periodo. Monitora i flussi verso gli exchange.',
        en: 'Whales are distributing, potential selling pressure in the short term. Monitor flows to exchanges.',
      },
      color: 'text-neon-amber',
    })
  }

  // Signal: big unlock
  if (bigUnlock) {
    insights.push({
      icon: '\u{1F513}',
      text: {
        it: 'Un unlock importante (>5% della supply) e\' imminente. Storicamente, questo livello di diluizione causa volatilita\' significativa.',
        en: 'A major unlock (>5% of supply) is imminent. Historically, this dilution level causes significant volatility.',
      },
      color: 'text-neon-red',
    })
  }

  // Signal: positive sentiment + no major risks
  if (sentiment && sentiment.score >= 55 && !isDistributing && !bigUnlock && health && health.score >= 70) {
    insights.push({
      icon: '\u{2705}',
      text: {
        it: 'I segnali generali sono positivi: sentiment stabile, nessuna distribuzione whale significativa e buon health score.',
        en: 'Overall signals are positive: stable sentiment, no significant whale distribution and good health score.',
      },
      color: 'text-neon-green',
    })
  }

  // Ensure at least one insight
  if (insights.length === 0) {
    insights.push({
      icon: '\u{1F4CA}',
      text: {
        it: 'Dati insufficienti per generare segnali operativi. Continua a monitorare le metriche per aggiornamenti.',
        en: 'Insufficient data to generate actionable signals. Continue monitoring metrics for updates.',
      },
      color: 'text-text-secondary',
    })
  }

  // Cap at 4 insights
  return insights.slice(0, 4)
}

export default function ActionBox({ coinId, coin }) {
  const { lang } = useLanguage()

  // TODO: Replace with API call for real-time data
  const insights = generateInsights(coinId, coin, lang)

  const title = lang === 'it' ? 'COSA CONSIDERARE' : 'WHAT TO CONSIDER'
  const disclaimer = {
    it: 'Non e\' consulenza finanziaria. Fai sempre le tue ricerche (DYOR) prima di prendere decisioni di investimento.',
    en: 'This is not financial advice. Always do your own research (DYOR) before making investment decisions.',
  }

  return (
    <GlassCard variant="purple" hover={false} className="!min-h-0 p-5">
      <h3 className="font-heading text-xs tracking-widest text-neon-purple mb-4 uppercase">
        {title}
      </h3>

      <motion.ul
        className="space-y-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {insights.map((insight, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3"
            variants={fadeInUp}
          >
            <span className="text-base flex-shrink-0 mt-0.5">{insight.icon}</span>
            <p className={`text-sm leading-relaxed ${insight.color}`}>
              {l(insight.text, lang)}
            </p>
          </motion.li>
        ))}
      </motion.ul>

      {/* Disclaimer */}
      <div className="mt-4 pt-3 border-t border-white/[0.06]">
        <p className="text-[10px] text-text-secondary/60 italic leading-relaxed">
          {l(disclaimer, lang)}
        </p>
      </div>
    </GlassCard>
  )
}
