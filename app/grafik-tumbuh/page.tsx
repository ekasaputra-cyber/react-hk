'use client'

import GrowthChart from '../components/tumbuh';
import BarBawah from '../components/barbottom';

export default function Home() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-16"> 
        <GrowthChart />
        <div className="">
          <BarBawah />
        </div>
    </div>
    
  );
}