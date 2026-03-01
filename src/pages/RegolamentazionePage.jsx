import PageTransition from '../components/layout/PageTransition'
import RegulationSection from '../components/regulation/RegulationSection'
import BriefSection from '../components/brief/BriefSection'

export default function RegolamentazionePage() {
  return (
    <PageTransition>
      <RegulationSection />
      <BriefSection />
    </PageTransition>
  )
}
