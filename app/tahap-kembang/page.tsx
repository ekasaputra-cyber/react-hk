'use client'

import TahapKembang from '../components/tahapkembang';
import BarBawah from '../components/barbottom';

export default function Home() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-16"> 
        <TahapKembang />
        <div className="">
          <BarBawah />
        </div>
    </div>
    
  );
}