'use client'

import { useState } from 'react';
import { FaHouse, FaReceipt, FaStethoscope, FaComments, FaNewspaper } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

// Define a type for the navigation item
type NavItem = 'home' | 'transaksi' | 'dokter' | 'komunitas' | 'konten';

const BarBawah = () => {
  const [activeNav, setActiveNav] = useState<NavItem>('home');
  const router = useRouter();

  const handleNavClick = (navItem: NavItem) => {
    setActiveNav(navItem);
    
    // Add navigation logic
    switch (navItem) {
      case 'home':
        router.push('/');
        break;
      case 'dokter':
        router.push('/chat-bot');
        break;
      case 'konten':
        router.push('/konten');
        break;
      case 'komunitas':
        router.push('/komunitas');
        break;
      
      default:
        // Do nothing or add default behavior
        break;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-around p-3 max-w-md mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.1)]">

      <button
        className={`text-center focus:outline-none cursor-pointer ${activeNav === 'home' ? 'text-cyan-500' : 'text-gray-400'}`}
        onClick={() => handleNavClick('home')}
      >
        <FaHouse className="block mx-auto mb-1" />
        <p className="text-xs">Home</p>
      </button>
      

      <button
        className={`text-center focus:outline-none cursor-pointer ${activeNav === 'transaksi' ? 'text-cyan-500' : 'text-gray-400'}`}
        onClick={() => handleNavClick('transaksi')}
      >
        <FaReceipt className="block mx-auto mb-1" />
        <p className="text-xs">Transaksi</p>
      </button>
      
      <button
        className="relative text-center focus:outline-none cursor-pointer"
        onClick={() => handleNavClick('dokter')}
      >
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-cyan-600">
          <FaStethoscope className="text-white text-lg" />
        </div>
        <p className="mt-6 text-xs text-gray-400">Asisten AI</p>
      </button>
      

      <button
        className={`text-center focus:outline-none cursor-pointer ${activeNav === 'komunitas' ? 'text-cyan-500' : 'text-gray-400'}`}
        onClick={() => handleNavClick('komunitas')}
      >
        <FaComments className="block mx-auto mb-1" />
        <p className="text-xs">Komunitas</p>
      </button>
      

      <button
        className={`text-center focus:outline-none cursor-pointer ${activeNav === 'konten' ? 'text-cyan-500' : 'text-gray-400'}`}
        onClick={() => handleNavClick('konten')}
      >
        <FaNewspaper className="block mx-auto mb-1" />
        <p className="text-xs">Konten</p>
      </button>
    </div>
  );
};

export default BarBawah;