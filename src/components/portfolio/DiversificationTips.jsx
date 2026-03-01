import { useMemo } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { cryptoMeta } from '../../data/cryptoMeta'
import GlassCard from '../ui/GlassCard'

export default function DiversificationTips({ holdings }) {
  const { lang } = useLanguage()

  const tips = useMemo(() => {
    if (holdings.length === 0) return []
    const result = []
    const total = holdings.reduce((sum, h) => sum + h.quantity, 0)
    if (total === 0) return []

    // Check category concentration
    const catTotals = {}
    holdings.forEach(h => {
      const cat = cryptoMeta[h.coinId]?.category || 'unknown'
      catTotals[cat] = (catTotals[cat] || 0) + h.quantity
    })

    Object.entries(catTotals).forEach(([cat, val]) => {
      const pct = (val / total) * 100
      if (pct > 70) {
        const catName = cat === 'layer-1' ? 'Layer 1' : cat.charAt(0).toUpperCase() + cat.slice(1)
        result.push(
          lang === 'it'
            ? `Il tuo portfolio e' ${pct.toFixed(0)}% ${catName} — considera di diversificare in altre categorie`
            : `Your portfolio is ${pct.toFixed(0)}% ${catName} — consider diversifying into other categories`
        )
      }
    })

    if (holdings.length < 3) {
      result.push(
        lang === 'it'
          ? 'Hai pochi asset — un portfolio con almeno 5-7 crypto riduce il rischio specifico'
          : 'You have few assets — a portfolio with at least 5-7 cryptos reduces specific risk'
      )
    }

    const categories = new Set(Object.keys(catTotals))
    if (!categories.has('defi') && categories.has('layer-1')) {
      result.push(
        lang === 'it'
          ? 'Nessuna esposizione DeFi — i protocolli DeFi offrono diversificazione rispetto ai Layer 1'
          : 'No DeFi exposure — DeFi protocols offer diversification from Layer 1s'
      )
    }

    if (result.length === 0) {
      result.push(
        lang === 'it'
          ? 'Buona diversificazione! Il tuo portfolio e\' ben bilanciato tra le categorie'
          : 'Good diversification! Your portfolio is well-balanced across categories'
      )
    }

    return result
  }, [holdings, lang])

  if (holdings.length === 0) return null

  return (
    <GlassCard variant="dark" className="p-4">
      <p className="text-text-secondary text-xs uppercase tracking-wider mb-3 font-medium">
        {lang === 'it' ? 'Suggerimenti' : 'Tips'}
      </p>
      <ul className="space-y-2">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-neon-purple text-sm mt-0.5">•</span>
            <span className="text-text-secondary text-xs leading-relaxed">{tip}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}
