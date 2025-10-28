import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, Star } from 'lucide-react'
import { NAVIGATION_SECTIONS } from '../../../constants/navigation'
import { COLORS, BADGE_COLORS, STATUS_COLORS } from '../../../constants'
import { getColorClasses } from '../../../utils/helpers'
import { useAuth } from '../../../hooks/useAuth'

export default function Sidebar({ collapsed, isMobile, isOpen, onClose }) {
  const { hasPermission } = useAuth()
  const [expandedItems, setExpandedItems] = useState({ shipments: true })
  const location = useLocation()

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <aside 
      className={`fixed left-0 top-16 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 transition-all duration-300 shadow-lg ${
        isMobile 
          ? `z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-72`
          : `z-30 ${collapsed ? 'w-[4.5rem]' : 'w-72'}`
      }`}
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      <div className="h-full flex flex-col">
        {/* Sidebar Header */}
        {!collapsed && (
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="font-medium truncate">System Online</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-6">
          {NAVIGATION_SECTIONS.map((section) => {
            const visibleItems = section.items.filter(item => hasPermission(item.roles))
            if (visibleItems.length === 0) return null
            
            return (
            <div key={section.title}>
              {/* Section Title */}
              {!collapsed && (
                <div className="px-3 mb-3">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider truncate">
                    {section.title}
                  </h3>
                </div>
              )}

              {/* Section Items */}
              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const Icon = item.icon
                  const hasSubItems = item.subItems && item.subItems.length > 0
                  const isExpanded = expandedItems[item.id]
                  const itemIsActive = isActive(item.path)
                  const colors = getColorClasses(item.color)

                  return (
                    <div key={item.id}>
                      {/* Main Item */}
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
                          <div className={`relative flex-shrink-0 ${
                            itemIsActive ? colors.icon : 'text-gray-500 group-hover:text-gray-700'
                          }`}>
                            <Icon className="w-5 h-5" />
                            {item.isNew && (
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
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
                                {/* Badge */}
                                {item.badge && (
                                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                                    BADGE_COLORS[item.badge.type] || BADGE_COLORS.info
                                  }`}>
                                    {item.badge.count}
                                  </span>
                                )}
                                
                                {/* Expand Arrow */}
                                {hasSubItems && (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      toggleExpanded(item.id)
                                    }}
                                    className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                                  >
                                    {isExpanded ? (
                                      <ChevronDown className="w-4 h-4" />
                                    ) : (
                                      <ChevronRight className="w-4 h-4" />
                                    )}
                                  </button>
                                )}
                              </div>
                            </>
                          )}
                        </Link>

                        {/* Collapsed Badge */}
                        {collapsed && item.badge && (
                          <span className={`absolute -top-1 -right-1 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                            BADGE_COLORS[item.badge.type] || BADGE_COLORS.info
                          }`}>
                            {item.badge.count}
                          </span>
                        )}

                        {/* Collapsed Tooltip */}
                        {collapsed && (
                          <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                            <div className="font-semibold">{item.label}</div>
                            <div className="text-xs text-gray-300">{item.description}</div>
                            <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                          </div>
                        )}
                      </div>

                      {/* Sub Items */}
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
                })}
              </div>
            </div>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        {!collapsed && (
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
        )}
      </div>
    </aside>
  )
}