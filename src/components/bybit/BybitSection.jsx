import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import BybitDashboard from './BybitDashboard'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function BybitSection() {
  const [connected, setConnected] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [region, setRegion] = useState('global')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { lang } = useLanguage()

  const handleConnect = async (e) => {
    e.preventDefault()
    if (!apiKey.trim() || !apiSecret.trim()) {
      setError(t('bybitErrorEmpty', lang))
      return
    }
    setLoading(true)
    setError('')

    try {
      const baseUrl = region === 'eu'
        ? 'https://api.bybit.com'
        : 'https://api.bybit.com'

      const timestamp = Date.now().toString()
      const recvWindow = '5000'
      const queryString = `accountType=UNIFIED`
      const preSign = `${timestamp}${apiKey}${recvWindow}${queryString}`

      const encoder = new TextEncoder()
      const keyData = encoder.encode(apiSecret)
      const msgData = encoder.encode(preSign)
      const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
      const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
      const hexSign = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('')

      const res = await fetch(`${baseUrl}/v5/account/wallet-balance?${queryString}`, {
        headers: {
          'X-BAPI-API-KEY': apiKey,
          'X-BAPI-TIMESTAMP': timestamp,
          'X-BAPI-RECV-WINDOW': recvWindow,
          'X-BAPI-SIGN': hexSign,
        },
      })

      const data = await res.json()

      if (data.retCode === 0) {
        localStorage.setItem('bybit_connected', JSON.stringify({
          apiKey,
          region,
          wallet: data.result,
        }))
        setConnected(true)
      } else {
        setError(`${t('bybitErrorBybit', lang)}: ${data.retMsg || t('bybitErrorVerify', lang)}`)
      }
    } catch (err) {
      setError(t('bybitErrorGeneric', lang))
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnect = () => {
    localStorage.removeItem('bybit_connected')
    setConnected(false)
    setApiKey('')
    setApiSecret('')
    setError('')
  }

  return (
    <SectionWrapper id="bybit" className="bg-bg-secondary/30">
      <SectionHeading
        title={t('bybitTitle', lang)}
        subtitle={t('bybitSubtitle', lang)}
        glowColor="cyan"
      />

      <div className="w-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!connected ? (
            <motion.div
              key="connect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <GlassCard hover={false} variant="cyan">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neon-cyan/10 mb-4">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-neon-cyan" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11" />
                      <path d="M17 15V18M17 21V18M17 18H14M17 18H20" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg text-text-primary mb-2">{t('bybitConnect', lang)}</h3>
                  <p className="text-text-secondary text-sm">
                    {t('bybitConnectDesc', lang)}
                  </p>
                </div>

                <form onSubmit={handleConnect} className="space-y-4">
                  <div>
                    <label className="block text-text-secondary text-xs mb-1.5">{t('bybitRegion', lang)}</label>
                    <div className="flex gap-3">
                      {[
                        ['global', 'Bybit Global'],
                        ['eu', 'Bybit EU'],
                      ].map(([val, label]) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setRegion(val)}
                          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${region === val
                              ? 'glass glow-cyan text-neon-cyan'
                              : 'bg-white/5 text-text-secondary hover:text-text-primary'
                            }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-text-secondary text-xs mb-1.5">{t('bybitApiKey', lang)}</label>
                    <input
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={t('bybitApiKeyPlaceholder', lang)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-neon-cyan/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-text-secondary text-xs mb-1.5">{t('bybitSecretKey', lang)}</label>
                    <input
                      type="password"
                      value={apiSecret}
                      onChange={(e) => setApiSecret(e.target.value)}
                      placeholder={t('bybitSecretPlaceholder', lang)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-neon-cyan/50 transition-colors"
                    />
                  </div>

                  {error && (
                    <div className="text-neon-red text-sm text-center py-2">{error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-heading text-sm font-semibold bg-neon-cyan text-white hover:bg-neon-cyan/80 text-bg-primary transition-colors disabled:opacity-50 glow-cyan"
                  >
                    {loading ? t('bybitConnecting', lang) : t('bybitConnectBtn', lang)}
                  </button>

                  <p className="text-text-secondary text-xs text-center" dangerouslySetInnerHTML={{ __html: t('bybitReadOnly', lang) }} />
                </form>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <BybitDashboard onDisconnect={handleDisconnect} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  )
}
