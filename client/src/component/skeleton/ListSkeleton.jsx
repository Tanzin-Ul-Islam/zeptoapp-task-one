import React from 'react'

export default function ListSkeleton() {
  return (
    <div className="w-full md:w-[69%] mx-auto border-2 p-4 sm:p-6 overflow-x-auto mb-4">
  {/* Title Skeleton */}
  <div className="animate-pulse">
    <div className="h-8 w-1/4 bg-gray-200 rounded mb-4 sm:mb-6"></div>
    
    {/* Description Skeleton */}
    <div className="h-4 w-1/2 bg-gray-200 rounded mb-4 sm:mb-8"></div>
    
    {/* Table Skeleton */}
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 sm:px-6 sm:py-3">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </th>
            <th className="px-4 py-2 sm:px-6 sm:py-3">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </th>
            <th className="px-4 py-2 sm:px-6 sm:py-3 text-right">
              <div className="h-4 w-16 bg-gray-200 rounded ml-auto"></div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(5)].map((_, index) => (
            <tr key={index}>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                <div className="h-10 w-32 bg-gray-200 rounded"></div>
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right">
                <div className="h-8 w-16 bg-gray-200 rounded ml-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  )
}
