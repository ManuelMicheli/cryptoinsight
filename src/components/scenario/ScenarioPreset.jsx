import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import { scenarioPresets } from '../../data/scenarioData'
import TechTerm from '../ui/TechTerm'

const presetGlossaryKey = {
  bullRun: 'bull_run',
  bearMarket: 'bear_market',
  ethFlippening: 'eth_flippening',
  altSeason: 'alt_season',
}

export default function ScenarioPreset({ onApply }) {
  const { lang } = useLanguage()

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {Object.entries(scenarioPresets).map(([key, preset]) => (
        <button
          key={key}
          onClick={() => onApply(preset)}
          className="px-4 py-2 typo-ui-sm font-medium rounded-full border border-white/10 text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all"
        >
          <TechTerm term={presetGlossaryKey[key]}>{l(preset.label, lang)}</TechTerm>
        </button>
      ))}
    </div>
  )
}
