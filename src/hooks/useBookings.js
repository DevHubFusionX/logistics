import { useState, useEffect } from 'react'
import bookingService from '../services/bookingService'
import toast from 'react-hot-toast'

export const useBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await bookingService.getBookings()
      setBookings(response.data?.records || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateBooking = async (bookingId, data) => {
    try {
      await bookingService.updateBooking(bookingId, data)
      toast.success('Booking updated successfully!')
      await fetchBookings()
    } catch (error) {
      toast.error('Failed to update booking')
      throw error
    }
  }

  const cancelBooking = async (bookingId, confirmed = false) => {
    if (!confirmed && !window.confirm('Are you sure you want to cancel this booking?')) return
    try {
      await bookingService.cancelBooking(bookingId)
      toast.success('Booking cancelled successfully!')
      await fetchBookings()
    } catch (error) {
      toast.error('Failed to cancel booking')
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return { bookings, loading, updateBooking, cancelBooking, refetch: fetchBookings }
}
