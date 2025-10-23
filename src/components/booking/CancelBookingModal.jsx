import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bookingService from '../../services/bookingService';

const CancelBookingModal = ({ booking, isOpen, onClose, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCancel = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await bookingService.cancelBooking(booking._id);
      
      if (response.error) {
        setError(response.message || 'Failed to cancel booking');
        return;
      }

      onCancel(response.data);
      onClose();
    } catch (err) {
      setError('Failed to cancel booking');
      console.error('Error canceling booking:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Cancel Booking</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Are you sure you want to cancel this booking? This action cannot be undone.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4 text-left">
                  <p className="text-sm font-medium text-gray-900">{booking?.fullNameOrBusiness}</p>
                  <p className="text-sm text-gray-600">
                    {booking?.pickupLocation?.city} → {booking?.dropoffLocation?.city}
                  </p>
                  <p className="text-xs text-gray-500">ID: {booking?._id?.slice(-8)}</p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Canceling...' : 'Cancel Booking'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CancelBookingModal;