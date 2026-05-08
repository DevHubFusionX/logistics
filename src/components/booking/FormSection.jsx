export default function FormSection({ icon: Icon, title, children, colorScheme = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600'
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-3 ${colorMap[colorScheme]} rounded-xl shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
