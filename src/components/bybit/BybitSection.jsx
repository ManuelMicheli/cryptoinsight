import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import BybitDashboard from './BybitDashboard'
import { useLanguage } from '../../contexts/LanguageContext'
import { usePortfolio } from '../../contexts/PortfolioContext'
import { useCryptoData } from '../../contexts/CryptoDataContext'
import { t } from '../../i18n/translations'

const EXCHANGES = [
  { id: 'bybit-eu', label: 'Bybit EU', color: 'blue' },
  { id: 'bybit-global', label: 'Bybit Global', color: 'amber' },
  { id: 'binance', label: 'Binance', color: 'yellow' },
  { id: 'coinbase', label: 'Coinbase', color: 'blue' },
  { id: 'kraken', label: 'Kraken', color: 'purple' },
  { id: 'other', label: 'Altro / Other', color: 'gray' },
]

export default function BybitSection() {
  const { lang } = useLanguage()
  const { holdings, addHolding } = usePortfolio()
  const { coins } = useCryptoData()

  const [selectedCoin, setSelectedCoin] = useState(null)
  const [quantity, setQuantity] = useState('')
  const [exchange, setExchange] = useState('bybit-eu')
  const [search, setSearch] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filteredCoins = useMemo(() => {
    if (!coins) return []
    const q = search.toLowerCase().trim()
    if (!q) return coins.slice(0, 20)
    return coins.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.symbol.toLowerCase().includes(q)
    ).slice(0, 20)
  }, [coins, search])

  const handleAdd = (e) => {
    e.preventDefault()
    const qty = parseFloat(quantity)
    if (!selectedCoin || !qty || qty <= 0) return
    addHolding(selectedCoin.id, selectedCoin.symbol.toUpperCase(), qty, exchange)
    setSelectedCoin(null)
    setQuantity('')
    setSearch('')
  }

  return (
    <SectionWrapper id="bybit" className="bg-bg-secondary/30">
      <SectionHeading
        title={t('bybitTitle', lang)}
        subtitle={t('bybitSubtitle', lang)}
        glowColor="cyan"
      />

      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Add Asset Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard hover={false} variant="cyan">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neon-cyan/10 mb-4">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-neon-cyan" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 6v12M6 12h12" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-heading typo-h4 text-text-primary mb-2">{t('portfolioAddAsset', lang)}</h3>
              <p className="text-text-secondary typo-body-sm">
                {t('portfolioAddAssetDesc', lang)}
              </p>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              {/* Coin selector */}
              <div ref={dropdownRef} className="relative">
                <label className="block text-text-secondary typo-ui-sm mb-1.5">{t('portfolioCoin', lang)}</label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 typo-body-sm text-left transition-colors focus:outline-none focus:border-neon-cyan/50 flex items-center justify-between"
                >
                  {selectedCoin ? (
                    <span className="flex items-center gap-2 text-text-primary">
                      <img src={selectedCoin.image} alt="" className="w-5 h-5 rounded-full" />
                      {selectedCoin.name}
                      <span className="text-text-secondary uppercase">({selectedCoin.symbol})</span>
                    </span>
                  ) : (
                    <span className="text-text-secondary/50">{t('portfolioCoinPlaceholder', lang)}</span>
                  )}
                  <svg className={`w-4 h-4 text-text-secondary transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-50 mt-2 w-full bg-[#0a0f1a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-2">
                        <input
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder={t('portfolioCoinPlaceholder', lang)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 typo-body-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-neon-cyan/50"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-56 overflow-y-auto" data-lenis-prevent>
                        {filteredCoins.map(coin => (
                          <button
                            key={coin.id}
                            type="button"
                            onClick={() => {
                              setSelectedCoin(coin)
                              setDropdownOpen(false)
                              setSearch('')
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors text-left"
                          >
                            <img src={coin.image} alt="" className="w-6 h-6 rounded-full" />
                            <div>
                              <span className="typo-body-sm font-medium text-text-primary">{coin.name}</span>
                              <span className="typo-ui-sm text-text-secondary ml-2 uppercase">{coin.symbol}</span>
                            </div>
                            <span className="ml-auto typo-ui-sm text-text-secondary">#{coin.market_cap_rank}</span>
                          </button>
                        ))}
                        {filteredCoins.length === 0 && (
                          <div className="px-3 py-4 text-center text-text-secondary typo-body-sm">
                            {lang === 'it' ? 'Nessuna crypto trovata' : 'No crypto found'}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quantity input */}
              <div>
                <label className="block text-text-secondary typo-ui-sm mb-1.5">{t('portfolioQuantity', lang)}</label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder={t('portfolioQuantityPlaceholder', lang)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 typo-body-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-neon-cyan/50 transition-colors"
                />
              </div>

              {/* Exchange selector */}
              <div>
                <label className="block text-text-secondary typo-ui-sm mb-1.5">{t('portfolioExchange', lang)}</label>
                <div className="grid grid-cols-3 gap-2">
                  {EXCHANGES.map(ex => (
                    <button
                      key={ex.id}
                      type="button"
                      onClick={() => setExchange(ex.id)}
                      className={`py-2 px-2 rounded-xl typo-ui-sm font-medium transition-all text-center ${
                        exchange === ex.id
                          ? 'glass glow-cyan text-neon-cyan'
                          : 'bg-white/5 text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {ex.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!selectedCoin || !quantity || parseFloat(quantity) <= 0}
                className="w-full py-3 rounded-xl font-heading typo-ui font-semibold bg-neon-cyan text-bg-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed glow-cyan hover:bg-neon-cyan/80"
              >
                {t('portfolioAddBtn', lang)}
              </button>

              <p className="text-text-secondary typo-ui-sm text-center">
                {t('portfolioLocalStorage', lang)}
              </p>
            </form>
          </GlassCard>
        </motion.div>

        {/* Portfolio Dashboard */}
        {holdings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BybitDashboard />
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  )
}
