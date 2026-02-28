import { useState, useEffect } from 'react'
import GlassCard from '../ui/GlassCard'
import { formatCurrency } from '../../utils/formatters'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function BybitDashboard({ onDisconnect }) {
  const [wallet, setWallet] = useState(null)
  const { lang } = useLanguage()

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('bybit_connected') || '{}')
      if (stored.wallet) setWallet(stored.wallet)
    } catch {}
  }, [])

  const account = wallet?.list?.[0]
  const coins = account?.coin || []
  const totalEquity = parseFloat(account?.totalEquity || '0')
  const totalPnl = parseFloat(account?.totalPnl || '0')

  return (
    <div className="space-y-6">
      <GlassCard hover={false} variant="green">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-glow-pulse" />
            <span className="font-heading text-sm text-neon-green">{t('bybitConnected', lang)}</span>
          </div>
          <button
            onClick={onDisconnect}
            className="text-text-secondary text-xs hover:text-neon-red transition-colors"
          >
            {t('bybitDisconnect', lang)}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="text-text-secondary text-xs mb-1">{t('bybitTotalValue', lang)}</div>
            <div className="font-heading text-2xl font-bold text-neon-cyan">
              {formatCurrency(totalEquity)}
            </div>
          </div>
          <div>
            <div className="text-text-secondary text-xs mb-1">{t('bybitTotalPnl', lang)}</div>
            <div className={`font-heading text-2xl font-bold ${totalPnl >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
              {totalPnl >= 0 ? '+' : ''}{formatCurrency(totalPnl)}
            </div>
          </div>
        </div>
      </GlassCard>

      {coins.length > 0 && (
        <GlassCard hover={false}>
          <h4 className="font-heading text-sm text-text-primary mb-4">{t('bybitYourCrypto', lang)}</h4>
          <div className="space-y-3">
            {coins
              .filter(c => parseFloat(c.walletBalance) > 0)
              .sort((a, b) => parseFloat(b.usdValue) - parseFloat(a.usdValue))
              .map((coin) => (
                <div key={coin.coin} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <span className="text-sm font-medium text-text-primary">{coin.coin}</span>
                    <span className="text-text-secondary text-xs ml-2">
                      {parseFloat(coin.walletBalance).toFixed(4)} {t('bybitUnits', lang)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-neon-cyan">{formatCurrency(parseFloat(coin.usdValue))}</div>
                    {coin.unrealisedPnl && parseFloat(coin.unrealisedPnl) !== 0 && (
                      <div className={`text-xs ${parseFloat(coin.unrealisedPnl) >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
                        {parseFloat(coin.unrealisedPnl) >= 0 ? t('bybitGain', lang) : t('bybitLoss', lang)}: {formatCurrency(Math.abs(parseFloat(coin.unrealisedPnl)))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </GlassCard>
      )}

      {coins.length === 0 && (
        <GlassCard hover={false} className="text-center py-8">
          <p className="text-text-secondary">{t('bybitNoCoins', lang)}</p>
        </GlassCard>
      )}
    </div>
  )
}
