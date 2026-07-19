import { Shield, Eye, MapPin, Radio, Check, X, ShieldAlert } from 'lucide-react'

const BoolBadge = ({ value, label }) => (
    <div className={`p-4 rounded-xl border flex items-center justify-between group transition-all duration-300 ${
        value 
            ? 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-200' 
            : 'bg-rose-50/50 border-rose-100 hover:border-rose-200'
    }`}>
        <div className="flex items-center gap-3.5">
            <div className={`p-2.5 rounded-xl ${value ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                {value ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </div>
            <span className="text-sm font-semibold text-slate-700">{label}</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            value ? 'bg-emerald-600 text-white shadow-sm' : 'bg-rose-600 text-white shadow-sm'
        }`}>
            {value ? 'Compliant' : 'Missing'}
        </div>
    </div>
)

export default function SafetyTab({ truck }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Telematics & Tracking */}
                <div className="space-y-3.5">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Radio className="w-4 h-4 text-sky-500" /> 
                        <span>Tracking System & Telematics</span>
                    </h4>
                    
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 space-y-4 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-full bg-sky-500" />
                        
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-slate-400" /> GPS Tracking Hardware
                            </span>
                            <span className={`font-bold text-xs uppercase px-2 py-0.5 rounded-full ${
                                truck.gpsTrackingInstalled 
                                    ? 'bg-emerald-100 text-emerald-700' 
                                    : 'bg-slate-100 text-slate-500'
                            }`}>
                                {truck.gpsTrackingInstalled ? 'Installed' : 'Not Found'}
                            </span>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 flex items-center gap-2">
                                <Eye className="w-4 h-4 text-slate-400" /> Real-time Telematics
                            </span>
                            <span className={`font-bold text-xs uppercase px-2 py-0.5 rounded-full ${
                                truck.realTimeTrackingEnabled 
                                    ? 'bg-sky-100 text-sky-700' 
                                    : 'bg-slate-100 text-slate-500'
                            }`}>
                                {truck.realTimeTrackingEnabled ? 'Active' : 'Offline'}
                            </span>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-100 text-xs space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Tracker SIM Number:</span>
                                <span className="font-semibold text-slate-700">{truck.trackerSimNumber || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Telematics Provider:</span>
                                <span className="font-semibold text-slate-700">{truck.telematicsProvider || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Safety Checklist */}
                <div className="space-y-3.5">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-500" /> 
                        <span>Safety Checklist</span>
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                        <BoolBadge value={truck.fireExtinguisherAvailable} label="Fire Extinguisher" />
                        <BoolBadge value={truck.reflectiveSafetyGear} label="Reflective Safety Gear" />
                        <BoolBadge value={truck.emergencyKit} label="Emergency First Aid Kit" />
                        <BoolBadge value={truck.spareTire} label="Spare Tire & Tools" />
                    </div>
                </div>

            </div>
        </div>
    )
}
