import PropTypes from 'prop-types'
import SidebarItem from './SidebarItem'

export default function SidebarSection({ section, collapsed, expandedItems, toggleExpanded, isActive }) {
  if (!section?.items) return null

  return (
    <div className="mb-4">
      {!collapsed && (
        <div className="px-3 mb-2">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
            {section.title}
          </h3>
        </div>
      )}
      <div className="space-y-0.5">
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
