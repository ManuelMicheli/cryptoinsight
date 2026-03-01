import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { COIN_IDS } from '../../utils/constants'
import { cryptoMeta } from '../../data/cryptoMeta'
import { usePortfolio } from '../../contexts/PortfolioContext'

export default function PortfolioInput() {
  const { lang } = useLanguage()
  const { holdings, addHolding, removeHolding } = usePortfolio()
  const [selectedCoin, setSelectedCoin] = useState(COIN_IDS[0])
  const [quantity, setQuantity] = useState('')

  const handleAdd = () => {
    const qty = parseFloat(quantity)
    if (!qty || qty <= 0) return
    addHolding(selectedCoin, qty)
    setQuantity('')
  }

  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {/* Add form */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={selectedCoin}
          onChange={e => setSelectedCoin(e.target.value)}
          className="panel px-3 py-2 text-sm text-text-primary bg-transparent border border-glass-border rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-neon-purple/40 flex-1 min-w-[150px]"
        >
          {COIN_IDS.map(id => (
            <option key={id} value={id}>{cryptoMeta[id]?.name || id} ({cryptoMeta[id]?.ticker})</option>
          ))}
        </select>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          placeholder={lang === 'it' ? 'Quantita\'' : 'Quantity'}
          min="0"
          step="any"
          className="panel px-3 py-2 text-sm text-text-primary bg-transparent border border-glass-border rounded-xl focus:outline-none focus:border-neon-purple/40 w-[120px]"
        />
        <button
          onClick={handleAdd}
          className="px-5 py-2 text-sm font-medium rounded-xl bg-neon-purple/20 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple/30 transition-colors"
        >
          {lang === 'it' ? 'Aggiungi' : 'Add'}
        </button>
      </div>

      {/* Holdings list */}
      <AnimatePresence>
        {holdings.length > 0 && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {holdings.map(h => {
              const meta = cryptoMeta[h.coinId]
              return (
                <motion.div
                  key={h.coinId}
                  className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/[0.03] border border-white/5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-text-primary text-sm font-medium">{meta?.name}</span>
                    <span className="text-text-secondary text-xs">{h.quantity} {meta?.ticker}</span>
                  </div>
                  <button
                    onClick={() => removeHolding(h.coinId)}
                    className="text-neon-red/60 hover:text-neon-red text-xs transition-colors"
                  >
                    ✕
                  </button>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
