import PageTransition from '../components/layout/PageTransition'
import NarrativeSection from '../components/narrative/NarrativeSection'
import WhaleSection from '../components/whale/WhaleSection'
import SentimentSection from '../components/sentiment/SentimentSection'
import CorrelationSection from '../components/correlation/CorrelationSection'

export default function IntelligencePage() {
  return (
    <PageTransition>
      <NarrativeSection />
      <WhaleSection />
      <SentimentSection />
      <CorrelationSection />
    </PageTransition>
  )
}
