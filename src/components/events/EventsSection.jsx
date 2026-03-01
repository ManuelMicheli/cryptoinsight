import { useState, useMemo } from 'react'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import EventTimeline from './EventTimeline'
import { events } from '../../data/events'
import { unlockEvents } from '../../data/unlockData'
import { cryptoMeta } from '../../data/cryptoMeta'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

const tabs = [
  { id: 'all', labelKey: 'eventsTabAll' },
  { id: 'events', labelKey: 'eventsTabEvents' },
  { id: 'unlock', labelKey: 'eventsTabUnlock' },
  { id: 'regulation', labelKey: 'eventsTabRegulation' },
]

export default function EventsSection() {
  const { lang } = useLanguage()
  const [activeTab, setActiveTab] = useState('all')

  // Build unified timeline
  const unifiedItems = useMemo(() => {
    const items = []

    // Regular events
    events.forEach(ev => {
      const isRegulation = typeof ev.type === 'string'
        ? ev.type.toLowerCase() === 'regulation' || ev.type.toLowerCase() === 'regolamentazione'
        : (ev.type?.en?.toLowerCase() === 'regulation')

      items.push({
        ...ev,
        source: isRegulation ? 'regulation' : 'event',
        sortDate: new Date(ev.date),
      })
    })

    // Unlock events
    unlockEvents.forEach(unlock => {
      const meta = cryptoMeta[unlock.coinId]
      items.push({
        id: `unlock-${unlock.id}`,
        date: unlock.date,
        title: {
          it: `Token Unlock: ${meta?.name || unlock.coinId}`,
          en: `Token Unlock: ${meta?.name || unlock.coinId}`,
        },
        crypto: meta?.ticker || unlock.coinId,
        type: { it: 'Unlock', en: 'Unlock' },
        impact: unlock.percentSupply > 5 ? 'bearish' : unlock.percentSupply > 2 ? 'neutral' : 'bullish',
        description: {
          it: `${unlock.amount.toLocaleString()} token (${unlock.percentSupply}% supply) in arrivo il ${unlock.date}`,
          en: `${unlock.amount.toLocaleString()} tokens (${unlock.percentSupply}% supply) coming on ${unlock.date}`,
        },
        source: 'unlock',
        unlockData: unlock,
        sortDate: new Date(unlock.date),
      })
    })

    // Sort by date ascending
    items.sort((a, b) => a.sortDate - b.sortDate)
    return items
  }, [])

  // Filter by active tab
  const filtered = useMemo(() => {
    if (activeTab === 'all') return unifiedItems
    if (activeTab === 'events') return unifiedItems.filter(i => i.source === 'event')
    if (activeTab === 'unlock') return unifiedItems.filter(i => i.source === 'unlock')
    if (activeTab === 'regulation') return unifiedItems.filter(i => i.source === 'regulation')
    return unifiedItems
  }, [activeTab, unifiedItems])

  return (
    <SectionWrapper id="events" className="bg-bg-secondary/30">
      <SectionHeading
        title={t('eventsTitle', lang)}
        subtitle={t('eventsSubtitle', lang)}
        glowColor="amber"
      />

      {/* Category tabs */}
      <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full typo-ui font-medium transition-all ${
                isActive
                  ? 'bg-neon-amber/20 text-neon-amber border border-neon-amber/30'
                  : 'text-text-secondary border border-white/10 hover:border-white/20 hover:text-text-primary'
              }`}
              style={isActive ? { boxShadow: '0 0 10px rgba(245,158,11,0.2)' } : undefined}
            >
              {t(tab.labelKey, lang)}
            </button>
          )
        })}
      </div>

      <div className="w-full">
        <EventTimeline events={filtered} />
      </div>
    </SectionWrapper>
  )
}
