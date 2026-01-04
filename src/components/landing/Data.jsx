
import {
    ArrowRight, Package, Truck, MapPin, Clock, Shield, Zap, TrendingUp,
    Users, Target, Award, Leaf, Sun, Thermometer, Snowflake, Globe,
    Phone, Mail, CheckCircle
} from 'lucide-react'

// Import client logos
import logo1 from '../../assets/ClientLogo/image.svg'
import logo2 from '../../assets/ClientLogo/image (1).svg'
import logo3 from '../../assets/ClientLogo/image (2).svg'
import logo4 from '../../assets/ClientLogo/image (3).svg'
import logo5 from '../../assets/ClientLogo/image (4).svg'
import logo6 from '../../assets/ClientLogo/image (5).svg'
import logo7 from '../../assets/ClientLogo/image (6).svg'

// Hero Data
export const heroData = {
    title: {
        prefix: "Nigeria's Leading",
        highlight: "Cold Chain",
        suffix: "Logistics"
    },
    description: "Temperature-controlled logistics for pharmaceuticals, vaccines, and perishable goods. Reliable cold chain solutions across Nigeria.",
    features: [
        'Real-time tracking & visibility across your entire supply chain',
        'Multi-modal transportation solutions with nationwide coverage',
        'Express delivery & same-day shipping for urgent shipments',
        'Enterprise-grade API integration & automated workflows'
    ],
    backgroundImages: [
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    ],
    stats: [
        { icon: 'TrendingUp', value: 'TrendingUp', label: 'Growing number of happy businesses' },
        { icon: 'Truck', value: '69', label: 'Trucks on Network via partner model' },
        { icon: 'Clock', value: '137', label: 'Cold Chain Trips Completed' }
    ],
    buttons: {
        primary: { text: "Start Shipping Now", link: "/booking/request" },
        secondary: { text: "Track Shipment", link: "/tracking" }
    }
}

// Clients Data
export const clientsData = [
    { name: 'Client 1', logo: logo1 },
    { name: 'Client 2', logo: logo2 },
    { name: 'Client 3', logo: logo3 },
    { name: 'Client 4', logo: logo4 },
    { name: 'Client 5', logo: logo5 },
    { name: 'Client 6', logo: logo6 },
    { name: 'Client 7', logo: logo7 }
]

