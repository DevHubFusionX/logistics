import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { BADGE_COLORS, STATUS_COLORS } from '../../../../constants'
import { getColorClasses } from '../../../../utils/helpers'

export default function SidebarItem({ item, collapsed, isExpanded, toggleExpanded, isActive }) {
  if (!item) return null
  const Icon = item.icon
  const hasSubItems = item.subItems && item.subItems.length > 0
  const itemIsActive = isActive(item.path)
  const colors = getColorClasses(item.color)

  return (
    <div>
      <div className="relative group">
        <Link
          to={item.path}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
            itemIsActive 
              ? `${colors.bg} ${colors.text} shadow-sm border-l-4 ${colors.border}` 
              : 'text-gray-700 hover:bg-white hover:shadow-sm'
          }`}
          title={collapsed ? item.label : ''}
        >
          <div className={`relative flex-shrink-0 ${itemIsActive ? colors.icon : 'text-gray-500 group-hover:text-gray-700'}`}>
            <Icon className="w-5 h-5" />
            {item.isNew && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>}
          </div>
          
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate">{item.label}</span>
                  {item.isNew && (
                    <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold flex-shrink-0">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">{item.description}</p>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                {item.badge && (
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${BADGE_COLORS[item.badge.type] || BADGE_COLORS.info}`}>
                    {item.badge.count}
                  </span>
                )}
                {hasSubItems && (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
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
        </Link>

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
              className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 group ${
                isActive(subItem.path)
                  ? `${colors.bg} ${colors.text} font-semibold`
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="truncate">{subItem.label}</span>
              <div className="flex items-center gap-2 flex-shrink-0">
                {subItem.count && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    subItem.status ? STATUS_COLORS[subItem.status] : 'bg-gray-100 text-gray-600'
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
