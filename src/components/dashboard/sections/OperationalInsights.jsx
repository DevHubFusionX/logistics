import { BarChart3, TrendingUp, Truck } from 'lucide-react'
import { Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function OperationalInsights({ loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 h-80 animate-pulse" />
        ))}
      </div>
    )
  }

  const deliverySuccessData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Success Rate (%)',
      data: [94, 96, 92, 95, 97, 93, 94],
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      borderColor: 'rgb(34, 197, 94)',
      borderWidth: 2,
      borderRadius: 6
    }]
  }

  const revenueTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Revenue (₦M)',
      data: [2.1, 2.3, 2.0, 2.5, 2.7, 2.2, 2.4],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 2,
      borderRadius: 6
    }]
  }

  const fleetStatusData = {
    labels: ['Active', 'Idle'],
    datasets: [{
      data: [48, 12],
      backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(156, 163, 175, 0.8)'],
      borderColor: ['rgb(34, 197, 94)', 'rgb(156, 163, 175)'],
      borderWidth: 2
    }]
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      },
      x: {
        grid: { display: false }
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8
      }
    },
    cutout: '70%'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Delivery Success</h3>
        </div>
        <div className="h-48">
          <Bar data={deliverySuccessData} options={barOptions} />
        </div>
        <div className="mt-4 text-center">
          <div className="text-3xl font-bold text-green-600">94.5%</div>
          <div className="text-sm text-gray-500">Weekly Average</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
        </div>
        <div className="h-48">
          <Bar data={revenueTrendData} options={barOptions} />
        </div>
        <div className="mt-4 text-center">
          <div className="text-3xl font-bold text-blue-600">₦16.2M</div>
          <div className="text-sm text-gray-500">Weekly Total</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Truck className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Fleet Status</h3>
        </div>
        <div className="h-48 flex items-center justify-center">
          <div className="w-48 h-48">
            <Doughnut data={fleetStatusData} options={doughnutOptions} />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600">48</div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-600">12</div>
            <div className="text-sm text-gray-500">Idle</div>
          </div>
        </div>
      </div>
    </div>
  )
}
