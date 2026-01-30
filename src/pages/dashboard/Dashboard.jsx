import { useAuth } from '../../hooks/useAuth'
import AdminOverview from './AdminOverview'
import MyBookings from '../user/MyBookings'

export default function Dashboard() {
  const { user } = useAuth()

  if (user?.role === 'Super Admin' || user?.role === 'Dispatcher') {
    return <AdminOverview />
  }

  return <MyBookings />
}