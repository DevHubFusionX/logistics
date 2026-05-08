import { CheckCircle, Circle, Clock, Camera, User } from 'lucide-react'

export default function StatusTimeline({ timeline }) {
  return (
    <div className="space-y-4">
      {timeline.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              item.completed 
                ? item.current 
                  ? 'bg-blue-100 border-2 border-blue-600' 
                  : 'bg-green-100'
                : 'bg-gray-100'
            }`}>
              {item.completed ? (
                item.current ? (
                  <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
            </div>
            {index < timeline.length - 1 && (
              <div className={`w-0.5 h-12 ${item.completed ? 'bg-green-300' : 'bg-gray-200'}`} />
            )}
          </div>

          <div className="flex-1 pb-8">
            <div className="flex items-start justify-between">
              <div>
                <p className={`font-semibold ${
                  item.completed 
                    ? item.current ? 'text-blue-600' : 'text-gray-900'
                    : 'text-gray-400'
                }`}>
                  {item.label}
                </p>
                {item.timestamp && (
                  <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                )}
                {item.actor && (
                  <div className="flex items-center gap-1 mt-1">
                    <User className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-600">{item.actor}</p>
                  </div>
                )}
                {item.photos && (
                  <div className="flex items-center gap-1 mt-1">
                    <Camera className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-600">{item.photos} photos attached</p>
                  </div>
                )}
              </div>
              {item.current && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Current
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
