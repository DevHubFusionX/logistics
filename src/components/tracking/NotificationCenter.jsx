import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, Package, Truck, CheckCircle, Clock, Mail, MessageSquare } from 'lucide-react'

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'delivery',
      title: 'Package Delivered',
      message: 'DL-1002 has been successfully delivered to Miami, FL',
      time: '2 minutes ago',
      read: false,
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 2,
      type: 'transit',
      title: 'Shipment In Transit',
      message: 'DL-1001 is currently in Denver, CO - On schedule',
      time: '1 hour ago',
      read: false,
      icon: Truck,
      color: 'blue'
    },
    {
      id: 3,
      type: 'pickup',
      title: 'Pickup Scheduled',
      message: 'DL-1005 pickup scheduled for tomorrow at 9:00 AM',
      time: '3 hours ago',
      read: true,
      icon: Clock,
      color: 'yellow'
    },
    {
      id: 4,
      type: 'booking',
      title: 'New Booking Confirmed',
      message: 'DL-1006 booking confirmed - Payment processed successfully',
      time: '1 day ago',
      read: true,
      icon: Package,
      color: 'purple'
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <motion.span 
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel */}
            <motion.div 
              className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-sm text-sky-600 hover:text-sky-700"
                      >
                        Mark all read
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => {
                      const IconComponent = notification.icon
                      return (
                        <motion.div
                          key={notification.id}
                          className={`p-4 hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? 'bg-sky-50' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                          whileHover={{ backgroundColor: '#f9fafb' }}
                        >
                          <div className="flex gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              notification.color === 'green' ? 'bg-green-100' :
                              notification.color === 'blue' ? 'bg-blue-100' :
                              notification.color === 'yellow' ? 'bg-yellow-100' :
                              notification.color === 'purple' ? 'bg-purple-100' : 'bg-gray-100'
                            }`}>
                              <IconComponent className={`w-4 h-4 ${
                                notification.color === 'green' ? 'text-green-600' :
                                notification.color === 'blue' ? 'text-blue-600' :
                                notification.color === 'yellow' ? 'text-yellow-600' :
                                notification.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
                              }`} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <h4 className={`text-sm font-medium ${
                                  !notification.read ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {notification.title}
                                </h4>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeNotification(notification.id)
                                  }}
                                  className="text-gray-400 hover:text-gray-600 ml-2"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                {notification.time}
                              </p>
                            </div>
                            
                            {!notification.read && (
                              <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between text-sm">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                    <Mail className="w-4 h-4" />
                    Email Settings
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                    <MessageSquare className="w-4 h-4" />
                    SMS Settings
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}