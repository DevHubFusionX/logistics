
import {
    ArrowRight, Package, Truck, MapPin, Clock, Shield, Zap, TrendingUp,
    Users, Target, Award, Leaf, Sun, Thermometer, Snowflake, Globe,
    Phone, Mail, CheckCircle
} from 'lucide-react'



// Hero Data
export const heroData = {
    title: {
        prefix: "Nigeria's Leading",
        highlight: "Cold Chain Logistics",
        suffix: "and Reefer Haulage Company"
    },
    description: "Temperature-controlled transportation and cold storage solutions for food, pharmaceutical, and FMCG businesses across Nigeria.\n\nWith a network of over 120 refrigerated trucks, real-time shipment visibility, and strict temperature compliance, Dara helps businesses move sensitive products safely, efficiently, and on time.",
    features: [
        'Premium Cold Chain Logistics Nigeria: Real-time reefer monitoring',
        'Nationwide Haulage Services Nigeria: Dedicated refrigerated fleet',
        'Reefer Trucks in Nigeria: Express transport for vaccines & perishables',
        'Top Logistics Companies in Nigeria: 24/7 temperature tracking'
    ],


    stats: [
        { icon: 'TrendingUp', value: 'TrendingUp', label: 'Growing number of happy businesses' },
        { icon: 'Truck', value: '120+', label: 'Trucks on Network via partner model' },
        { icon: 'Clock', value: '137', label: 'Cold Chain Trips Completed' }
    ],
    buttons: {
        primary: { text: "Book a Shipment", link: "/booking/request" },
        secondary: { text: "Schedule a Consultation", link: "/tracking" }
    }
}


