'use client'

import { useState } from 'react';

const MenuBox = () => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Jadwal Vaksin */}
      <button className="flex flex-col items-center p-3 rounded-lg bg-white border border-gray-200 hover:bg-cyan-50 transition-colors">
        <div className="h-12 w-12 bg-cyan-50 rounded-full mb-2 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-xs text-center text-gray-600">Jadwal Vaksin</p>
      </button>
      
      {/* Grafik Tumbuh */}
      <button className="flex flex-col items-center p-3 rounded-lg bg-white border border-gray-200 hover:bg-cyan-50 transition-colors">
        <div className="h-12 w-12 bg-cyan-50 rounded-full mb-2 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-xs text-center text-gray-600">Grafik Tumbuh</p>
      </button>
      
      {/* Tahapan Kembang */}
      <button className="flex flex-col items-center p-3 rounded-lg bg-white border border-gray-200 hover:bg-cyan-50 transition-colors">
        <div className="h-12 w-12 bg-cyan-50 rounded-full mb-2 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <p className="text-xs text-center text-gray-600">Tahapan Kembang</p>
      </button>
      
      {/* Info Produk */}
      <button className="flex flex-col items-center p-3 rounded-lg bg-white border border-gray-200 hover:bg-cyan-50 transition-colors">
        <div className="h-12 w-12 bg-cyan-50 rounded-full mb-2 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-xs text-center text-gray-600">Info Produk</p>
      </button>
      
      {/* Resep MPASI */}
      <button className="flex flex-col items-center p-3 rounded-lg bg-white border border-gray-200 hover:bg-cyan-50 transition-colors">
        <div className="h-12 w-12 bg-cyan-50 rounded-full mb-2 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <p className="text-xs text-center text-gray-600">Resep MPASI</p>
      </button>
      
      {/* Artikel */}
      <button className="flex flex-col items-center p-3 rounded-lg bg-white border border-gray-200 hover:bg-cyan-50 transition-colors">
        <div className="h-12 w-12 bg-cyan-50 rounded-full mb-2 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <p className="text-xs text-center text-gray-600">Artikel</p>
      </button>
    </div>
  );
};

export default MenuBox;