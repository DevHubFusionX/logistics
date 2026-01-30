import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialFormData = {
    fullNameOrBusiness: '',
    contactPhone: '',
    email: '',
    customerType: 'Business',
    pickupPerson: { name: '', phone: '', email: '' },
    receiverPerson: { name: '', phone: '', email: '' },
    pickupLocation: { address: '', city: 'Lagos', state: 'Nigeria' },
    dropoffLocation: { address: '', city: '', state: 'Nigeria' },
    goodsType: '',
    cargoWeightKg: '',
    truckSize: '',
    quantity: 1,
    isFragile: false,
    isPerishable: false,
    tempControlCelsius: 20,
    vehicleType: 'Van',
    estimatedPickupDate: '',
    estimatedDeliveryDate: '',
    notes: '',
    declaredValue: ''
}

/**
 * Booking Store
 * 
 * Manages the state of the booking process, including form data,
 * current step, and result IDs.
 */
export const useBookingStore = create(
    persist(
        (set, get) => ({
            // State
            step: 1,
            formData: initialFormData,
            bookingId: null,
            estimatedCost: null,
            paymentMethod: 'card',

            // Actions
            setStep: (step) => set({ step }),
            setBookingId: (id) => set({ bookingId: id }),
            setEstimatedCost: (cost) => set({ estimatedCost: cost }),
            setPaymentMethod: (method) => set({ paymentMethod: method }),

            updateFormData: (data) => set((state) => ({
                formData: { ...state.formData, ...data }
            })),

            updateNestedFormData: (parent, data) => set((state) => ({
                formData: {
                    ...state.formData,
                    [parent]: { ...state.formData[parent], ...data }
                }
            })),

            resetBooking: () => set({
                step: 1,
                formData: initialFormData,
                bookingId: null,
                estimatedCost: null,
                paymentMethod: 'card'
            }),

            // Sync user data to form
            syncUserToForm: (user) => {
                if (!user) return
                const { formData } = get()
                set({
                    formData: {
                        ...formData,
                        fullNameOrBusiness: formData.fullNameOrBusiness || user.companyName || (user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : ''),
                        contactPhone: formData.contactPhone || user.phone || '',
                        email: formData.email || user.email || ''
                    }
                })
            }
        }),
        {
            name: 'dara-booking-store',
            partialize: (state) => ({
                // We only want to persist certain parts of the state
                formData: state.formData,
                step: state.step,
                bookingId: state.bookingId,
                estimatedCost: state.estimatedCost
            })
        }
    )
)
