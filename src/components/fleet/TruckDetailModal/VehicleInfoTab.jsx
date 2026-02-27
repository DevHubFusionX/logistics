import { Truck, User, Calendar, Hash, Activity } from 'lucide-react'

const DataItem = ({ icon: Icon, label, value, colorClass = "text-blue-600", bgClass = "bg-blue-100" }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
        <div className={`p-2 ${bgClass} rounded-lg flex-shrink-0`}>
            <Icon className={`w-4 h-4 ${colorClass}`} />
        </div>
        <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">{value || 'N/A'}</p>
        </div>
    </div>
)

export default function VehicleInfoTab({ truck, driverMap }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DataItem icon={Truck} label="Vehicle Type" value={truck.vehicleType} />
                <DataItem icon={Hash} label="Plate Number" value={truck.plateNumber} />
                <DataItem icon={Hash} label="Chassis Number" value={truck.chassisNumber} />
                <DataItem icon={Hash} label="Engine Number" value={truck.engineNumber} />
                <DataItem icon={Activity} label="Make & Model" value={`${truck.make} ${truck.model}`} />
                <DataItem icon={Calendar} label="Y.O.M" value={truck.yearOfManufacture} />
                <DataItem icon={Activity} label="Capacity" value={truck.truckCapacity} />
                <DataItem icon={User} label="Assigned Driver" value={driverMap[truck.driverId] || 'Unassigned'} colorClass="text-purple-600" bgClass="bg-purple-100" />
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Refrigeration Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                        <span className="block text-[10px] font-bold text-gray-400 uppercase">Unit Brand/Model</span>
                        <p className="font-medium mt-1">{truck.reeferUnitBrand || 'N/A'} - {truck.reeferUnitModel || 'N/A'}</p>
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold text-gray-400 uppercase">Temp Range</span>
                        <p className="font-medium mt-1">{truck.temperatureRange || 'N/A'}</p>
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold text-gray-400 uppercase">Compliance</span>
                        <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${truck.coldChainComplianceStatus ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {truck.coldChainComplianceStatus ? 'Certified' : 'Not Certified'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
