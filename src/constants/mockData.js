// Home Page Data
export const HERO_FEATURES = [
  'Real-time tracking & visibility across your entire supply chain',
  'Multi-modal transportation solutions with nationwide coverage',
  'Express delivery & same-day shipping for urgent shipments',
  'Enterprise-grade API integration & automated workflows'
]

export const HERO_BACKGROUND_IMAGES = [
'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'

]

export const HERO_STATS = [
  { icon: 'Truck', value: '600K+', label: 'Successful Deliveries' },
  { icon: 'Clock', value: '99.2%', label: 'On-Time Performance' },
  { icon: 'MapPin', value: '36', label: 'States Coverage' }
]

export const SERVICES_DATA = [
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

export const ADDITIONAL_SERVICES_DATA = [
  {
    icon: 'Shield',
    title: "Insurance & Protection",
    description: "Comprehensive coverage for your valuable shipments"
  },
  {
    icon: 'MapPin',
    title: "Real-Time Tracking",
    description: "Know exactly where your package is, every step of the way"
  },
  {
    icon: 'Zap',
    title: "API Integration",
    description: "Seamlessly integrate our services into your business systems"
  },
  {
    icon: 'TrendingUp',
    title: "Analytics & Insights",
    description: "Data-driven insights to optimize your logistics operations"
  }
]

export const TESTIMONIALS_DATA = [
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
]

export const MARQUEE_TESTIMONIALS_DATA = [
  { content: "Dara's tracking system is incredible. I always know exactly where my packages are.", author: "Kemi Adebayo", position: "Fashion Designer", rating: 5 },
  { content: "Same-day delivery in Abuja? Dara made it possible for our restaurant supplies.", author: "Ibrahim Musa", position: "Restaurant Owner", rating: 5 },
  { content: "Professional, reliable, and affordable. Dara is our go-to logistics partner.", author: "Grace Okonkwo", position: "Online Store Owner", rating: 5 },
  { content: "From Lagos to Kano in 24 hours. Dara delivers on their promises every time.", author: "Ahmed Bello", position: "Electronics Retailer", rating: 5 }
]

export const TRUST_STATS_DATA = [
  { number: '4.9/5', label: 'Average Rating' },
  { number: '98%', label: 'Customer Retention' },
  { number: '1000+', label: 'Happy Businesses' },
  { number: '600K+', label: 'Successful Deliveries' }
]

// KPI Data
export const KPI_DATA = [
  {
    id: 'active_trucks',
    title: 'Active Trucks',
    value: '48',
    change: 8.3,
    period: '24h',
    sparklineData: [42, 44, 46, 45, 47, 49, 48],
    color: 'blue'
  },
  {
    id: 'ongoing_trips',
    title: 'Ongoing Trips',
    value: '127',
    change: 5.2,
    period: '24h',
    sparklineData: [115, 118, 122, 120, 125, 128, 127],
    color: 'blue'
  },
  {
    id: 'completed',
    title: 'Completed Deliveries',
    value: '1,847',
    change: 12.4,
    period: '7d',
    sparklineData: [1600, 1650, 1700, 1750, 1800, 1820, 1847],
    color: 'green'
  },
  {
    id: 'failed',
    title: 'Failed Deliveries',
    value: '23',
    change: -15.2,
    period: '7d',
    sparklineData: [35, 32, 28, 26, 24, 25, 23],
    color: 'green'
  },
  {
    id: 'temperature',
    title: 'Avg Truck Temperature',
    value: '22.5',
    unit: '°C',
    change: 2.1,
    period: '24h',
    sparklineData: [21, 21.5, 22, 22.5, 23, 22.8, 22.5],
    color: 'blue'
  },
  {
    id: 'revenue',
    title: 'Daily Revenue',
    value: '₦2.4M',
    change: 18.7,
    period: '24h',
    sparklineData: [1.8, 2.0, 2.1, 2.3, 2.2, 2.5, 2.4],
    color: 'green'
  },
  {
    id: 'alerts',
    title: 'Active Alerts',
    value: '8',
    change: -25.0,
    period: '24h',
    sparklineData: [15, 13, 11, 10, 9, 10, 8],
    color: 'green'
  }
]

// Route mappings for KPI navigation
export const KPI_ROUTES = {
  ontime: '/analytics/delivery-performance',
  shipments: '/shipments',
  fleet: '/fleet',
  delivery_time: '/analytics/delivery-times',
  fuel_cost: '/analytics/fuel-costs',
  warehouse: '/warehouses',
  satisfaction: '/analytics/customer-satisfaction'
}

// Maintenance schedule data
export const MAINTENANCE_SCHEDULE = [
  { id: 'VH001', plate: 'ABC-123', type: 'Oil Change', due: '2024-01-25', priority: 'high', mileage: 45230 },
  { id: 'VH003', plate: 'DEF-789', type: 'Brake Inspection', due: '2024-01-28', priority: 'medium', mileage: 38500 },
  { id: 'VH002', plate: 'XYZ-456', type: 'Tire Rotation', due: '2024-02-02', priority: 'low', mileage: 32100 },
  { id: 'VH004', plate: 'GHI-012', type: 'Engine Service', due: '2024-02-05', priority: 'high', mileage: 52000 }
]

// Auto-schedule thresholds
export const AUTO_SCHEDULE_THRESHOLDS = {
  'Oil Change': 5000,
  'Brake Inspection': 15000,
  'Tire Rotation': 10000,
  'Engine Service': 20000
}

// Filter options
export const FILTER_OPTIONS = {
  status: [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'exception', label: 'Exception' }
  ],
  priority: [
    { value: '', label: 'All Priority' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ],
  dateRange: [
    { value: '', label: 'All Dates' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ]
}