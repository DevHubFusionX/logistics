export default function TechnologyHero() {
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
          Our Stack
        </span>
        <h1 className="font-heading-unique font-extrabold text-white leading-[1.1] tracking-tight mb-6 text-4xl sm:text-6xl max-w-4xl">
          Technology built for the complexity of cold-chain logistics
        </h1>
        <p className="font-body-unique text-blue-100 text-sm sm:text-lg leading-relaxed max-w-2xl">
          DaraOS is an enterprise-grade orchestration and telemetry platform engineered to eliminate risk across Africa's temperature-sensitive supply chains.
        </p>
      </div>
    </section>
  )
}
