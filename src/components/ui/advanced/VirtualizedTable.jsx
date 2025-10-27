import { useState, useMemo, useCallback } from 'react'
import { ChevronUp, ChevronDown, Download, Save, Edit2 } from 'lucide-react'

export default function VirtualizedTable({ 
  data = [], 
  columns = [], 
  height = 400,
  onExport,
  onSaveView,
  enableInlineEdit = false 
}) {
  const [sortConfig, setSortConfig] = useState([])
  const [columnWidths, setColumnWidths] = useState({})
  const [editingCell, setEditingCell] = useState(null)

  const sortedData = useMemo(() => {
    if (!sortConfig.length) return data
    
    return [...data].sort((a, b) => {
      for (const { key, direction } of sortConfig) {
        const aVal = a[key]
        const bVal = b[key]
        
        if (aVal < bVal) return direction === 'asc' ? -1 : 1
        if (aVal > bVal) return direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [data, sortConfig])

  const handleSort = useCallback((columnKey) => {
    setSortConfig(prev => {
      const existing = prev.find(s => s.key === columnKey)
      if (!existing) {
        return [...prev, { key: columnKey, direction: 'asc' }]
      }
      if (existing.direction === 'asc') {
        return prev.map(s => s.key === columnKey ? { ...s, direction: 'desc' } : s)
      }
      return prev.filter(s => s.key !== columnKey)
    })
  }, [])

  const handleCellEdit = useCallback((rowIndex, columnKey, value) => {
    // Implement cell editing logic
    console.log('Edit cell:', rowIndex, columnKey, value)
    setEditingCell(null)
  }, [])

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Table Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Data Table ({data.length} rows)</h3>
        <div className="flex gap-2">
          <button 
            onClick={onSaveView}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
            aria-label="Save current view"
          >
            <Save className="w-4 h-4" />
            Save View
          </button>
          <button 
            onClick={onExport}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            aria-label="Export table data"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Virtual Table */}
      <div style={{ height }} className="overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {columns.map((column) => {
                const sortItem = sortConfig.find(s => s.key === column.key)
                return (
                  <th
                    key={column.key}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                    style={{ width: columnWidths[column.key] || column.width }}
                    onClick={() => handleSort(column.key)}
                    role="columnheader"
                    aria-sort={
                      sortItem ? (sortItem.direction === 'asc' ? 'ascending' : 'descending') : 'none'
                    }
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {sortItem && (
                        sortItem.direction === 'asc' 
                          ? <ChevronUp className="w-4 h-4" />
                          : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column) => {
                  const isEditing = editingCell?.row === rowIndex && editingCell?.column === column.key
                  const cellValue = row[column.key]
                  
                  return (
                    <td
                      key={column.key}
                      className="px-4 py-3 text-sm text-gray-900"
                      role="gridcell"
                    >
                      {enableInlineEdit && column.editable ? (
                        isEditing ? (
                          <input
                            type="text"
                            defaultValue={cellValue}
                            className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none"
                            onBlur={(e) => handleCellEdit(rowIndex, column.key, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleCellEdit(rowIndex, column.key, e.target.value)
                              }
                              if (e.key === 'Escape') {
                                setEditingCell(null)
                              }
                            }}
                            autoFocus
                          />
                        ) : (
                          <div 
                            className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 px-2 py-1 rounded"
                            onClick={() => setEditingCell({ row: rowIndex, column: column.key })}
                          >
                            {cellValue}
                            <Edit2 className="w-3 h-3 text-gray-400" />
                          </div>
                        )
                      ) : (
                        column.render ? column.render(cellValue, row) : cellValue
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}