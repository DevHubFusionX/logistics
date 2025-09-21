import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, Calendar, TrendingUp, Package, Truck, DollarSign, ArrowLeft, BarChart3, Users, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Reports() {
  const [dateRange, setDateRange] = useState('last30days')
  const [reportType, setReportType] = useState('shipping')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)
    
    // Trigger download
    const element = document.createElement('a')
    const file = new Blob([generateReportData()], { type: 'text/csv' })
    element.href = URL.createObjectURL(file)
    element.download = `${reportType}-analytics-${dateRange}.csv`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const generateReportData = () => {
    const headers = reportType === 'shipping' 
      ? 'Date,Shipment ID,Origin,Destination,Weight,Status,Revenue\n'
      : 'Date,Revenue,Shipments,Avg Weight,Customer Satisfaction\n'
    
    const sampleData = reportType === 'shipping'
      ? '2024-01-15,SH001,New York,Los Angeles,2500kg,Delivered,$1250\n2024-01-16,SH002,Chicago,Miami,1800kg,In Transit,$950\n'
      : '2024-01-15,$2200,5,2100kg,4.8\n2024-01-16,$1900,4,1950kg,4.7\n'
    
    return headers + sampleData
  }

  const analytics = {
    totalShipments: 156,
    totalRevenue: 245600,
    avgDeliveryTime: 3.2,
    customerSatisfaction: 4.8
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-6">
            <Link to="/dashboard">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics & Reporting Center</h1>
                <p className="text-lg text-gray-600">Generate comprehensive logistics reports and performance insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Report Generator */}
          <motion.div 
            className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Report Generation</h2>
                <p className="text-gray-600">Create detailed analytics reports for your logistics operations</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Report Type */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-4">Report Category</label>
                <p className="text-gray-600 mb-6">Select the type of analytics report you need to generate for your business insights.</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.button
                    onClick={() => setReportType('shipping')}
                    className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${
                      reportType === 'shipping' 
                        ? 'border-sky-500 bg-gradient-to-br from-sky-50 to-blue-50 shadow-lg' 
                        : 'border-gray-200 hover:border-sky-300 hover:shadow-md bg-white'
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      reportType === 'shipping' 
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg' 
                        : 'bg-gray-100'
                    }`}>
                      <Package className={`w-6 h-6 ${
                        reportType === 'shipping' ? 'text-white' : 'text-gray-500'
                      }`} />
                    </div>
                    <div className="font-bold text-gray-900 text-lg mb-2">Shipment Details Report</div>
                    <div className="text-gray-600 leading-relaxed">Comprehensive records of individual shipments with tracking and delivery information</div>
                  </motion.button>
                  <motion.button
                    onClick={() => setReportType('analytics')}
                    className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${
                      reportType === 'analytics' 
                        ? 'border-sky-500 bg-gradient-to-br from-sky-50 to-blue-50 shadow-lg' 
                        : 'border-gray-200 hover:border-sky-300 hover:shadow-md bg-white'
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      reportType === 'analytics' 
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg' 
                        : 'bg-gray-100'
                    }`}>
                      <TrendingUp className={`w-6 h-6 ${
                        reportType === 'analytics' ? 'text-white' : 'text-gray-500'
                      }`} />
                    </div>
                    <div className="font-bold text-gray-900 text-lg mb-2">Performance Analytics</div>
                    <div className="text-gray-600 leading-relaxed">Aggregated business metrics, KPIs, and operational performance insights</div>
                  </motion.button>
                </div>
              </div>

              {/* Date Range */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <label className="block text-lg font-bold text-gray-900">Reporting Period</label>
                </div>
                <p className="text-gray-600 mb-6">Choose the time period for your analytics report to focus on specific business cycles.</p>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 font-medium"
                >
                  <option value="last7days">Last 7 Days - Weekly Performance</option>
                  <option value="last30days">Last 30 Days - Monthly Overview</option>
                  <option value="last90days">Last 90 Days - Quarterly Analysis</option>
                  <option value="last6months">Last 6 Months - Bi-Annual Review</option>
                  <option value="lastyear">Last Year - Annual Report</option>
                  <option value="custom">Custom Date Range</option>
                </select>
              </div>

              {/* Generate Button */}
              <div className="pt-6 border-t border-gray-200">
                <motion.button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-4 px-8 py-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl font-bold text-xl hover:from-sky-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating Analytics Report...
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6" />
                      Generate & Download Report
                    </>
                  )}
                </motion.button>
                <p className="text-center text-gray-600 mt-4">
                  Your comprehensive analytics report will be downloaded as a CSV file for further analysis.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Analytics Overview */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Performance Overview</h3>
              </div>
              <p className="text-gray-600 mb-6">Real-time business metrics and key performance indicators for your logistics operations.</p>
              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 bg-sky-50 rounded-xl border border-sky-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Total Shipments</span>
                      <p className="text-sm text-gray-600">This period</p>
                    </div>
                  </div>
                  <span className="font-bold text-sky-700 text-2xl">{analytics.totalShipments}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Total Revenue</span>
                      <p className="text-sm text-gray-600">Gross earnings</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-700 text-2xl">${analytics.totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Avg Delivery Time</span>
                      <p className="text-sm text-gray-600">Days to delivery</p>
                    </div>
                  </div>
                  <span className="font-bold text-blue-700 text-2xl">{analytics.avgDeliveryTime} days</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Customer Rating</span>
                      <p className="text-sm text-gray-600">Satisfaction score</p>
                    </div>
                  </div>
                  <span className="font-bold text-purple-700 text-2xl">{analytics.customerSatisfaction}/5</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Export Features</h3>
              </div>
              <p className="text-gray-600 mb-6">Advanced reporting capabilities designed for comprehensive business analysis and data integration.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-sky-500" />
                  <div>
                    <span className="font-medium text-gray-900">CSV Format</span>
                    <p className="text-sm text-gray-600">Excel-compatible spreadsheet format</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <div>
                    <span className="font-medium text-gray-900">Date Filtering</span>
                    <p className="text-sm text-gray-600">Customizable time period selection</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Download className="w-5 h-5 text-purple-500" />
                  <div>
                    <span className="font-medium text-gray-900">Instant Export</span>
                    <p className="text-sm text-gray-600">Immediate download processing</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}