import React, { useState } from 'react'

export const TableSimple = ({ data }: { data: any[] }) => {
  const [sortField, setSortField] = useState<string>('')
  const [sortDirection, setSortDirection] = useState('asc')
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0

    let aVal = a[sortField]
    let bVal = b[sortField]

    if (sortField === 'createdAt') {
      aVal = new Date(aVal)
      bVal = new Date(bVal)
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const truncateText = (text: string, maxLength = 30) => {
    if (!text) return 'N/A'
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const formatJSON = (jsonString: any) => {
    try {
      return JSON.stringify(jsonString, null, 2)
    } catch {
      return jsonString
    }
  }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
        <div className='px-6 py-4 border-b border-gray-200'>
          <h2 className='text-2xl font-bold text-gray-800'>Database Records</h2>
          <p className='text-gray-600 mt-1'>Total records: {data.length}</p>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                {['id', 'category', 'action', 'user', 'createdAt', 'status', 'latency', 'dump'].map(
                  (field) => (
                    <th
                      key={field}
                      className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors'
                      onClick={() => handleSort(field)}
                    >
                      <div className='flex items-center space-x-1'>
                        <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                        {sortField === field && (
                          <span className='text-blue-500'>
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {sortedData.map((row, index) => (
                <tr
                  key={row.id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <div
                      className='text-sm font-mono text-gray-600'
                      title={row.id}
                    >
                      {truncateText(row.id, 8)}
                    </div>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <span className='px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full'>
                      {row.category}
                    </span>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900 font-medium'>{row.action}</div>
                  </td>
                  <td className='px-4 py-4'>
                    <div className='text-sm text-gray-600 max-w-xs'>
                      <details className='cursor-pointer'>
                        <summary className='hover:text-blue-600'>
                          {truncateText(formatJSON(row.user), 25)}
                        </summary>
                        <pre className='mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto'>
                          {formatJSON(row.user)}
                        </pre>
                      </details>
                    </div>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{formatDate(row.createdAt)}</div>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        row.status.toLowerCase().includes('successful') ||
                        row.status.toLowerCase().includes('exists')
                          ? 'bg-green-100 text-green-800'
                          : row.status.toLowerCase().includes('error') ||
                              row.status.toLowerCase().includes('failed')
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {row.latency || 'N/A'}
                  </td>
                  <td className='px-4 py-4'>
                    <div className='text-sm text-gray-600 max-w-xs'>
                      <details className='cursor-pointer'>
                        <summary className='hover:text-blue-600'>
                          {truncateText(formatJSON(row.dump), 25)}
                        </summary>
                        <pre className='mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto'>
                          {formatJSON(row.dump)}
                        </pre>
                      </details>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-500 text-lg'>No records found</div>
          </div>
        )}
      </div>
    </div>
  )
}
