import PlaceholderPage from '../components/dashboard/components/PlaceholderPage'
import { Users } from 'lucide-react'

export default function Customers() {
  return (
    <PlaceholderPage
      title="Customers"
      subtitle="Manage customer relationships and accounts"
      icon={Users}
      description="Customer relationship management system coming soon..."
      buttonText="Add Customer"
      buttonColor="blue"
    />
  )
}