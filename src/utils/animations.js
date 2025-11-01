// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

export const slideInUp = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.7, type: "spring", stiffness: 100 }
}

export const rotateIn = {
  initial: { scale: 0, rotate: -180 },
  whileInView: { scale: 1, rotate: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, type: "spring", stiffness: 200 }
}

// Hover animations
export const hoverLift = {
  whileHover: { y: -10, scale: 1.02 },
  transition: { duration: 0.3 }
}

export const hoverScale = {
  whileHover: { scale: 1.05, y: -2 },
  whileTap: { scale: 0.95 }
}

// Stagger animations
export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }
}