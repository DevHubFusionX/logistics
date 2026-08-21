import PageCTA from '@/components/ui/PageCTA'

export default function SolutionsCTA({ onBookDemo }) {
  return (
    <PageCTA
      eyebrow="Work With Us"
      headline={'Ready to safeguard\nyour cold chain?'}
      body="Scale your distribution network, monitor temperature compliance, and reduce product spoilage — all in one platform."
      onBookDemo={onBookDemo}
    />
  )
}
