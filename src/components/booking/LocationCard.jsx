import { User, Phone, Mail, MapPin, Calendar } from 'lucide-react';

const LocationCard = ({ type, person, location, date, label }) => {
  const isPickup = type === 'pickup';
  const bgColor = isPickup ? 'bg-green-50' : 'bg-blue-50';
  const borderColor = isPickup ? 'border-green-200' : 'border-blue-200';
  const circleColor = isPickup ? 'bg-green-500' : 'bg-blue-500';
  const badgeColor = isPickup ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';

  return (
    <div className="relative">
      <div className="flex items-start">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${circleColor} rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-lg z-10 flex-shrink-0`}>
          {isPickup ? 'A' : 'B'}
        </div>
        <div className={`ml-3 sm:ml-4 md:ml-6 flex-1 ${bgColor} border ${borderColor} rounded-lg p-3 sm:p-4`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-3 gap-1 sm:gap-2">
            <h4 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg">{label}</h4>
            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 ${badgeColor} text-xs font-semibold rounded-full w-fit`}>
              {isPickup ? 'Origin' : 'Destination'}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center text-gray-700">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-500 flex-shrink-0" />
                <span className="font-medium text-xs sm:text-sm md:text-base">{person?.name}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{person?.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm break-all">{person?.email}</span>
              </div>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-start text-gray-700">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-xs sm:text-sm md:text-base">{location?.address}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{location?.city}, {location?.state}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600 mt-1 sm:mt-2">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">{new Date(date).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;