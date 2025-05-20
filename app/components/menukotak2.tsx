'use client'

import { useState } from 'react';

const MenuBox2 = () => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Layanan</h2>
      <div className="grid grid-cols-2 gap-3">
        {/* Booking Vaksin Button */}
        <button 
          className="p-3 bg-cyan-50 rounded-lg text-center border border-gray-200 hover:bg-cyan-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          onClick={() => setShowDetail(!showDetail)}
        >
          <div className="flex flex-col items-center">
            <i className="fa-solid fa-syringe text-cyan-500 text-xl mb-1"></i>
            <p className="text-sm text-gray-700">Booking Vaksin</p>
          </div>
        </button>
        
        {/* Chat Dokter Button */}
        <button 
          className="p-3 bg-cyan-50 rounded-lg text-center border border-gray-200 hover:bg-cyan-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          onClick={() => setShowDetail(!showDetail)}
        >
          <div className="flex flex-col items-center">
            <i className="fa-solid fa-user-doctor text-cyan-500 text-xl mb-1"></i>
            <p className="text-sm text-gray-700">Chat Dokter</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MenuBox2;