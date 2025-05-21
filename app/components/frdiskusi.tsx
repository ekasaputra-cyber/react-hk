'use client'

import { useState, useRef, useEffect } from 'react';

const Diskusi = () => {
  const [showDetail, setShowDetail] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // Adjust scroll speed
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative px-0 py-0">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">Diskusi Populer</h3>
        <a href="#" className="text-cyan-500 text-sm">Lihat Semua</a>
      </div>
      
      <div 
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex space-x-3 pb-3" style={{ width: 'max-content' }}>
          {/* Item 1 */}
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
          
          {/* Item 2 */}
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
          
          {/* Item 3 */}
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

          {/* Tambahkan lebih banyak item jika diperlukan */}
          <div className="w-64 flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4">
              <span className="inline-block bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full mb-2">Populer</span>
              <h4 className="font-medium text-gray-800 line-clamp-2">Cara efektif mengajarkan anak membaca usia dini</h4>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <i className="fas fa-user mr-1"></i>
                <span>Dr. Rina Melati</span>
              </div>
              <div className="flex justify-between mt-3 text-xs">
                <span className="text-gray-500"><i className="fas fa-comment mr-1"></i> 31</span>
                <span className="text-gray-500"><i className="fas fa-heart mr-1 text-red-500"></i> 72</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diskusi;