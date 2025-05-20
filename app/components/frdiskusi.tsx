'use client'

import { useState } from 'react';

const Diskusi = () => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="relative px-4 py-3">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">Diskusi Populer</h3>
        <a href="#" className="text-cyan-500 text-sm">Lihat Semua</a>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-3 pb-3" style={{ width: 'max-content' }}>
            {/* Card 1 */}
            <div className="w-64 flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4">
                <span className="inline-block bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full mb-2">Populer</span>
                <h4 className="font-medium text-gray-800 line-clamp-2">Bagaimana cara mengatasi anak susah makan sayur?</h4>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <i className="fas fa-user mr-1"></i>
                  <span>Dr. Andi Pratama</span>
                </div>
                <div className="flex justify-between mt-3 text-xs">
                  <span className="text-gray-500"><i className="fas fa-comment mr-1"></i> 24</span>
                  <span className="text-gray-500"><i className="fas fa-heart mr-1 text-red-500"></i> 56</span>
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="w-64 flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4">
                <span className="inline-block bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full mb-2">Populer</span>
                <h4 className="font-medium text-gray-800 line-clamp-2">MPASI pertama apa yang paling baik untuk bayi 6 bulan?</h4>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <i className="fas fa-user mr-1"></i>
                  <span>Dr. Sarah Wijaya</span>
                </div>
                <div className="flex justify-between mt-3 text-xs">
                  <span className="text-gray-500"><i className="fas fa-comment mr-1"></i> 42</span>
                  <span className="text-gray-500"><i className="fas fa-heart mr-1 text-red-500"></i> 89</span>
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="w-64 flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4">
                <span className="inline-block bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full mb-2">Terbaru</span>
                <h4 className="font-medium text-gray-800 line-clamp-2">Apakah demam setelah imunisasi perlu dikhawatirkan?</h4>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <i className="fas fa-user mr-1"></i>
                  <span>Dr. Bambang S.</span>
                </div>
                <div className="flex justify-between mt-3 text-xs">
                  <span className="text-gray-500"><i className="fas fa-comment mr-1"></i> 15</span>
                  <span className="text-gray-500"><i className="fas fa-heart mr-1 text-red-500"></i> 34</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diskusi;