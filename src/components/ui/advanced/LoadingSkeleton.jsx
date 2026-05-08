const SkeletonBase = ({ className = '', ...props }) => (
  <div 
    className={`animate-pulse bg-gray-200 rounded ${className}`}
    {...props}
  />
)

export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="bg-white rounded-lg border border-gray-200">
    {/* Header */}
    <div className="p-4 border-b border-gray-200">
      <SkeletonBase className="h-4 w-32" />
    </div>
    
    {/* Table Header */}
    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200">
      {Array.from({ length: columns }).map((_, i) => (
        <SkeletonBase key={i} className="h-4" />
      ))}
    </div>
    
    {/* Table Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <SkeletonBase key={colIndex} className="h-4" />
        ))}
      </div>
    ))}
  </div>
)

export const CardSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-4">
    <div className="flex items-start justify-between mb-3">
      <SkeletonBase className="h-4 w-24" />
      <SkeletonBase className="h-8 w-16" />
    </div>
    <SkeletonBase className="h-8 w-20 mb-2" />
    <SkeletonBase className="h-4 w-16" />
  </div>
)

export const ChartSkeleton = ({ height = 200 }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4">
    <SkeletonBase className="h-4 w-32 mb-4" />
    <div className="flex items-end justify-between" style={{ height }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBase 
          key={i} 
          className="w-8" 
          style={{ height: `${Math.random() * 80 + 20}%` }}
        />
      ))}
    </div>
  </div>
)

export const MapSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <SkeletonBase className="w-full h-96" />
    <div className="p-4">
      <SkeletonBase className="h-4 w-48 mb-2" />
      <SkeletonBase className="h-4 w-32" />
    </div>
  </div>
)

export const ListSkeleton = ({ items = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <SkeletonBase className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <SkeletonBase className="h-4 w-32 mb-2" />
            <SkeletonBase className="h-3 w-48" />
          </div>
          <SkeletonBase className="h-8 w-20" />
        </div>
      </div>
    ))}
  </div>
)

export default function LoadingSkeleton({ type, ...props }) {
  const skeletons = {
    table: TableSkeleton,
    card: CardSkeleton,
    chart: ChartSkeleton,
    map: MapSkeleton,
    list: ListSkeleton
  }
  
  const SkeletonComponent = skeletons[type] || CardSkeleton
  
  return (
    <div role="status" aria-label="Loading content">
      <SkeletonComponent {...props} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}