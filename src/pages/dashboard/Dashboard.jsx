import { useAuth } from '../../hooks/useAuth'
import AdminOverview from './AdminOverview'
import MyBookings from '../user/MyBookings'

export default function Dashboard() {
  const { isAdmin } = useAuth()

  if (isAdmin) {
    return <AdminOverview />
  }

  return <MyBookings />
}