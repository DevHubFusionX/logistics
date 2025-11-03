import PropTypes from 'prop-types'
import { Activity } from 'lucide-react'

export default function SidebarHeader() {
  return (
    <div className="px-3 py-3 border-b border-gray-200">
      <div className="flex items-center gap-2 px-2 py-2 bg-green-50 rounded-lg border border-green-200">
        <Activity className="w-4 h-4 text-green-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-green-700 truncate">System Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}

SidebarHeader.propTypes = {}
