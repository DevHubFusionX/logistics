import { useState } from 'react'
import SEO from '@/components/common/SEO'
import { 
  FileText, Truck, Compass, Thermometer, AlertTriangle, 
  CheckCircle, ChevronRight, Play, RefreshCw, Layers 
} from 'lucide-react'

const steps = [
  {
    title: "1. Shipment Requirement Submitted",
    description: "The customer submits a vaccine transport request specifying temperature bounds (2°C – 8°C) and delivery urgency.",
    badge: "Input Stage",
    visual: "submission"
  },
  {
    title: "2. Capacity Identification",
    description: "DaraOS scans the active network, filtering for reefers with pre-cooled chambers operating within range.",
    badge: "Matching",
    visual: "matching"
  },
  {
    title: "3. Driver & Vehicle Assignment",
    description: "Reefer #204 and driver Marcus K. are assigned. Work order, safety protocols, and route coordinates sync to the driver app.",
    badge: "Dispatch",
    visual: "dispatch"
  },
  {
    title: "4. Live Route Initialization",
    description: "The shipment goes live on the dispatcher dashboard. Geofences are established along the transit corridor.",
    badge: "Tracking",
    visual: "map"
  },
  {
    title: "5. Real-Time GPS Tracking",
    description: "Continuous telemetry updates trace the exact location, transit speed, and heading of the vehicle.",
    badge: "GPS Ping",
    visual: "gps"
  },
  {
    title: "6. Cold-Chain Temperature Monitoring",
    description: "IoT sensors log compartment temperature every 30 seconds to guarantee compliance during movement.",
    badge: "Telemetry",
    visual: "telemetry"
  },
  {
    title: "7. Automated Exception Handling",
    description: "A minor heat spikes triggers an automated re-routing warning to bypass a heavy traffic zone, keeping temperature stable.",
    badge: "Alerts",
    visual: "exception"
  },
  {
    title: "8. Customer Visibility Dashboard",
    description: "The client receives an updated ETA and views real-time temperature logs through the secure customer portal.",
    badge: "Client Hub",
    visual: "client"
  },
  {
    title: "9. Delivery & POD Generation",
    description: "Shipment reaches destination. The recipient signs off, generating a cryptographic Proof of Delivery receipt.",
    badge: "Completion",
    visual: "pod"
  },
  {
    title: "10. Operational Analytics Captured",
    description: "All route logs, sensor telemetry, and dispatch milestones are archived for performance analytics.",
    badge: "Archive",
    visual: "analytics"
  }
]

