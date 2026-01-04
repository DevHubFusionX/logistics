import { Thermometer, Package, Shield, TrendingUp, Users, Truck } from 'lucide-react'

export const aboutData = {
    hero: {
        title: {
            main: "About",
            highlight: "Dara Cold Chain Logistics"
        },
        description: "Technology-driven cold chain logistics for Nigeria's pharmaceutical, healthcare, and perishable goods industries"
    },
    whoWeAre: {
        title: "Who We Are",
        description1: "Dara Cold Chain Logistics is a technology-driven logistics company focused on delivering reliable, temperature-controlled transportation for Nigeria's pharmaceutical, healthcare, and perishable goods industries.",
        description2: "We ensure that sensitive products — from vaccines and medical supplies to frozen foods and fresh produce — are moved safely, efficiently, and in perfect condition from source to destination."
    },
    trustAndPrecision: {
        title: "Trust & Precision",
        description: "At Dara, we understand that cold-chain logistics isn't just about transportation; it's about trust, precision, and product integrity."
    },
    advancedTech: {
        title: "Advanced Technology",
        description: "Our fleet of well-maintained refrigerated trucks, equipped with real-time GPS and temperature monitoring systems, ensures every shipment maintains optimal conditions throughout the journey."
    },
    gitInsurance: {
        title: "GIT Insurance",
        description: "We provide Goods-in-Transit (GIT) insurance, giving our clients peace of mind and full confidence in the security of their products."
    },
    coreValues: [
        {
            icon: Shield,
            title: "Reliability",
            description: "Delivering safely and on time, every time.",
            color: "blue"
        },
        {
            icon: Thermometer,
            title: "Integrity",
            description: "Upholding quality and transparency in every operation.",
            color: "green"
        },
        {
            icon: "Zap", // Used as a component in loop, will import correctly in component
            title: "Innovation",
            description: "Leveraging technology to improve logistics performance.",
            color: "purple"
        },
        {
            icon: "Users",
            title: "Customer Focus",
            description: "Tailoring every solution to fit client needs.",
            color: "orange"
        }
    ],
    stats: [
        { icon: Users, number: "1000+", label: "Growing number of happy businesses" },
        { icon: Truck, number: "69", label: "Trucks on Network via partner model" },
        { icon: Package, number: "137", label: "Cold Chain Trips Completed" }
    ],
    timeline: [
        { year: "2025", title: "Founded", description: "Dara Cold Chain Logistics established with focus on temperature-controlled transportation" },
        { year: "2025", title: "Tech Integration", description: "Deployed real-time GPS and temperature monitoring systems across fleet" },
        { year: "2025", title: "Enterprise Solutions", description: "Launched dedicated cold chain services for pharmaceutical and food industries" },
        { year: "2026", title: "Nationwide Expansion", description: "Extended coverage to major cities across Nigeria with GIT insurance" },
        { year: "2027", title: "Market Leader", description: "Positioned as Nigeria's trusted cold chain logistics partner" }
    ],
    cta: {
        badge: "Keeping Nigeria's Cold Supply Chain Moving",
        title: "Ready to Move Your Products Safely?",
        description: "At Dara Cold Chain Logistics, we move Nigeria's most sensitive products safely — from factory to final destination. Experience the difference of professional cold chain logistics.",
        primaryBtn: { text: "Get Started Today", link: "/auth/signup" },
        secondaryBtn: { text: "Contact Sales", link: "/contact" }
    },
    leadership: [
        {
            name: "Adebayo Ogundimu",
            position: "Chief Executive Officer",
            bio: "15+ years in Nigerian logistics, former operations director at major courier companies",
            initials: "AO"
        },
        {
            name: "Kemi Adebayo",
            position: "Chief Technology Officer",
            bio: "Tech innovator with deep understanding of Nigerian market and mobile-first solutions",
            initials: "KA"
        },
        {
            name: "Ibrahim Musa",
            position: "Chief Operations Officer",
            bio: "Operations expert with extensive knowledge of Nigerian transportation networks",
            initials: "IM"
        }
    ],
    whatDrivesUs: {
        title: "What Drives Us",
        description: "Our core values and principles that guide every decision and shape our company culture",
        values: [
            {
                icon: "Target",
                title: "Our Mission",
                description: "To transform Nigerian commerce by providing reliable, affordable, and technology-driven logistics solutions that connect every corner of Nigeria."
            },
            {
                icon: "Heart",
                title: "Our Vision",
                description: "Building Nigeria's most trusted logistics network where distance is no barrier to business growth and economic prosperity."
            },
            {
                icon: "Award",
                title: "Our Excellence",
                description: "Industry-leading 99.2% delivery success rate across Nigeria, with a commitment to continuous improvement and customer satisfaction."
            },
            {
                icon: "Globe",
                title: "Our Reach",
                description: "Comprehensive network covering all 36 Nigerian states with local expertise, strategic partnerships, and deep understanding of Nigerian markets."
            }
        ]
    }
}