// About Data
export const aboutData = {
    badge: "Our Journey",
    title: {
        prefix: "A Simple and Reliable",
        highlight: "Transport Partner"
    },
    description: "Dara Express is a simple, reliable transport company in Abuja and Lagos. We make it easy to move items that need to stay cold, like food and medicine, so they arrive fresh and safe.",
    timeline: [
        {
            year: "How We Started",
            title: "How We Started",
            description: "We started Dara because we saw how hard it was to transport fresh food and medicine in Nigeria without them spoiling on the way.",
            icon: Target,
            color: "bg-primary"
        },
        {
            year: "Adding Tracking",
            title: "Adding Tracking",
            description: "We put temperature sensors and GPS trackers in our trucks so you can always check how cold your items are and where they are on the road.",
            icon: Truck,
            color: "bg-primary"
        },
        {
            year: "Delivering Everywhere",
            title: "Delivering Everywhere",
            description: "Today, we deliver to all parts of Nigeria. From vaccines to fresh farm produce, we make sure they stay cold and arrive safe.",
            icon: TrendingUp,
            color: "#00843D"
        }
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quote: {
        text: "Keeping things cold is not just about driving a truck—it's about making sure your food and medicines arrive exactly as fresh as they started.",
        author: "— Dara Leadership Team"
    },
    stats: [
        { value: "TrendingUp", label: "Growing number of happy businesses", color: "blue" },
        { value: "120+", label: "Trucks on Network via partner model", color: "green" },
        { value: "137", label: "Cold Chain Trips Completed", color: "blue" }
    ]
}

// Services Data
export const servicesData = [
    {
        icon: 'Package',
        image: "/assets/img/pharmaceutical.jpg",
        title: "Vaccines & Medicine Transport",
        subtitle: "Keeping medical supplies safe",
        description: "We transport vaccines, medicines, and medical supplies in clean, temperature-controlled trucks to keep them safe and effective.",
        features: [
            "Precise temperature control between 2°C to 8°C",
            "Clean cold rooms in Lagos and Abuja for storage",
            "Full insurance cover for all medical shipments",
            "Reliable refrigerated trucks that do not fail"
        ],
        pricing: "Custom Quote",
        deliveryTime: "Same-day available",
        coverage: "Lagos, Abuja, Port Harcourt"
    },
    {
        icon: 'Clock',
        image: "/assets/img/frozen-foods.jpg",
        title: "Frozen Food Delivery",
        subtitle: "Keeping food frozen on the road",
        description: "We deliver frozen foods like fish, meat, and poultry using trucks that stay freezing cold at -18°C all through the journey.",
        features: [
            "Deep-freeze storage spaces at our local hubs",
            "Dry trucks also available for regular food items",
            "Fast transport from Lagos to Abuja",
            "Helpful driver and support team available 24/7"
        ],
        pricing: "Custom Quote",
        deliveryTime: "1-3 days",
        coverage: "Nationwide Haulage"
    },
    {
        icon: 'Truck',
        image: "/assets/img/fresh-produce.jpg",
        title: "Fresh Produce Transport",
        subtitle: "From farm to market",
        description: "We transport fresh fruits and vegetables from farms to cities, keeping them cool so they do not rot or lose their value.",
        features: [
            "Cool storage rooms for fresh fruits and veggies",
            "Easy truck hire in Lagos and Abuja",
            "Direct transport without any delays",
            "Careful handling so your harvest doesn't get crushed"
        ],
        pricing: "Custom Quote",
        deliveryTime: "12-48 hours",
        coverage: "All 36 States"
    },
    {
        icon: 'Users',
        image: "/assets/img/enterprise.jpg",
        title: "Large Cargo Transport",
        subtitle: "Moving big shipments easily",
        description: "If you have large shipments of goods, we provide big trucks to move them from ports or warehouses to anywhere in Nigeria.",
        features: [
            "Reliable long-distance moving across the country",
            "Big trucks available for dry and cold goods",
            "Direct point-to-point delivery",
            "Full customer support every step of the way"
        ],
        pricing: "Custom Quote",
        deliveryTime: "Daily Departures",
        coverage: "Regional Hubs"
    },
    {
        icon: 'Shield',
        image: "/assets/img/service-1.jpg",
        title: "Door-to-Door Delivery",
        subtitle: "Right to your customer",
        description: "We deliver items directly to your customer's home or shop in Lagos, Abuja, and Port Harcourt, making sure they stay in perfect condition.",
        features: [
            "Refrigerated vans for small packages",
            "Real-time updates sent straight to your phone",
            "Digital proof when delivery is complete",
            "Same-day delivery slots in major cities"
        ],
        pricing: "Custom Quote",
        deliveryTime: "Same-day / Next-day",
        coverage: "Lagos, Abuja, PH"
    }
]

// Why Us Data
export const whyUsData = {
    header: {
        badge: "Why Us",
        title: "Why businesses choose Dara",
        subtitle: "Simple, reliable transport that you can trust",
        description: "We make logistics easy. We save you money, deliver your items faster, and keep you updated every step of the way."
    },
    impactAreas: [
        {
            icon: Clock,
            title: "Faster delivery for your peace of mind",
            description: "We use the best routes to deliver your goods quickly — same-day in major cities, next-day across the country.",
            impact: "40% faster",
            metric: "Shorter travel times"
        },
        {
            icon: MapPin,
            title: "We deliver everywhere in Nigeria",
            description: "Our network covers all 36 states, meaning we can deliver to your customers no matter where they are.",
            impact: "All 36 states",
            metric: "Nationwide coverage"
        },
        {
            icon: Package,
            title: "Zero damage, zero worries",
            description: "We handle your goods with care and have full insurance, so you do not have to worry about missing or damaged items.",
            impact: "99.8% safe deliveries",
            metric: "Arrived in perfect shape"
        },
        {
            icon: Users,
            title: "Built to help your business grow",
            description: "Whether you are sending one package or renting a whole truck, we have cheap options that fit your budget.",
            impact: "5,000+ businesses helped",
            metric: "Growing together"
        },
        {
            icon: Zap,
            title: "Track everything on your phone",
            description: "No need to call the driver. See where your truck is and its live temperature directly on our platform.",
            impact: "60% less stress",
            metric: "Saved time and effort"
        },
        {
            icon: Award,
            title: "Friendly and professional team",
            description: "Our drivers and support team are well-trained, polite, and always ready to help you solve any issue.",
            impact: "Best-in-class support",
            metric: "Here for you 24/7"
        }
    ],
    cta: {
        title: "Ready to send a shipment?",
        description: "Join thousands of businesses that trust us to deliver their goods safely and on time.",
        primaryBtn: { text: "Get a quote", link: "/booking/request" },
        secondaryBtn: { text: "See our services", link: "/services" }
    }
}

// Climate Tech Data
export const climateTechData = {
    header: {
        badge: "Solar Technology",
        title: "Solar-Powered Trucks",
        subtitle: "Good for the Earth",
        description: "We use solar power to keep our refrigerated trucks cold. This protects the environment and reduces fuel costs."
    },
    carouselSlides: [
        {
            id: 1,
            image: "/climateImage/image-3.jpeg",
            title: "Powered by the Sun",
            description: "Our trucks use solar panels to run their cooling systems, saving fuel and reducing smoke emissions.",
            icon: Sun,
            color: "bg-green-500"
        },
        {
            id: 2,
            image: "/climateImage/image-1.png",
            title: "Always Cold and Fresh",
            description: "Thick insulation and modern cooling keep food and medicines fresh from start to finish.",
            icon: Snowflake,
            color: "bg-blue-500"
        },
        {
            id: 3,
            image: "/climateImage/image-2.png",
            title: "Seamless Delivery",
            description: "A well-planned delivery system designed to move temperature-sensitive goods without waste.",
            icon: Globe,
            color: "bg-amber-500"
        }
    ],
    stats: {
        efficiency: { value: "70%", label: "Lower Carbon Emissions" },
        precision: { accuracy: "±0.1°C", minTemp: "Perfect Temperature" }
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
        { number: '120+', label: 'Trucks on Network via partner model' },
        { number: '137', label: 'Cold Chain Trips Completed' }
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
            content: "hello@daraexpress.com\ncontact@daraexpress.com",
            color: "bg-red-600"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            content: "MJS House, 366 Murtala Muhammed Road, Yaba, Lagos, Nigeria",
            color: "bg-blue-600"
        }
    ]
}
