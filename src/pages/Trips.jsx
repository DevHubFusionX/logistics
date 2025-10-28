import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { VirtualizedTable, MetricCard, useToast, Chart } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'
import { 
  Plus, MapPin, Truck, AlertTriangle, CheckCircle, Clock, 
  Thermometer, Fuel, Navigation, X, Image as ImageIcon, FileText 
} from 'lucide-react'
import { TRIPS_DATA, TRIP_TIMELINE, TRIP_TEMPERATURE_DATA, TRIP_ALERTS } from '../components/trips/tripsData'
import { mockDrivers } from '../components/drivers/driversData'
import { FLEET_DATA } from '../components/fleet/fleetData'

export default function Trips() {
  const [filters, setFilters] = useState({})
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [detailView, setDetailView] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [activeTab, setActiveTab] = useState('timeline')
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onNewShipment: () => setShowCreateForm(true),
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload()
  })

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleViewTrip = (tripId) => {
    const trip = TRIPS_DATA.find(t => t.id === tripId)
    setSelectedTrip(trip)
    setDetailView(true)
    setActiveTab('timeline')
  }

  const filteredTrips = TRIPS_DATA.filter(trip => {
    if (filters.search && !trip.id.toLowerCase().includes(filters.search.toLowerCase()) &&
      !trip.driverName.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    if (filters.status && trip.status !== filters.status) return false
    return true
  })

  const statusCounts = {
    pending: TRIPS_DATA.filter(t => t.status === 'pending').length,
    in_transit: TRIPS_DATA.filter(t => t.status === 'in_transit').length,
    delivered: TRIPS_DATA.filter(t => t.status === 'delivered').length,
    cancelled: TRIPS_DATA.filter(t => t.status === 'cancelled').length
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'in_transit': return 'bg-blue-100 text-blue-700'
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTempColor = (temp, range) => {
    if (!range) return 'text-gray-600'
    if (temp < range.min || temp > range.max) return 'text-red-600'
    return 'text-green-600'
  }

  return (
    <>
      <PageHeader
        title="Trip Management"
        subtitle="End-to-end trip lifecycle: creation → tracking → completion"
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Active Trips"
          value={statusCounts.in_transit}
          icon={Truck}
          color="blue"
          sparklineData={[8, 10, 9, 12, 11, 10, 12]}
        />
        <MetricCard
          title="Pending"
          value={statusCounts.pending}
          icon={Clock}
          color="yellow"
          sparklineData={[5, 4, 6, 5, 4, 3, 4]}
        />
        <MetricCard
          title="Delivered Today"
          value={statusCounts.delivered}
          icon={CheckCircle}
          color="green"
          sparklineData={[15, 18, 20, 22, 25, 28, 30]}
        />
        <MetricCard
          title="Active Alerts"
          value={TRIP_ALERTS.filter(a => !a.resolved).length}
          icon={AlertTriangle}
          color="red"
          sparklineData={[8, 6, 7, 5, 4, 3, 2]}
        />
      </div>

      {/* Alerts Panel */}
      {TRIP_ALERTS.filter(a => !a.resolved).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Active Trip Alerts ({TRIP_ALERTS.filter(a => !a.resolved).length})</h3>
          </div>
          <div className="space-y-2">
            {TRIP_ALERTS.filter(a => !a.resolved).map(alert => (
              <div key={alert.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.severity === 'critical' ? 'bg-red-100 text-red-700' :
                    alert.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="font-medium text-gray-900">{alert.tripId}</span>
                  <span className="text-gray-600">{alert.message}</span>
                </div>
                <button 
                  onClick={() => handleViewTrip(alert.tripId)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Trip
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters & Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="search"
            placeholder="Search by Trip ID or Driver..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={filters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={() => setFilters({})}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </button>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Trip
          </button>
        </div>
      </div>

      {/* Active Trips Map */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Active Trips Map
        </h3>
        <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Real-time map with all trucks in transit</p>
            <p className="text-sm text-gray-500">{statusCounts.in_transit} active trips</p>
          </div>
        </div>
      </div>

      {/* Trip Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <VirtualizedTable
          data={filteredTrips}
          columns={[
            { key: 'id', label: 'Trip ID', width: '100px' },
            { 
              key: 'truckId', 
              label: 'Truck', 
              width: '100px',
              render: (value) => (
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <span>{value}</span>
                </div>
              )
            },
            { key: 'driverName', label: 'Driver', width: '150px' },
            { 
              key: 'status', 
              label: 'Status', 
              width: '120px',
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
                  {value.replace('_', ' ')}
                </span>
              )
            },
            { 
              key: 'eta', 
              label: 'ETA', 
              width: '140px',
              render: (value) => value ? new Date(value).toLocaleString('en-US', { 
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
              }) : 'N/A'
            },
            { 
              key: 'distance', 
              label: 'Distance', 
              width: '100px',
              render: (value) => `${value} km`
            },
            { 
              key: 'fuelUsed', 
              label: 'Fuel Used', 
              width: '100px',
              render: (value) => (
                <div className="flex items-center gap-1">
                  <Fuel className="w-3 h-3 text-gray-400" />
                  <span>{value}L</span>
                </div>
              )
            },
            { 
              key: 'tempAvg', 
              label: 'Temp Avg', 
              width: '100px',
              render: (value, row) => value ? (
                <div className="flex items-center gap-1">
                  <Thermometer className={`w-4 h-4 ${getTempColor(value, row.tempRange)}`} />
                  <span className={getTempColor(value, row.tempRange)}>{value}°C</span>
                </div>
              ) : 'N/A'
            },
            { 
              key: 'actions', 
              label: 'Actions', 
              width: '150px',
              render: (_, row) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewTrip(row.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View
                  </button>
                  {row.status === 'pending' && (
                    <button
                      onClick={() => showToast.warning('Cancel trip')}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )
            }
          ]}
          height={400}
          onExport={() => showToast.success('Trip data exported successfully')}
        />
      </div>

      {/* Create Trip Form Modal */}
      {showCreateForm && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowCreateForm(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create New Trip</h2>
                  <button onClick={() => setShowCreateForm(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Lagos Warehouse" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Abuja Hub" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Truck</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="">Select Truck</option>
                        {FLEET_DATA.filter(t => t.status === 'available').map(truck => (
                          <option key={truck.id} value={truck.id}>{truck.id} - {truck.tonnage}T</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Driver</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="">Select Driver</option>
                        {mockDrivers.filter(d => d.status === 'available').map(driver => (
                          <option key={driver.id} value={driver.id}>{driver.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cargo Type</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Pharmaceuticals" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="2500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Value (₦)</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="5000000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Min Temperature (°C)</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Temperature (°C)</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="8" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expected Departure</label>
                      <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expected ETA</label>
                      <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows="3" placeholder="Additional trip notes..."></textarea>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      onClick={(e) => { e.preventDefault(); showToast.success('Trip created successfully'); setShowCreateForm(false); }}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Create Trip
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Trip Detail Modal */}
      {detailView && selectedTrip && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setDetailView(false)} />
          <div className="fixed inset-y-0 right-0 w-full sm:w-[800px] bg-white shadow-xl z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTrip.id}</h2>
                  <p className="text-sm text-gray-500">{selectedTrip.origin} → {selectedTrip.destination}</p>
                </div>
                <button onClick={() => setDetailView(false)} className="text-gray-400 hover:text-gray-600 text-2xl">
                  ×
                </button>
              </div>

              {/* Status Badge */}
              <div className="mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTrip.status)}`}>
                  {selectedTrip.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
                {['timeline', 'temperature', 'fuel', 'route', 'pod'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Timeline Tab */}
              {activeTab === 'timeline' && (
                <div className="space-y-4">
                  {(TRIP_TIMELINE[selectedTrip.id] || []).map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          event.status === 'completed' ? 'bg-green-100' :
                          event.status === 'in_progress' ? 'bg-blue-100' :
                          'bg-gray-100'
                        }`}>
                          {event.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : event.status === 'in_progress' ? (
                            <Clock className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        {index < (TRIP_TIMELINE[selectedTrip.id] || []).length - 1 && (
                          <div className={`w-0.5 h-12 ${event.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h4 className="font-semibold text-gray-900">{event.event}</h4>
                        <p className="text-sm text-gray-600">{event.location}</p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Temperature Tab */}
              {activeTab === 'temperature' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Temperature Range</h3>
                    <p className="text-sm text-gray-600">
                      Min: {selectedTrip.tempRange.min}°C | Max: {selectedTrip.tempRange.max}°C | 
                      Avg: <span className={getTempColor(selectedTrip.tempAvg, selectedTrip.tempRange)}>
                        {selectedTrip.tempAvg || 'N/A'}°C
                      </span>
                    </p>
                  </div>
                  {TRIP_TEMPERATURE_DATA[selectedTrip.id] && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Temperature History</h3>
                      <Chart
                        type="bar"
                        data={TRIP_TEMPERATURE_DATA[selectedTrip.id].map(d => ({ label: d.time, value: d.temp }))}
                        width={700}
                        height={250}
                        colorblindSafe={true}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Fuel Tab */}
              {activeTab === 'fuel' && (
                <div className="space-y-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Fuel Consumption</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Total Used:</span>
                        <p className="text-2xl font-bold text-orange-600">{selectedTrip.fuelUsed}L</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Efficiency:</span>
                        <p className="text-2xl font-bold text-green-600">
                          {(selectedTrip.distance / (selectedTrip.fuelUsed || 1)).toFixed(1)} km/L
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Route Tab */}
              {activeTab === 'route' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Route Replay</p>
                      <p className="text-sm text-gray-500">Distance: {selectedTrip.distance} km</p>
                    </div>
                  </div>
                </div>
              )}

              {/* POD Tab */}
              {activeTab === 'pod' && (
                <div className="space-y-4">
                  {selectedTrip.status === 'delivered' ? (
                    <>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Proof of Delivery</h3>
                        <p className="text-sm text-gray-600">Delivered successfully on {selectedTrip.eta}</p>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">POD Image</p>
                        <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm">Download</button>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Signature</p>
                        <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm">Download</button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      POD will be available after delivery
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <ToastContainer />
    </>
  )
}
