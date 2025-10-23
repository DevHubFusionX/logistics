import { useState, useEffect } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader'
import PerformanceStats from '../components/dashboard/PerformanceStats'
import ActiveShipments from '../components/dashboard/ActiveShipments'
import OperationsPanel from '../components/dashboard/OperationsPanel'
import bookingService from '../services/bookingService';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setBookings([]);
      try {
        const response = await bookingService.getBookings(1, 100);
        if (!response.error) {
          const allBookings = response.data?.records || [];
          const userBookings = allBookings.filter(booking => booking.createdBy === user?._id);
          setBookings(userBookings);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <PerformanceStats bookings={bookings} loading={loading} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <ActiveShipments bookings={bookings} loading={loading} />
          <OperationsPanel />
        </div>
      </div>
    </div>
  )
}