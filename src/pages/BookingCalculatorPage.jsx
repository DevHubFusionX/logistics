import PriceCalculator from '../components/bookings/PriceCalculator'
import { Navbar, Footer } from '../components/common'

export default function BookingCalculatorPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
                <PriceCalculator />
            </main>
        </div>
    )
}
