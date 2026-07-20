import { Construction } from 'lucide-react'

/**
 * ComingSoonOverlay — blurred overlay for pages backed by unimplemented APIs.
 *
 * Usage:
 *   <ComingSoonOverlay title="Support Center" />
 *
 * Renders a centered card on top of a blurred backdrop with a "Coming Soon" message,
 * absolute-positioned to only overlay its parent content container.
 */
export default function ComingSoonOverlay({
  title = 'This Feature',
  description,
}) {
  const defaultDescription = `${title} is currently under development. We're working hard to bring this feature to you soon.`

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-white/60 backdrop-blur-md rounded-2xl min-h-[400px]">
      {/* Card */}
      <div className="relative z-10 bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in-95 duration-300">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mb-6 shadow-inner">
          <Construction className="w-8 h-8 text-blue-600" />
        </div>

        {/* Badge */}
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-[0.15em] rounded-full mb-4">
          Coming Soon
        </span>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          {description || defaultDescription}
        </p>

        {/* Progress dots animation */}
        <div className="flex items-center justify-center gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
