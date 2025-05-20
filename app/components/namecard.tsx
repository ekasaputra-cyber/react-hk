'use client'

import { useState } from 'react';
import Image from 'next/image';

const NameCard = () => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Profil Anak</h2>
      <div className="space-y-3">
        {/* Profile Card (clickable) */}
        <div 
          className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg cursor-pointer hover:bg-cyan-100 transition-colors"
          onClick={() => setShowDetail(true)}
        >
          <div className="flex items-center space-x-3">
            {/* Profile Photo */}
            <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center overflow-hidden">
              <Image 
                src="/image/profilanak.jpg" // Ganti dengan path gambar Anda
                alt="Foto Profil Lala"
                width={48}
                height={48}
                className="object-cover"
                onError={(e) => {
                  // Fallback jika gambar tidak ada
                  e.currentTarget.src = '/images/default-profile.png';
                }}
              />
            </div>
            <div>
              <p className="font-medium">Lala</p>
              <p className="text-sm text-gray-500">0 Tahun 1 Bulan</p>
            </div>
          </div>
            <i className="fa-solid fa-circle-chevron-right text-cyan-400"></i>

        </div>

        {/* Popup Detail Anak */}
        {showDetail && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Detail Anak</h3>
                <button 
                  onClick={() => setShowDetail(false)} 
                  className="text-gray-500 hover:text-gray-700"
                ><i className="fa-solid fa-times"></i>
                </button>
              </div>
              
              {/* Content */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                    <Image 
                      src="/image/profilanak.jpg" 
                      alt="Foto Profil Lala"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Nama</span>
                    <span className="font-medium">Lala</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Usia</span>
                    <span className="font-medium">0 Tahun 1 Bulan</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Tanggal Lahir</span>
                    <span className="font-medium">15 April 2023</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Jenis Kelamin</span>
                    <span className="font-medium">Perempuan</span>
                  </div>
                </div>
              </div>
              
              {/* Footer Buttons */}
              <div className="flex justify-between mt-6">
                <button 
                  onClick={() => setShowDetail(false)} 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Kembali
                </button>
                <button 
                  onClick={() => {/* Fungsi edit profil */}}
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center"
                >
                <i className="fa-solid fa-pencil mr-2"></i>Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NameCard;