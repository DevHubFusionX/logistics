import { motion } from 'framer-motion'
import { Smartphone, ShieldCheck, MapPin, Bell } from 'lucide-react'

export default function DaraAppShowcase() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const features = [
    {
      icon: MapPin,
      title: "Real-time Live GPS Tracking",
      description: "Follow your temperature-controlled shipment step-by-step on a live interactive map."
    },
    {
      icon: ShieldCheck,
      title: "Temperature Monitoring & Alerts",
      description: "Get instant notifications if the temperature inside the reefer truck changes."
    },
    {
      icon: Bell,
      title: "Instant Booking & Status Updates",
      description: "Book new cold chain shipments instantly and receive notifications upon completion."
    }
  ]

  return (
    <section id="app-showcase" className="relative bg-slate-50 py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Dot Grid Layer */}
      <div
        className="absolute inset-0 z-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Decorative Glow circles */}
      <div className="absolute right-[-10%] bottom-[-10%] w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute left-[-10%] top-[-10%] w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-6 text-left space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0056B8]"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="font-body-unique text-[10px] font-bold tracking-wider uppercase">
                  Darafort Mobile App
                </span>
              </motion.div>
              
              <motion.h2
                variants={itemVariants}
                className="font-heading-unique text-3xl sm:text-4.5xl font-bold text-slate-900 tracking-tight leading-tight"
              >
                Logistics & tracking, <br />
                right in your pocket.
              </motion.h2>
              
              <motion.p
                variants={itemVariants}
                className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed"
              >
                Manage your cold chain shipments on the go. Our easy-to-use mobile application lets you book shipments, monitor real-time temperature telemetry, and connect directly with drivers.
              </motion.p>
            </div>

            {/* Feature List */}
            <div className="space-y-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex items-center justify-center flex-shrink-0 text-[#0056B8]">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading-unique font-bold text-slate-800 text-sm sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="font-body-unique text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>


          </motion.div>

          {/* Right Column: App Mockups Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            {/* Soft shadow background behind image */}
            <div className="absolute w-[80%] h-[80%] bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-0" />
            
            <img
              src="/image.jpg"
              alt="Darafort Mobile App Mockups"
              className="relative z-10 w-full max-w-lg md:max-w-xl lg:max-w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:scale-[1.02] transition-transform duration-500"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
