import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

export default function ImpactCard({ area, index, setActiveImageIndex }) {
  const IconComponent = area.icon
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 })
  
  useEffect(() => {
    if (isInView) {
      setActiveImageIndex(index)
    }
  }, [isInView, index, setActiveImageIndex])
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
        viewport={{ once: true }}
        className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6"
      >
        <IconComponent className="w-8 h-8 text-white" />
      </motion.div>

      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl font-black text-primary">{area.impact}</div>
        <div className="text-sm text-gray-500 font-medium">{area.metric}</div>
      </div>

      <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">{area.title}</h3>
      <p className="text-gray-600 leading-relaxed text-lg">{area.description}</p>
    </motion.div>
  )
}