import { useAuth } from '../../hooks/useAuth'
import AdminOverview from './AdminOverview'
import MyBookings from '../user/MyBookings'

export default function Dashboard() {
  const { user } = useAuth()

  const isAdmin = ['Super Admin', 'Dispatcher', 'admin', 'Admin', 'SUPER_ADMIN'].includes(user?.role)

  if (isAdmin) {
    return <AdminOverview />
  }

  return <MyBookings />
}