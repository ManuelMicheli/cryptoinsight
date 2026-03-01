import { useState } from 'react'
import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import { correlationAssets, correlationMatrices, historicalAverages } from '../../data/correlationData'
import CorrelationCell from './CorrelationCell'
import CorrelationTooltip from './CorrelationTooltip'

export default function CorrelationMatrix({ timeframe }) {
  const { lang } = useLanguage()
  const [tooltip, setTooltip] = useState({ value: null, assetA: '', assetB: '', position: { x: 0, y: 0 } })
  const matrix = correlationMatrices[timeframe]

  const handleCellHover = (i, j, e) => {
    if (i === j) return
    setTooltip({
      value: matrix[i][j],
      assetA: correlationAssets[i].label,
      assetB: correlationAssets[j].label,
      position: { x: e.clientX, y: e.clientY },
    })
  }

  const isAnomaly = (i, j) => {
    if (i === j) return false
    const current = matrix[i][j]
    const historical = historicalAverages[i][j]
    return Math.abs(current - historical) > 0.3
  }

  return (
    <motion.div
      className="relative"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Scrollable container for mobile */}
      <div className="overflow-x-auto -mx-2 px-2 snap-x snap-mandatory" data-lenis-prevent>
        <div style={{ minWidth: '650px' }}>
          {/* Header row */}
          <div className="grid gap-px" style={{ gridTemplateColumns: `60px repeat(${correlationAssets.length}, 1fr)` }}>
            <div /> {/* Empty corner */}
            {correlationAssets.map(asset => (
              <div key={asset.id} className="text-[8px] sm:text-[9px] text-text-secondary text-center font-medium py-1 truncate">
                {typeof asset.label === 'string' ? asset.label : l(asset.label, lang)}
              </div>
            ))}
          </div>

          {/* Matrix rows */}
          {correlationAssets.map((rowAsset, i) => (
            <div
              key={rowAsset.id}
              className="grid gap-px"
              style={{ gridTemplateColumns: `60px repeat(${correlationAssets.length}, 1fr)` }}
            >
              <div className="text-[8px] sm:text-[9px] text-text-secondary flex items-center font-medium truncate pr-1">
                {typeof rowAsset.label === 'string' ? rowAsset.label : l(rowAsset.label, lang)}
              </div>
              {correlationAssets.map((_, j) => (
                <CorrelationCell
                  key={j}
                  value={matrix[i][j]}
                  isAnomaly={isAnomaly(i, j)}
                  onMouseEnter={(e) => handleCellHover(i, j, e)}
                  onMouseLeave={() => setTooltip({ ...tooltip, value: null })}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(239, 68, 68, 0.3)' }} />
          <span className="text-text-secondary text-xs">-1</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }} />
          <span className="text-text-secondary text-xs">0</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(0, 240, 255, 0.3)' }} />
          <span className="text-text-secondary text-xs">+1</span>
        </div>
        <div className="flex items-center gap-1.5 ml-4">
          <div className="w-3 h-3 rounded-sm ring-1 ring-neon-amber/60" />
          <span className="text-text-secondary text-xs">{lang === 'it' ? 'Anomalia' : 'Anomaly'}</span>
        </div>
      </div>

      {tooltip.value !== null && (
        <CorrelationTooltip
          value={tooltip.value}
          assetA={tooltip.assetA}
          assetB={tooltip.assetB}
          timeframe={timeframe}
          position={tooltip.position}
        />
      )}
    </motion.div>
  )
}
