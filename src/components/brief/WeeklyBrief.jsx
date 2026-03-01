import { useState } from 'react'
import { motion } from 'motion/react'
import { staggerContainer, fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { weeklyBriefs } from '../../data/briefData'
import BriefHeader from './BriefHeader'
import BriefExecutiveSummary from './BriefExecutiveSummary'
import BriefNarrative from './BriefNarrative'
import BriefMetricsTable from './BriefMetricsTable'
import BriefArchive from './BriefArchive'

// TODO: AI-generated content integration

export default function WeeklyBrief() {
  const { lang } = useLanguage()
  const [selectedWeek, setSelectedWeek] = useState(weeklyBriefs[0].weekNumber)

  const currentBrief = weeklyBriefs.find(b => b.weekNumber === selectedWeek) || weeklyBriefs[0]

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Archive navigation */}
      <BriefArchive
        briefs={weeklyBriefs}
        selectedWeek={selectedWeek}
        onSelectWeek={setSelectedWeek}
      />

      {/* Main brief panel */}
      <motion.div
        key={currentBrief.weekNumber}
        className="panel panel-purple p-8 md:p-12 space-y-10"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <BriefHeader
          weekNumber={currentBrief.weekNumber}
          dateRange={currentBrief.dateRange}
          isLatest={currentBrief.isLatest}
        />

        <BriefExecutiveSummary
          items={currentBrief.executiveSummary}
          lang={lang}
        />

        <BriefNarrative
          narrative={currentBrief.narrative}
          pullQuote={currentBrief.pullQuote}
          lang={lang}
        />

        <BriefMetricsTable
          metrics={currentBrief.metrics}
          lang={lang}
        />
      </motion.div>
    </motion.div>
  )
}
