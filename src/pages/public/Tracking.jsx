import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Search, MapPin, Package, Truck, CheckCircle, Clock, AlertCircle, RefreshCw, Thermometer, Shield, Heart } from 'lucide-react'
import { useTrackingQuery } from '../../hooks/queries/useTrackingQueries'
import toast from 'react-hot-toast'
import SEO from '../../components/common/SEO'

const ease = [0.16, 1, 0.3, 1]

export default function Tracking() {
  const [searchParams] = useSearchParams()
  const queryId = searchParams.get('id')
  const [trackingId, setTrackingId] = useState(queryId || '')
  const [searchId, setSearchId] = useState(queryId || '')

  useEffect(() => {
    if (queryId) {
      setTrackingId(queryId)
      setSearchId(queryId)
    }
  }, [queryId])

  const [autoRefresh, setAutoRefresh] = useState(false)
  const resultsRef = useRef(null)
  const resultsInView = useInView(resultsRef, { once: true, margin: '-5% 0px' })

  const { data: shipment, isLoading: loading, error, refetch } = useTrackingQuery(searchId, {
    refetchInterval: autoRefresh ? 30000 : false,
    enabled: !!searchId,
  })

  const handleTrack = (e) => {
    if (e) e.preventDefault()
    if (!trackingId.trim()) {
      toast.error('Please enter a tracking ID')
      return
    }
    setSearchId(trackingId.trim())
  }

  const handleRefresh = async () => {
    const { data } = await refetch()
    if (data) toast.success('Shipment telemetry refreshed!')
  }

  return (
    <>
      <SEO
        title="Track Your Shipment — Real-Time Cold Chain Tracking Nigeria"
        description="Track your Darafortshipment in real-time. Live updates for reefer trucks in Nigeria, cargo transport Lagos to Abuja, and temperature controlled logistics."
        keywords="track shipment Nigeria, cargo tracking, cold chain tracking, Daraforttracking"
        canonical="/tracking"
      />

      {/* Main Section */}
      <section className="bg-slate-50 min-h-screen pt-28 pb-16 flex flex-col items-center">
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12">

          {/* Header Description */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="text-[#0056B8] font-bold text-xs tracking-[0.2em] uppercase mb-3"
            >
              Real-time Telemetry
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              className="font-heading-unique font-extrabold text-slate-900 leading-tight mb-4 text-3xl sm:text-4xl lg:text-5xl"
            >
              Track your shipment live.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease }}
              className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed"
            >
              Enter your Booking / Shipment Tracking ID to access live reefer telemetry, real-time GPS locations, and temperature control charts.
            </motion.p>
          </div>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease }}
            className="w-full max-w-xl mx-auto mb-16"
          >
            <form onSubmit={handleTrack} className="bg-white border border-slate-100 rounded-3xl p-3 shadow-[0_15px_35px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={trackingId}
                  onChange={e => setTrackingId(e.target.value)}
                  placeholder="Enter tracking ID (e.g. BK-1234567890)"
                  disabled={loading}
                  className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm font-semibold px-4 py-3 outline-none focus:bg-white focus:border-[#0056B8] transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0056B8] hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-sm text-sm transition-all active:scale-[0.98] flex-shrink-0"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  {loading ? 'Querying...' : 'Track'}
                </button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 flex items-center gap-2.5 px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl text-left"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                    <p className="text-xs font-semibold text-rose-700">{error.message || 'Shipment ID not found. Please verify and try again.'}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Results Console */}
          <div ref={resultsRef}>
            <AnimatePresence mode="wait">
              {!shipment && !loading && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-5">
                    <Package className="w-6 h-6 text-[#0056B8]" />
                  </div>
                  <h3 className="font-heading-unique font-bold text-slate-800 text-lg mb-2">No active shipment query</h3>
                  <p className="font-body-unique text-slate-400 text-xs sm:text-sm max-w-xs leading-relaxed">
                    Provide a valid cold chain booking ID above to access live status and sensor readings.
                  </p>
                </motion.div>
              )}

              {shipment && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >

                  {/* Left Column: Metadata Dashboard (col-span-5) */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.015)] text-left">
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                          <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-1">Active Shipment</p>
                          <h2 className="font-heading-unique font-bold text-slate-900 text-xl">{shipment.id}</h2>
                        </div>
                        <button
                          onClick={handleRefresh}
                          disabled={loading}
                          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 flex items-center justify-center transition-colors"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                      </div>

                      {/* Info grid */}
                      <div className="space-y-4">
                        {[
                          { label: 'Origin', value: shipment.origin, icon: MapPin },
                          { label: 'Destination', value: shipment.destination, icon: MapPin },
                          { label: 'Current Location', value: shipment.currentLocation, icon: MapPin },
                          { label: 'Estimated Delivery', value: shipment.estimatedDelivery, icon: Clock },
                          { label: 'Driver Assignee', value: shipment.driver, icon: Truck },
                          { label: 'Reefer Truck License', value: shipment.vehicle, icon: Package },
                        ].map(({ label, value, icon: Icon }) => (
                          <div key={label} className="flex items-start gap-3.5 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                            <div className="w-8 h-8 rounded-xl bg-blue-50/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-4 h-4 text-[#0056B8]" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-slate-400 text-[9px] font-bold tracking-widest uppercase mb-0.5">{label}</p>
                              <p className="font-body-unique font-bold text-slate-800 text-sm truncate">{value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Auto Refresh & Insurance widget */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3.5 text-left">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                          <Shield className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-slate-400 text-[8px] font-bold tracking-widest uppercase mb-0.5">Insurance</p>
                          <p className="font-body-unique font-bold text-slate-800 text-xs">GIT Fully Covered</p>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between text-left">
                        <div className="flex items-center gap-3.5">
                          <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                            <RefreshCw className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-slate-400 text-[8px] font-bold tracking-widest uppercase mb-0.5">Auto-refresh</p>
                            <p className="font-body-unique font-bold text-slate-800 text-xs">{autoRefresh ? 'Enabled' : 'Disabled'}</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={autoRefresh}
                          onChange={e => setAutoRefresh(e.target.checked)}
                          className="w-4 h-4 rounded text-[#0056B8] focus:ring-[#0056B8] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Telemetry & Timeline (col-span-7) */}
                  <div className="lg:col-span-7 space-y-6">

                    {/* Live Temperature Telemetry widget */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.015)] text-left">
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                          <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-1">Reefer Sensor Readings</p>
                          <h3 className="font-heading-unique font-bold text-slate-800 text-lg">Live Temperature Stability</h3>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <Thermometer className="w-4 h-4 text-blue-500 animate-pulse" />
                            <span className="font-heading-unique font-extrabold text-2xl text-slate-900">{shipment.temperature || '4.2°C'}</span>
                          </div>
                          <span className="inline-block text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 uppercase tracking-wider">
                            Optimal Range (2.0°C - 8.0°C)
                          </span>
                        </div>
                      </div>

                      {/* Custom Mock Temperature SVG Waveform */}
                      <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50 mb-4">
                        <svg className="w-full h-20 text-[#0056B8]/75" viewBox="0 0 100 20" preserveAspectRatio="none">
                          <path
                            d="M0,10 Q10,7 20,11 T40,8 T60,11 T80,7 T100,10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          {/* glowing telemetry nodes */}
                          <circle cx="20" cy="11" r="1.5" className="fill-[#0056B8] animate-ping" />
                          <circle cx="20" cy="11" r="1" className="fill-[#0056B8]" />
                          <circle cx="60" cy="11" r="1.5" className="fill-[#0056B8] animate-ping" />
                          <circle cx="60" cy="11" r="1" className="fill-[#0056B8]" />
                        </svg>
                      </div>

                      <div className="flex items-center justify-between text-slate-400 text-[10px] font-semibold font-body-unique px-1">
                        <span>Precision check: ±0.1°C</span>
                        <span>Telemetry updates live</span>
                      </div>
                    </div>

                    {/* Timeline tracker */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.015)] text-left">
                      <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-6">Shipment Milestones</p>

                      <div className="relative pl-6">
                        {/* Connecting Line */}
                        <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-100" />

                        <div className="space-y-6">
                          {shipment.timeline?.map((event, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={resultsInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ duration: 0.4, delay: i * 0.08, ease }}
                              className="relative flex items-start gap-4"
                            >
                              {/* Indicator Ring */}
                              <div className={`absolute -left-6 z-10 w-5.5 h-5.5 rounded-full flex items-center justify-center ${event.completed ? 'bg-[#0056B8] text-white' : 'bg-slate-100 text-slate-400'
                                } border-4 border-white shadow-sm`}>
                                {event.completed ? (
                                  <CheckCircle className="w-2.5 h-2.5" />
                                ) : (
                                  <Clock className="w-2.5 h-2.5" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className={`font-body-unique font-bold text-sm leading-tight ${event.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                                  {event.status}
                                </p>
                                <p className={`font-body-unique text-xs mt-0.5 ${event.completed ? 'text-slate-400' : 'text-slate-300'}`}>
                                  {event.date}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Help Support Strip */}
                    <div className="bg-[#0056B8] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-lg">
                      <div>
                        <p className="font-heading-unique font-bold text-white text-base mb-0.5">Need help with this shipment?</p>
                        <p className="font-body-unique text-white/65 text-xs">Our transport managers are available 24/7 to assist.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <a href="tel:+2348115779007" className="font-body-unique px-4 py-2 border border-white/20 hover:bg-white/10 text-white text-xs font-bold rounded-sm transition-all">
                          Call Support
                        </a>
                        <a href="mailto:hello@daraexpress.com" className="font-body-unique px-4 py-2 bg-white text-[#0056B8] hover:bg-blue-50 text-xs font-bold rounded-sm transition-all shadow-sm">
                          Email
                        </a>
                      </div>
                    </div>

                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </>
  )
}
