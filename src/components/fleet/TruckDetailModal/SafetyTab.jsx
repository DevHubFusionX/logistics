import { Shield, Eye, MapPin, Radio } from 'lucide-react'

const BoolBadge = ({ value, label }) => (
    <div className={`p-4 rounded-xl border flex items-center justify-between group transition-all duration-300 ${value ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${value ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                <Shield className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-gray-700">{label}</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${value ? 'bg-green-600 text-white shadow-sm' : 'bg-red-600 text-white'}`}>
            {value ? 'Available' : 'Missing'}
        </div>
    </div>
)

export default function SafetyTab({ truck }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Radio className="w-4 h-4 text-blue-500" /> Tracking System
                    </h4>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-3 shadow-sm">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 flex items-center gap-2"><MapPin className="w-4 h-4" /> GPS Tracking</span>
                            <span className={`font-bold ${truck.gpsTrackingInstalled ? 'text-green-600' : 'text-red-600'}`}>{truck.gpsTrackingInstalled ? 'Installed' : 'None'}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 flex items-center gap-2"><Eye className="w-4 h-4" /> Real-time Monitoring</span>
                            <span className={`font-bold ${truck.realTimeTrackingEnabled ? 'text-blue-600' : 'text-gray-400'}`}>{truck.realTimeTrackingEnabled ? 'Active' : 'Disabled'}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-50 text-xs text-gray-400">
                            <div className="flex justify-between">
                                <span>SIM Number:</span>
                                <span className="font-medium text-gray-600">{truck.trackerSimNumber || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span>Provider:</span>
                                <span className="font-medium text-gray-600">{truck.telematicsProvider || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-orange-500" /> Safety Checklist
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                        <BoolBadge value={truck.fireExtinguisherAvailable} label="Fire Extinguisher" />
                        <BoolBadge value={truck.reflectiveSafetyGear} label="Reflective Safety Gear" />
                        <BoolBadge value={truck.emergencyKit} label="Emergency Kit" />
                        <BoolBadge value={truck.spareTire} label="Spare Tire" />
                    </div>
                </div>
            </div>
        </div>
    )
}
