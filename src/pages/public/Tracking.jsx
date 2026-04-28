import { useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { Search, MapPin, Package, Truck, CheckCircle, Clock, AlertCircle, RefreshCw, Thermometer, Shield } from 'lucide-react'
import { useTrackingQuery } from '../../hooks/queries/useTrackingQueries'
import toast from 'react-hot-toast'
import SEO from '../../components/common/SEO'

const ease = [0.22, 1, 0.36, 1]

export default function Tracking() {
  const [trackingId, setTrackingId] = useState('')
  const [searchId, setSearchId] = useState('')
  const [autoRefresh, setAutoRefresh] = useState(false)
  const resultsRef = useRef(null)
  const resultsInView = useInView(resultsRef, { once: true, margin: '-5% 0px' })

  const { data: shipment, isLoading: loading, error, refetch } = useTrackingQuery(searchId, {
    refetchInterval: autoRefresh ? 30000 : false,
    enabled: !!searchId,
  })

  const handleTrack = (e) => {
    if (e) e.preventDefault()
    if (!trackingId.trim()) { toast.error('Please enter a tracking ID'); return }
    setSearchId(trackingId.trim())
  }

  const handleRefresh = async () => {
    const { data } = await refetch()
    if (data) toast.success('Shipment updated!')
  }

  return (
    <>
      <SEO
        title="Track Your Shipment — Real-Time Cold Chain Tracking Nigeria"
        description="Track your Dara Express shipment in real-time. Live updates for reefer trucks in Nigeria, cargo transport Lagos to Abuja, and temperature controlled logistics."
        keywords="track shipment Nigeria, cargo tracking, cold chain tracking, Dara Express tracking"
        canonical="/tracking"
      />

      {/* ── Hero ── */}
      <section className="relative bg-[#1e3a5f] overflow-hidden" style={{ minHeight: '52vh' }}>
        <video
          src="/herovideo.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f] via-transparent to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 sm:px-14 lg:px-20 pt-36 pb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-blue-400 font-bold text-sm tracking-[0.2em] uppercase mb-4"
          >
            Real-time tracking
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.1, ease }}
            className="font-heading font-black text-white leading-tight mb-10"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
          >
            Where is your
            <br />
            <span className="text-blue-400">cargo right now?</span>
          </motion.h1>

          {/* Search bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            onSubmit={handleTrack}
            className="w-full max-w-xl"
          >
            <div className="flex gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">
              <input
                type="text"
                value={trackingId}
                onChange={e => setTrackingId(e.target.value)}
                placeholder="Enter tracking ID  e.g. BK-1234567890"
                disabled={loading}
                className="flex-1 bg-transparent text-white placeholder-white/35 text-sm font-semibold px-4 outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-colors flex-shrink-0"
              >
                {loading
                  ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  : <Search className="w-4 h-4" />
                }
                {loading ? 'Tracking...' : 'Track'}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 flex items-center gap-2 px-4 py-3 bg-red-500/20 border border-red-400/30 rounded-xl"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-300">{error.message || 'Shipment not found'}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="bg-[#e8f0f7] min-h-[40vh] px-8 sm:px-14 lg:px-20 py-16">
        <AnimatePresence mode="wait">
          {!shipment && !loading && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5">
                <Package className="w-7 h-7 text-blue-400" />
              </div>
              <p className="font-heading font-black text-[#1e3a5f] text-xl mb-2">No shipment tracked yet</p>
              <p className="text-[#4a6080] text-sm max-w-xs">Enter your booking ID above to see live status, location and temperature data.</p>
            </motion.div>
          )}

          {shipment && (
            <motion.div
              key="results"
              ref={resultsRef}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="max-w-5xl mx-auto space-y-6"
            >
              {/* Header card */}
              <div className="bg-white rounded-2xl shadow-sm px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[#4a6080] text-xs font-bold tracking-widest uppercase mb-1">Tracking ID</p>
                  <h2 className="font-heading font-black text-[#1e3a5f] text-2xl">{shipment.id}</h2>
                  <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-black rounded-lg uppercase tracking-wider">
                    {shipment.status?.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[#4a6080] text-xs font-bold tracking-widest uppercase mb-1">Est. Delivery</p>
                    <p className="font-heading font-black text-[#1e3a5f] text-lg">{shipment.estimatedDelivery}</p>
                  </div>
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="w-10 h-10 rounded-xl bg-[#e8f0f7] hover:bg-blue-50 flex items-center justify-center transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 text-[#1e3a5f] ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Truck,       label: 'Driver',           value: shipment.driver },
                  { icon: Package,     label: 'Vehicle',          value: shipment.vehicle },
                  { icon: MapPin,      label: 'Origin',           value: shipment.origin },
                  { icon: MapPin,      label: 'Current Location', value: shipment.currentLocation },
                  { icon: Truck,       label: 'Destination',      value: shipment.destination },
                  { icon: Thermometer, label: 'Temperature',      value: shipment.temperature || '2°C – 8°C' },
                  { icon: Shield,      label: 'Insurance',        value: 'GIT Covered' },
                  { icon: Clock,       label: 'Auto-refresh',     value: null, isToggle: true },
                ].map(({ icon: Icon, label, value, isToggle }) => (
                  <div key={label} className="bg-white rounded-2xl px-5 py-4 shadow-sm flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[#4a6080] text-[10px] font-bold tracking-widest uppercase mb-1">{label}</p>
                      {isToggle ? (
                        <button
                          onClick={() => setAutoRefresh(v => !v)}
                          className={`text-xs font-bold ${autoRefresh ? 'text-blue-500' : 'text-[#4a6080]'}`}
                        >
                          {autoRefresh ? 'On (30s)' : 'Off'}
                        </button>
                      ) : (
                        <p className="font-bold text-[#1e3a5f] text-sm truncate">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl shadow-sm px-8 py-8">
                <p className="text-[#4a6080] text-xs font-bold tracking-widest uppercase mb-8">Shipment timeline</p>
                <div className="relative">
                  {/* vertical line */}
                  <div className="absolute left-4 top-2 bottom-2 w-px bg-gray-100" />
                  <div className="space-y-6">
                    {shipment.timeline?.map((event, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        animate={resultsInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: i * 0.08, ease }}
                        className="relative flex items-start gap-5"
                      >
                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          event.completed ? 'bg-blue-500' : 'bg-gray-100'
                        }`}>
                          {event.completed
                            ? <CheckCircle className="w-4 h-4 text-white" />
                            : <Clock className="w-4 h-4 text-gray-400" />
                          }
                        </div>
                        <div className="flex-1 pb-2">
                          <p className={`font-bold text-sm ${event.completed ? 'text-[#1e3a5f]' : 'text-gray-400'}`}>
                            {event.status}
                          </p>
                          <p className={`text-xs mt-0.5 ${event.completed ? 'text-[#4a6080]' : 'text-gray-300'}`}>
                            {event.date}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Help strip */}
              <div className="bg-[#1e3a5f] rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-white font-bold text-sm mb-0.5">Need help with this shipment?</p>
                  <p className="text-white/50 text-xs">Our team is available 24/7 to assist you.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:+2348115779007" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition-colors">
                    Call us
                  </a>
                  <a href="mailto:hello@daraexpress.com" className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold rounded-xl transition-colors">
                    Email support
                  </a>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
