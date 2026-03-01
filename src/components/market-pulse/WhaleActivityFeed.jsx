import { useMemo } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import { whaleTransactions } from '../../data/whaleData'
import { cryptoMeta } from '../../data/cryptoMeta'
import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'
import { formatCurrency } from '../../utils/formatters'

const typeBadges = {
  accumulo: { label: { it: 'Accumulo', en: 'Accumulation' }, color: 'text-neon-green', bg: 'bg-neon-green/10', border: 'border-neon-green/20' },
  distribuzione: { label: { it: 'Distribuzione', en: 'Distribution' }, color: 'text-neon-red', bg: 'bg-neon-red/10', border: 'border-neon-red/20' },
  trasferimento: { label: { it: 'Trasferimento', en: 'Transfer' }, color: 'text-neon-amber', bg: 'bg-neon-amber/10', border: 'border-neon-amber/20' },
  defi: { label: { it: 'DeFi', en: 'DeFi' }, color: 'text-neon-cyan', bg: 'bg-neon-cyan/10', border: 'border-neon-cyan/20' },
}

function relativeTime(timestamp, lang) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return lang === 'it' ? `${mins} min fa` : `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return lang === 'it' ? `${hours} ore fa` : `${hours}h ago`
  const days = Math.floor(hours / 24)
  return lang === 'it' ? `${days} giorni fa` : `${days}d ago`
}

export default function WhaleActivityFeedSection() {
  const { lang } = useLanguage()

  const recentTx = useMemo(() =>
    [...whaleTransactions]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10),
    []
  )

  return (
    <SectionWrapper id="whale-feed" className="bg-bg-secondary/30">
      <SectionHeading
        title={t('whaleTitle', lang)}
        subtitle={t('whaleSubtitle', lang)}
        glowColor="cyan"
      />

      <motion.div
        className="grid grid-cols-1 xl:grid-cols-2 gap-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {recentTx.map(tx => {
          const meta = cryptoMeta[tx.asset]
          const badge = typeBadges[tx.type] || typeBadges.trasferimento

          return (
            <motion.div key={tx.id} variants={fadeInUp}>
              <Link to={`/crypto?detail=${tx.asset}`} className="block">
                <GlassCard variant="dark" hover className="!p-4 !min-h-0 !rounded-xl">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-text-secondary flex-shrink-0">
                        {tx.ticker?.slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-text-primary text-sm font-medium truncate">{tx.walletLabel}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${badge.color} ${badge.bg} ${badge.border}`}>
                            {l(badge.label, lang)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-text-secondary text-xs">
                            {tx.amount.toLocaleString()} {tx.ticker}
                          </span>
                          <span className="text-text-secondary/50 text-xs">→</span>
                          <span className="text-text-secondary text-xs truncate">{l(tx.destination, lang)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className="text-text-primary text-sm font-medium">{formatCurrency(tx.valueUsd, 0)}</span>
                      <span className="text-text-secondary text-[10px]">{relativeTime(tx.timestamp, lang)}</span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}
