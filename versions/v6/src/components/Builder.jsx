import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Builder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCPU, setSelectedCPU] = useState(null);
  const [selectedCooler, setSelectedCooler] = useState(null);
  const [selectedVideoCard, setSelectedVideoCard] = useState(null);
  const [selectedMotherBoard, setSelectedMotherBoard] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedPowerSupply, setSelectedPowerSupply] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [selectedOs, setSelectedOs] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const setStateFromLocation = (locationState) => {
    setSelectedCPU(locationState?.cpu || null);
    setSelectedCooler(locationState?.cooler || null);
    setSelectedVideoCard(locationState?.videoCard || null);
    setSelectedMotherBoard(locationState?.motherboard || null);
    setSelectedMemory(locationState?.memory || null);
    setSelectedStorage(locationState?.storage || null);
    setSelectedPowerSupply(locationState?.powerSupply || null);
    setSelectedCase(locationState?.case || null);
    setSelectedMonitor(locationState?.monitor || null);
    setSelectedOs(locationState?.os || null);
  };

  // Initialize state from location on mount and on location state change
  useEffect(() => {
    setStateFromLocation(location.state);
  }, [location.state]);

  // Calculate the total price whenever any selected component changes
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [selectedCPU, selectedCooler, selectedVideoCard, selectedMotherBoard, selectedMemory, selectedStorage, selectedPowerSupply, selectedCase, selectedMonitor, selectedOs]);

  const handleRemoveComponent = (component) => {
    const newState = { ...location.state, [component]: null };
    setStateFromLocation(newState); // Update local state
    navigate(location.pathname, { state: newState }); // Update URL state
  };

  const handleSelectComponent = (componentType) => {
    const componentPath = componentType === 'powerSupply' ? 'power-supply' : componentType;
    navigate(`/components/${componentPath}`, { state: { ...location.state, prevLocation: '/builder' } });
  };

  const handleBuyComponent = (component) => {
    if (component && component.buyLink) {
      window.open(component.buyLink, '_blank');
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    const components = [selectedCPU, selectedCooler, selectedVideoCard, selectedMotherBoard, selectedMemory, selectedStorage, selectedPowerSupply, selectedCase, selectedMonitor, selectedOs];

    components.forEach(component => {
      if (component && component.price) {
        const price = parseFloat(component.price.replace(/[₹,]/g, '')); // Remove $ and , from the price string and convert to float
        if (!isNaN(price)) {
          totalPrice += price;
        }
      }
    });

    return totalPrice;
  };

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <h1 className="text-4xl font-bold py-8 text-center bg-comet-900 text-white mb-4">Choose PC Parts</h1>
      <div className="overflow-x-auto">
        <table className="w-full md:w-3/4 lg:w-3/4 mx-auto">
          <thead className="hidden bg-gray-200 md:table-header-group">
            <tr>
              <th className="px-4 py-2 font-semibold">Component</th>
              <th className="px-4 py-2 font-semibold">Selection</th>
              <th className="px-4 py-2 font-semibold">Base</th>
              <th className="px-4 py-2 font-semibold">Promo</th>
              <th className="px-4 py-2 font-semibold">Shipping</th>
              <th className="px-4 py-2 font-semibold">Tax</th>
              <th className="px-4 py-2 font-semibold">Price</th>
              <th className="px-4 py-2 font-semibold"></th>
              {/* <th className="px-4 py-2 font-semibold">Where</th> */}
            </tr>
          </thead>
          <tbody className="max-h-[calc(100vh-200px)]">
            {/* CPU Row */}
            <tr className="block border-b border-opacity-20 md:table-row dark:border-gray-300 dark:bg-gray-50">
              <td className="block px-4 py-3 text-xl font-semibold hover:underline md:table-cell md:px-6 md:py-4 md:text-base">
                <a href="/components/cpu">CPU</a>
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 md:text-right">
                {selectedCPU ? (
                  <div className="flex items-center">
                    <img src={selectedCPU.imageUrl} alt={selectedCPU.name} className="h-8 w-8 inline-block mr-10" />
                    <span className='font-medium'>{selectedCPU.name}</span>
                  </div>
                ) : (
                  <button
                    className="flex items-center rounded bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700"
                    onClick={() => handleSelectComponent('cpu')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Choose A CPU
                  </button>
                )}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                <span className="text-black font-semibold lg:hidden">Base:</span> {selectedCPU && selectedCPU.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 text-green-600 font-semibold">
                <span className="text-black font-semibold lg:hidden">Price:</span> {selectedCPU && selectedCPU.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                {selectedCPU && (
                  <div className='flex items-center justify-end'>
                    <button
                      className="rounded bg-blue-500 px-3 py-1 font-medium text-white hover:bg-blue-600 sm:text-sm sm:text-md md:text-md sm:justify-end"
                      onClick={() => handleBuyComponent(selectedCPU)}
                    >
                      Buy
                    </button>
                    <button
                      className="text-gray px-2 py-1 mr-2 hover:text-red-600"
                      onClick={() => handleRemoveComponent('cpu')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>
             {/* CPU Cooler Row */}
             <tr className="block border-b border-opacity-20 md:table-row dark:border-gray-300 dark:bg-gray-50">
              <td className="block px-4 py-3 text-xl font-semibold hover:underline md:table-cell md:px-6 md:py-4 md:text-base">
                <a href="/components/cooler">CPU Cooler</a>
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 md:text-right">
                {selectedCooler ? (
                  <div className="flex items-center">
                    <img src={selectedCooler.imageUrl} alt={selectedCooler.name} className="h-8 w-8 inline-block mr-10" />
                    <span className='font-medium'>{selectedCooler.name}</span>
                  </div>
                ) : (
                  <button
                    className="flex items-center rounded bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700"
                    onClick={() => handleSelectComponent('cooler')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Choose A Cooler
                  </button>
                )}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                <span className="text-black font-semibold lg:hidden">Base:</span> {selectedCooler && selectedCooler.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 text-green-600 font-semibold">
                <span className="text-black font-semibold lg:hidden">Price:</span> {selectedCooler && selectedCooler.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                {selectedCooler && (
                  <div className='flex items-center justify-end'>
                    <button
                      className="rounded bg-blue-500 px-3 py-1 font-medium text-white hover:bg-blue-600 sm:text-sm sm:text-md md:text-md sm:justify-end"
                      onClick={() => handleBuyComponent(selectedCooler)}
                    >
                      Buy
                    </button>
                    <button
                      className="text-gray px-2 py-1 mr-2 hover:text-red-600"
                      onClick={() => handleRemoveComponent('cooler')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>

            {/* Repeat similar structure for other components */}
            {/* Video Card Row */}
            <tr className="block border-b border-opacity-20 md:table-row dark:border-gray-300 dark:bg-gray-50">
              <td className="block px-4 py-3 text-xl font-semibold hover:underline md:table-cell md:px-6 md:py-4 md:text-base">
                <a href="/components/videoCard">Graphic Card</a>
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 md:text-right">
                {selectedVideoCard ? (
                  <div className="flex items-center">
                    <img src={selectedVideoCard.imageUrl} alt={selectedVideoCard.name} className="h-8 w-8 inline-block mr-10" />
                    <span className='font-medium'>{selectedVideoCard.name}</span>
                  </div>
                ) : (
                  <button
                    className="flex items-center rounded bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700"
                    onClick={() => handleSelectComponent('videoCard')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Choose A Graphic Card
                  </button>
                )}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                <span className="text-black font-semibold lg:hidden">Base:</span> {selectedVideoCard && selectedVideoCard.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 text-green-600 font-semibold">
                <span className="text-black font-semibold lg:hidden">Price:</span> {selectedVideoCard && selectedVideoCard.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                {selectedVideoCard && (
                  <div className='flex items-center justify-end'>
                    <button
                      className="rounded bg-blue-500 px-3 py-1 font-medium text-white hover:bg-blue-600 sm:text-sm sm:text-md md:text-md sm:justify-end"
                      onClick={() => handleBuyComponent(selectedVideoCard)}
                    >
                      Buy
                    </button>
                    <button
                      className="text-gray px-2 py-1 mr-2 hover:text-red-600"
                      onClick={() => handleRemoveComponent('videoCard')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>

            {/* Motherboard Row */}
            <tr className="block border-b border-opacity-20 md:table-row dark:border-gray-300 dark:bg-gray-50">
              <td className="block px-4 py-3 text-xl font-semibold hover:underline md:table-cell md:px-6 md:py-4 md:text-base">
                <a href="/components/motherboard">Motherboard</a>
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 md:text-right">
                {selectedMotherBoard ? (
                  <div className="flex items-center">
                    <img src={selectedMotherBoard.imageUrl} alt={selectedMotherBoard.name} className="h-8 w-8 inline-block mr-10" />
                    <span className='font-medium'>{selectedMotherBoard.name}</span>
                  </div>
                ) : (
                  <button
                    className="flex items-center rounded bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700"
                    onClick={() => handleSelectComponent('motherboard')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Choose A Motherboard
                  </button>
                )}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                <span className="text-black font-semibold lg:hidden">Base:</span> {selectedMotherBoard && selectedMotherBoard.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 text-green-600 font-semibold">
                <span className="text-black font-semibold lg:hidden">Price:</span> {selectedMotherBoard && selectedMotherBoard.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                {selectedMotherBoard && (
                  <div className='flex items-center justify-end'>
                    <button
                      className="rounded bg-blue-500 px-3 py-1 font-medium text-white hover:bg-blue-600 sm:text-sm sm:text-md md:text-md sm:justify-end"
                      onClick={() => handleBuyComponent(selectedMotherBoard)}
                    >
                      Buy
                    </button>
                    <button
                      className="text-gray px-2 py-1 mr-2 hover:text-red-600"
                      onClick={() => handleRemoveComponent('motherboard')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>

            {/* Memory Row */}
            <tr className="block border-b border-opacity-20 md:table-row dark:border-gray-300 dark:bg-gray-50">
              <td className="block px-4 py-3 text-xl font-semibold hover:underline md:table-cell md:px-6 md:py-4 md:text-base">
                <a href="/components/memory">Memory</a>
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 md:text-right">
                {selectedMemory ? (
                  <div className="flex items-center">
                    <img src={selectedMemory.imageUrl} alt={selectedMemory.name} className="h-8 w-8 inline-block mr-10" />
                    <span className='font-medium'>{selectedMemory.name}</span>
                  </div>
                ) : (
                  <button
                    className="flex items-center rounded bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700"
                    onClick={() => handleSelectComponent('memory')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Choose A Memory
                  </button>
                )}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                <span className="text-black font-semibold lg:hidden">Base:</span> {selectedMemory && selectedMemory.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 text-green-600 font-semibold">
                <span className="text-black font-semibold lg:hidden">Price:</span> {selectedMemory && selectedMemory.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                {selectedMemory && (
                  <div className='flex items-center justify-end'>
                    <button
                      className="rounded bg-blue-500 px-3 py-1 font-medium text-white hover:bg-blue-600 sm:text-sm sm:text-md md:text-md sm:justify-end"
                      onClick={() => handleBuyComponent(selectedMemory)}
                    >
                      Buy
                    </button>
                    <button
                      className="text-gray px-2 py-1 mr-2 hover:text-red-600"
                      onClick={() => handleRemoveComponent('memory')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>

            {/* Storage Row */}
            <tr className="block border-b border-opacity-20 md:table-row dark:border-gray-300 dark:bg-gray-50">
              <td className="block px-4 py-3 text-xl font-semibold hover:underline md:table-cell md:px-6 md:py-4 md:text-base">
                <a href="/components/storage">Storage</a>
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 md:text-right">
                {selectedStorage ? (
                  <div className="flex items-center">
                    <img src={selectedStorage.imageUrl} alt={selectedStorage.name} className="h-8 w-8 inline-block mr-10" />
                    <span className='font-medium'>{selectedStorage.name}</span>
                  </div>
                ) : (
                  <button
                    className="flex items-center rounded bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700"
                    onClick={() => handleSelectComponent('storage')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Choose A Storage
                  </button>
                )}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                <span className="text-black font-semibold lg:hidden">Base:</span> {selectedStorage && selectedStorage.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 text-green-600 font-semibold">
                <span className="text-black font-semibold lg:hidden">Price:</span> {selectedStorage && selectedStorage.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                {selectedStorage && (
                  <div className='flex items-center justify-end'>
                    <button
                      className="rounded bg-blue-500 px-3 py-1 font-medium text-white hover:bg-blue-600 sm:text-sm sm:text-md md:text-md sm:justify-end"
                      onClick={() => handleBuyComponent(selectedStorage)}
                    >
                      Buy
                    </button>
                    <button
                      className="text-gray px-2 py-1 mr-2 hover:text-red-600"
                      onClick={() => handleRemoveComponent('storage')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>

            {/* Power Supply Row */}
            <tr className="block border-b border-opacity-20 md:table-row dark:border-gray-300 dark:bg-gray-50">
              <td className="block px-4 py-3 text-xl font-semibold hover:underline md:table-cell md:px-6 md:py-4 md:text-base">
                <a href="/components/power-supply">Power Supply</a>
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 md:text-right">
                {selectedPowerSupply ? (
                  <div className="flex items-center">
                    <img src={selectedPowerSupply.imageUrl} alt={selectedPowerSupply.name} className="h-8 w-8 inline-block mr-10" />
                    <span className='font-medium'>{selectedPowerSupply.name}</span>
                  </div>
                ) : (
                  <button
                    className="flex items-center rounded bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700"
                    onClick={() => handleSelectComponent('powerSupply')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Choose A Power Supply
                  </button>
                )}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                <span className="text-black font-semibold lg:hidden">Base:</span> {selectedPowerSupply && selectedPowerSupply.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 text-green-600 font-semibold">
                <span className="text-black font-semibold lg:hidden">Price:</span> {selectedPowerSupply && selectedPowerSupply.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                {selectedPowerSupply && (
                  <div className='flex items-center justify-end'>
                    <button
                      className="rounded bg-blue-500 px-3 py-1 font-medium text-white hover:bg-blue-600 sm:text-sm sm:text-md md:text-md sm:justify-end"
                      onClick={() => handleBuyComponent(selectedPowerSupply)}
                    >
                      Buy
                    </button>
                    <button
                      className="text-gray px-2 py-1 mr-2 hover:text-red-600"
                      onClick={() => handleRemoveComponent('powerSupply')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>

            {/* Case Row */}
            <tr className="block border-b border-opacity-20 md:table-row dark:border-gray-300 dark:bg-gray-50">
              <td className="block px-4 py-3 text-xl font-semibold hover:underline md:table-cell md:px-6 md:py-4 md:text-base">
                <a href="/components/case">Case</a>
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 md:text-right">
                {selectedCase ? (
                  <div className="flex items-center">
                    <img src={selectedCase.imageUrl} alt={selectedCase.name} className="h-8 w-8 inline-block mr-10" />
                    <span className='font-medium'>{selectedCase.name}</span>
                  </div>
                ) : (
                  <button
                    className="flex items-center rounded bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700"
                    onClick={() => handleSelectComponent('case')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Choose A Case
                  </button>
                )}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                <span className="text-black font-semibold lg:hidden">Base:</span> {selectedCase && selectedCase.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 text-green-600 font-semibold">
                <span className="text-black font-semibold lg:hidden">Price:</span> {selectedCase && selectedCase.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                {selectedCase && (
                  <div className='flex items-center justify-end'>
                    <button
                      className="rounded bg-blue-500 px-3 py-1 font-medium text-white hover:bg-blue-600 sm:text-sm sm:text-md md:text-md sm:justify-end"
                      onClick={() => handleBuyComponent(selectedCase)}
                    >
                      Buy
                    </button>
                    <button
                      className="text-gray px-2 py-1 mr-2 hover:text-red-600"
                      onClick={() => handleRemoveComponent('case')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>

            {/* Monitor Row */}

            <tr className="block border-b border-opacity-20 md:table-row dark:border-gray-300 dark:bg-gray-50">
              <td className="block px-4 py-3 text-xl font-semibold hover:underline md:table-cell md:px-6 md:py-4 md:text-base">
                <a href="/components/monitor">Monitor</a>
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 md:text-right">
                {selectedMonitor ? (
                  <div className="flex items-center">
                    <img src={selectedMonitor.imageUrl} alt={selectedMonitor.name} className="h-8 w-8 inline-block mr-10" />
                    <span className='font-medium'>{selectedMonitor.name}</span>
                  </div>
                ) : (
                  <button
                    className="flex items-center rounded bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700"
                    onClick={() => handleSelectComponent('monitor')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Choose A Monitor
                  </button>
                )}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                <span className="text-black font-semibold lg:hidden">Base:</span> {selectedMonitor && selectedMonitor.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 text-green-600 font-semibold">
                <span className="text-black font-semibold lg:hidden">Price:</span> {selectedMonitor && selectedMonitor.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                {selectedMonitor && (
                  <div className='flex items-center justify-end'>
                    <button
                      className="rounded bg-blue-500 px-3 py-1 font-medium text-white hover:bg-blue-600 sm:text-sm sm:text-md md:text-md sm:justify-end"
                      onClick={() => handleBuyComponent(selectedMonitor)}
                    >
                      Buy
                    </button>
                    <button
                      className="text-gray px-2 py-1 mr-2 hover:text-red-600"
                      onClick={() => handleRemoveComponent('monitor')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>

            {/* Operating System Row */}

            <tr className="block border-b border-opacity-20 md:table-row dark:border-gray-300 dark:bg-gray-50">
              <td className="block px-4 py-3 text-xl font-semibold hover:underline md:table-cell md:px-6 md:py-4 md:text-base">
                <a href="/components/os">Operating System</a>
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 md:text-right">
                {selectedOs ? (
                  <div className="flex items-center">
                    <img src={selectedOs.imageUrl} alt={selectedOs.name} className="h-8 w-8 inline-block mr-10" />
                    <span className='font-medium'>{selectedOs.name}</span>
                  </div>
                ) : (
                  <button
                    className="flex items-center rounded bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700"
                    onClick={() => handleSelectComponent('os')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Choose A OS
                  </button>
                )}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                <span className="text-black font-semibold lg:hidden">Base:</span> {selectedOs && selectedOs.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4"></td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4 text-green-600 font-semibold">
                <span className="text-black font-semibold lg:hidden">Price:</span> {selectedOs && selectedOs.price}
              </td>
              <td className="block px-4 py-3 md:table-cell md:px-6 md:py-4">
                {selectedOs && (
                  <div className='flex items-center justify-end'>
                    <button
                      className="rounded bg-blue-500 px-3 py-1 font-medium text-white hover:bg-blue-600 sm:text-sm sm:text-md md:text-md sm:justify-end"
                      onClick={() => handleBuyComponent(selectedOs)}
                    >
                      Buy
                    </button>
                    <button
                      className="text-gray px-2 py-1 mr-2 hover:text-red-600"
                      onClick={() => handleRemoveComponent('os')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Calculate Total Price */}

      <div className="w-full md:w-3/4 lg:w-3/4 mx-auto mt-4 mb-5">
        <div className="flex justify-between items-center bg-gray-200 px-4 py-2">
          <span className="text-xl font-bold">Total Price:</span>
          <span className="text-xl font-semibold text-green-600">&#x20b9;{totalPrice.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
        </div>
      </div>
    </div>
  );
}

export default Builder;

