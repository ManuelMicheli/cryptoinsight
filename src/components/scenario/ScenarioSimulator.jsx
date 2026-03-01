import { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { useCryptoData } from '../../contexts/CryptoDataContext'
import { fallbackBaseline } from '../../data/scenarioData'
import ScenarioSlider from './ScenarioSlider'
import ScenarioPreset from './ScenarioPreset'
import ScenarioResults from './ScenarioResults'
import TechTerm from '../ui/TechTerm'

export default function ScenarioSimulator() {
  const { lang } = useLanguage()
  const { coins, globalData } = useCryptoData()

  // Compute live baseline from CoinGecko data
  const liveBaseline = useMemo(() => {
    const btcCoin = coins?.find(c => c.id === 'bitcoin')
    const ethCoin = coins?.find(c => c.id === 'ethereum')
    const btcPrice = btcCoin?.current_price ?? fallbackBaseline.btcPrice
    const ethPrice = ethCoin?.current_price ?? 0
    const ethBtcRatio = btcPrice > 0 && ethPrice > 0 ? ethPrice / btcPrice : fallbackBaseline.ethBtcRatio
    const totalMarketCap = globalData?.total_market_cap?.usd
      ? globalData.total_market_cap.usd / 1e12
      : fallbackBaseline.totalMarketCap
    const btcDominance = globalData?.market_cap_percentage?.btc ?? fallbackBaseline.btcDominance

    return {
      btcPrice: Math.round(btcPrice),
      ethBtcRatio: parseFloat(ethBtcRatio.toFixed(4)),
      totalMarketCap: parseFloat(totalMarketCap.toFixed(1)),
      btcDominance: Math.round(btcDominance),
    }
  }, [coins, globalData])

  const [params, setParams] = useState({
    btcTarget: fallbackBaseline.btcPrice,
    ethBtcRatio: fallbackBaseline.ethBtcRatio,
    totalMarketCap: fallbackBaseline.totalMarketCap,
    btcDominance: fallbackBaseline.btcDominance,
  })

  // Sync sliders with live baseline once data loads (only first time)
  const initializedRef = useRef(false)
  useEffect(() => {
    if (!initializedRef.current && coins?.length) {
      initializedRef.current = true
      setParams({
        btcTarget: liveBaseline.btcPrice,
        ethBtcRatio: liveBaseline.ethBtcRatio,
        totalMarketCap: liveBaseline.totalMarketCap,
        btcDominance: liveBaseline.btcDominance,
      })
    }
  }, [coins, liveBaseline])

  const updateParam = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  const applyPreset = (preset) => {
    setParams({
      btcTarget: preset.btcTarget,
      ethBtcRatio: preset.ethBtcRatio,
      totalMarketCap: preset.totalMarketCap,
      btcDominance: preset.btcDominance,
    })
  }

  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {/* Presets */}
      <ScenarioPreset onApply={applyPreset} />

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ScenarioSlider
          label={<TechTerm term="btc_target">{lang === 'it' ? 'Bitcoin Target' : 'Bitcoin Target'}</TechTerm>}
          min={50000}
          max={500000}
          step={10000}
          value={params.btcTarget}
          onChange={v => updateParam('btcTarget', v)}
          formatFn={v => `$${(v / 1000).toFixed(0)}K`}
        />
        <ScenarioSlider
          label={<TechTerm term="eth_btc_ratio">ETH/BTC Ratio</TechTerm>}
          min={0.01}
          max={0.15}
          step={0.005}
          value={params.ethBtcRatio}
          onChange={v => updateParam('ethBtcRatio', v)}
          formatFn={v => v.toFixed(3)}
        />
        <ScenarioSlider
          label={<TechTerm term="market_cap">{lang === 'it' ? 'Market Cap Totale' : 'Total Market Cap'}</TechTerm>}
          min={1}
          max={15}
          step={0.5}
          value={params.totalMarketCap}
          onChange={v => updateParam('totalMarketCap', v)}
          formatFn={v => `$${v.toFixed(1)}T`}
        />
        <ScenarioSlider
          label={<TechTerm term="btc_dominance">{lang === 'it' ? 'Dominanza BTC' : 'BTC Dominance'}</TechTerm>}
          min={30}
          max={80}
          step={1}
          value={params.btcDominance}
          onChange={v => updateParam('btcDominance', v)}
          formatFn={v => `${v}%`}
        />
      </div>

      {/* Results */}
      <ScenarioResults params={params} baseline={liveBaseline} />

      {/* Disclaimer */}
      <p className="text-text-secondary text-xs text-center mt-4 italic">
        {t('scenarioDisclaimer', lang)}
      </p>
    </motion.div>
  )
}
