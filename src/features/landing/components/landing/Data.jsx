
import {
    ArrowRight, Package, Truck, MapPin, Clock, Shield, Zap, TrendingUp,
    Users, Target, Award, Leaf, Sun, Thermometer, Snowflake, Globe,
    Phone, Mail, CheckCircle
} from 'lucide-react'



// Hero Data
export const heroData = {
    title: {
        prefix: "The Digital Infrastructure Powering",
        highlight: "Africa’s Cold Chain",
        suffix: ""
    },
    description: "Dara combines technology, real-time visibility and temperature-controlled logistics to help businesses safely move temperature-sensitive goods across Nigeria.",
    features: [
        'Best cold-chain logistics companies in Nigeria: Real-time reefer monitoring',
        'Refrigerated truck hire in Nigeria: Dedicated 300+ reefer fleet',
        'Pharmaceutical logistics companies in Nigeria: Temperature-controlled transport',
        'Refrigerated transport for frozen foods: Sub-zero haulage across all 36 states'
    ],


    stats: [
        { icon: 'TrendingUp', value: 'TrendingUp', label: 'Growing number of happy businesses' },
        { icon: 'Truck', value: '300 / 500', label: 'Reefer / Dry Trucks on Network' },
        { icon: 'Clock', value: '200+', label: 'Cold Chain Trips Completed' }
    ],
    buttons: {
        primary: { text: "Book a Demo", link: "#" },
        secondary: { text: "Explore Our Technology", link: "/technology" }
    }
}


