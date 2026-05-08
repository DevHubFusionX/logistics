const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
const labelClass = "block text-sm font-medium text-gray-700 mb-1"
const checkboxWrap = "flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200"

export default function CapacityCoolingStep({ formData, handleChange }) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Capacity & Cooling System</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Temperature Range</label>
                    <input type="text" name="temperatureRange" value={formData.temperatureRange} onChange={handleChange} placeholder="e.g., -18°C to +8°C" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Reefer Unit Brand</label>
                    <input type="text" name="reeferUnitBrand" value={formData.reeferUnitBrand} onChange={handleChange} placeholder="e.g., Thermo King" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Reefer Unit Model</label>
                    <input type="text" name="reeferUnitModel" value={formData.reeferUnitModel} onChange={handleChange} placeholder="e.g., TK-SLXi400" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Last Maintenance Date</label>
                    <input type="date" name="lastMaintenanceDate" value={formData.lastMaintenanceDate} onChange={handleChange} className={inputClass} />
                </div>
                <div className="col-span-2">
                    <label className={checkboxWrap}>
                        <input type="checkbox" name="coldChainComplianceStatus" checked={formData.coldChainComplianceStatus} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm text-gray-700">Cold Chain Compliance Certified</span>
                    </label>
                </div>
            </div>
        </div>
    )
}
