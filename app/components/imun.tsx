import React from 'react';
import Link from 'next/link';


const Vaksin = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg ">

        <div className="mb-6 flex items-center gap-4">
            <Link href="/" className="text-cyan-400 hover:text-cyan-500 transition-colors">
                <i className="fa-solid fa-circle-chevron-left text-2xl"></i>
            </Link>
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Imunisasi</h1>
                <p className="text-gray-600">Lala • 0 Tahun 1 Bulan</p>
            </div>
        </div>

      <div className="mb-8 p-4 bg-cyan-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Booking Vaksin</h2>
        <p className="text-gray-600 mb-3">Lakukan Booking vaksin dengan mudah</p>
        <button className="w-full py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition">
          Booking Sekarang
        </button>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Jadwal Vaksinasi</h2>
          <button className="text-cyan-500 text-sm font-medium">Lihat Semua</button>
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Direkomendasikan di 01 Apr 2025</p>
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Influenza 2</h3>
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">Belum</span>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Direkomendasikan di 01 Jun 2025</p>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-gray-800">Japanese Encephalitis 1</h3>
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">Belum</span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800">MR 1</h3>
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">Belum</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vaksin;