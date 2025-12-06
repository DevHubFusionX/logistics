import { motion } from 'framer-motion'
import logo1 from '../../assets/ClientLogo/image.svg'
import logo2 from '../../assets/ClientLogo/image (1).svg'
import logo3 from '../../assets/ClientLogo/image (2).svg'
import logo4 from '../../assets/ClientLogo/image (3).svg'
import logo5 from '../../assets/ClientLogo/image (4).svg'
import logo6 from '../../assets/ClientLogo/image (5).svg'
import logo7 from '../../assets/ClientLogo/image (6).svg'

const clients = [
  { name: 'Client 1', logo: logo1 },
  { name: 'Client 2', logo: logo2 },
  { name: 'Client 3', logo: logo3 },
  { name: 'Client 4', logo: logo4 },
  { name: 'Client 5', logo: logo5 },
  { name: 'Client 6', logo: logo6 },
  { name: 'Client 7', logo: logo7 }
]

// Duplicate clients to ensure smooth infinite scroll
const marqueeClients = [...clients, ...clients, ...clients, ...clients]

function MarqueeLogo({ client }) {
  return (
    <div className="flex items-center justify-center px-8 md:px-12 lg:px-16 flex-shrink-0">
      {/* Fixed size container for stability */}
      <div className="w-32 h-16 md:w-40 md:h-20 flex items-center justify-center">
        <img
          src={client.logo}
          alt={client.name}
          className="w-full h-full object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        />
      </div>
    </div>
  )
}

export default function DaraClients() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs md:text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3 md:mb-4">
            Trusted Partners
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Trusted by Leading Global Brands
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex animate-marquee-slow py-10">
          {marqueeClients.map((client, index) => (
            <MarqueeLogo key={`${client.name}-${index}`} client={client} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 60s linear infinite;
          width: max-content;
        }
        /* Pause on hover for better UX */
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
