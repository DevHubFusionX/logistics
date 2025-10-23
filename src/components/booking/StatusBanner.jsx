import { motion } from 'framer-motion';

const StatusBanner = ({ booking, getStatusColor, getStatusIcon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border-2 p-4 sm:p-6 ${getStatusColor(booking.status)}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="text-3xl sm:text-4xl">{getStatusIcon(booking.status)}</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold capitalize">{booking.status}</h2>
            <p className="text-xs sm:text-sm opacity-80">ID: {booking._id?.slice(-8)}</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs sm:text-sm opacity-80">Created</p>
          <p className="font-semibold text-sm sm:text-base">{new Date(booking.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatusBanner;