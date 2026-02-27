const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
const labelClass = "block text-sm font-medium text-gray-700 mb-1"
const checkboxWrap = "flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200"

export default function TrackingSafetyStep({ formData, handleChange }) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tracking & Safety Equipment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Tracker SIM Number</label>
                    <input type="text" name="trackerSimNumber" value={formData.trackerSimNumber} onChange={handleChange} placeholder="e.g., 08034567891" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Telematics Provider</label>
                    <input type="text" name="telematicsProvider" value={formData.telematicsProvider} onChange={handleChange} placeholder="e.g., FleetTrack Nigeria" className={inputClass} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
                <label className={checkboxWrap}>
                    <input type="checkbox" name="gpsTrackingInstalled" checked={formData.gpsTrackingInstalled} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">GPS Tracking Installed</span>
                </label>
                <label className={checkboxWrap}>
                    <input type="checkbox" name="realTimeTrackingEnabled" checked={formData.realTimeTrackingEnabled} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Real-Time Tracking</span>
                </label>
                <label className={checkboxWrap}>
                    <input type="checkbox" name="fireExtinguisherAvailable" checked={formData.fireExtinguisherAvailable} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Fire Extinguisher</span>
                </label>
                <label className={checkboxWrap}>
                    <input type="checkbox" name="reflectiveSafetyGear" checked={formData.reflectiveSafetyGear} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Reflective Safety Gear</span>
                </label>
                <label className={checkboxWrap}>
                    <input type="checkbox" name="emergencyKit" checked={formData.emergencyKit} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Emergency Kit</span>
                </label>
                <label className={checkboxWrap}>
                    <input type="checkbox" name="spareTire" checked={formData.spareTire} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Spare Tire</span>
                </label>
            </div>
        </div>
    )
}
