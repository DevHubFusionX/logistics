export default function NetworkHero({ onBookDemo }) {
  return (
    <section
      style={{ backgroundColor: '#0056B8' }}
      className="relative min-h-screen flex items-center overflow-hidden text-left"
    >
      {/* Faint dot grid overlay to maintain premium feel on solid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full pt-32 pb-20">
        <span className="text-[11px] font-bold tracking-widest text-blue-200 uppercase block mb-3">
          Our Network
        </span>
        <h1 className="font-heading-unique font-extrabold text-white leading-[1.1] tracking-tight mb-6 text-4xl sm:text-6xl max-w-4xl">
          Physical cold-chain infrastructure,
          <br />
          digitally orchestrated.
        </h1>
        <p className="font-body-unique text-blue-100 text-sm sm:text-lg leading-relaxed max-w-2xl mb-8">
          Dara connects a growing network of refrigerated assets, cold storage facilities and verified carrier partners — all coordinated through DaraOS with real-time visibility and temperature compliance.
        </p>
        <button
          onClick={onBookDemo}
          className="px-6 py-3 bg-white hover:bg-blue-50 text-[#0056B8] rounded-sm font-heading-unique font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-black/10"
        >
          Partner with Dara
        </button>
      </div>
    </section>
  )
}
