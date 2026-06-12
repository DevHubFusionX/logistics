import { useMemo } from 'react'

const BarChart = ({ data, width = 400, height = 200, colorblindSafe = true }) => {
  const colors = colorblindSafe 
    ? ['#2563eb', '#ea580c', '#7c3aed', '#059669'] 
    : ['#3b82f6', '#ef4444', '#8b5cf6', '#10b981']
  
  const maxValue = Math.max(...data.map(d => d.value))
  const barWidth = (width - 60) / data.length
  
  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Y-axis */}
      <line x1="40" y1="20" x2="40" y2={height - 40} stroke="#e5e7eb" strokeWidth="1" />
      
      {/* X-axis */}
      <line x1="40" y1={height - 40} x2={width - 20} y2={height - 40} stroke="#e5e7eb" strokeWidth="1" />
      
      {/* Bars */}
      {data.map((item, index) => {
        const barHeight = ((item.value / maxValue) * (height - 80))
        const x = 50 + index * barWidth
        const y = height - 40 - barHeight
        
        return (
          <g key={index}>
            <rect
              x={x}
              y={y}
              width={barWidth - 10}
              height={barHeight}
              fill={colors[index % colors.length]}
              className="hover:opacity-80 transition-opacity"
              role="img"
              aria-label={`${item.label}: ${item.value}`}
            />
            <text
              x={x + (barWidth - 10) / 2}
              y={height - 25}
              textAnchor="middle"
              className="text-xs fill-gray-600"
            >
              {item.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

const DonutChart = ({ data, size = 200, colorblindSafe = true }) => {
  const colors = colorblindSafe 
    ? ['#2563eb', '#ea580c', '#7c3aed', '#059669'] 
    : ['#3b82f6', '#ef4444', '#8b5cf6', '#10b981']
  
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const center = size / 2
  const radius = size / 2 - 20
  const innerRadius = radius * 0.6
  
  let currentAngle = -90
  
  const paths = data.map((item, index) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    
    currentAngle += angle
    
    const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180)
    const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180)
    const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180)
    const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180)
    
    const largeArcFlag = angle > 180 ? 1 : 0
    
    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ')
    
    return {
      path: pathData,
      color: colors[index % colors.length],
      label: item.label,
      value: item.value,
      percentage: percentage.toFixed(1)
    }
  })
  
  return (
    <div className="relative">
      <svg width={size} height={size}>
        {paths.map((item, index) => (
          <path
            key={index}
            d={item.path}
            fill={item.color}
            className="hover:opacity-80 transition-opacity cursor-pointer"
            role="img"
            aria-label={`${item.label}: ${item.percentage}%`}
          />
        ))}
        
        {/* Inner circle */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="white"
        />
        
        {/* Center text */}
        <text
          x={center}
          y={center - 5}
          textAnchor="middle"
          className="text-lg font-bold fill-gray-900"
        >
          {total}
        </text>
        <text
          x={center}
          y={center + 15}
          textAnchor="middle"
          className="text-xs fill-gray-600"
        >
          Total
        </text>
      </svg>
      
      {/* Legend */}
      <div className="mt-4 space-y-2">
        {paths.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-gray-700">{item.label}</span>
            <span className="text-gray-500 ml-auto">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Chart({ type, data, ...props }) {
  const ChartComponent = useMemo(() => {
    switch (type) {
      case 'bar':
        return BarChart
      case 'donut':
        return DonutChart
      default:
        return BarChart
    }
  }, [type])
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <ChartComponent data={data} {...props} />
    </div>
  )
}