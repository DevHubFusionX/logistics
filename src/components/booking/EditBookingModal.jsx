import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bookingService from '../../services/bookingService';

const EditBookingModal = ({ booking, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    pickupLocation: booking?.pickupLocation || { address: '', city: '', state: '' },
    dropoffLocation: booking?.dropoffLocation || { address: '', city: '', state: '' },
    goodsType: booking?.goodsType || '',
    cargoWeightKg: booking?.cargoWeightKg || '',
    quantity: booking?.quantity || '',
    isFragile: booking?.isFragile || false,
    isPerishable: booking?.isPerishable || false,
    tempControlCelsius: booking?.tempControlCelsius || 0,
    vehicleType: booking?.vehicleType || '',
    estimatedPickupDate: booking?.estimatedPickupDate ? new Date(booking.estimatedPickupDate).toISOString().slice(0, 16) : '',
    estimatedDeliveryDate: booking?.estimatedDeliveryDate ? new Date(booking.estimatedDeliveryDate).toISOString().slice(0, 16) : '',
    status: booking?.status || '',
    notes: booking?.notes || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updateData = {
        ...formData,
        cargoWeightKg: Number(formData.cargoWeightKg),
        quantity: Number(formData.quantity),
        tempControlCelsius: Number(formData.tempControlCelsius),
        estimatedPickupDate: new Date(formData.estimatedPickupDate).toISOString(),
        estimatedDeliveryDate: new Date(formData.estimatedDeliveryDate).toISOString()
      };

      const response = await bookingService.updateBooking(booking._id, updateData);
      
      if (response.error) {
        setError(response.message || 'Failed to update booking');
        return;
      }

      onUpdate(response.data);
      onClose();
    } catch (err) {
      setError('Failed to update booking');
      console.error('Error updating booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
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
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Booking</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Pickup Location</h3>
                    <input
                      type="text"
                      placeholder="Address"
                      value={formData.pickupLocation.address}
                      onChange={(e) => handleChange('pickupLocation.address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.pickupLocation.city}
                        onChange={(e) => handleChange('pickupLocation.city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={formData.pickupLocation.state}
                        onChange={(e) => handleChange('pickupLocation.state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Dropoff Location</h3>
                    <input
                      type="text"
                      placeholder="Address"
                      value={formData.dropoffLocation.address}
                      onChange={(e) => handleChange('dropoffLocation.address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.dropoffLocation.city}
                        onChange={(e) => handleChange('dropoffLocation.city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={formData.dropoffLocation.state}
                        onChange={(e) => handleChange('dropoffLocation.state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Goods Type"
                    value={formData.goodsType}
                    onChange={(e) => handleChange('goodsType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={formData.cargoWeightKg}
                    onChange={(e) => handleChange('cargoWeightKg', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Vehicle Type"
                    value={formData.vehicleType}
                    onChange={(e) => handleChange('vehicleType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in-transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                    <input
                      type="datetime-local"
                      value={formData.estimatedPickupDate}
                      onChange={(e) => handleChange('estimatedPickupDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                    <input
                      type="datetime-local"
                      value={formData.estimatedDeliveryDate}
                      onChange={(e) => handleChange('estimatedDeliveryDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isFragile}
                      onChange={(e) => handleChange('isFragile', e.target.checked)}
                      className="mr-2"
                    />
                    Fragile
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isPerishable}
                      onChange={(e) => handleChange('isPerishable', e.target.checked)}
                      className="mr-2"
                    />
                    Perishable
                  </label>
                  {formData.isPerishable && (
                    <input
                      type="number"
                      placeholder="Temperature (°C)"
                      value={formData.tempControlCelsius}
                      onChange={(e) => handleChange('tempControlCelsius', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  )}
                </div>

                <textarea
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Booking'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditBookingModal;