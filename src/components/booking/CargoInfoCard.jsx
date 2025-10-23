import { Package } from 'lucide-react';

const CargoInfoCard = ({ booking }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h4 className="ml-3 font-bold text-gray-900 text-base sm:text-lg">Cargo Details</h4>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 text-sm sm:text-base">Type:</span>
          <span className="font-semibold text-gray-900 text-sm sm:text-base">{booking.goodsType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 text-sm sm:text-base">Weight:</span>
          <span className="font-semibold text-gray-900 text-sm sm:text-base">{booking.cargoWeightKg} kg</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 text-sm sm:text-base">Quantity:</span>
          <span className="font-semibold text-gray-900 text-sm sm:text-base">{booking.quantity}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {booking.isFragile && (
            <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full border border-orange-200">
              ⚠️ Fragile
            </span>
          )}
          {booking.isPerishable && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full border border-blue-200">
              ❄️ Perishable
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CargoInfoCard;