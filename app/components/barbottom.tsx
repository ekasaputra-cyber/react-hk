'use client'

import { useState } from 'react';
import { FaHouse, FaReceipt, FaStethoscope, FaComments, FaNewspaper } from 'react-icons/fa6';

// Define a type for the navigation items
type NavItem = 'home' | 'transaksi' | 'dokter' | 'komunitas' | 'konten';

const BarBawah = () => {
  const [activeNav, setActiveNav] = useState<NavItem>('home');

  const handleNavClick = (navItem: NavItem) => {
    setActiveNav(navItem);
    // Add any additional navigation logic here
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-around p-3 max-w-md mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.1)]">
      {/* Home Button */}
      <button
        className={`text-center focus:outline-none ${activeNav === 'home' ? 'text-cyan-500' : 'text-gray-400'}`}
        onClick={() => handleNavClick('home')}
      >
        <FaHouse className="block mx-auto mb-1" />
        <p className="text-xs">Home</p>
      </button>
      
      {/* Transaction Button */}
      <button
        className={`text-center focus:outline-none ${activeNav === 'transaksi' ? 'text-cyan-500' : 'text-gray-400'}`}
        onClick={() => handleNavClick('transaksi')}
      >
        <FaReceipt className="block mx-auto mb-1" />
        <p className="text-xs">Transaksi</p>
      </button>
      
      {/* Doctor Chat Button */}
      <button
        className={`text-center focus:outline-none ${activeNav === 'dokter' ? 'text-cyan-500' : 'text-gray-400'}`}
        onClick={() => handleNavClick('dokter')}
      >
        <FaStethoscope className="block mx-auto mb-1" />
        <p className="text-xs">Chat Dokter</p>
      </button>
      
      {/* Community Button */}
      <button
        className={`text-center focus:outline-none ${activeNav === 'komunitas' ? 'text-cyan-500' : 'text-gray-400'}`}
        onClick={() => handleNavClick('komunitas')}
      >
        <FaComments className="block mx-auto mb-1" />
        <p className="text-xs">Komunitas</p>
      </button>
      
      {/* Content Button */}
      <button
        className={`text-center focus:outline-none ${activeNav === 'konten' ? 'text-cyan-500' : 'text-gray-400'}`}
        onClick={() => handleNavClick('konten')}
      >
        <FaNewspaper className="block mx-auto mb-1" />
        <p className="text-xs">Konten</p>
      </button>
    </div>
  );
};

export default BarBawah;