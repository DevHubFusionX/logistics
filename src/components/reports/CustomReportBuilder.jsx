import DimensionsPanel from './DimensionsPanel'
import MeasuresPanel from './MeasuresPanel'
import ReportPreview from './ReportPreview'
import SavedReports from './SavedReports'

export default function CustomReportBuilder({ 
  selectedDimensions, 
  selectedMeasures, 
  onDimensionToggle, 
  onMeasureToggle 
}) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <DimensionsPanel 
          selectedDimensions={selectedDimensions}
          onToggle={onDimensionToggle}
        />
        <MeasuresPanel 
          selectedMeasures={selectedMeasures}
          onToggle={onMeasureToggle}
        />
        <ReportPreview 
          selectedDimensions={selectedDimensions}
          selectedMeasures={selectedMeasures}
        />
      </div>
      <SavedReports />
    </div>
  )
}