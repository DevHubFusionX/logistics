import PageCTA from '@/components/ui/PageCTA'

export default function TechnologyCTA({ onBookDemo }) {
  return (
    <PageCTA
      eyebrow="See It In Action"
      headline={'See how DaraOS powers\nyour cold chain.'}
      body="From IoT telemetry to fleet orchestration and delivery analytics — book a live walkthrough with our team."
      onBookDemo={onBookDemo}
    />
  )
}
