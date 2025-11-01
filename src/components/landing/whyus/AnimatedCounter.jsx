import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endValue = typeof end === 'string' ? parseFloat(end.replace(/[^0-9.]/g, '')) : end
    
    const timer = setInterval(() => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * endValue)
      
      setCount(currentCount)
      
      if (progress === 1) {
        clearInterval(timer)
        setCount(endValue)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, end, duration])

  const formatNumber = (num) => {
    if (end.includes('K')) return `${num}K`
    if (end.includes('%')) return `${num}%`
    if (end.includes('+')) return `${num}+`
    return num.toString()
  }

  return (
    <span ref={ref}>
      {formatNumber(count)}{suffix}
    </span>
  )
}