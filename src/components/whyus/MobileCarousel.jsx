import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function MobileCarousel({ 
  currentSlide, 
  setCurrentSlide, 
  impactAreas 
}) {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
          >
            {(() => {
              const area = impactAreas[currentSlide]
              const IconComponent = area.icon
              return (
                <>
                  <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-2xl font-black text-sky-600">{area.impact}</div>
                      <div className="text-sm text-gray-500">{area.metric}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{area.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{area.description}</p>
                  </div>
                </>
              )
            })()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + impactAreas.length) % impactAreas.length)}
          className="p-3 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {impactAreas.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-sky-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % impactAreas.length)}
          className="p-3 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}