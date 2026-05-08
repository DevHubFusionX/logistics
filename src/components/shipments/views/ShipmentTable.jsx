import { Eye, UserCheck, Printer, AlertTriangle, ArrowRight, MoreHorizontal } from 'lucide-react'
import { STATUS_COLORS } from '../../../constants'
import { getPriorityColor, getSLARisk, getSLARiskColor, getInitials } from '../../../utils/helpers'

export default function ShipmentTable({ shipments, onViewShipment, onReassignDriver, onPrintLabel }) {

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shipment ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ETA / Actual
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight/Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SLA Risk
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shipments.map((shipment) => {
              const slaRisk = getSLARisk(shipment.eta, shipment.status)
              return (
                <tr key={shipment.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{shipment.id}</div>
                    <div className="text-sm text-gray-500">{shipment.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${STATUS_COLORS[shipment.status]}`}>
                      {shipment.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{shipment.origin}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <span className="font-medium">{shipment.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="font-medium text-gray-900">{shipment.eta}</div>
                    {shipment.actual && (
                      <div className="text-gray-500">{shipment.actual}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {getInitials(shipment.driver)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{shipment.driver}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{shipment.weight}</div>
                    <div className="text-gray-500">{shipment.volume}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getPriorityColor(shipment.priority)}`}>
                      {shipment.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {slaRisk && (
                      <div className={`flex items-center gap-1 ${getSLARiskColor(slaRisk)}`}>
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-xs font-medium">{slaRisk}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onViewShipment(shipment.id)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onReassignDriver(shipment.id)}
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Reassign Driver"
                      >
                        <UserCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onPrintLabel(shipment.id)}
                        className="text-purple-600 hover:text-purple-900 p-1 rounded"
                        title="Print Label"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}