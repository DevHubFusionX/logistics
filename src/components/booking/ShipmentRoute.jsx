import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import LocationCard from './LocationCard';

const ShipmentRoute = ({ booking }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 sm:p-4 md:p-6"
    >
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 flex items-center">
        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 text-sky-600" />
        Shipment Route
      </h3>
      <div className="relative">
        <div className="hidden sm:block absolute left-5 md:left-6 top-8 sm:top-12 bottom-8 sm:bottom-12 w-0.5 bg-gradient-to-b from-green-500 to-blue-500"></div>
        
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <LocationCard
            type="pickup"
            person={booking.pickupPerson}
            location={booking.pickupLocation}
            date={booking.estimatedPickupDate}
            label="Pickup Location"
          />
          
          <LocationCard
            type="delivery"
            person={booking.receiverPerson}
            location={booking.dropoffLocation}
            date={booking.estimatedDeliveryDate}
            label="Delivery Location"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ShipmentRoute;