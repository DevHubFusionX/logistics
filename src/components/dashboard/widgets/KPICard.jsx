import { MetricCard } from '../../ui/advanced'

export default function KPICard({ 
  title, 
  value, 
  unit = '', 
  change, 
  period = '24h',
  sparklineData = [],
  onClick,
  color = 'blue'
}) {
  const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'
  const detail = `${Math.abs(change)}% vs ${period} ago`
  
  return (
    <div onClick={onClick} className="cursor-pointer">
      <MetricCard
        title={title}
        value={value}
        unit={unit}
        change={change}
        trend={trend}
        sparklineData={sparklineData}
        detail={detail}
        colorblindSafe={true}
      />
    </div>
  )
}