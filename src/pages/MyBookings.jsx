import { useState, useEffect } from 'react';
import BookingCard from '../components/booking/BookingCard';
import BookingFilters from '../components/booking/BookingFilters';
import Pagination from '../components/booking/Pagination';
import BookingsHeader from '../components/booking/BookingsHeader';
import BookingsStats from '../components/booking/BookingsStats';
import BookingsEmptyState from '../components/booking/BookingsEmptyState';
import BookingsLoadingState from '../components/booking/BookingsLoadingState';
import bookingService from '../services/bookingService';
import { useAuth } from '../hooks/useAuth';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    fromDate: '',
    toDate: ''
  });

  const fetchBookings = async (page = 1) => {
    try {
      setLoading(true);
      const response = await bookingService.getBookings(page, 100);
      
      if (response.error) {
        setError(response.message || 'Failed to fetch bookings');
        return;
      }

      const allBookings = response.data?.records || [];
      const userBookings = allBookings.filter(booking => booking.createdBy === user?._id);
      setBookings(userBookings);
      setPagination(response.data?.pagination || {});
      setError(null);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings(currentPage);
    }
  }, [currentPage, user]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredBookings = bookings.filter(booking => {
    if (filters.status && booking.status !== filters.status) return false;
    if (filters.fromDate && new Date(booking.createdAt) < new Date(filters.fromDate)) return false;
    if (filters.toDate && new Date(booking.createdAt) > new Date(filters.toDate)) return false;
    return true;
  });

  const handleClearFilters = () => {
    setFilters({ status: '', fromDate: '', toDate: '' });
  };

  if (loading) {
    return <BookingsLoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingsHeader totalCount={bookings.length} />
        
        {bookings.length > 0 && <BookingsStats bookings={bookings} />}
        
        <BookingFilters 
          filters={filters} 
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
        />

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-start">
            <svg className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-800 text-sm sm:text-base">{error}</p>
          </div>
        )}

        {filteredBookings.length === 0 ? (
          <BookingsEmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredBookings.map((booking, index) => (
                <BookingCard key={booking._id} booking={booking} index={index} />
              ))}
            </div>

            <Pagination
              currentPage={pagination.currentPage || 1}
              totalPages={pagination.totalPages || 1}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;