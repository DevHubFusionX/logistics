import { FileText, TrendingUp, Plus } from 'lucide-react'
import { dimensions, measures } from './reportsData'

export default function ReportPreview({ selectedDimensions, selectedMeasures }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Report Preview
      </h3>
      
      {selectedDimensions.length > 0 || selectedMeasures.length > 0 ? (
        <div className="space-y-4">
          {selectedDimensions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Dimensions:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDimensions.map((dim) => {
                  const dimension = dimensions.find(d => d.id === dim)
                  return (
                    <span key={dim} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {dimension?.label}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
          
          {selectedMeasures.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Measures:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMeasures.map((meas) => {
                  const measure = measures.find(m => m.id === meas)
                  return (
                    <span key={meas} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {measure?.label}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t border-gray-200">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Select dimensions and measures to build your custom report</p>
        </div>
      )}
    </div>
  )
}