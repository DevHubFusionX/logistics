const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
const labelClass = "block text-sm font-medium text-gray-700 mb-1"

export default function PhotosStep({ files, handleFileChange }) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Vehicle Photos</h3>
            <p className="text-xs text-gray-500 mb-4">Upload clear photos of the truck from all angles.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Front View</label>
                    <input type="file" name="front" accept="image/*" onChange={handleFileChange} className={inputClass} />
                    {files.front && <p className="text-xs text-green-600 mt-1">✓ {files.front.name}</p>}
                </div>
                <div>
                    <label className={labelClass}>Back View</label>
                    <input type="file" name="back" accept="image/*" onChange={handleFileChange} className={inputClass} />
                    {files.back && <p className="text-xs text-green-600 mt-1">✓ {files.back.name}</p>}
                </div>
                <div>
                    <label className={labelClass}>Interior View</label>
                    <input type="file" name="interior" accept="image/*" onChange={handleFileChange} className={inputClass} />
                    {files.interior && <p className="text-xs text-green-600 mt-1">✓ {files.interior.name}</p>}
                </div>
                <div>
                    <label className={labelClass}>Tires</label>
                    <input type="file" name="tires" accept="image/*" onChange={handleFileChange} className={inputClass} />
                    {files.tires && <p className="text-xs text-green-600 mt-1">✓ {files.tires.name}</p>}
                </div>
            </div>
        </div>
    )
}
