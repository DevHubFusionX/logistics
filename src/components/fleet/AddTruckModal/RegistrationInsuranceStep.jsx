const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
const labelClass = "block text-sm font-medium text-gray-700 mb-1"

export default function RegistrationInsuranceStep({ formData, handleChange, handleFileChange }) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Registration & Insurance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Road Worthiness Certificate</label>
                    <input type="text" name="roadWorthinessCertificate" value={formData.roadWorthinessCertificate} onChange={handleChange} placeholder="e.g., RWC-2025-334455" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Insurance Type</label>
                    <select name="insuranceType" value={formData.insuranceType} onChange={handleChange} className={inputClass}>
                        <option value="">Select...</option>
                        <option value="Comprehensive">Comprehensive</option>
                        <option value="GIT">GIT</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Hackney Permit</label>
                    <input type="text" name="hackneyPermit" value={formData.hackneyPermit} onChange={handleChange} placeholder="e.g., HACK-90876" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Vehicle Registration (file)</label>
                    <input type="file" name="vehicleRegistration" accept="image/*,.pdf" onChange={handleFileChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Proof of Ownership (file)</label>
                    <input type="file" name="proofOfOwnership" accept="image/*,.pdf" onChange={handleFileChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Insurance Document (file)</label>
                    <input type="file" name="insuranceDocument" accept="image/*,.pdf" onChange={handleFileChange} className={inputClass} />
                </div>
                <div className="col-span-2">
                    <label className={labelClass}>Temperature Calibration Certificate (file)</label>
                    <input type="file" name="temperatureCalibrationCertificate" accept="image/*,.pdf,.docx" onChange={handleFileChange} className={inputClass} />
                </div>
            </div>
        </div>
    )
}
