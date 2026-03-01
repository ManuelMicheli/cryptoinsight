import { useMemo, useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { regulationCountries, regulationById } from '../../data/regulationData'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import InteractiveGlobe from '../ui/interactive-globe'

/* ── lat/lng for every regulation country ── */
const countryCoords = {
  us: { lat: 39.83, lng: -98.58 },
  ca: { lat: 56.13, lng: -106.35 },
  br: { lat: -14.24, lng: -51.93 },
  ar: { lat: -34.60, lng: -58.38 },
  sv: { lat: 13.79, lng: -88.90 },
  gb: { lat: 51.51, lng: -0.13 },
  fr: { lat: 46.60, lng: 2.22 },
  de: { lat: 51.17, lng: 10.45 },
  it: { lat: 41.87, lng: 12.57 },
  es: { lat: 40.46, lng: -3.75 },
  nl: { lat: 52.13, lng: 5.29 },
  ch: { lat: 46.82, lng: 8.23 },
  pt: { lat: 39.40, lng: -8.22 },
  mt: { lat: 35.94, lng: 14.38 },
  ee: { lat: 58.60, lng: 25.01 },
  tr: { lat: 38.96, lng: 35.24 },
  ru: { lat: 55.76, lng: 37.62 },
  ae: { lat: 23.42, lng: 53.85 },
  in: { lat: 20.59, lng: 78.96 },
  cn: { lat: 35.86, lng: 104.20 },
  jp: { lat: 35.68, lng: 139.69 },
  kr: { lat: 37.57, lng: 126.98 },
  sg: { lat: 1.35, lng: 103.82 },
  th: { lat: 15.87, lng: 100.99 },
  hk: { lat: 22.32, lng: 114.17 },
  au: { lat: -25.27, lng: 133.78 },
  ng: { lat: 9.08, lng: 8.68 },
}

/* Status → marker color (rgba) */
const statusColorMap = {
  favorable:   'rgba(0, 255, 136, 1)',    // neon-green
  neutral:     'rgba(245, 158, 11, 1)',    // neon-amber
  restrictive: 'rgba(251, 146, 60, 1)',    // orange-400
  ban:         'rgba(239, 68, 68, 1)',     // neon-red
}

/* Status → arc color */
const statusArcColor = {
  favorable:   'rgba(0, 255, 136, 0.2)',
  neutral:     'rgba(245, 158, 11, 0.2)',
  restrictive: 'rgba(251, 146, 60, 0.15)',
  ban:         'rgba(239, 68, 68, 0.15)',
}

/* Key regulatory corridors — connections between hubs */
const regulatoryConnections = [
  // EU internal
  { from: [51.17, 10.45], to: [46.60, 2.22] },     // DE → FR
  { from: [46.60, 2.22], to: [41.87, 12.57] },      // FR → IT
  { from: [51.17, 10.45], to: [52.13, 5.29] },      // DE → NL
  { from: [51.51, -0.13], to: [51.17, 10.45] },     // GB → DE
  { from: [46.82, 8.23], to: [51.17, 10.45] },      // CH → DE
  { from: [51.17, 10.45], to: [58.60, 25.01] },     // DE → EE
  // Transatlantic
  { from: [39.83, -98.58], to: [51.51, -0.13] },    // US → GB
  { from: [39.83, -98.58], to: [56.13, -106.35] },  // US → CA
  // Americas
  { from: [39.83, -98.58], to: [-14.24, -51.93] },  // US → BR
  { from: [-14.24, -51.93], to: [-34.60, -58.38] }, // BR → AR
  { from: [39.83, -98.58], to: [13.79, -88.90] },   // US → SV
  // Asia-Pacific
  { from: [35.68, 139.69], to: [37.57, 126.98] },   // JP → KR
  { from: [1.35, 103.82], to: [22.32, 114.17] },    // SG → HK
  { from: [35.68, 139.69], to: [1.35, 103.82] },    // JP → SG
  { from: [1.35, 103.82], to: [-25.27, 133.78] },   // SG → AU
  { from: [22.32, 114.17], to: [35.86, 104.20] },   // HK → CN
  // Cross-continental
  { from: [51.51, -0.13], to: [23.42, 53.85] },     // GB → AE
  { from: [23.42, 53.85], to: [20.59, 78.96] },     // AE → IN
  { from: [39.83, -98.58], to: [35.68, 139.69] },   // US → JP
  { from: [51.17, 10.45], to: [38.96, 35.24] },     // DE → TR
  { from: [9.08, 8.68], to: [51.51, -0.13] },       // NG → GB
]

export default function RegulationMap({ onSelectCountry, selectedCountryId, filteredIds }) {
  const { lang } = useLanguage()
  const containerRef = useRef(null)
  const [globeSize, setGlobeSize] = useState(420)

  const visibleSet = useMemo(
    () => (filteredIds ? new Set(filteredIds) : null),
    [filteredIds],
  )

  /* Responsive sizing */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      setGlobeSize(Math.min(w - 32, 480))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* Build marker array from regulation data */
  const markers = useMemo(() => {
    return regulationCountries
      .filter(c => countryCoords[c.id])
      .map(c => {
        const coord = countryCoords[c.id]
        const isVisible = !visibleSet || visibleSet.has(c.id)
        return {
          id: c.id,
          lat: coord.lat,
          lng: coord.lng,
          label: l(c.name, lang),
          color: isVisible
            ? statusColorMap[c.status] || 'rgba(245, 158, 11, 1)'
            : 'rgba(255, 255, 255, 0.12)',
        }
      })
  }, [lang, visibleSet])

  return (
    <motion.div
      ref={containerRef}
      className="panel p-4 md:p-6 overflow-hidden"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Globe */}
      <div className="flex items-center justify-center">
        <InteractiveGlobe
          size={globeSize}
          markers={markers}
          connections={regulatoryConnections}
          onMarkerClick={onSelectCountry}
          selectedMarkerId={selectedCountryId}
          dotColor="rgba(245, 158, 11, ALPHA)"
          arcColor="rgba(245, 158, 11, 0.18)"
          autoRotateSpeed={0.0015}
          initialRotation={[0.4, 0.2]}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-text-secondary">
        {Object.entries(statusColorMap).map(([status, color]) => (
          <span key={status} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: color, opacity: 0.7 }}
            />
            <span className="capitalize">{status}</span>
          </span>
        ))}
      </div>

      {/* Drag hint */}
      <p className="text-center text-[10px] text-text-secondary/40 mt-2">
        {lang === 'it' ? 'Trascina per ruotare · Clicca un marker per i dettagli' : 'Drag to rotate · Click a marker for details'}
      </p>
    </motion.div>
  )
}