// About Data
export const aboutData = {
    badge: "Our Journey",
    title: {
        prefix: "Building Africa’s",
        highlight: "Cold-Chain Infrastructure"
    },
    description: "Dara is a technology-driven cold-chain infrastructure company building the digital backbone for temperature-sensitive supply chains across Nigeria. Through software, real-time IoT visibility, and an aggregated network of 300 refrigerated and 500 dry trucks, we help enterprises move pharmaceuticals and perishable food safely, efficiently, and with total transparency.",
    timeline: [
        {
            year: "Solving Cold-Chain Gaps",
            title: "Solving Cold-Chain Gaps",
            description: "We founded Dara to eliminate the 40%+ post-harvest and pharmaceutical losses caused by fragmented logistics, lack of refrigerated assets, and broken cold chains across Nigeria.",
            icon: Target,
            color: "bg-primary"
        },
        {
            year: "IoT Telemetry & DaraOS",
            title: "IoT Telemetry & DaraOS",
            description: "We engineered real-time IoT temperature logging (±0.1°C precision), GPS tracking, and automated excursion alerts into every fleet asset, digitizing end-to-end trip integrity.",
            icon: Truck,
            color: "bg-primary"
        },
        {
            year: "Pan-African Network & Corridors",
            title: "Pan-African Network & Corridors",
            description: "Today, we coordinate 300 reefer trucks and 500 dry haulage vehicles across all 36 Nigerian states—powering vital pharmaceutical supply chains and interstate food corridors from Lagos to Abuja, Port Harcourt, and Kano.",
            icon: TrendingUp,
            color: "#00843D"
        }
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quote: {
        text: "We are not just moving goods. We are digitising how temperature-sensitive goods move across Africa.",
        author: "— Dara Leadership Team"
    },
    stats: [
        { value: "TrendingUp", label: "Growing number of happy businesses", color: "blue" },
        { value: "300 / 500", label: "Reefer / Dry Trucks on Network", color: "green" },
        { value: "200+", label: "Cold Chain Trips Completed", color: "blue" }
    ]
}

// Services Data
export const servicesData = [
    {
        icon: 'Package',
        image: "/assets/img/pharmaceutical.jpg",
        title: "Pharmaceutical Logistics Companies in Nigeria",
        subtitle: "GDP-Compliant Temperature-Controlled Transport",
        description: "Certified temperature-controlled transportation services for vaccines, biopharmaceuticals, and sensitive medicines maintaining continuous 2°C to 8°C cold chains with NIST-calibrated IoT monitoring.",
        features: [
            "GDP & NAFDAC compliant 2°C to 8°C cold-chain transport",
            "NIST-calibrated IoT temperature loggers with excursion alerts",
            "Sanitized pharmaceutical reefers with dedicated dispatch",
            "Full transit cargo insurance and audit-ready temperature logs"
        ],
        pricing: "Custom Quote",
        deliveryTime: "Same-day available",
        coverage: "Lagos, Abuja, Port Harcourt"
    },
    {
        icon: 'Clock',
        image: "/assets/img/frozen-foods.jpg",
        title: "Refrigerated Transport for Frozen Foods",
        subtitle: "Sub-Zero Interstate Reefer Haulage (-18°C)",
        description: "Dedicated and on-demand refrigerated truck hire in Nigeria for frozen seafood, poultry, dairy, and meat products with uninterrupted sub-zero temperature control from Lagos to Abuja, Port Harcourt, and nationwide.",
        features: [
            "Deep-freeze temperature maintenance down to -18°C",
            "Refrigerated truck hire in Nigeria (5T, 10T, 15T, 30T)",
            "Express interstate corridors with dual-driver options",
            "24/7 central monitoring desk and compressor diagnostics"
        ],
        pricing: "Custom Quote",
        deliveryTime: "1-3 days",
        coverage: "Nationwide Haulage"
    },
    {
        icon: 'Truck',
        image: "/assets/img/fresh-produce.jpg",
        title: "Cold-Chain Logistics for Fresh Produce",
        subtitle: "Farm-to-Shelf Freshness & Spoilage Reduction",
        description: "Solar-powered cold storage solutions and temperature-controlled trucks connecting agricultural hubs in Northern and Central Nigeria directly to major commercial consumer markets with minimal transit loss.",
        features: [
            "Multi-temperature compartments for fruits and vegetables",
            "Solar-powered cold storage hubs in Lagos and Abuja",
            "Direct farm-to-warehouse aggregation reducing spoilage",
            "Airflow-optimized crates and protective handling"
        ],
        pricing: "Custom Quote",
        deliveryTime: "12-48 hours",
        coverage: "All 36 States"
    },
    {
        icon: 'Users',
        image: "/assets/img/enterprise.jpg",
        title: "Enterprise Logistics Solutions in Nigeria",
        subtitle: "B2B Fleet Aggregation & Nationwide Haulage",
        description: "Reliable refrigerated trucks for businesses and high-capacity dry haulage across all 36 Nigerian states. Full API integration, dedicated account management, and real-time fleet orchestration.",
        features: [
            "Cold-chain fleet aggregation platform across Africa",
            "Dedicated fleet capacity (5T, 10T, 15T, 30T trailers)",
            "Enterprise SLA guarantees with dedicated account managers",
            "Custom ERP and supply chain API data integrations"
        ],
        pricing: "Custom Quote",
        deliveryTime: "Daily Departures",
        coverage: "Regional Hubs"
    },
    {
        icon: 'Shield',
        image: "/assets/img/service-1.jpg",
        title: "Urban Cold-Chain Distribution",
        subtitle: "Last-Mile Temperature-Controlled Delivery",
        description: "Temperature-controlled urban distribution for retail chains, supermarkets, pharmacies, and cold storage facilities in Lagos, Abuja, and Port Harcourt with digital proof of delivery.",
        features: [
            "Refrigerated sprinters and vans for urban micro-hubs",
            "Real-time driver location and temperature tracking",
            "Digital electronic proof of delivery (e-POD)",
            "Scheduled daily retail replenishment routes"
        ],
        pricing: "Custom Quote",
        deliveryTime: "Same-day / Next-day",
        coverage: "Lagos, Abuja, PH"
    }
]

// Why Us Data
export const whyUsData = {
    header: {
        badge: "Why Dara",
        title: "Why enterprises choose Dara",
        subtitle: "Technology-Enabled Cold-Chain Logistics Provider in Africa",
        description: "We combine IoT temperature monitoring, automated dispatch, and a vetted fleet of 300 reefer and 500 dry trucks to deliver 99.8% temperature compliance across Nigerian transit corridors."
    },
    impactAreas: [
        {
            icon: Clock,
            title: "Guaranteed Temperature Integrity & Precision",
            description: "Continuous ±0.1°C IoT monitoring with automated trip telemetry and excursion warnings for pharma and perishable goods.",
            impact: "±0.1°C precision",
            metric: "NIST-calibrated logging"
        },
        {
            icon: MapPin,
            title: "Nationwide Coverage Across All 36 States",
            description: "Connecting Lagos, Abuja, Port Harcourt, Kano, and regional agrarian belts with reliable reefer and dry haulage.",
            impact: "All 36 states",
            metric: "Pan-Nigeria reach"
        },
        {
            icon: Package,
            title: "99.8% Spoilage-Free On-Time Deliveries",
            description: "Strict cold-chain SOPs, pre-cooled cargo holds, and comprehensive transit insurance protect every payload.",
            impact: "99.8% compliance",
            metric: "Safe arrival guarantee"
        },
        {
            icon: Users,
            title: "Fleet Aggregation for Scalable Capacity",
            description: "Instant access to 300 refrigerated and 500 dry trucks without the massive capital expenditure of buying a fleet.",
            impact: "800+ total fleet",
            metric: "On-demand availability"
        },
        {
            icon: Zap,
            title: "Real-Time GPS & Telemetry Dashboard",
            description: "End-to-end trip visibility from dispatch to delivery with live GPS coordinates, temperature graphs, and digital POD.",
            impact: "Real-time visibility",
            metric: "15s telemetry interval"
        },
        {
            icon: Award,
            title: "Enterprise SLAs & 24/7 Monitoring Desk",
            description: "Dedicated account management, GDP compliance support, and round-the-clock logistics operations teams.",
            impact: "24/7 support",
            metric: "Enterprise SLA"
        }
    ],
    cta: {
        title: "Ready to schedule a cold-chain shipment?",
        description: "Join leading pharmaceutical, food, and enterprise brands that trust Dara for zero-spoilage temperature-controlled logistics.",
        primaryBtn: { text: "Calculate Freight Rates", link: "/booking-calculator" },
        secondaryBtn: { text: "Explore Our Technology", link: "/technology" }
    }
}

// Climate Tech Data
export const climateTechData = {
    header: {
        badge: "Climate-Tech Logistics",
        title: "Solar-Powered Cold Storage & Transport",
        subtitle: "Sustainable Cold-Chain Solutions in Africa",
        description: "We integrate solar-powered cold storage and hybrid cooling systems into our logistics network to cut fuel dependency, reduce carbon emissions, and minimize transit spoilage."
    },
    carouselSlides: [
        {
            id: 1,
            image: "/climateImage/image-3.jpeg",
            title: "Solar-Assisted Refrigeration",
            description: "Hybrid solar-powered refrigeration units reduce diesel consumption while maintaining continuous cooling during transit stops.",
            icon: Sun,
            color: "bg-green-500"
        },
        {
            id: 2,
            image: "/climateImage/image-1.png",
            title: "Multi-Temperature Thermal Barriers",
            description: "High-grade thermal insulation and partitioned zones allow simultaneous transport of chilled (2°C–8°C) and frozen (-18°C) cargo.",
            icon: Snowflake,
            color: "bg-blue-500"
        },
        {
            id: 3,
            image: "/climateImage/image-2.png",
            title: "Zero-Spoilage Cold Corridors",
            description: "Real-time IoT temperature monitoring across interstate corridors prevents food and vaccine waste before it happens.",
            icon: Globe,
            color: "bg-amber-500"
        }
    ],
    stats: {
        efficiency: { value: "70%", label: "Lower Carbon Emissions" },
        precision: { accuracy: "±0.1°C", minTemp: "IoT Telemetry Precision" }
    }
}

// Testimonials Data
export const testimonialsData = {
    header: {
        badge: "Reviews",
        title: "What our clients",
        subtitle: "say about us",
        description: "Read stories from real businesses in Nigeria who trust us to deliver their goods every day."
    },
    stats: [
        { number: 'TrendingUp', label: 'Growing number of happy businesses' },
        { number: '300 / 500', label: 'Reefer / Dry Trucks on Network' },
        { number: '200+', label: 'Cold Chain Trips Completed' }
    ],
    featured: [
        {
            rating: 5,
            content: "Dara changed the way we deliver packages. Doing same-day delivery in Lagos made our customers much happier, and they keep coming back.",
            author: "Adunni Bankole",
            position: "CEO, ShopNaija",
            company: "ShopNaija",
            image: "/assets/img/adunni.jpg",
            impact: "85% increase in customer satisfaction",
            businessType: "E-commerce"
        },
        {
            rating: 5,
            content: "I used to think only big companies could afford reliable transport. Dara proved me wrong. Their low prices and helpful team helped us grow our business from Lagos to 12 states in just 8 months.",
            author: "Chinedu Okafor",
            position: "Founder, Afro Crafts",
            company: "Afro Crafts",
            image: "/assets/img/chinedu.jpg",
            impact: "Expanded to 12 states in 8 months",
            businessType: "SME"
        },
        {
            rating: 5,
            content: "Dara made our shipping so much easier. Being able to track our trucks in real-time and talk to support anytime reduced our shipping costs by 35% and made delivery twice as fast.",
            author: "Fatima Al-Hassan",
            position: "Supply Chain Director, MegaMart Nigeria",
            company: "MegaMart",
            image: "/assets/img/fatima.jpg",
            impact: "35% cost reduction, 50% faster delivery",
            businessType: "Enterprise"
        }
    ],
    marquee: [
        { content: "I love the tracking system. I always know exactly where my goods are.", author: "Kemi Adebayo", position: "Fashion Designer", company: "Kemi Designs", businessType: "SME", rating: 5, image: null },
        { content: "Dara makes it easy to get fresh supplies on the same day in Abuja.", author: "Ibrahim Musa", position: "Restaurant Owner", company: "Green Palate", businessType: "SME", rating: 5, image: null },
        { content: "Friendly, reliable, and cheap. Dara is the best partner for our shop.", author: "Grace Okonkwo", position: "Online Store Owner", company: "Gracie's Boutique", businessType: "SME", rating: 5, image: null },
        { content: "Moving goods from Lagos to Kano in 24 hours is amazing. They never disappoint.", author: "Ahmed Bello", position: "Electronics Retailer", company: "Bello Tech", businessType: "SME", rating: 5, image: null }
    ]
}

// Contact Data
export const contactData = {
    hero: {
        badge: "Contact Us",
        title: "We are here",
        highlight: "to help you",
        description: "Have questions or need to hire a truck? Send us a message or call us. We will get back to you quickly."
    },
    form: {
        title: "Ask for a price quote",
        subtitle: "Tell us what you want to ship, where it is going, and we will give you a clear price and delivery time."
    },
    info: [
        {
            icon: Phone,
            title: "Call Us",
            content: "+2348115779007\n+2349121168485",
            color: "bg-green-600"
        },
        {
            icon: Mail,
            title: "Email Us",
            content: "hello@darafort.com\ncontact@darfort.com",
            color: "bg-red-600"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            content: "3 Kudirat Abiola Way, Oregun, Lagos, Nigeria",
            color: "bg-blue-600"
        }
    ]
}
