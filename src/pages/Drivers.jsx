import { useState } from 'react'
import { PageHeader } from '../components/dashboard/index'
import { UserCheck, Plus, Star, Phone, Mail, Truck, Upload, FileText, Download, Edit, Trash2, X, User, Award, MapPin } from 'lucide-react'
import { VirtualizedTable, MetricCard, useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'
import { mockDrivers, driverStats, DRIVER_DOCUMENTS, DRIVER_TRIP_HISTORY } from '../components/drivers/driversData'
import AddDriverModal from '../components/drivers/AddDriverModal'

export default function Drivers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [activeTab, setActiveTab] = useState('info')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onNewShipment: () => showToast.info('Press N to add new driver'),
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload()
  })

  const filteredDrivers = mockDrivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || driver.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleViewDriver = (driverId) => {
    const driver = mockDrivers.find(d => d.id === driverId)
    setSelectedDriver(driver)
    setActiveTab('info')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700'
      case 'on_trip': return 'bg-blue-100 text-blue-700'
      case 'inactive': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPerformanceColor = (score) => {
    if (score >= 95) return 'text-green-600'
    if (score >= 90) return 'text-blue-600'
    if (score >= 85) return 'text-yellow-600'
    return 'text-orange-600'
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader 
        title="Driver Management" 
        subtitle="Manage driver profiles, performance tracking, and vehicle assignments"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Drivers"
          value={mockDrivers.length}
          icon={UserCheck}
          sparklineData={[42, 44, 45, 46, 47, 48, 50]}
        />
        <MetricCard 
          title="Available"
          value={mockDrivers.filter(d => d.status === 'available').length}
          icon={UserCheck}
          color="green"
          sparklineData={[28, 29, 30, 31, 32, 32, 35]}
        />
        <MetricCard 
          title="On Trip"
          value={mockDrivers.filter(d => d.status === 'on_trip').length}
          icon={Truck}
          color="blue"
          sparklineData={[15, 14, 13, 12, 12, 12, 10]}
        />
        <MetricCard 
          title="Avg Performance"
          value={`${Math.round(mockDrivers.reduce((acc, d) => acc + d.performanceScore, 0) / mockDrivers.length)}%`}
          icon={Star}
          color="yellow"
          sparklineData={[92, 93, 94, 95, 95, 96, 96]}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            placeholder="Search by name or license..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[250px] px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="on_trip">On Trip</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            onClick={() => setSearchTerm('')}
            className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Clear
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Driver
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-600" />
            Driver Directory
          </h2>
          <p className="text-sm text-gray-600 mt-1">{filteredDrivers.length} drivers found</p>
        </div>
        <VirtualizedTable
          data={filteredDrivers}
          columns={[
            { key: 'name', label: 'Driver Name', width: '180px' },
            { key: 'licenseNumber', label: 'License Number', width: '160px' },
            { 
              key: 'phone', 
              label: 'Contact Info', 
              width: '200px',
              render: (value, row) => (
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span>{value}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Mail className="w-3 h-3 text-gray-400" />
                    <span className="truncate">{row.email}</span>
                  </div>
                </div>
              )
            },
            { 
              key: 'assignedTruck', 
              label: 'Assigned Truck', 
              width: '140px',
              render: (value) => (
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <span>{value || 'Unassigned'}</span>
                </div>
              )
            },
            { 
              key: 'performanceScore', 
              label: 'Performance Score', 
              width: '150px',
              render: (value) => (
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${value >= 95 ? 'bg-green-500' : value >= 90 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${getPerformanceColor(value)}`}>{value}%</span>
                </div>
              )
            },
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
              key: 'actions', 
              label: 'Actions', 
              width: '200px',
              render: (_, row) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewDriver(row.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View
                  </button>
                  <button
                    onClick={() => showToast.info('Edit driver')}
                    className="text-gray-600 hover:text-gray-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => showToast.warning('Delete driver')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )
            }
          ]}
          height={500}
          onExport={() => showToast.success('Driver data exported successfully')}
          onSaveView={() => showToast.info('View saved')}
        />
      </div>

      {selectedDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedDriver(null)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDriver.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedDriver.id}</p>
                </div>
                <button
                  onClick={() => setSelectedDriver(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border-b border-gray-200 p-1 mx-6 mt-4">
              <nav className="flex gap-2">
                {['info', 'trips', 'documents', 'compliance'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6 space-y-6">

              {activeTab === 'info' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="p-2 bg-gray-200 rounded-lg">
                        <User className="w-5 h-5 text-gray-700" />
                      </div>
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Email:</span>
                        <p className="font-medium">{selectedDriver.email}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Phone:</span>
                        <p className="font-medium">{selectedDriver.phone}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">License Number:</span>
                        <p className="font-medium">{selectedDriver.licenseNumber}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">License Expiry:</span>
                        <p className="font-medium">{selectedDriver.licenseExpiry}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">Address:</span>
                        <p className="font-medium">{selectedDriver.address}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Emergency Contact:</span>
                        <p className="font-medium">{selectedDriver.emergencyContact}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Join Date:</span>
                        <p className="font-medium">{selectedDriver.joinDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Award className="w-5 h-5 text-blue-600" />
                      </div>
                      Performance Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Performance Score:</span>
                        <p className={`text-2xl font-bold ${getPerformanceColor(selectedDriver.performanceScore)}`}>
                          {selectedDriver.performanceScore}%
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-2xl font-bold">{selectedDriver.rating}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Deliveries:</span>
                        <p className="text-xl font-bold">{selectedDriver.totalDeliveries}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">On-Time Rate:</span>
                        <p className="text-xl font-bold text-green-600">{selectedDriver.onTimeRate}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Truck className="w-5 h-5 text-green-600" />
                      </div>
                      Assignment
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Assigned Truck:</span>
                        <p className="font-medium text-lg">{selectedDriver.assignedTruck || 'Unassigned'}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                          Assign Truck
                        </button>
                        {selectedDriver.assignedTruck && (
                          <button className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">
                            Unassign Truck
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'trips' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Last 10 Trips
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      On-Time Rate: <span className="font-bold text-green-600">{selectedDriver.onTimeRate}%</span>
                    </p>
                  </div>
                  <div className="space-y-3">
                    {(DRIVER_TRIP_HISTORY[selectedDriver.id] || []).map(trip => (
                      <div key={trip.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{trip.id}</span>
                          <span className="text-xs text-gray-500">{trip.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{trip.route}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Duration: {trip.duration}</span>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full ${
                              trip.onTime ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {trip.onTime ? 'On Time' : 'Delayed'}
                            </span>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                              {trip.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    Rate Driver
                  </button>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm">
                    <Upload className="w-4 h-4" />
                    Upload Document
                  </button>
                  <div className="space-y-3">
                    {(DRIVER_DOCUMENTS[selectedDriver.id] || []).map(doc => (
                      <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">{doc.type}</p>
                              <p className="text-xs text-gray-500">{doc.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              doc.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {doc.status}
                            </span>
                            <button className="text-blue-600 hover:text-blue-700">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Uploaded: {doc.uploadDate}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'compliance' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-3">Compliance Notes</h3>
                    <p className="text-sm text-gray-700">{selectedDriver.complianceNotes}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">License Status</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">License Number:</span>
                        <span className="font-medium">{selectedDriver.licenseNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Expiry Date:</span>
                        <span className="font-medium">{selectedDriver.licenseExpiry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Valid</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <AddDriverModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <ToastContainer />
    </div>
  )
}