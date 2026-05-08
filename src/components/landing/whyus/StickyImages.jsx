import { motion } from 'framer-motion'

export default function StickyImages({ activeImageIndex, impactAreas }) {
  const images = [
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ]

  return (
    <div className="lg:sticky lg:top-24 lg:h-screen lg:flex lg:items-center">
      <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={impactAreas[index]?.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: activeImageIndex === index ? 1 : 0,
              scale: activeImageIndex === index ? 1.05 : 1
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <h3 className="text-3xl font-bold mb-2">Driving Nigeria Forward</h3>
          <p className="text-white/90 text-lg">Every delivery creates opportunity</p>
        </div>
      </div>
    </div>
  )
}