// About Data
export const aboutData = {
    badge: "Our Journey",
    title: {
        prefix: "Transforming Nigeria's",
        highlight: "Logistics Landscape"
    },
    description: "A technology-driven cold chain logistics company delivering reliable, temperature-controlled transportation for Nigeria's pharmaceutical, healthcare, and perishable goods industries.",
    timeline: [
        {
            year: "Founded (2025)",
            title: "Founded (2025)",
            description: "Dara Cold Chain Logistics was established to address the critical need for reliable temperature-controlled transportation in Nigeria's pharmaceutical and perishable goods sectors.",
            icon: Target,
            color: "bg-primary"
        },
        {
            year: "Tech Integration (2025)",
            title: "Tech Integration (2025)",
            description: "Equipped our fleet with real-time GPS and temperature monitoring systems, ensuring every shipment maintains optimal conditions. Added Goods-in-Transit insurance for complete peace of mind.",
            icon: Truck,
            color: "bg-primary"
        },
        {
            year: "Nationwide Expansion (2026)",
            title: "Nationwide Expansion (2026)",
            description: "Expanding enterprise solutions and coverage nationwide. From vaccines and medical supplies to frozen foods and fresh produce—we're your trusted partner for end-to-end cold-chain transportation.",
            icon: TrendingUp,
            color: "#00843D"
        }
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quote: {
        text: "Cold-chain logistics isn't just about transportation—it's about trust, precision, and product integrity. We preserve quality and deliver consistency.",
        author: "— Dara Leadership Team"
    },
    stats: [
        { value: "TrendingUp", label: "Growing number of happy businesses", color: "blue" },
        { value: "69", label: "Trucks on Network via partner model", color: "green" },
        { value: "137", label: "Cold Chain Trips Completed", color: "blue" }
    ]
}

// Services Data
export const servicesData = [
    {
        icon: 'Package',
        image: "/assets/img/pharmaceutical.jpg",
        title: "Pharmaceutical Logistics",
        subtitle: "Temperature-controlled precision",
        description: "Specialized cold chain transportation for vaccines, medicines, and medical supplies. Real-time temperature monitoring ensures product integrity from pickup to delivery.",
        features: [
            "Temperature range: 2°C to 8°C monitoring",
            "Real-time GPS and temperature tracking",
            "Goods-in-Transit (GIT) insurance included",
            "Compliance with pharmaceutical standards"
        ],
        pricing: "Custom Quote",
        deliveryTime: "Same-day available",
        coverage: "Nationwide"
    },
    {
        icon: 'Clock',
        image: "/assets/img/frozen-foods.jpg",
        title: "Frozen Foods Transport",
        subtitle: "Keeping freshness locked in",
        description: "Reliable frozen food logistics with temperature-controlled vehicles. Perfect for ice cream, frozen meats, seafood, and other frozen products requiring -18°C or below.",
        features: [
            "Sub-zero temperature maintenance",
            "Insulated refrigerated trucks",
            "Quick loading and unloading protocols",
            "24/7 temperature monitoring alerts"
        ],
        pricing: "Custom Quote",
        deliveryTime: "1-3 days",
        coverage: "Major cities"
    },
    {
        icon: 'Truck',
        image: "/assets/img/fresh-produce.jpg",
        title: "Fresh Produce Delivery",
        subtitle: "Farm to market, fresh guaranteed",
        description: "Temperature-controlled transport for fresh fruits, vegetables, dairy, and perishable goods. Maintaining optimal freshness throughout the supply chain.",
        features: [
            "Climate-controlled environment (0°C to 15°C)",
            "Rapid transit for maximum freshness",
            "Specialized handling for delicate produce",
            "Direct farm-to-market distribution"
        ],
        pricing: "Custom Quote",
        deliveryTime: "12-48 hours",
        coverage: "All regions"
    },
    {
        icon: 'Users',
        image: "/assets/img/enterprise.jpg",
        title: "Enterprise Cold Chain",
        subtitle: "End-to-end solutions for scale",
        description: "Comprehensive cold chain partnerships for pharmaceutical manufacturers, food distributors, and agricultural exporters. Custom solutions with dedicated fleet and support.",
        features: [
            "Dedicated account management",
            "Custom temperature requirements",
            "Volume discounts and flexible contracts",
            "Advanced analytics and compliance reporting"
        ],
        pricing: "Custom Quote",
        deliveryTime: "Flexible",
        coverage: "Nationwide+"
    }
]

// Why Us Data
export const whyUsData = {
    header: {
        badge: "Our Impact",
        title: "Why businesses choose Dara",
        subtitle: "Fast, reliable logistics with local expertise",
        description: "We deliver predictable logistics that reduce cost, save time, and help you scale — backed by tech, local teams and nationwide coverage."
    },
    impactAreas: [
        {
            icon: Clock,
            title: "Faster delivery, happier customers",
            description: "Cut transit times with optimized routing and local hubs — same-day in major cities, next-day nationwide.",
            impact: "40% faster delivery",
            metric: "Average time reduction"
        },
        {
            icon: MapPin,
            title: "Nationwide coverage & local reach",
            description: "A network spanning all 36 states and hundreds of local partners to deliver where your customers are — reliably and affordably.",
            impact: "36 states covered",
            metric: "Nationwide reach"
        },
        {
            icon: Package,
            title: "Secure handling & near-zero loss",
            description: "End-to-end tracking, secure handling and insurance policies that keep loss below industry benchmarks — protecting your customers and brand.",
            impact: "99.8% success rate",
            metric: "Delivery accuracy"
        },
        {
            icon: Users,
            title: "Logistics that scales your business",
            description: "Affordable, predictable services and tools that let SMEs expand without logistics overhead — from one-off parcels to high-volume fulfilment.",
            impact: "5,000+ SMEs served",
            metric: "Business growth enabled"
        },
        {
            icon: Zap,
            title: "Technology that removes friction",
            description: "Real-time tracking, API integrations and automated notifications that cut admin work and give you control over every shipment.",
            impact: "60% time saved",
            metric: "Operational efficiency"
        },
        {
            icon: Award,
            title: "Committed to excellence",
            description: "We invest in people, sustainability and standards — raising service quality across the industry so our partners can scale with confidence.",
            impact: "Industry leadership",
            metric: "Sector transformation"
        }
    ],
    cta: {
        title: "Ready to Transform Your Business?",
        description: "Join thousands of businesses already experiencing the Dara difference. Let's build Nigeria's future together, one delivery at a time.",
        primaryBtn: { text: "Get a quote", link: "/booking/request" },
        secondaryBtn: { text: "Learn more", link: "/services" }
    }
}

// Climate Tech Data
export const climateTechData = {
    header: {
        badge: "Climate Technology",
        title: "Sustainable Cold Chain",
        subtitle: "Solutions",
        description: "Pioneering eco-friendly logistics with solar-powered refrigeration systems that reduce carbon footprint while maintaining optimal temperature control."
    },
    carouselSlides: [
        {
            id: 1,
            image: "/climateImage/image-3.jpeg",
            title: "Solar-Powered Fleet",
            description: "Our hybrid solar containers harvest energy while in transit, drastically reducing fuel consumption and emissions.",
            icon: Sun,
            color: "bg-green-500"
        },
        {
            id: 2,
            image: "/climateImage/image-1.png",
            title: "Cold Chain Integrity",
            description: "Advanced insulation and active cooling ensuring your perishable goods stay fresh from farm to fork.",
            icon: Snowflake,
            color: "bg-blue-500"
        },
        {
            id: 3,
            image: "/climateImage/image-2.png",
            title: "Global Reach",
            description: "Seamless international logistics network optimized for climate-sensitive cargo transport.",
            icon: Globe,
            color: "bg-amber-500"
        }
    ],
    stats: {
        efficiency: { value: "70%", label: "Energy Cost Reduction" },
        precision: { accuracy: "±0.1°C", minTemp: "-30°C" }
    }
}

// Testimonials Data
export const testimonialsData = {
    header: {
        badge: "Partner Success",
        title: "Powering the Growth of",
        subtitle: "Nigeria's Leading Businesses",
        description: "From ambitious startups to national enterprises, see how we're delivering consistency and scaling impact for our partners nationwide."
    },
    stats: [
        { number: 'TrendingUp', label: 'Growing number of happy businesses' },
        { number: '69', label: 'Trucks on Network via partner model' },
        { number: '137', label: 'Cold Chain Trips Completed' }
    ],
    featured: [
        {
            rating: 5,
            content: "Dara revolutionized our e-commerce operations. Same-day delivery in Lagos increased our customer satisfaction by 85% and repeat orders by 60%. They're not just a logistics partner—they're a growth enabler.",
            author: "Adunni Bankole",
            position: "CEO, ShopNaija",
            company: "ShopNaija",
            image: "/assets/img/adunni.jpg",
            impact: "85% increase in customer satisfaction",
            businessType: "E-commerce"
        },
        {
            rating: 5,
            content: "As a small business owner, I thought reliable logistics was only for big companies. Dara proved me wrong. Their affordable rates and professional service helped us expand from Lagos to 12 states in just 8 months.",
            author: "Chinedu Okafor",
            position: "Founder, Afro Crafts",
            company: "Afro Crafts",
            image: "/assets/img/chinedu.jpg",
            impact: "Expanded to 12 states in 8 months",
            businessType: "SME"
        },
        {
            rating: 5,
            content: "Dara's enterprise solution transformed our supply chain efficiency. Real-time tracking, API integration, and dedicated support reduced our logistics costs by 35% while improving delivery times by 50%.",
            author: "Fatima Al-Hassan",
            position: "Supply Chain Director, MegaMart Nigeria",
            company: "MegaMart",
            image: "/assets/img/fatima.jpg",
            impact: "35% cost reduction, 50% faster delivery",
            businessType: "Enterprise"
        }
    ],
    marquee: [
        { content: "Dara's tracking system is incredible. I always know exactly where my packages are.", author: "Kemi Adebayo", position: "Fashion Designer", company: "Kemi Designs", businessType: "SME", rating: 5, image: null },
        { content: "Same-day delivery in Abuja? Dara made it possible for our restaurant supplies.", author: "Ibrahim Musa", position: "Restaurant Owner", company: "Green Palate", businessType: "SME", rating: 5, image: null },
        { content: "Professional, reliable, and affordable. Dara is our go-to logistics partner.", author: "Grace Okonkwo", position: "Online Store Owner", company: "Gracie's Boutique", businessType: "SME", rating: 5, image: null },
        { content: "From Lagos to Kano in 24 hours. Dara delivers on their promises every time.", author: "Ahmed Bello", position: "Electronics Retailer", company: "Bello Tech", businessType: "SME", rating: 5, image: null }
    ]
}

// Contact Data
export const contactData = {
    hero: {
        badge: "Get In Touch",
        title: "Let's Start Your",
        highlight: "Logistics Journey",
        description: "Get in touch with our team for personalized logistics solutions."
    },
    form: {
        title: "Get Your Custom Quote",
        subtitle: "Tell us about your shipping needs and we'll provide a personalized solution with transparent pricing and delivery timelines."
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
            content: "hello@daraexpress.com\ncontact@daraexpress.com",
            color: "bg-primary"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            content: "10, Hughes Avenue, Yaba, Lagos State",
            color: "bg-primary"
        }
    ]
}
