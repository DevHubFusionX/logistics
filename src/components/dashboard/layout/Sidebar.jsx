import PropTypes from 'prop-types'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NAVIGATION_SECTIONS } from '../../../constants/navigation'
import { useAuth } from '../../../hooks/useAuth'
import SidebarHeader from './sidebar/SidebarHeader'
import SidebarFooter from './sidebar/SidebarFooter'
import SidebarSection from './sidebar/SidebarSection'

export default function Sidebar({ collapsed, isMobile, isOpen, onClose }) {
  const { hasPermission } = useAuth()
  const [expandedItems, setExpandedItems] = useState({ shipments: true })
  const location = useLocation()

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }))
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <aside 
      className={`fixed left-0 top-16 bg-white border-r border-gray-200 transition-all duration-300 ${
        isMobile 
          ? `z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 shadow-2xl`
          : `z-30 ${collapsed ? 'w-16' : 'w-64'}`
      }`}
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
        {!collapsed && <SidebarHeader />}

        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {NAVIGATION_SECTIONS.map((section) => {
            const visibleItems = { ...section, items: section.items.filter(item => hasPermission(item.roles)) }
            if (visibleItems.items.length === 0) return null
            
            return (
              <SidebarSection
                key={section.title}
                section={visibleItems}
                collapsed={collapsed}
                expandedItems={expandedItems}
                toggleExpanded={toggleExpanded}
                isActive={isActive}
              />
            )
          })}
        </nav>

        {!collapsed && <SidebarFooter />}
      </div>
    </aside>
  )
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func
}