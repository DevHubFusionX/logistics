import { Package, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingsEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Package className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No bookings found</h3>
      <p className="text-sm sm:text-base text-gray-600 mb-6">
        You haven't made any bookings yet or no bookings match your filters.
      </p>
      <button
        onClick={() => navigate('/booking/request')}
        className="inline-flex items-center px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 shadow-md transition-all hover:shadow-lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create Your First Booking
      </button>
    </div>
  );
};

export default BookingsEmptyState;