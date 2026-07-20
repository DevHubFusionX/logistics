import { Check, MapPin, Truck } from 'lucide-react'

export default function StepProgressPills({ subStep, subStepLabels }) {
  const icons = [MapPin, Truck]

  return (
    <div className="flex gap-3 px-0">
      {subStepLabels.map((label, i) => {
        const Icon = icons[i] || MapPin
        const isActive = i + 1 === subStep
        const isCompleted = i + 1 < subStep

        return (
          <div
            key={i}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border duration-200 select-none ${
              isActive
                ? 'bg-sky-700 text-white border-sky-750 shadow-sm ring-4 ring-sky-100'
                : isCompleted
                ? 'bg-sky-50 text-sky-700 border-sky-100/50'
                : 'bg-gray-50 text-gray-400 border-gray-100'
            }`}
          >
            <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-extrabold ${
              isActive ? 'bg-white/20 text-white' :
              isCompleted ? 'bg-sky-100 text-sky-700' : 'bg-gray-200/60 text-gray-400'
            }`}>
              {isCompleted ? <Check className="w-3 h-3" /> : i + 1}
            </div>
            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.split(' ')[0]}</span>
          </div>
        )
      })}
    </div>
  )
}
