import { User } from 'lucide-react';

const CustomerInfoCard = ({ booking }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h4 className="ml-3 font-bold text-gray-900 text-base sm:text-lg">Customer</h4>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-gray-600 text-xs sm:text-sm">Name</p>
          <p className="font-semibold text-gray-900 text-sm sm:text-base break-words">{booking.fullNameOrBusiness}</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs sm:text-sm">Type</p>
          <p className="font-semibold text-gray-900 text-sm sm:text-base capitalize">{booking.customerType}</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs sm:text-sm">Contact</p>
          <p className="font-medium text-gray-900 text-xs sm:text-sm break-all">{booking.contactPhone}</p>
          <p className="font-medium text-gray-900 text-xs sm:text-sm break-all">{booking.email}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;