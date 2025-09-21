export default function Stats() {
  const stats = [
    { number: "200+", label: "Countries Served" },
    { number: "1M+", label: "Packages Delivered" },
    { number: "99.8%", label: "On-Time Delivery" },
    { number: "24/7", label: "Customer Support" }
  ]

  return (
    <section className="py-16 bg-cyan-600 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
              <div className="text-cyan-100 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}