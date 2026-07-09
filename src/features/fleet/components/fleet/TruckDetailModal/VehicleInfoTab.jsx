import { Truck, User, Calendar, Hash, Activity, FileCheck, ShieldAlert, ThermometerSnowflake } from 'lucide-react'

const DataItem = ({ icon: Icon, label, value, colorClass = "text-indigo-600", bgClass = "bg-indigo-50" }) => (
    <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-slate-100 hover:border-indigo-100 hover:shadow-sm transition-all duration-200">
        <div className={`p-2.5 ${bgClass} rounded-xl flex-shrink-0 flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${colorClass}`} />
        </div>
        <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{label}</span>
            <p className="text-sm font-semibold text-slate-800 mt-0.5 truncate">{value || 'N/A'}</p>
        </div>
    </div>
)

export default function VehicleInfoTab({ truck, driverMap }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Core Specs Grid */}
            <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3.5 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-indigo-500" />
                    <span>Core Specifications</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DataItem icon={Truck} label="Vehicle Type" value={truck.vehicleType} />
                    <DataItem icon={Hash} label="Plate Number" value={truck.plateNumber} />
                    <DataItem icon={Hash} label="Chassis Number" value={truck.chassisNumber} />
                    <DataItem icon={Hash} label="Engine Number" value={truck.engineNumber} />
                    <DataItem icon={Activity} label="Make & Model" value={`${truck.make || ''} ${truck.model || ''}`} />
                    <DataItem icon={Calendar} label="Year of Manufacture" value={truck.yearOfManufacture} />
                    <DataItem icon={Activity} label="Capacity" value={truck.truckCapacity} />
                    <DataItem 
                        icon={User} 
                        label="Assigned Driver" 
                        value={driverMap[truck.driverId] || 'Unassigned'} 
                        colorClass="text-violet-600" 
                        bgClass="bg-violet-50" 
                    />
                </div>
            </div>

            {/* Refrigeration & Compliance */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-md relative overflow-hidden border border-white/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ThermometerSnowflake className="w-4 h-4" />
                    <span>Refrigeration & Compliance</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unit Brand / Model</span>
                        <p className="font-semibold text-slate-200 mt-1.5 text-sm">
                            {truck.reeferUnitBrand || 'N/A'} {truck.reeferUnitModel ? `(${truck.reeferUnitModel})` : ''}
                        </p>
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Temperature Range</span>
                        <p className="font-semibold text-sky-300 mt-1.5 text-sm">
                            {truck.temperatureRange || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Compliance Status</span>
                        <div className="mt-1.5">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                truck.coldChainComplianceStatus 
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}>
                                {truck.coldChainComplianceStatus ? 'Certified Compliant' : 'Non-Compliant'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Permits & Insurance */}
            <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3.5 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-500" />
                    <span>Permits & Insurance</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DataItem 
                        icon={FileCheck} 
                        label="Road Worthiness Cert" 
                        value={truck.roadWorthinessCertificate || 'N/A'} 
                        colorClass="text-emerald-600" 
                        bgClass="bg-emerald-50"
                    />
                    <DataItem 
                        icon={FileCheck} 
                        label="Hackney Permit" 
                        value={truck.hackneyPermit || 'N/A'} 
                        colorClass="text-sky-600" 
                        bgClass="bg-sky-50"
                    />
                    <DataItem 
                        icon={ShieldAlert} 
                        label="Insurance Coverage" 
                        value={truck.insuranceType || 'N/A'} 
                        colorClass="text-amber-600" 
                        bgClass="bg-amber-50"
                    />
                </div>
                {truck.lastMaintenanceDate && truck.lastMaintenanceDate !== 'N/A' && (
                    <div className="mt-4 text-xs text-slate-400 italic">
                        Last verified maintenance cycle: <span className="font-semibold text-slate-600">{truck.lastMaintenanceDate}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
