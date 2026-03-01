import { useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAlerts } from '../../contexts/AlertContext'
import { COIN_IDS } from '../../utils/constants'
import { cryptoMeta } from '../../data/cryptoMeta'
import { alertTypeConfig } from '../../data/alertMockData'
import { l } from '../../i18n/translations'

const alertTypes = ['price', 'whale', 'unlock', 'sentiment', 'regulation']

export default function AlertCreateForm({ onClose }) {
  const { lang } = useLanguage()
  const { addAlert } = useAlerts()

  const [type, setType] = useState('price')
  const [coinId, setCoinId] = useState(COIN_IDS[0])

  // Type-specific params
  const [priceDirection, setPriceDirection] = useState('above')
  const [priceThreshold, setPriceThreshold] = useState('')
  const [whaleMinValue, setWhaleMinValue] = useState('10000000')
  const [unlockDays, setUnlockDays] = useState('7')
  const [sentimentDirection, setSentimentDirection] = useState('below')
  const [sentimentThreshold, setSentimentThreshold] = useState('40')
  const [regulationRegions, setRegulationRegions] = useState(['US', 'EU'])

  const needsCoin = ['price', 'whale', 'unlock', 'sentiment'].includes(type)

  const handleSubmit = (e) => {
    e.preventDefault()

    let params = {}

    switch (type) {
      case 'price':
        params = { direction: priceDirection, threshold: parseFloat(priceThreshold) }
        break
      case 'whale':
        params = { minValueUsd: parseInt(whaleMinValue) }
        break
      case 'unlock':
        params = { daysBeforeUnlock: parseInt(unlockDays) }
        break
      case 'sentiment':
        params = { direction: sentimentDirection, threshold: parseInt(sentimentThreshold) }
        break
      case 'regulation':
        params = { regions: regulationRegions }
        break
    }

    addAlert({
      type,
      coinId: needsCoin ? coinId : null,
      params,
      active: true,
    })

    onClose()
  }

  const toggleRegion = (region) => {
    setRegulationRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="panel panel-dark p-4 space-y-4"
      style={{ minHeight: 'auto' }}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-text-primary">
          {lang === 'it' ? 'Crea Alert' : 'Create Alert'}
        </h4>
        <button
          type="button"
          onClick={onClose}
          className="text-text-secondary hover:text-text-primary transition-colors text-xs"
        >
          {lang === 'it' ? 'Annulla' : 'Cancel'}
        </button>
      </div>

      {/* Type selector */}
      <div className="flex flex-wrap gap-2">
        {alertTypes.map(t => {
          const conf = alertTypeConfig[t]
          const isActive = type === t
          return (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                isActive
                  ? `bg-${conf.color}/15 border-${conf.color}/30 text-${conf.color}`
                  : 'bg-white/[0.02] border-white/[0.06] text-text-secondary hover:text-text-primary'
              }`}
              style={isActive ? {
                backgroundColor: `var(--color-${conf.color}, rgba(139,92,246,0.15))`,
                borderColor: `var(--color-${conf.color}, rgba(139,92,246,0.3))`,
              } : undefined}
            >
              <span className="mr-1">{conf.icon}</span>
              {l(conf.label, lang)}
            </button>
          )
        })}
      </div>

      {/* Token selector */}
      {needsCoin && (
        <select
          value={coinId}
          onChange={e => setCoinId(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-primary text-sm font-body focus:outline-none focus:border-neon-purple/40"
        >
          {COIN_IDS.map(id => (
            <option key={id} value={id}>
              {cryptoMeta[id]?.name || id} ({cryptoMeta[id]?.ticker})
            </option>
          ))}
        </select>
      )}

      {/* Type-specific parameters */}
      {type === 'price' && (
        <div className="flex gap-2">
          <select
            value={priceDirection}
            onChange={e => setPriceDirection(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-primary text-sm font-body focus:outline-none focus:border-neon-purple/40"
          >
            <option value="above">{lang === 'it' ? 'Sopra' : 'Above'}</option>
            <option value="below">{lang === 'it' ? 'Sotto' : 'Below'}</option>
          </select>
          <input
            type="number"
            value={priceThreshold}
            onChange={e => setPriceThreshold(e.target.value)}
            placeholder="$"
            step="any"
            className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-primary text-sm font-body placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-purple/40"
            required
          />
        </div>
      )}

      {type === 'whale' && (
        <div>
          <label className="text-[10px] text-text-secondary/60 uppercase tracking-wider block mb-1">
            {lang === 'it' ? 'Valore minimo (USD)' : 'Min value (USD)'}
          </label>
          <input
            type="number"
            value={whaleMinValue}
            onChange={e => setWhaleMinValue(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-primary text-sm font-body focus:outline-none focus:border-neon-purple/40"
            required
          />
        </div>
      )}

      {type === 'unlock' && (
        <div>
          <label className="text-[10px] text-text-secondary/60 uppercase tracking-wider block mb-1">
            {lang === 'it' ? 'Giorni prima dell\'unlock' : 'Days before unlock'}
          </label>
          <input
            type="number"
            value={unlockDays}
            onChange={e => setUnlockDays(e.target.value)}
            min="1"
            max="30"
            className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-primary text-sm font-body focus:outline-none focus:border-neon-purple/40"
            required
          />
        </div>
      )}

      {type === 'sentiment' && (
        <div className="flex gap-2">
          <select
            value={sentimentDirection}
            onChange={e => setSentimentDirection(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-primary text-sm font-body focus:outline-none focus:border-neon-purple/40"
          >
            <option value="below">{lang === 'it' ? 'Sotto' : 'Below'}</option>
            <option value="above">{lang === 'it' ? 'Sopra' : 'Above'}</option>
          </select>
          <input
            type="number"
            value={sentimentThreshold}
            onChange={e => setSentimentThreshold(e.target.value)}
            min="0"
            max="100"
            placeholder="0-100"
            className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-primary text-sm font-body placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-purple/40"
            required
          />
        </div>
      )}

      {type === 'regulation' && (
        <div>
          <label className="text-[10px] text-text-secondary/60 uppercase tracking-wider block mb-2">
            {lang === 'it' ? 'Regioni' : 'Regions'}
          </label>
          <div className="flex flex-wrap gap-2">
            {['US', 'EU', 'UK', 'Asia'].map(region => (
              <button
                key={region}
                type="button"
                onClick={() => toggleRegion(region)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  regulationRegions.includes(region)
                    ? 'bg-neon-red/15 border-neon-red/30 text-neon-red'
                    : 'bg-white/[0.02] border-white/[0.06] text-text-secondary'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2.5 rounded-lg bg-neon-purple/20 border border-neon-purple/30 text-neon-purple text-xs font-heading font-semibold uppercase tracking-wider hover:bg-neon-purple/30 transition-colors"
        style={{
          boxShadow: '0 0 15px rgba(139,92,246,0.15)',
        }}
      >
        {lang === 'it' ? 'CREA ALERT' : 'CREATE ALERT'}
      </button>
    </motion.form>
  )
}
