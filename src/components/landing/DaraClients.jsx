import logo1 from '../../assets/ClientLogo/image.svg'
import logo2 from '../../assets/ClientLogo/image (1).svg'
import logo3 from '../../assets/ClientLogo/image (2).svg'
import logo4 from '../../assets/ClientLogo/image (3).svg'
import logo5 from '../../assets/ClientLogo/image (4).svg'
import logo6 from '../../assets/ClientLogo/image (5).svg'
import logo7 from '../../assets/ClientLogo/image (6).svg'

export default function DaraClients() {
  const clients = [
    { name: 'Client 1', logo: logo1 },
    { name: 'Client 2', logo: logo2 },
    { name: 'Client 3', logo: logo3 },
    { name: 'Client 4', logo: logo4 },
    { name: 'Client 5', logo: logo5 },
    { name: 'Client 6', logo: logo6 },
    { name: 'Client 7', logo: logo7 }
  ]

  const row1 = clients.slice(0, 4)
  const row2 = clients.slice(4)

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Clients & Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading companies across Nigeria for reliable cold chain logistics
          </p>
        </div>

        <div className="space-y-8">
          <div className="relative">
            <div className="flex animate-marquee-left">
              {[...row1, ...row1, ...row1].map((client, index) => (
                <div key={index} className="flex items-center justify-center px-12 flex-shrink-0">
                  <img src={client.logo} alt={client.name} className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="flex animate-marquee-right">
              {[...row2, ...row2, ...row2].map((client, index) => (
                <div key={index} className="flex items-center justify-center px-12 flex-shrink-0">
                  <img src={client.logo} alt={client.name} className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 25s linear infinite;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
