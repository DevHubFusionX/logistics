export default function DriverCompliance({ driver }) {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Compliance Notes</h3>
        <p className="text-sm text-gray-700">{driver.complianceNotes}</p>
      </div>
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">License Status</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">License Number:</span>
            <span className="font-medium">{driver.licenseNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Expiry Date:</span>
            <span className="font-medium">{driver.licenseExpiry}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status:</span>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Valid</span>
          </div>
        </div>
      </div>
    </div>
  )
}
