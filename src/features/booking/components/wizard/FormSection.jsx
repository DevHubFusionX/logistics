export default function FormSection({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-none sm:rounded-2xl border-y sm:border border-gray-100 p-5 sm:p-6 w-full">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-sky-700" />
        </div>
        <h3 className="font-heading font-bold text-gray-900 text-base sm:text-lg">{title}</h3>
      </div>
      {children}
    </div>
  )
}
