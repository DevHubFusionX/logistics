import { User, Shield, Briefcase, Landmark, Calendar, MapPin, Phone, Mail, Globe, Heart, Truck } from 'lucide-react'

export default function DriverInfo({ driver, assignedTruck }) {
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === 'N/A') return 'N/A'
    try {
      return new Date(dateStr).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch { return dateStr }
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className="p-2 bg-gray-200 rounded-lg">
            <User className="w-5 h-5 text-gray-700" />
          </div>
          Personal Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 flex items-center gap-1"><Mail className="w-3 h-3" /> Email:</span>
            <p className="font-medium mt-0.5">{driver.email || 'N/A'}</p>
          </div>
          <div>
            <span className="text-gray-500 flex items-center gap-1"><Phone className="w-3 h-3" /> Phone:</span>
            <p className="font-medium mt-0.5">{driver.phone || driver.phoneNumber || 'N/A'}</p>
          </div>
          <div>
            <span className="text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> Date of Birth:</span>
            <p className="font-medium mt-0.5">{formatDate(driver.dateOfBirth)}</p>
          </div>
          <div>
            <span className="text-gray-500 flex items-center gap-1"><Globe className="w-3 h-3" /> Nationality:</span>
            <p className="font-medium mt-0.5 capitalize">{driver.nationality || 'N/A'}</p>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> Address:</span>
            <p className="font-medium mt-0.5">{driver.address || driver.residentialAddress || 'N/A'}</p>
          </div>
          <div>
            <span className="text-gray-500 flex items-center gap-1"><Heart className="w-3 h-3" /> Next of Kin:</span>
            <p className="font-medium mt-0.5">{driver.emergencyContact || driver.nextOfKin || 'N/A'}</p>
          </div>
          <div>
            <span className="text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> Joined:</span>
            <p className="font-medium mt-0.5">{driver.joinDate || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Guarantor Information */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          Guarantor Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Name:</span>
            <p className="font-medium mt-0.5">{driver.guarantorName || 'N/A'}</p>
          </div>
          <div>
            <span className="text-gray-500">Phone:</span>
            <p className="font-medium mt-0.5">{driver.guarantorPhoneNumber || 'N/A'}</p>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Address:</span>
            <p className="font-medium mt-0.5">{driver.guarantorAddress || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Employment Information */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <Briefcase className="w-5 h-5 text-green-600" />
          </div>
          Employment Details
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Years of Experience:</span>
            <p className="font-medium text-lg mt-0.5">{driver.yearsOfDrivingExperience || 'N/A'}</p>
          </div>
          <div>
            <span className="text-gray-500">Previous Company:</span>
            <p className="font-medium mt-0.5 capitalize">{driver.previousCompany || 'N/A'}</p>
          </div>
          <div>
            <span className="text-gray-500">Status:</span>
            <p className="mt-0.5">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${driver.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {driver.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </p>
          </div>
          <div>
            <span className="text-gray-500">Verified:</span>
            <p className="mt-0.5">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${driver.isVerified ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {driver.isVerified ? 'Verified' : 'Pending'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 border border-purple-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Landmark className="w-5 h-5 text-purple-600" />
          </div>
          Bank Details
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Bank Name:</span>
            <p className="font-medium mt-0.5">{driver.bankName || 'N/A'}</p>
          </div>
          <div>
            <span className="text-gray-500">Account Number:</span>
            <p className="font-medium mt-0.5">{driver.accountNumber || 'N/A'}</p>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Account Name:</span>
            <p className="font-medium mt-0.5">{driver.accountName || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Assigned Vehicle */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
          Assigned Vehicle
        </h3>
        {assignedTruck ? (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Plate Number:</span>
              <p className="font-medium mt-0.5">{assignedTruck.plateNumber}</p>
            </div>
            <div>
              <span className="text-gray-500">Vehicle Type:</span>
              <p className="font-medium mt-0.5">{assignedTruck.vehicleType}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">Make & Model:</span>
              <p className="font-medium mt-0.5">{assignedTruck.make} {assignedTruck.model}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 bg-white/50 rounded-lg border border-dashed border-blue-200">
            <p className="text-sm text-gray-500 italic">No vehicle assigned yet</p>
          </div>
        )}
      </div>

      {/* Assigned Vehicle */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
          Assigned Vehicle
        </h3>
        {assignedTruck ? (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Plate Number:</span>
              <p className="font-medium mt-0.5">{assignedTruck.plateNumber}</p>
            </div>
            <div>
              <span className="text-gray-500">Vehicle Type:</span>
              <p className="font-medium mt-0.5">{assignedTruck.vehicleType}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">Make & Model:</span>
              <p className="font-medium mt-0.5">{assignedTruck.make} {assignedTruck.model}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 bg-white/50 rounded-lg border border-dashed border-blue-200">
            <p className="text-sm text-gray-500 italic">No vehicle assigned yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
