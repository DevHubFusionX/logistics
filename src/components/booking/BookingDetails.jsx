import { motion } from 'framer-motion';
import StatusBanner from './StatusBanner';
import ShipmentRoute from './ShipmentRoute';
import CargoInfoCard from './CargoInfoCard';
import VehicleInfoCard from './VehicleInfoCard';
import CustomerInfoCard from './CustomerInfoCard';
import NotesSection from './NotesSection';

const BookingDetails = ({ booking }) => {
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

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '⏳';
      case 'confirmed': return '✓';
      case 'in-transit': return '🚚';
      case 'delivered': return '✅';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <StatusBanner booking={booking} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
      
      <ShipmentRoute booking={booking} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <CargoInfoCard booking={booking} />
        <VehicleInfoCard booking={booking} />
        <CustomerInfoCard booking={booking} />
      </motion.div>
      
      <NotesSection notes={booking.notes} />
    </div>
  );
};

export default BookingDetails;