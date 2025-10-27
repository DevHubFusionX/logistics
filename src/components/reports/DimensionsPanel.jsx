import { PieChart } from 'lucide-react'
import { dimensions } from './reportsData'

export default function DimensionsPanel({ selectedDimensions, onToggle }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <PieChart className="w-5 h-5" />
        Dimensions
      </h3>
      <div className="space-y-2">
        {dimensions.map((dimension) => (
          <label key={dimension.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={selectedDimensions.includes(dimension.id)}
              onChange={() => onToggle(dimension.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{dimension.label}</span>
            <span className="text-xs text-gray-500 ml-auto">{dimension.type}</span>
          </label>
        ))}
      </div>
    </div>
  )
}