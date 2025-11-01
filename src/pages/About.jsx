import { AboutHero, AboutStats, AboutValues, AboutTimeline, AboutAchievements, AboutLeadership, AboutCTA } from '../components/landing/about'
import {motion} from "framer-motion"
export default function About() {
  return (
    <div className="pt-20">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-sky-200 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      <AboutHero />
      <AboutStats />
      <AboutValues />
      <AboutTimeline />
      <AboutAchievements />
      <AboutLeadership />
      <AboutCTA />
    </div>
  )
}
