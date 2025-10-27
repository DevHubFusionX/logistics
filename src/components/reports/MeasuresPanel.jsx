import { Activity } from 'lucide-react'
import { measures } from './reportsData'

export default function MeasuresPanel({ selectedMeasures, onToggle }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5" />
        Measures
      </h3>
      <div className="space-y-2">
        {measures.map((measure) => (
          <label key={measure.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={selectedMeasures.includes(measure.id)}
              onChange={() => onToggle(measure.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{measure.label}</span>
            <span className="text-xs text-gray-500 ml-auto">{measure.type}</span>
          </label>
        ))}
      </div>
    </div>
  )
}