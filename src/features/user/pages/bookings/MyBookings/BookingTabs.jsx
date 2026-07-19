export default function BookingTabs({ activeTab, stats, onTabChange }) {
  const tabs = [
    { id: 'all',        label: 'All',         count: stats.all },
    { id: 'scheduled',  label: 'Scheduled',   count: stats.scheduled },
    { id: 'pending',    label: 'Pending',      count: stats.pending },
    { id: 'in_progress',label: 'In-Progress', count: stats.inProgress },
    { id: 'delivered',  label: 'Delivered',   count: stats.delivered },
    { id: 'cancelled',  label: 'Cancelled',   count: stats.cancelled },
  ]

  return (
    <div className="border-b border-slate-200">
      <div className="flex items-center gap-6 overflow-x-auto scrollbar-none pb-0.5">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative pb-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                isActive ? 'text-sky-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                isActive ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
              {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-700 rounded-full" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
