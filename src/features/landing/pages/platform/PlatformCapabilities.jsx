import { 
  Clock, MapPin, AlertTriangle, 
  UserPlus, Layers, EyeOff, 
  Cpu, Share2, Bell 
} from 'lucide-react'

export default function PlatformCapabilities() {
  const cards = [
    {
      title: 'Without DaraOS',
      bgClass: 'bg-[#F9F9F7]',
      items: [
        {
          icon: Clock,
          text: 'Late or missing order confirmations'
        },
        {
          icon: MapPin,
          text: 'Unclear delivery or shipment status'
        },
        {
          icon: AlertTriangle,
          text: 'Disputes handled through long email chains'
        }
      ]
    },
    {
      title: 'Alternative solution',
      bgClass: 'bg-[#F9F9F7]',
      items: [
        {
          icon: UserPlus,
          text: 'Requires full supplier onboarding'
        },
        {
          icon: Layers,
          text: 'Slows updates with forms and portals'
        },
        {
          icon: EyeOff,
          text: "Can't read email signals or intent"
        }
      ]
    },
    {
      title: 'With DaraOS',
      bgClass: 'bg-white',
      items: [
        {
          icon: Cpu,
          text: 'Agents extract signals directly from supplier emails'
        },
        {
          icon: Share2,
          text: 'Shared visibility syncs buyers, suppliers, and logistics'
        },
        {
          icon: Bell,
          text: 'Alerts and auto-reminders reduce noise and increase action'
        }
      ]
    }
  ]

  return (
    <section className="bg-[#0056B8] py-12 sm:py-16 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-heading-unique font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
              Supplier blind spots grow fast.
            </h2>
            <div className="font-heading-unique font-bold text-blue-200/60 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mt-1">
              Close the loop before they spread.
            </div>
          </div>
          <div className="lg:col-span-5 pt-2 lg:pt-4">
            <p className="font-body-unique text-white/80 text-sm sm:text-base leading-relaxed">
              When supplier updates live in emails, spreadsheets, or siloed portals, teams lose the ability to see, trust, and act on what's happening. Visibility gaps lead to missed updates, misaligned plans, and cascading rework.
            </p>
          </div>
        </div>

        {/* Comparison Cards Block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 items-stretch">
          {cards.map((card, cardIdx) => (
            <div 
              key={cardIdx}
              className={`${card.bgClass} rounded-sm p-6 lg:p-8 flex flex-col justify-between h-full text-left`}
            >
              <div>
                <h3 className="font-heading-unique font-bold text-slate-900 text-xl sm:text-2xl mb-6">
                  {card.title}
                </h3>
                
                <div className="flex flex-col">
                  {card.items.map((item, itemIdx) => {
                    const Icon = item.icon
                    return (
                      <div 
                        key={itemIdx}
                        className="py-3.5 border-t border-slate-200/80 flex items-start gap-4.5"
                      >
                        <Icon 
                          size={16} 
                          strokeWidth={1.5} 
                          className="text-slate-400 mt-1 shrink-0" 
                        />
                        <span className="font-body-unique text-slate-700 text-xs sm:text-sm leading-relaxed">
                          {item.text}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
