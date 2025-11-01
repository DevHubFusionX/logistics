import PropTypes from 'prop-types'
import SidebarItem from './SidebarItem'

export default function SidebarSection({ section, collapsed, expandedItems, toggleExpanded, isActive }) {
  if (!section?.items) return null

  return (
    <div>
      {!collapsed && (
        <div className="px-3 mb-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider truncate">
            {section.title}
          </h3>
        </div>
      )}
      <div className="space-y-1">
        {section.items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            collapsed={collapsed}
            isExpanded={expandedItems[item.id]}
            toggleExpanded={toggleExpanded}
            isActive={isActive}
          />
        ))}
      </div>
    </div>
  )
}

SidebarSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired,
  collapsed: PropTypes.bool.isRequired,
  expandedItems: PropTypes.object.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  isActive: PropTypes.func.isRequired
}
