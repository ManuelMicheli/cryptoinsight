import PageTransition from '../components/layout/PageTransition'
import UnlockSection from '../components/unlock/UnlockSection'
import HealthSection from '../components/health/HealthSection'
import PortfolioSection from '../components/portfolio/PortfolioSection'
import ScenarioSection from '../components/scenario/ScenarioSection'

export default function StrumentiPage() {
  return (
    <PageTransition>
      <UnlockSection />
      <HealthSection />
      <PortfolioSection />
      <ScenarioSection />
    </PageTransition>
  )
}
