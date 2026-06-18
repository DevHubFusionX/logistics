import { useState, useRef, useEffect, Suspense } from 'react'

/**
 * LazyViewportRender delays rendering of below-the-fold components
 * until they are close to entering the viewport. Since React.lazy
 * components only fetch their JS chunks when rendered, this completely
 * prevents below-the-fold JS chunks from loading during initial page mount.
 * 
 * Local Suspense boundary ensures that when a component suspends during chunk loading,
 * the layout maintains its height instead of collapsing to 0px (avoiding page jumps).
 */
export default function LazyViewportRender({ children, placeholderHeight = '200px' }) {
  const [shouldRender, setShouldRender] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    // If IntersectionObserver is not supported, render immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' } // Fetch code 300px before entering viewport
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (observer && currentRef) {
        observer.disconnect()
      }
    }
  }, [])

  return shouldRender ? (
    <Suspense fallback={<div style={{ minHeight: placeholderHeight, width: '100%' }} />}>
      {children}
    </Suspense>
  ) : (
    <div ref={ref} style={{ minHeight: placeholderHeight, width: '100%' }} />
  )
}
