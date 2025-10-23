import { motion } from 'framer-motion';

const NotesSection = ({ notes }) => {
  if (!notes) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 sm:p-6"
    >
      <div className="flex items-start">
        <span className="text-xl sm:text-2xl mr-3 flex-shrink-0">📝</span>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">Special Instructions</h4>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base break-words">{notes}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default NotesSection;