import PropTypes from 'prop-types'

export default function SidebarHeader() {
  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
        <span className="font-medium truncate">System Online</span>
      </div>
    </div>
  )
}

SidebarHeader.propTypes = {}
