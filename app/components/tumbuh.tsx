'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registrasi komponen ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Data standar WHO untuk berat badan (laki-laki 0-24 bulan)
const whoWeightData = {
  labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '18', '24'],
  datasets: [
    {
      label: 'Median WHO',
      data: [3.3, 4.5, 5.6, 6.4, 7.0, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6, 10.2, 10.8],
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      tension: 0.4,
      fill: true
    },
    {
      label: 'Anak Anda',
      data: [3.2, 4.4, null, null, null, null, null, null, null, null, null, null, null, null, null],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderDash: [5, 5],
      tension: 0.4,
      fill: false
    }
  ]
};

// Data standar WHO untuk panjang badan (laki-laki 0-24 bulan)
const whoLengthData = {
  labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '18', '24'],
  datasets: [
    {
      label: 'Median WHO',
      data: [49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72.0, 73.3, 74.5, 75.7, 79.4, 82.3],
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      tension: 0.4,
      fill: true
    },
    {
      label: 'Anak Anda',
      data: [50.1, 54.5, null, null, null, null, null, null, null, null, null, null, null, null, null],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderDash: [5, 5],
      tension: 0.4,
      fill: false
    }
  ]
};

export default function GrowthChart() {
  const [activeTab, setActiveTab] = useState<'weight' | 'height'>('weight');
  const [childData, setChildData] = useState({
    weight: [3.2, 4.4],
    height: [50.1, 54.5],
    months: [0, 1]
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y} ${activeTab === 'weight' ? 'kg' : 'cm'}`;
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: activeTab === 'weight' ? 'Berat (kg)' : 'Panjang (cm)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Usia (bulan)'
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center my-4">
          <Link href="/" className="text-cyan-400 hover:text-cyan-500 transition-colors">
                <i className="fa-solid fa-circle-chevron-left text-2xl mr-3"></i>
          </Link>
          <h2 className="text-xl font-bold text-gray-800">Grafik Tumbuh Kembang</h2>
      </div>
      
      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'weight' ? 'text-cyan-500 border-b-2 border-cyan-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('weight')}
        >
          Berat Badan
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'height' ? 'text-cyan-500 border-b-2 border-cyan-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('height')}
        >
          Panjang Badan
        </button>
      </div>
      
      {/* Chart */}
      <div className="h-64">
        {activeTab === 'weight' ? (
          <Line options={options} data={whoWeightData} />
        ) : (
          <Line options={options} data={whoLengthData} />
        )}
      </div>
      
      {/* Info Tambahan */}
      <div className="mt-6 p-4 bg-cyan-50 rounded-lg">
        <h3 className="font-bold text-cyan-700 mb-2">Standar WHO</h3>
        <p className="text-sm text-gray-600">
          Grafik ini menunjukkan pertumbuhan anak Anda dibandingkan dengan standar pertumbuhan WHO.
          Data anak Anda akan terupdate secara otomatis setelah Anda mencatat perkembangan terbaru.
        </p>
      </div>
      
      {/* Input Data Baru */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-700 mb-2">Tambahkan Data Baru</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Usia (bulan)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded"
              placeholder="Contoh: 2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {activeTab === 'weight' ? 'Berat (kg)' : 'Panjang (cm)'}
            </label>
            <input 
              type="number" 
              className="w-full p-2 border rounded"
              placeholder={activeTab === 'weight' ? 'Contoh: 5.5' : 'Contoh: 60'}
            />
          </div>
        </div>
        <button className="mt-4 w-full py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition">
          Simpan Data
        </button>
      </div>
    </div>
  );
}