import { Truck, Warehouse, Globe, Users, Package, Shield, Thermometer, MapPin } from 'lucide-react'

export const servicesData = {
    hero: {
        title: "Our",
        highlight: "Services",
        description: "At Dara Cold Chain Logistics, we provide a full suite of cold chain and temperature-controlled logistics solutions designed to help businesses in pharmaceuticals, healthcare, food, and agriculture move products efficiently and safely.",
        subDescription: "Our services ensure that goods maintain their quality, integrity, and compliance standards from origin to destination."
    },
    services: [
        {
            icon: Truck,
            title: 'Delivery Services',
            color: 'blue',
            description: 'Last-mile and intercity delivery of temperature-sensitive products across Nigeria.',
            features: [
                'Consistent temperature control throughout transit',
                'Real-time shipment tracking and visibility',
                'Goods-in-Transit (GIT) insurance for every trip',
                'Prompt delivery timelines backed by professional drivers'
            ],
            gradient: 'from-blue-50 to-cyan-50',
            iconBg: 'bg-blue-600',
            guarantee: 'What We Guarantee',
            highlight: "Our fleet of refrigerated trucks and vans is equipped with real-time GPS and temperature monitoring systems, ensuring your goods are transported under optimal conditions every step of the way."
        },
        {
            icon: Warehouse,
            title: 'Warehouse & Cold Storage',
            color: 'green',
            description: 'Temperature-controlled facilities for secure short-term and long-term storage.',
            features: [
                '24/7 temperature and humidity monitoring systems',
                'Multi-zone cold rooms (2°C to 25°C and below 0°C)',
                'Power redundancy for uninterrupted cooling',
                'Inventory tracking and management systems',
                'Secure access with CCTV surveillance'
            ],
            gradient: 'from-green-50 to-emerald-50',
            iconBg: 'bg-green-600',
            guarantee: 'Key Features',
            highlight: "We maintain multiple temperature zones — from ambient to deep-freeze — ensuring your products are stored within regulatory and quality standards."
        },
        {
            icon: Globe,
            title: 'Freight Operations',
            color: 'purple',
            description: 'Nationwide and cross-border freight solutions for bulk cold chain movement.',
            features: [
                'Full Truckload (FTL) and Less-than-Truckload (LTL) shipments',
                'Route optimization for cost and time efficiency',
                'IoT-enabled fleet management for live tracking',
                'Integrated customs and documentation support',
                'Multi-modal logistics partnerships'
            ],
            gradient: 'from-purple-50 to-pink-50',
            iconBg: 'bg-purple-600',
            guarantee: 'Our Capabilities',
            highlight: "Our freight operations cater to manufacturers, distributors, and exporters requiring large-scale refrigerated transport across Nigeria and West Africa."
        },
        {
            icon: Users,
            title: 'Supply Chain Consultations',
            color: 'orange',
            description: 'Expert guidance to build smarter, more resilient cold-chain supply chains.',
            features: [
                'Cold chain route and cost optimization',
                'Regulatory compliance and quality assurance guidance',
                'Fleet utilization and logistics performance analysis',
                'Warehouse and distribution planning',
                'Technology integration for end-to-end visibility'
            ],
            gradient: 'from-orange-50 to-amber-50',
            iconBg: 'bg-orange-600',
            guarantee: 'Consulting Services',
            highlight: "Our team of supply chain experts works with clients to identify inefficiencies, reduce spoilage, and design scalable cold-chain distribution systems."
        }
    ],
    stats: [
        { value: "1000+", label: "Growing number of happy businesses" },
        { value: "69", label: "Trucks on Network via partner model" },
        { value: "137", label: "Cold Chain Trips Completed" }
    ],
    whyChooseUs: [
        {
            icon: Thermometer,
            title: "Temperature Control",
            description: "Advanced monitoring systems ensure optimal conditions 24/7 with real-time alerts and automated controls",
            color: "blue"
        },
        {
            icon: Shield,
            title: "Full Insurance",
            description: "Comprehensive GIT insurance coverage for complete peace of mind and product security",
            color: "green"
        },
        {
            icon: MapPin,
            title: "Real-Time Tracking",
            description: "Live GPS tracking and complete visibility throughout the entire journey",
            color: "purple"
        }
    ],
    industries: [
        { name: 'Pharmaceuticals', icon: Package, desc: 'Vaccines & medicines' },
        { name: 'Healthcare', icon: Shield, desc: 'Medical supplies' },
        { name: 'Food & Beverage', icon: Thermometer, desc: 'Frozen & fresh produce' },
        { name: 'Agriculture', icon: Globe, desc: 'Export & distribution' }
    ],
    cta: {
        badge: "Keeping Nigeria's Cold Supply Chain Moving",
        title: "Ready to Move Your Products Safely?",
        description: "At Dara Cold Chain Logistics, we move Nigeria's most sensitive products safely — from factory to final destination. Experience the difference of professional cold chain logistics.",
        primaryBtn: { text: "Get Started Today", link: "/auth/signup" },
        secondaryBtn: { text: "Contact Sales", link: "/contact" }
    }
}
