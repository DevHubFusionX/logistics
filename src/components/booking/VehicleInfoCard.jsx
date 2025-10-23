import { Truck, Thermometer } from 'lucide-react';

const VehicleInfoCard = ({ booking }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h4 className="ml-3 font-bold text-gray-900 text-base sm:text-lg">Vehicle Info</h4>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 text-sm sm:text-base">Type:</span>
          <span className="font-semibold text-gray-900 text-sm sm:text-base">{booking.vehicleType}</span>
        </div>
        {booking.tempControlCelsius !== 0 && (
          <div className="flex items-center justify-between mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
              <span className="text-gray-700 font-medium text-sm sm:text-base">Temperature</span>
            </div>
            <span className="font-bold text-blue-700 text-sm sm:text-base">{booking.tempControlCelsius}°C</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleInfoCard;