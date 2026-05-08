import { Calendar, MapPin, Filter, RefreshCw } from 'lucide-react'
import { t } from '../../../i18n'

export default function PageHeader({ 
  title, 
  subtitle, 
  showFilters = false, 
  filters = {},
  onFilterChange = () => {} 
}) {
  const handleRefresh = () => window.location.reload()
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-600 mt-1.5">{subtitle}</p>}
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <MapPin className="w-4 h-4 text-gray-500" />
              <select 
                value={filters.location || ''}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              >
                <option value="">{t('common.allLocations')}</option>
                <option value="lagos">{t('locations.lagos')}</option>
                <option value="abuja">{t('locations.abuja')}</option>
                <option value="kano">{t('locations.kano')}</option>
                <option value="port-harcourt">{t('locations.portHarcourt')}</option>
              </select>
            </div>

            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select 
                value={filters.dateRange || ''}
                onChange={(e) => onFilterChange('dateRange', e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              >
                <option value="">{t('common.allTime')}</option>
                <option value="today">{t('common.today')}</option>
                <option value="week">{t('common.thisWeek')}</option>
                <option value="month">{t('common.thisMonth')}</option>
                <option value="quarter">{t('common.thisQuarter')}</option>
              </select>
            </div>

            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Filter className="w-4 h-4 text-gray-500" />
              <select 
                value={filters.warehouse || ''}
                onChange={(e) => onFilterChange('warehouse', e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              >
                <option value="">{t('common.allWarehouses')}</option>
                <option value="main">{t('common.mainWarehouse')}</option>
                <option value="north">{t('common.northHub')}</option>
                <option value="south">{t('common.southHub')}</option>
              </select>
            </div>

            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">{t('common.refresh')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}