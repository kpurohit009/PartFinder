import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CoolerDataTable from '../tables/CoolerDataTable';

const CoolerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddCooler = (selectedCooler) => {
    navigate('/builder', { state: { ...location.state, cooler: selectedCooler } });
  };

  const coolerData = [
    {
      name: "Noctua NH-D15",
      socketCompatibility: "Intel LGA1200, LGA1150, LGA1151,...",
      fanRPM: "300 - 1500 RPM",
      noiseLevel: "24.6 - 49.9 dBA",
      price: "₹" + "10,040",
      buyLink: "https://amzn.in/d/3LrydTf",
      imageUrl: "https://m.media-amazon.com/images/I/51kgqhkUNuL._SY300_SX300_QL70_FMwebp_.jpg"
    },
    {
      name: "Cooler Master Hyper 212 RGB",
      socketCompatibility: "Intel LGA1200, LGA1150, LGA1151,...",
      fanRPM: "650 - 2000 RPM",
      noiseLevel: "8 - 30 dBA",
      price: "₹" + "3,549",
      buyLink: "https://amzn.in/d/eHVHbAd",
      imageUrl: "https://m.media-amazon.com/images/I/616JkGFQswL._SX679_.jpg"
    },
    // Add more cooler data as needed
  ];

  return (
    <div>
      <CoolerDataTable coolerData={coolerData} onSelectCooler={handleAddCooler} />
    </div>
  );
};

export default CoolerPage;
