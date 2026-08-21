import PageCTA from '@/components/ui/PageCTA'

export default function NetworkCTA({ onBookDemo }) {
  return (
    <PageCTA
      eyebrow="Get Access"
      headline={"Access Nigeria's most connected\ncold-chain network."}
      body="Whether you need reefer capacity, cold storage or nationwide route coverage — book a demo to see how Dara's network can serve your business."
      onBookDemo={onBookDemo}
    />
  )
}
