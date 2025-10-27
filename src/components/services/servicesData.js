import { Truck, Package, Globe, Building2, Plane, Ship, Clock, Shield, Users, MapPin, TrendingUp } from 'lucide-react'

export const stats = [
  { icon: MapPin, value: '36', label: 'States Covered' },
  { icon: Package, value: '50K+', label: 'Successful Deliveries' },
  { icon: Users, value: '1K+', label: 'Happy Businesses' },
  { icon: TrendingUp, value: '99.2%', label: 'On-Time Performance' }
]

export const mainServices = [
  {
    icon: Truck,
    title: "Freight & Cargo",
    category: "freight",
    description: "Comprehensive freight solutions for bulk shipments across Nigeria with real-time tracking and secure handling.",
    features: ["Multi-modal transport", "Secure handling", "Cargo insurance", "Temperature control"],
    pricing: "Starting at ₦15,000",
    image: "https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Package,
    title: "Express Delivery",
    category: "delivery",
    description: "Same-day and next-day delivery services across major Nigerian cities with real-time tracking and proof of delivery.",
    features: ["Same-day delivery", "Real-time tracking", "Proof of delivery", "Route optimization"],
    pricing: "Starting at ₦2,500",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Globe,
    title: "Standard Shipping",
    category: "international",
    description: "Reliable nationwide shipping connecting all 36 states with affordable rates and flexible delivery options.",
    features: ["36 states coverage", "Flexible scheduling", "Package insurance", "SMS notifications"],
    pricing: "Starting at ₦1,200",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Building2,
    title: "Enterprise Solutions",
    category: "warehouse",
    description: "Comprehensive logistics partnerships for growing businesses with dedicated support and custom solutions.",
    features: ["Dedicated support", "API integration", "Volume discounts", "Advanced analytics"],
    pricing: "Custom pricing",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
]

export const additionalServices = [
  {
    icon: Plane,
    title: "Express Air Freight",
    description: "Priority air transport for time-sensitive shipments with guaranteed delivery windows and premium handling.",
    features: ["24-48 hour delivery", "Priority handling", "Live tracking", "Temperature control"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pricing: "From ₦25,000"
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    description: "Cost-effective sea transport for large volume shipments with full container options and port services.",
    features: ["Full/partial containers", "Port-to-port service", "Competitive rates", "Customs clearance"],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pricing: "Custom quotes"
  },
  {
    icon: Clock,
    title: "Supply Chain Management",
    description: "End-to-end supply chain optimization with analytics, performance monitoring and process improvement.",
    features: ["Process optimization", "Analytics dashboard", "Performance metrics", "Cost reduction"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pricing: "From ₦50,000/month"
  },
  {
    icon: Shield,
    title: "Cargo Insurance",
    description: "Comprehensive protection for your shipments with flexible coverage options and 24/7 claims support.",
    features: ["Full coverage options", "Claims support", "Risk assessment", "Global protection"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pricing: "From 2% of cargo value"
  }
]

export const process = [
  { step: 1, title: "Request Quote", description: "Tell us your shipping needs" },
  { step: 2, title: "Get Pricing", description: "Receive instant quote" },
  { step: 3, title: "Book Shipment", description: "Confirm and schedule pickup" },
  { step: 4, title: "Track & Deliver", description: "Monitor in real-time" }
]