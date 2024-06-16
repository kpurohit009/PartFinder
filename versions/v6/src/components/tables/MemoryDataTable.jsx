import React from 'react';

const MemoryDataTable = ({ memoryData, onSelectMemory }) => {
  return (
    <div className="bg-gray-100 py-4 sm:py-8 h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm sm:text-base">
            <thead className="hidden bg-gray-200 text-gray-700 lg:table-header-group">
              <tr>
                <th className="px-2 py-2 text-left font-medium sm:px-4 sm:py-3">Memory</th>
                <th className="px-2 py-2 text-left font-medium sm:px-4 sm:py-3">Speed</th>
                <th className="px-2 py-2 text-left font-medium sm:px-4 sm:py-3">Modules</th>
                <th className="px-2 py-2 text-left font-medium sm:px-4 sm:py-3">Color</th>
                <th className="px-2 py-2 text-right font-medium sm:px-4 sm:py-3">Price</th>
                <th className="px-2 py-2 text-right font-medium sm:px-4 sm:py-3">Buy</th>
                <th className="px-2 py-2 text-right font-medium sm:px-4 sm:py-3">Select</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700">
              {memoryData.map((memory, index) => (
                <tr key={index} className="block border-b lg:table-row">
                  <td className="block cursor-pointer px-2 py-2 font-medium hover:underline sm:px-4 sm:py-3 lg:table-cell">
                    <img src={memory.imageUrl} alt={memory.name} className="h-8 w-8 inline-block mr-2" />
                    <span className="font-semibold lg:hidden">Memory:</span> {memory.name}
                  </td>
                  <td className="block px-2 py-2 sm:px-4 sm:py-3 lg:table-cell">
                    <span className="font-semibold lg:hidden">Speed:</span> {memory.speed}
                  </td>
                  <td className="block px-2 py-2 sm:px-4 sm:py-3 lg:table-cell">
                    <span className="font-semibold lg:hidden">Modules:</span> {memory.modules}
                  </td>
                  <td className="block px-2 py-2 sm:px-4 sm:py-3 lg:table-cell">
                    <span className="font-semibold lg:hidden">Color:</span> {memory.color}
                  </td>
                  <td className="block px-2 py-2 text-right sm:px-4 sm:py-3 lg:table-cell">
                    <span className="font-semibold lg:hidden">Price:</span> {memory.price}
                  </td>
                  <td className="block px-2 py-2 text-right sm:px-4 sm:py-3 lg:table-cell">
                  
                    <a href={memoryData.buyLink} className="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-600 sm:text-sm" target='_blank'>Buy</a>
                  </td>
                  <td className="block px-2 py-2 text-right sm:px-4 sm:py-3 lg:table-cell">
                    <button
                      onClick={() => onSelectMemory(memory)}
                      className="rounded bg-green-500 px-3 py-1 text-xs font-medium text-white hover:bg-green-600 sm:text-sm"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemoryDataTable;
