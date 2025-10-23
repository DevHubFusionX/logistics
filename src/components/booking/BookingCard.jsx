import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Package, Truck } from 'lucide-react';

const BookingCard = ({ booking, index = 0 }) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-transit': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => navigate(`/bookings/${booking._id}`)}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-lg hover:border-sky-300 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate group-hover:text-sky-600 transition-colors">
            {booking.fullNameOrBusiness}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">ID: {booking._id?.slice(-8)}</p>
        </div>
        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)} ml-2 flex-shrink-0`}>
          {booking.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500">Pickup</p>
            <p className="text-sm text-gray-900 font-medium truncate">
              {booking.pickupLocation?.city}, {booking.pickupLocation?.state}
            </p>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(booking.estimatedPickupDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500">Delivery</p>
            <p className="text-sm text-gray-900 font-medium truncate">
              {booking.dropoffLocation?.city}, {booking.dropoffLocation?.state}
            </p>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(booking.estimatedDeliveryDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <Package className="w-4 h-4 mr-1 text-gray-400" />
          <span className="truncate">{booking.goodsType} • {booking.cargoWeightKg}kg</span>
        </div>
        <div className="flex items-center text-xs sm:text-sm text-gray-600 ml-2">
          <Truck className="w-4 h-4 mr-1 text-gray-400" />
          <span className="truncate">{booking.vehicleType}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;