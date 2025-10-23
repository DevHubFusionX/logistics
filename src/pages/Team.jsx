import { motion } from 'framer-motion'
import { Linkedin, Mail, Phone } from 'lucide-react'

const team = [
  {
    id: 1,
    name: 'Dr. Adebayo Okonkwo',
    role: 'Chief Executive Officer',
    image: '/src/assets/img/team/ca-team-1.1.png',
    bio: 'Leading cold chain innovation with 15+ years in pharmaceutical logistics.',
    linkedin: '#',
    email: 'adebayo@daraexpress.com'
  },
  {
    id: 2,
    name: 'Chioma Nwosu',
    role: 'Operations Director',
    image: '/src/assets/img/team/ca-team-1.2.png',
    bio: 'Expert in supply chain optimization and regulatory compliance.',
    linkedin: '#',
    email: 'chioma@daraexpress.com'
  },
  {
    id: 3,
    name: 'Ibrahim Yusuf',
    role: 'Technical Director',
    image: '/src/assets/img/team/ca-team-1.3.png',
    bio: 'Specializes in temperature monitoring systems and fleet management.',
    linkedin: '#',
    email: 'ibrahim@daraexpress.com'
  },
  {
    id: 4,
    name: 'Ngozi Eze',
    role: 'Quality Assurance Manager',
    image: '/src/assets/img/team/ca-team-iner1.1.png',
    bio: 'Ensures WHO compliance and pharmaceutical-grade standards.',
    linkedin: '#',
    email: 'ngozi@daraexpress.com'
  },
  {
    id: 5,
    name: 'Oluwaseun Adeyemi',
    role: 'Logistics Coordinator',
    image: '/src/assets/img/team/ca-team-iner1.2.png',
    bio: 'Manages nationwide distribution network and fleet operations.',
    linkedin: '#',
    email: 'seun@daraexpress.com'
  },
  {
    id: 6,
    name: 'Fatima Mohammed',
    role: 'Client Relations Manager',
    image: '/src/assets/img/team/ca-team-iner1.3.png',
    bio: 'Building lasting partnerships with pharmaceutical companies.',
    linkedin: '#',
    email: 'fatima@daraexpress.com'
  },
  {
    id: 7,
    name: 'Chukwudi Okafor',
    role: 'Warehouse Manager',
    image: '/src/assets/img/team/ca-team-iner1.4.png',
    bio: 'Oversees temperature-controlled storage facilities nationwide.',
    linkedin: '#',
    email: 'chukwudi@daraexpress.com'
  },
  {
    id: 8,
    name: 'Aisha Bello',
    role: 'Compliance Officer',
    image: '/src/assets/img/team/ca-team-iner1.6.png',
    bio: 'Ensures adherence to NAFDAC and international standards.',
    linkedin: '#',
    email: 'aisha@daraexpress.com'
  }
]

export default function Team() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full mb-6"
          >
            <span className="text-sm font-semibold">Meet Our Experts</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6"
          >
            The People Behind
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Cold Chain Excellence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Our dedicated team of logistics professionals, engineers, and compliance experts 
            work tirelessly to ensure your pharmaceutical products reach their destination safely.
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={member.linkedin}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4">Join Our Team</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals passionate about 
              pharmaceutical logistics and cold chain excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
                View Open Positions
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all">
                Send Your CV
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
