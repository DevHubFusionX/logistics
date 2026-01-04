import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/img/dara-logo.png"
                alt="Dara Express Logo"
                className="h-6 sm:h-8 w-auto object-contain filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm sm:text-base mb-4 max-w-md">
              Nigeria's most trusted logistics partner, connecting businesses nationwide with reliable, fast, and affordable shipping solutions.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <div className="space-y-1.5 sm:space-y-2">
              <a href="/services" className="block text-sm sm:text-base text-gray-400 hover:text-primary transition-colors">Services</a>
              <a href="/tracking" className="block text-sm sm:text-base text-gray-400 hover:text-primary transition-colors">Track Package</a>
              <a href="/pricing" className="block text-sm sm:text-base text-gray-400 hover:text-primary transition-colors">Pricing</a>
              <a href="/about" className="block text-sm sm:text-base text-gray-400 hover:text-primary transition-colors">About Us</a>
              <a href="/contact" className="block text-sm sm:text-base text-gray-400 hover:text-primary transition-colors">Contact</a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <div>+234 811 577 9007</div>
                  <div>+234 912 116 8485</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <div>hello@daraexpress.com</div>
                  <div>contact@daraexpress.com</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <div>10, Hughes Avenue, Yaba, Lagos State</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Dara Logistics. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Available 24/7</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}