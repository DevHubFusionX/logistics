const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
const labelClass = "block text-sm font-medium text-gray-700 mb-1"

export default function VehicleInfoStep({ formData, handleChange, drivers, availableDrivers }) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Vehicle Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Assign Driver</label>
                    <select name="driverId" value={formData.driverId} onChange={handleChange} className={inputClass}>
                        <option value="">Select a driver (optional)...</option>
                        {availableDrivers.map(d => (
                            <option key={d.id} value={d.id}>{d.name} ({d.phone})</option>
                        ))}
                        {availableDrivers.length === 0 && (
                            <option value="" disabled>No available drivers</option>
                        )}
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Vehicle Type</label>
                    <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className={inputClass} required>
                        <option value="">Select...</option>
                        <option value="Dry Truck">Dry Truck</option>
                        <option value="Reefer">Reefer</option>
                        <option value="Cold Truck">Cold Truck</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Plate Number *</label>
                    <input type="text" name="plateNumber" value={formData.plateNumber} onChange={handleChange} placeholder="e.g., RSH-482XZ" className={inputClass} required />
                </div>
                <div>
                    <label className={labelClass}>Chassis Number *</label>
                    <input type="text" name="chassisNumber" value={formData.chassisNumber} onChange={handleChange} placeholder="e.g., JH4KA8270MC012345" className={inputClass} required />
                </div>
                <div>
                    <label className={labelClass}>Engine Number</label>
                    <input type="text" name="engineNumber" value={formData.engineNumber} onChange={handleChange} placeholder="e.g., ENG-TRK-998877" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Make *</label>
                    <input type="text" name="make" value={formData.make} onChange={handleChange} placeholder="e.g., Volvo" className={inputClass} required />
                </div>
                <div>
                    <label className={labelClass}>Model *</label>
                    <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="e.g., FH16" className={inputClass} required />
                </div>
                <div>
                    <label className={labelClass}>Year of Manufacture</label>
                    <input type="number" name="yearOfManufacture" value={formData.yearOfManufacture} onChange={handleChange} min="1990" max="2030" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Truck Capacity</label>
                    <input type="text" name="truckCapacity" value={formData.truckCapacity} onChange={handleChange} placeholder="e.g., 25 Tons" className={inputClass} />
                </div>
            </div>
        </div>
    )
}
