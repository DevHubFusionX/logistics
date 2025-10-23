import { motion } from 'framer-motion'
import { Plus, Search, User } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function OperationsPanel() {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div className="space-y-3">
        <Link to="/booking/request">
          <button className="w-full text-left p-4 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg hover:from-sky-100 hover:to-blue-100 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">New Booking</h3>
                <p className="text-xs text-gray-600">Create shipment</p>
              </div>
            </div>
          </button>
        </Link>
        <Link to="/bookings">
          <button className="w-full text-left p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">My Bookings</h3>
                <p className="text-xs text-gray-600">View all</p>
              </div>
            </div>
          </button>
        </Link>
        <Link to="/profile">
          <button className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-violet-100 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Profile</h3>
                <p className="text-xs text-gray-600">Manage account</p>
              </div>
            </div>
          </button>
        </Link>
      </div>
    </motion.div>
  )
}