import { useAuth } from '@/features/auth'
import AdminOverview from './AdminOverview'
import MyBookings from '@/features/user/pages/bookings/MyBookings/index'

export default function Dashboard() {
  const { isAdmin } = useAuth()

  if (isAdmin) {
    return <AdminOverview />
  }

  return <MyBookings />
}