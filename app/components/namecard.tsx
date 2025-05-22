// app/components/NameCard.tsx (atau path sesuai struktur proyek Anda)
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const NameCard = () => {
  const [showDetail, setShowDetail] = useState(false);
  // Tanggal lahir anak ditentukan langsung di sini
  // UBAH TANGGAL INI SESUAI TANGGAL LAHIR ANAK ANDA
  const childBirthDate = new Date('2024-03-15'); 

  const [childAgeDisplay, setChildAgeDisplay] = useState(''); // Usia dalam format "X Tahun Y Bulan"

  // Fungsi untuk menghitung usia (untuk tampilan string)
  const calculateAgeDisplay = (dob: Date) => {
    if (!(dob instanceof Date) || isNaN(dob.getTime())) {
      console.error("Error: Tanggal lahir tidak valid untuk tampilan usia:", dob);
      return "Usia tidak diketahui";
    }

    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0) {
      if (months === 0) {
        return `${days} Hari`;
      } else {
        return `${months} Bulan`;
      }
    } else {
      return `${years} Tahun ${months} Bulan`;
    }
  };

  // Hitung usia saat komponen dimuat atau tanggal lahir berubah
  useEffect(() => {
    setChildAgeDisplay(calculateAgeDisplay(childBirthDate));
  }, [childBirthDate]);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Profil Anak</h2>
      <div className="space-y-3">
        <div 
          className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg cursor-pointer hover:bg-cyan-100 transition-colors"
          onClick={() => setShowDetail(true)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center overflow-hidden">
              <Image 
                src="/image/profilanak.jpg" // Ganti dengan path gambar profil Anda
                alt="Foto Profil Anak"
                width={48}
                height={48}
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/default-profile.png'; // Fallback jika gambar tidak ada
                }}
              />
            </div>
            <div>
              <p className="font-medium">Lala</p> {/* Ganti dengan nama anak Anda */}
              <p className="text-sm text-gray-500">{childAgeDisplay}</p>
            </div>
          </div>
          <i className="fa-solid fa-circle-chevron-right text-cyan-400"></i>
        </div>

        {showDetail && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Detail Anak</h3>
                <button 
                  onClick={() => setShowDetail(false)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                    <Image 
                      src="/image/profilanak.jpg" 
                      alt="Foto Profil Anak"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Nama</span>
                    <span className="font-medium">Lala</span> {/* Ganti dengan nama anak Anda */}
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Usia</span>
                    <span className="font-medium">{childAgeDisplay}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Tanggal Lahir</span>
                    <span className="font-medium">
                      {!(childBirthDate instanceof Date) || isNaN(childBirthDate.getTime()) 
                        ? 'Tanggal tidak valid' 
                        : childBirthDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Jenis Kelamin</span>
                    <span className="font-medium">Perempuan</span> {/* Ganti dengan jenis kelamin anak Anda */}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button 
                  onClick={() => setShowDetail(false)} 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Kembali
                </button>
                <button 
                  onClick={() => {/* Tambahkan fungsi edit profil di sini jika diperlukan */}}
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