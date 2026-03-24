import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const goodsTypes = ['Pharmaceuticals', 'Frozen Foods', 'Construction Materials', 'Electronic Components', 'Consumer Goods', 'Chemicals']
const companies = ['Newrest', 'Integrated Dairies', 'Olpharm', 'Food Bridge', 'Wihu Industries', 'FMCG Client', 'Dangote Group', 'Nestle Nigeria', 'Jumia']
const truckSizes = ['Small (2 Ton)', 'Medium (5 Ton)', 'Reefer (10 Ton)', 'Large (20 Ton)', 'Trailer (30 Ton)']
const locations = ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin City', 'Jos', 'Kaduna', 'Enugu']
const fleetCompanies = ['Dara Logistics', 'GIG Logistics', 'DHL Nigeria', 'Kobo360', 'Ace Logistics']

const generateData = () => {
  const data = []
  const now = new Date()
  
  // Last 4 months (0 to 3)
  for (let m = 0; m < 4; m++) {
    const tripCount = Math.floor(Math.random() * 6) + 20 // 20 to 25 trips
    for (let i = 0; i < tripCount; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)]
      const truckSize = truckSizes[Math.floor(Math.random() * truckSizes.length)]
      const goodsType = goodsTypes[Math.floor(Math.random() * goodsTypes.length)]
      
      let pickup = locations[Math.floor(Math.random() * locations.length)]
      let delivery = locations[Math.floor(Math.random() * locations.length)]
      while (delivery === pickup) {
        delivery = locations[Math.floor(Math.random() * locations.length)]
      }
      
      const fleet = fleetCompanies[Math.floor(Math.random() * fleetCompanies.length)]
      const status = Math.random() > 0.1 ? 'Fulfilled' : 'Unfulfilled'
      const revenue = Math.floor(Math.random() * 4000000) + 1500000
      
      // Random day in the month
      const day = Math.floor(Math.random() * 28) + 1
      const date = new Date(now.getFullYear(), now.getMonth() - m, day)
      
      data.push({
        id: `ORD-${m}${String(i).padStart(3, '0')}`, // Unique-ish ID
        company,
        truckSize,
        goodsType,
        pickup,
        delivery,
        fleet,
        status,
        revenue,
        date: date.toISOString(),
        reason: status === 'Unfulfilled' ? 'Resource shortage' : '-'
      })
    }
  }
  
  // Sort by date descending
  return data.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// Persist across sessions if possible, or just let it stay in memory for the session
let mockOrders = generateData()

/**
 * Hook for fetching dispatch orders for the table view
 */
export function useOrdersTableQuery(params = {}) {
    return useQuery({
        queryKey: ['admin', 'orders-list', params],
        queryFn: async () => {
            // Simulated delay
            await new Promise(r => setTimeout(r, 600))
            
            return {
                records: mockOrders,
                pagination: {
                    total: mockOrders.length,
                    page: params.page || 1,
                    limit: params.limit || 100
                }
            }
        },
        staleTime: 5 * 60 * 1000,
    })
}

/**
 * Hook for CRUD operations on the dispatch orders
 * Ready for API integration - just replace the mock logic with axios/fetch calls
 */
export function useOrderMutations() {
    const queryClient = useQueryClient()

    const addOrder = useMutation({
        mutationFn: async (newOrder) => {
            await new Promise(r => setTimeout(r, 800))
            const order = { 
                ...newOrder, 
                id: `ORD-${Date.now().toString().slice(-6)}`,
                date: newOrder.date || new Date().toISOString()
            }
            mockOrders = [order, ...mockOrders]
            return order
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'orders-list'] })
        }
    })

    const updateOrder = useMutation({
        mutationFn: async (updatedOrder) => {
            await new Promise(r => setTimeout(r, 800))
            mockOrders = mockOrders.map(o => o.id === updatedOrder.id ? { ...o, ...updatedOrder } : o)
            return updatedOrder
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'orders-list'] })
        }
    })

    const deleteOrder = useMutation({
        mutationFn: async (id) => {
            await new Promise(r => setTimeout(r, 800))
            mockOrders = mockOrders.filter(o => o.id !== id)
            return id
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'orders-list'] })
        }
    })

    return { addOrder, updateOrder, deleteOrder }
}
