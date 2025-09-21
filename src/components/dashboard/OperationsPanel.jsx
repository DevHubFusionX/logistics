import { motion } from 'framer-motion'
import { Plus, Search, BarChart3, User, Calendar, DollarSign, Clock, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function OperationsPanel() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Quick Actions */}
      <motion.div 
        className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Operations Center</h2>
        <div className="space-y-3">
          <Link to="/booking/request">
            <button className="w-full text-left p-3 sm:p-5 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-xl hover:from-sky-100 hover:to-blue-100 transition-all duration-300 group">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">New Shipment</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Create booking request</p>
                </div>
              </div>
            </button>
          </Link>
          <Link to="/tracking">
            <button className="w-full text-left p-3 sm:p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Track Shipments</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Monitor progress</p>
                </div>
              </div>
            </button>
          </Link>
          <Link to="/reports">
            <button className="w-full text-left p-3 sm:p-5 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-violet-100 transition-all duration-300 group">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Analytics</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Generate reports</p>
                </div>
              </div>
            </button>
          </Link>
          <Link to="/profile">
            <button className="w-full text-left p-3 sm:p-5 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl hover:from-gray-100 hover:to-slate-100 transition-all duration-300 group">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-gray-500 to-slate-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Profile</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Manage account</p>
                </div>
              </div>
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Monthly Insights */}
      <motion.div 
        className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">January Insights</h3>
        </div>
        <div className="space-y-3 sm:space-y-5">
          <div className="flex items-center justify-between p-3 sm:p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="font-medium text-gray-900 text-sm sm:text-base">Cost Savings</span>
            </div>
            <span className="font-bold text-green-700 text-base sm:text-lg">$2,340</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-gray-900">Avg. Delivery</span>
            </div>
            <span className="font-bold text-blue-700 text-lg">2.3 days</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-gray-900">Success Rate</span>
            </div>
            <span className="font-bold text-purple-700 text-lg">99.2%</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}