import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { BADGE_COLORS, STATUS_COLORS } from '../../../../constants'
import { getColorClasses } from '../../../../utils/helpers'

import { toast } from 'react-hot-toast'

export default function SidebarItem({ item, collapsed, isExpanded, toggleExpanded, isActive }) {
  if (!item) return null
  const Icon = item.icon
  const hasSubItems = item.subItems && item.subItems.length > 0
  const itemIsActive = isActive(item.path)
  const colors = getColorClasses(item.color)

  const handleComingSoon = (e) => {
    e.preventDefault()
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden border-l-4 border-blue-600`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Icon className="h-10 w-10 text-blue-600 bg-blue-50 p-2 rounded-xl" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-bold text-gray-900">Feature Coming Soon</p>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                The <span className="font-bold text-blue-600">{item.label}</span> module is currently under development. Stay tuned for our next major update!
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-100">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-xs font-bold text-blue-600 hover:text-blue-700 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    ), { duration: 4000, position: 'bottom-right' })
  }

  const content = (
    <div
      className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg transition-all duration-200 group relative ${itemIsActive
          ? `${colors.bg} ${colors.text} shadow-sm font-semibold`
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        } ${item.comingSoon ? 'opacity-60 cursor-not-allowed grayscale-[0.5]' : ''}`}
      title={collapsed ? item.label : ''}
    >
      <div className={`relative flex-shrink-0 ${itemIsActive ? colors.icon : 'text-gray-400 group-hover:text-gray-600'}`}>
        <Icon className="w-4 h-4" />
        {item.isNew && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>}
      </div>

      {!collapsed && (
        <>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm truncate">{item.label}</span>
              {item.isNew && (
                <span className="bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold flex-shrink-0">
                  NEW
                </span>
              )}
              {item.comingSoon && (
                <span className="bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded-md font-black flex-shrink-0 border border-blue-200 uppercase tracking-tighter">
                  COMING SOON
                </span>
              )}
            </div>
            {item.description && <p className="text-[10px] text-gray-400 truncate mt-0.5">{item.description}</p>}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {item.badge && (
              <span className={`text-xs px-2 py-1 rounded-full font-bold ${BADGE_COLORS[item.badge.type] || BADGE_COLORS.info}`}>
                {item.badge.count}
              </span>
            )}
            {hasSubItems && !item.comingSoon && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleExpanded(item.id)
                }}
                className="p-1 hover:bg-gray-200 rounded-md transition-colors"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )

  return (
    <div>
      <div className="relative group">
        {item.comingSoon ? (
          <button onClick={handleComingSoon} className="w-full text-left focus:outline-none">
            {content}
          </button>
        ) : (
          <Link to={item.path}>
            {content}
          </Link>
        )}

        {collapsed && item.badge && (
          <span className={`absolute -top-1 -right-1 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold ${BADGE_COLORS[item.badge.type] || BADGE_COLORS.info}`}>
            {item.badge.count}
          </span>
        )}

        {collapsed && (
          <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            <div className="font-semibold">{item.label}</div>
            <div className="text-xs text-gray-300">{item.description}</div>
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
          </div>
        )}
      </div>

      {!collapsed && hasSubItems && isExpanded && (
        <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
          {item.subItems.map((subItem) => (
            <Link
              key={subItem.path}
              to={subItem.path}
              className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 group ${isActive(subItem.path)
                  ? `${colors.bg} ${colors.text} font-semibold`
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <span className="truncate">{subItem.label}</span>
              <div className="flex items-center gap-2 flex-shrink-0">
                {subItem.count && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${subItem.status ? STATUS_COLORS[subItem.status] : 'bg-gray-100 text-gray-600'
                    }`}>
                    {subItem.count}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

SidebarItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    path: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
    badge: PropTypes.shape({
      type: PropTypes.string,
      count: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    subItems: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  collapsed: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool,
  toggleExpanded: PropTypes.func.isRequired,
  isActive: PropTypes.func.isRequired
}
