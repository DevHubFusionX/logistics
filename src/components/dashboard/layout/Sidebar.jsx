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
      className={`fixed left-0 top-16 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 transition-all duration-300 shadow-lg ${
        isMobile 
          ? `z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-72`
          : `z-30 ${collapsed ? 'w-[4.5rem]' : 'w-72'}`
      }`}
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      <div className="h-full flex flex-col">
        {!collapsed && <SidebarHeader />}

        <nav className="flex-1 overflow-y-auto p-3 space-y-6">
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