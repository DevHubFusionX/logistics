import { AppLayout, PageHeader } from '../index'

export default function PlaceholderPage({ 
  title, 
  subtitle, 
  icon: Icon, 
  description, 
  buttonText = "Get Started",
  buttonColor = "blue" 
}) {
  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    purple: "bg-purple-600 hover:bg-purple-700",
    orange: "bg-orange-600 hover:bg-orange-700"
  }

  return (
    <AppLayout>
      <PageHeader title={title} subtitle={subtitle} />
      
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        {Icon && <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <button className={`${colorClasses[buttonColor]} text-white px-6 py-3 rounded-lg transition-colors`}>
          {buttonText}
        </button>
      </div>
    </AppLayout>
  )
}