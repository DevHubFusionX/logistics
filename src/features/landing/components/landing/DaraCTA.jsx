import { useState } from 'react'
import { ScheduleDemoModal } from './demo'
import PageCTA from '@/components/ui/PageCTA'

export default function DaraCTA() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <>
      <PageCTA
        eyebrow="Get Started"
        headline={'The digital infrastructure\nfor Africa\'s cold chain.'}
        body="Join businesses across Nigeria who trust Dara to move their most temperature-sensitive cargo — safely, visibly, and on time."
        onBookDemo={() => setIsDemoOpen(true)}
      />
      <ScheduleDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  )
}