export default function ProductDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleNext = () => {
    setCurrentStep(prev => (prev === steps.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setCurrentStep(prev => (prev === 0 ? steps.length - 1 : prev - 1))
  }

  return (
    <>
      <SEO
        title="DaraOS Interactive Product Demo — Cold-Chain Logistics"
        description="Experience the step-by-step cold-chain logistics simulation with DaraOS. See shipment creation, real-time GPS tracking, IoT telemetry, and compliance proof in action."
        keywords="product demo, logistics simulator, cold chain demo, GPS tracking demo, IoT monitoring"
        canonical="/demo"
      />

      <section className="bg-white pt-32 pb-24 text-left overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-3">
              Interactive Demo
            </span>
            <h1 className="font-heading-unique font-extrabold text-slate-900 leading-tight tracking-tight text-3xl sm:text-5xl mb-4">
              See DaraOS in action
            </h1>
            <p className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed">
              Walk through the 10 critical stages of a temperature-controlled consignment run to see how Dara unifies physical capacity with live intelligence.
            </p>
          </div>

          {/* Simulator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-8">
            
            {/* Left side: Guide Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50/70 border border-slate-200/50 rounded-[24px] p-8 min-h-[400px]">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0056B8] border border-blue-100 text-[10px] font-bold font-body-unique inline-block mb-6">
                  {steps[currentStep].badge}
                </span>

                <h3 className="font-heading-unique font-bold text-slate-900 text-xl sm:text-2xl mb-4 leading-tight">
                  {steps[currentStep].title}
                </h3>
                
                <p className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed">
                  {steps[currentStep].description}
                </p>
              </div>

              {/* Progress Steps Indicators */}
              <div className="mt-8">
                <div className="flex gap-1 mb-6">
                  {steps.map((_, i) => (
                    <span 
                      key={i} 
                      onClick={() => setCurrentStep(i)}
                      className={`h-1.5 flex-1 rounded-full cursor-pointer transition-all ${
                        i === currentStep ? 'bg-[#0056B8]' : 'bg-slate-200 hover:bg-slate-350'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button 
                    onClick={handlePrev}
                    className="font-body-unique text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Back
                  </button>

                  <button 
                    onClick={handleNext}
                    className="font-body-unique px-6 py-2.5 bg-[#0056B8] hover:bg-[#004aad] text-white font-bold rounded-full text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    {currentStep === steps.length - 1 ? 'Restart Demo' : 'Next Step'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right side: High-Fidelity Visual Viewport */}
            <div className="lg:col-span-7 bg-slate-900 rounded-[24px] p-6 sm:p-10 flex flex-col justify-center items-center relative overflow-hidden min-h-[400px] border border-slate-800 shadow-xl select-none">
              
              {/* Subtle background radar circles */}
              <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none flex items-center justify-center">
                <div className="w-[300px] h-[300px] border border-white rounded-full animate-ping" />
                <div className="w-[500px] h-[500px] border border-white rounded-full absolute" />
              </div>

              {/* Visual states */}
              <div className="relative z-10 w-full max-w-md bg-slate-950/70 border border-slate-800 p-6 rounded-2xl shadow-2xl text-slate-100 flex flex-col gap-4">
                
                {/* Visual 1: Submission */}
                {steps[currentStep].visual === 'submission' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">New Booking Request</span>
                      <span className="text-[9px] bg-sky-950 text-sky-400 px-2 py-0.5 rounded-full border border-sky-900 font-bold">Pending Review</span>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cargo Type:</span>
                        <span className="font-bold">Vaccines (Pharma)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Temp Constraints:</span>
                        <span className="font-bold text-sky-400">2.0°C – 8.0°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Volume:</span>
                        <span className="font-bold">5,000 Doses (0.8 tons)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual 2: Matching */}
                {steps[currentStep].visual === 'matching' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Capacity Matcher</span>
                      <span className="text-[9px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded-full border border-amber-900 font-bold">Filtering Network</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-[#0056B8]/10 border border-[#0056B8]/30 flex justify-between items-center">
                        <div>
                          <p className="font-bold">Reefer Truck #204</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Pre-cooled at 3.8°C | Available</p>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-bold">99% Match</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center opacity-50">
                        <div>
                          <p className="font-bold">Reefer Truck #118</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Available | Chamber Temp 12°C</p>
                        </div>
                        <span className="text-[10px] text-slate-400">Needs Pre-cooling</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual 3: Dispatch */}
                {steps[currentStep].visual === 'dispatch' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Consignment Dispatched</span>
                      <span className="text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-900 font-bold">Dispatched</span>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center gap-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <Truck className="w-5 h-5 text-[#0056B8]" />
                        <div>
                          <p className="font-bold text-slate-200">Reefer #204 Assigned</p>
                          <p className="text-[10px] text-slate-400">Driver: Marcus K. | Phone: +234 812...</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Waybill and cooling protocols sent to driver app.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual 4: Map */}
                {steps[currentStep].visual === 'map' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Geofence Monitoring</span>
                      <span className="text-[9px] bg-[#0056B8]/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-900 font-bold">Active</span>
                    </div>
                    <div className="h-28 rounded-lg bg-slate-900 relative flex items-center justify-center border border-slate-800 overflow-hidden">
                      {/* Map lines mockup */}
                      <div className="absolute inset-0 bg-slate-900 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                      <div className="w-40 h-[2px] bg-blue-500/30 absolute rotate-[30deg] border-t border-dashed border-blue-400" />
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full absolute -top-2 left-10 shadow-lg shadow-blue-500/50 animate-pulse" />
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute -bottom-2 right-10 shadow-lg shadow-emerald-500/50" />
                      <span className="text-[10px] font-bold text-slate-300 z-10 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
                        Transit Corridor: Jos ➜ Lagos
                      </span>
                    </div>
                  </div>
                )}

                {/* Visual 5: GPS */}
                {steps[currentStep].visual === 'gps' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">GPS Coordinates</span>
                      <span className="text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-900 font-bold">In Motion</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Latitude</span>
                        <span className="font-mono font-bold text-slate-200">9.07647° N</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Longitude</span>
                        <span className="font-mono font-bold text-slate-200">7.39857° E</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Current Speed</span>
                        <span className="font-bold text-slate-200">62 km/h</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Next Waypoint</span>
                        <span className="font-bold text-slate-200">Lokoja Bypass</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual 6: Telemetry */}
                {steps[currentStep].visual === 'telemetry' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Environmental Sensors</span>
                      <span className="text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-900 font-bold">Log OK</span>
                    </div>
                    <div className="flex items-center gap-4 justify-around">
                      <div className="text-center">
                        <span className="text-[10px] text-slate-400 block mb-1">Temperature</span>
                        <div className="w-16 h-16 rounded-full border-4 border-[#0056B8] flex items-center justify-center font-bold text-sm">
                          4.2°C
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] text-slate-400 block mb-1">Humidity</span>
                        <div className="w-16 h-16 rounded-full border-4 border-slate-800 flex items-center justify-center font-bold text-sm text-slate-300">
                          62%
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual 7: Exception */}
                {steps[currentStep].visual === 'exception' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Automated Alerts</span>
                      <span className="text-[9px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded-full border border-amber-900 font-bold">Rerouting</span>
                    </div>
                    <div className="bg-amber-950/20 border border-amber-500/30 p-3 rounded-xl flex gap-3 text-xs items-start">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                      <div>
                        <span className="font-bold text-amber-400 block">Traffic & Ambient Heat Warning</span>
                        <span className="text-[10px] text-slate-300 block mt-0.5">Dispatcher recommended route change to bypass 2hr gridlock on Expressway.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual 8: Client */}
                {steps[currentStep].visual === 'client' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Client Portal Overview</span>
                      <span className="text-[9px] bg-[#0056B8]/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-900 font-bold">Secured</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Consignment ID:</span>
                        <span className="font-mono">DR-9284-CO</span>
                      </div>
                      <div className="flex justify-between text-slate-350">
                        <span>Expected Arrival:</span>
                        <span className="font-bold">14:30 (On Time)</span>
                      </div>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#0056B8] h-full" style={{ width: '85%' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual 9: Pod */}
                {steps[currentStep].visual === 'pod' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Proof of Delivery</span>
                      <span className="text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-900 font-bold">Signed</span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="font-bold">Delivered & Verified</span>
                        </div>
                        <span className="text-[9px] text-slate-400">14:26</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-snug">Recipient signature captured. Temperature logs verified within compliance envelope.</p>
                    </div>
                  </div>
                )}

                {/* Visual 10: Analytics */}
                {steps[currentStep].visual === 'analytics' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Run Analytics Summary</span>
                      <span className="text-[9px] bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-900 font-bold">Archived</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Run Time:</span>
                        <span className="font-bold">6h 12m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cold Chain Integrity:</span>
                        <span className="font-bold text-emerald-400">100.0% Compliant</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Sensor Pings:</span>
                        <span className="font-bold">744 logged</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}
