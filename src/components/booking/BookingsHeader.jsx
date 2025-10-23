import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingsHeader = ({ totalCount }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 sm:mb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-sky-600 hover:text-sky-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>
        <button
          onClick={() => navigate('/booking/request')}
          className="flex items-center justify-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 shadow-md transition-all hover:shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Booking
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Track and manage your logistics bookings {totalCount > 0 && `(${totalCount})`}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingsHeader;