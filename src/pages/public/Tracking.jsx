import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Search, MapPin, Package, Truck, CheckCircle, Clock, AlertCircle, RefreshCw, Thermometer, Shield, Heart } from 'lucide-react'
import { useTrackingQuery } from '../../hooks/queries/useTrackingQueries'
import toast from 'react-hot-toast'
import SEO from '../../components/common/SEO'
import TrackingMap from '../../features/tracking/components/tracking/TrackingMap'
import { formatDate } from '../../i18n'

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

  const [liveLocation, setLiveLocation] = useState('')

  useEffect(() => {
    if (shipment) {
      setLiveLocation(shipment.currentLocation)
    }
  }, [shipment])

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
                  <p className="font-body-unique text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
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

                  {/* Left Column: Map & Transit Details (col-span-8) */}
                  <div className="lg:col-span-8 space-y-6">

                    {/* Transit Details Grid */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.015)] text-left">
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                          <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-1">Transit Details</p>
                          <h3 className="font-heading-unique font-bold text-slate-800 text-sm">Real-time Location Status</h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right hidden sm:block">
                            <p className="text-slate-400 text-[8px] font-bold tracking-widest uppercase mb-0.5">Tracking ID</p>
                            <p className="notranslate font-body-unique font-bold text-slate-800 text-xs">{shipment.id}</p>
                          </div>
                          <button
                            onClick={handleRefresh}
                            disabled={loading}
                            className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 flex items-center justify-center transition-colors"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-100/50">
                          <p className="text-slate-400 text-[8px] font-bold tracking-widest uppercase mb-1">From (Origin)</p>
                          <p className="font-body-unique font-bold text-slate-800 text-sm">{shipment.origin}</p>
                        </div>
                        <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-4">
                          <p className="text-[#0056B8] text-[8px] font-bold tracking-widest uppercase mb-1">Current Location</p>
                          <p className="font-body-unique font-bold text-blue-900 text-sm">{liveLocation || shipment.currentLocation}</p>
                        </div>
                        <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-100/50">
                          <p className="text-slate-400 text-[8px] font-bold tracking-widest uppercase mb-1">To (Destination)</p>
                          <p className="font-body-unique font-bold text-slate-800 text-sm">{shipment.destination}</p>
                        </div>
                      </div>
                    </div>

                    {/* Live GPS Transit Map */}
                    {shipment.currentLocation && shipment.currentLocation !== 'Tracking will be available once driver is assigned' && (
                      <TrackingMap shipment={shipment} onLocationUpdate={setLiveLocation} />
                    )}

                  </div>

                  {/* Right Column: Milestones & Meta Info (col-span-4) */}
                  <div className="lg:col-span-4 space-y-6">

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
                                  {formatDate(event.date)}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Metadata list */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.015)] text-left space-y-4">
                      {[
                        { label: 'Estimated Delivery', value: formatDate(shipment.estimatedDelivery), icon: Clock, protect: false },
                        { label: 'Driver Assignee', value: shipment.driver, icon: Truck, protect: false },
                        { label: 'Reefer Truck License', value: shipment.vehicle, icon: Package, protect: true },
                      ].map(({ label, value, icon: Icon, protect }) => (
                        <div key={label} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                          <div className="w-7 h-7 rounded-lg bg-blue-50/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-3.5 h-3.5 text-[#0056B8]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-slate-400 text-[8px] font-bold tracking-widest uppercase mb-0.5">{label}</p>
                            <p className={`font-body-unique font-bold text-slate-800 text-xs truncate${protect ? ' notranslate' : ''}`}>{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Auto Refresh & Insurance widget */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 text-left">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                          <Shield className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-slate-400 text-[7px] font-bold tracking-widest uppercase mb-0.5">Insurance</p>
                          <p className="font-body-unique font-bold text-slate-800 text-[10px]">GIT Covered</p>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                            <RefreshCw className="w-3.5 h-3.5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-slate-400 text-[7px] font-bold tracking-widest uppercase mb-0.5">Live Refresh</p>
                            <p className="font-body-unique font-bold text-slate-800 text-[10px]">{autoRefresh ? 'On' : 'Off'}</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={autoRefresh}
                          onChange={e => setAutoRefresh(e.target.checked)}
                          className="w-3.5 h-3.5 rounded text-[#0056B8] focus:ring-[#0056B8] cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Help Support Strip */}
                    <div className="bg-[#0056B8] rounded-3xl p-5 text-left shadow-lg">
                      <p className="font-heading-unique font-bold text-white text-sm mb-1">Need help?</p>
                      <p className="font-body-unique text-white/70 text-xs mb-4">Our support team is active 24/7.</p>
                      <div className="flex items-center gap-2">
                        <a href="tel:+2348115779007" className="flex-1 font-body-unique text-center py-2 border border-white/20 hover:bg-white/10 text-white text-xs font-bold rounded-sm transition-all">
                          Call
                        </a>
                        <a href="mailto:hello@daraexpress.com" className="flex-1 font-body-unique text-center py-2 bg-white text-[#0056B8] hover:bg-blue-50 text-xs font-bold rounded-sm transition-all shadow-sm">
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
