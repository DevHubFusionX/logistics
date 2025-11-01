import PropTypes from 'prop-types'
import { Star } from 'lucide-react'

export default function SidebarFooter() {
  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-100">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Star className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">Upgrade to Pro</p>
          <p className="text-xs text-gray-600 truncate">Unlock advanced features</p>
        </div>
      </div>
    </div>
  )
}

SidebarFooter.propTypes = {}
