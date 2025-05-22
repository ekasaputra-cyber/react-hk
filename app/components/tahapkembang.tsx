'use client';

import { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaRunning, FaHandPaper, FaComments, FaUsers, FaStethoscope, FaQuestionCircle, FaArrowLeft } from 'react-icons/fa'; // Import semua icons yang digunakan
import Link from 'next/link';

const TahapKembang = () => {
  // Tanggal lahir anak ditentukan langsung di sini
  // UBAH TANGGAL INI SESUAI TANGGAL LAHIR ANAK ANDA
  const childBirthDate = new Date('2024-03-15'); // Contoh: 15 Maret 2024

  const [showDetailKembang, setShowDetailKembang] = useState<Record<string, boolean>>({});
  const [childAgeInMonths, setChildAgeInMonths] = useState(0);
  const [childAgeDisplay, setChildAgeDisplay] = useState(''); // State baru untuk tampilan usia

  // Fungsi untuk menghitung usia dalam Bulan Total
  const calculateAgeInMonths = (dob: Date) => {
    if (!(dob instanceof Date) || isNaN(dob.getTime())) {
      console.error("Error: Tanggal lahir tidak valid untuk perhitungan bulan:", dob);
      return 0;
    }
    const today = new Date();
    const years = today.getFullYear() - dob.getFullYear();
    const months = today.getMonth() - dob.getMonth();
    const days = today.getDate() - dob.getDate();

    let totalMonths = years * 12 + months;
    if (days < dob.getDate()) {
        totalMonths--;
    }
    return totalMonths;
  };

  // Fungsi untuk menghitung usia untuk tampilan string (misal: "0 Tahun 2 Bulan")
  const calculateAgeDisplay = (dob: Date) => {
    if (!(dob instanceof Date) || isNaN(dob.getTime())) {
      return "Usia tidak diketahui";
    }

    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      // Menghitung hari di bulan sebelumnya
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


  // Update usia saat komponen dimuat atau tanggal lahir berubah
  useEffect(() => {
    const ageInMonths = calculateAgeInMonths(childBirthDate);
    setChildAgeInMonths(ageInMonths);
    setChildAgeDisplay(calculateAgeDisplay(childBirthDate)); // Set tampilan usia
  }, [childBirthDate]);

  // --- STRUKTUR DATA BARU DENGAN KATEGORI ---
  const perkembanganAnakData = [
    {
      usia: '0-3 Bulan',
      minMonths: 0,
      maxMonths: 3,
      categories: [
        { name: 'Gerak Kasar', icon: FaRunning, milestones: ['Mengangkat kepala saat tengkurap', 'Mengangkat kepala 45 derajat', 'Menggerakkan lengan dan kaki bersamaan'] },
        { name: 'Gerak Halus', icon: FaHandPaper, milestones: ['Menggenggam jari/mainan', 'Memperhatikan tangan sendiri'] },
        { name: 'Bicara & Bahasa', icon: FaComments, milestones: ['Merespon suara keras', 'Membuat suara cooing'] },
        { name: 'Sosial & Kemandirian', icon: FaUsers, milestones: ['Melihat wajah orang', 'Tersenyum spontan'] },
      ],
    },
    {
      usia: '3-6 Bulan',
      minMonths: 3,
      maxMonths: 6,
      categories: [
        { name: 'Gerak Kasar', icon: FaRunning, milestones: ['Berguling dari telentang ke tengkurap', 'Duduk dengan bantuan'] },
        { name: 'Gerak Halus', icon: FaHandPaper, milestones: ['Meraih benda', 'Memindahkan benda dari satu tangan ke tangan lain'] },
        { name: 'Bicara & Bahasa', icon: FaComments, milestones: ['Tertawa', 'Mengoceh (babbling)'] },
        { name: 'Sosial & Kemandirian', icon: FaUsers, milestones: ['Mengenali wajah familiar', 'Menunjukkan kesenangan dengan senyuman'] },
      ],
    },
    {
      usia: '6-9 Bulan',
      minMonths: 6,
      maxMonths: 9,
      categories: [
        { name: 'Gerak Kasar', icon: FaRunning, milestones: ['Duduk tanpa bantuan', 'Merangkak'] },
        { name: 'Gerak Halus', icon: FaHandPaper, milestones: ['Mengambil benda kecil dengan ibu jari & telunjuk (pincer grasp)', 'Memindahkan benda dari tangan ke mulut'] },
        { name: 'Bicara & Bahasa', icon: FaComments, milestones: ['Mengoceh dengan variasi suara', 'Merespon nama sendiri'] },
        { name: 'Sosial & Kemandirian', icon: FaUsers, milestones: ['Bermain cilukba', 'Menunjukkan kecemasan perpisahan'] },
      ],
    },
    {
      usia: '9-12 Bulan',
      minMonths: 9,
      maxMonths: 12,
      categories: [
        { name: 'Gerak Kasar', icon: FaRunning, milestones: ['Berdiri dengan bantuan', 'Berjalan dengan bantuan', 'Mampu menarik diri untuk berdiri'] },
        { name: 'Gerak Halus', icon: FaHandPaper, milestones: ['Mewadahi benda ke dalam wadah', 'Mengambil benda dengan pincer grasp yang lebih baik'] },
        { name: 'Bicara & Bahasa', icon: FaComments, milestones: ['Mengucapkan "mama" dan "papa" (dengan arti)', 'Mengikuti instruksi sederhana'] },
        { name: 'Sosial & Kemandirian', icon: FaUsers, milestones: ['Melambaikan tangan', 'Menunjuk benda yang diinginkan'] },
      ],
    },
    {
      usia: '1-2 Tahun', // 12-24 bulan
      minMonths: 12,
      maxMonths: 24,
      categories: [
        { name: 'Gerak Kasar', icon: FaRunning, milestones: ['Berjalan sendiri', 'Naik turun tangga dengan bantuan'] },
        { name: 'Gerak Halus', icon: FaHandPaper, milestones: ['Menyusun balok 2-4 tumpuk', 'Makan sendiri dengan sendok'] },
        { name: 'Bicara & Bahasa', icon: FaComments, milestones: ['Berbicara 2-3 kata', 'Menunjuk gambar ketika disebut namanya'] },
        { name: 'Sosial & Kemandirian', icon: FaUsers, milestones: ['Menirukan orang dewasa', 'Bermain berdampingan dengan anak lain'] },
      ],
    },
    {
      usia: '2-3 Tahun', // 24-36 bulan
      minMonths: 24,
      maxMonths: 36,
      categories: [
        { name: 'Gerak Kasar', icon: FaRunning, milestones: ['Melompat dengan dua kaki', 'Menendang bola'] },
        { name: 'Gerak Halus', icon: FaHandPaper, milestones: ['Menggambar garis/lingkaran', 'Membuka kenop pintu'] },
        { name: 'Bicara & Bahasa', icon: FaComments, milestones: ['Mengikuti instruksi dua langkah', 'Berbicara dalam kalimat sederhana (2-3 kata)'] },
        { name: 'Sosial & Kemandirian', icon: FaUsers, milestones: ['Bermain peran sederhana', 'Mulai potty training'] },
      ],
    },
    {
      usia: '3-4 Tahun', // 36-48 bulan
      minMonths: 36,
      maxMonths: 48,
      categories: [
        { name: 'Gerak Kasar', icon: FaRunning, milestones: ['Berlari dan memanjat lebih baik', 'Mengendarai sepeda roda tiga'] },
        { name: 'Gerak Halus', icon: FaHandPaper, milestones: ['Memotong dengan gunting anak', 'Menulis huruf/angka sederhana'] },
        { name: 'Bicara & Bahasa', icon: FaComments, milestones: ['Berbicara dalam kalimat lengkap', 'Mengenali warna dasar'] },
        { name: 'Sosial & Kemandirian', icon: FaUsers, milestones: ['Berbagi mainan dengan teman', 'Mengikuti aturan permainan sederhana'] },
      ],
    },
    {
      usia: '4-5 Tahun', // 48-60 bulan
      minMonths: 48,
      maxMonths: 60,
      categories: [
        { name: 'Gerak Kasar', icon: FaRunning, milestones: ['Melompat dengan satu kaki', 'Menangkap bola dengan dua tangan'] },
        { name: 'Gerak Halus', icon: FaHandPaper, milestones: ['Menggambar orang dengan beberapa bagian tubuh', 'Mengancingkan baju sendiri'] },
        { name: 'Bicara & Bahasa', icon: FaComments, milestones: ['Menghitung sampai 10', 'Menceritakan cerita sederhana'] },
        { name: 'Sosial & Kemandirian', icon: FaUsers, milestones: ['Mengelola emosi dengan lebih baik', 'Memiliki teman imajiner'] },
      ],
    },
    {
      usia: '5-6 Tahun', // 60-72 bulan
      minMonths: 60,
      maxMonths: 72,
      categories: [
        { name: 'Gerak Kasar', icon: FaRunning, milestones: ['Melakukan lompat tali', 'Bersepeda tanpa roda bantu'] },
        { name: 'Gerak Halus', icon: FaHandPaper, milestones: ['Menulis nama sendiri', 'Menggambar bentuk kompleks'] },
        { name: 'Bicara & Bahasa', icon: FaComments, milestones: ['Siap masuk sekolah', 'Mulai membaca dan menulis kata sederhana'] },
        { name: 'Sosial & Kemandirian', icon: FaUsers, milestones: ['Bisa bermain secara kooperatif', 'Memahami konsep jujur/bohong'] },
      ],
    },
    // Tambahkan lebih banyak tahapan jika diperlukan hingga 12 tahun
    // Contoh untuk usia sekolah (gunakan minMonths dan maxMonths sesuai rentang)
    {
      usia: '6-8 Tahun', // 72-96 bulan
      minMonths: 72,
      maxMonths: 96,
      categories: [
        { name: 'Kognitif', icon: FaStethoscope, milestones: ['Memahami sebab-akibat', 'Bisa memecahkan masalah sederhana'] },
        { name: 'Sosial', icon: FaUsers, milestones: ['Mulai mengembangkan minat hobi', 'Mengembangkan persahabatan yang lebih dalam'] },
      ],
    },
    {
      usia: '8-10 Tahun', // 96-120 bulan
      minMonths: 96,
      maxMonths: 120,
      categories: [
        { name: 'Kognitif', icon: FaStethoscope, milestones: ['Mampu belajar lebih kompleks', 'Mulai berpikir kritis'] },
        { name: 'Emosional', icon: FaUsers, milestones: ['Mulai peduli dengan penampilan diri', 'Mengembangkan rasa tanggung jawab'] },
      ],
    },
    {
      usia: '10-12 Tahun', // 120-144 bulan
      minMonths: 120,
      maxMonths: 144,
      categories: [
        { name: 'Kognitif', icon: FaStethoscope, milestones: ['Mulai berpikir abstrak', 'Lebih mandiri dalam belajar'] },
        { name: 'Sosial & Emosional', icon: FaUsers, milestones: ['Membangun identitas diri', 'Meningkatkan kemampuan negosiasi'] },
      ],
    },
  ];

  const toggleDetailKembang = (usia: string) => {
    setShowDetailKembang((prevShowDetail) => ({
      ...prevShowDetail,
      [usia]: !prevShowDetail[usia],
    }));
  };

  // Efek samping untuk secara otomatis memperluas bagian usia anak saat ini
  useEffect(() => {
    const currentAgeSection = perkembanganAnakData.find(
      (tahap) => childAgeInMonths >= tahap.minMonths && childAgeInMonths < tahap.maxMonths
    );
    if (currentAgeSection) {
      setShowDetailKembang((prev) => ({ ...prev, [currentAgeSection.usia]: true }));
    }
  }, [childAgeInMonths]);

  return (
    <div className="p-4 shadow-lg"> {/* Container untuk seluruh komponen */}
      {/* Header */}
      <div className="flex items-center justify-between bg-white py-3 px-4 rounded-b-lg -mx-4 shadow-sm mb-4">
        <div className="flex items-center">
          {/* Untuk tombol kembali  */}
          <button className="text-gray-500 hover:text-gray-700 mr-4">
            <Link href="/">
                <i className="fa-solid fa-circle-chevron-left text-2xl"></i>
            </Link>
          </button>
          <div>
            <h1 className="text-lg font-semibold">Perkembangan</h1>
            {/* Informasi anak: Gunakan childAgeDisplay */}
            <p className="text-sm text-gray-600">Lala {childAgeDisplay}</p> 
          </div>
        </div>
      </div>

      {/* Daftar Tahapan Perkembangan */}
      {perkembanganAnakData.map((tahap) => {
        const isCurrentAge = childAgeInMonths >= tahap.minMonths && childAgeInMonths < tahap.maxMonths;
        const isPastAge = childAgeInMonths >= tahap.maxMonths;
        const isFutureAge = childAgeInMonths < tahap.minMonths; // Tambahan untuk tahap yang akan datang

        return (
          <div key={tahap.usia} className="mb-4">
            {/* Bagian untuk Tahap Terlewat (Previous Development Stage) */}
            {isPastAge && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Tahapan Perkembangan Sebelumnya</h3>
                <div 
                  className="bg-white rounded-lg shadow-sm p-4 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleDetailKembang(tahap.usia)}
                >
                  <div>
                    <h4 className="text-base font-medium text-gray-800">{tahap.usia}</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Overdue
                    </span>
                  </div>
                  <FaChevronDown className="text-gray-400" />
                </div>
                {/* Tampilkan detail kategori jika diperluas */}
                {showDetailKembang[tahap.usia] && (
                  <div className="p-4 pt-0">
                    <p className="text-sm text-gray-600 mb-3">Pencapaian utama di tahap ini:</p>
                    <div className="space-y-3">
                      {tahap.categories.map((category, catIndex) => (
                        <div key={catIndex} className="bg-white rounded-lg shadow-sm p-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-100 mr-3">
                              {category.icon && <category.icon className="text-cyan-600" size={18} />}
                            </div>
                            <span className="font-medium text-gray-800">{category.name}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            {/* Progres disimulasikan sebagai 0/total milestones */}
                            <span className="mr-2 text-sm">0/{category.milestones.length}</span>
                            <FaChevronDown className="text-xs" /> {/* Panah kecil di samping progres */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bagian untuk Tahap Saat Ini atau Yang Akan Datang */}
            {!isPastAge && ( // Hanya tampilkan jika bukan tahap terlewat
              <div className={`border rounded-lg shadow-sm overflow-hidden 
                ${isCurrentAge ? 'border-cyan-500 bg-cyan-50' : 'bg-white border-gray-200'}
              `}>
                <div 
                  className="p-4 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleDetailKembang(tahap.usia)}
                >
                  <h2 className={`text-lg font-semibold 
                    ${isCurrentAge ? 'text-cyan-700' : 'text-gray-800'}
                  `}>
                    {tahap.usia} 
                    {isCurrentAge && <span className="ml-2 text-sm text-cyan-600">(Saat Ini)</span>}
                    {isFutureAge && <span className="ml-2 text-sm text-gray-500">(Akan Datang)</span>}
                  </h2>
                  {showDetailKembang[tahap.usia] ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                </div>

                {showDetailKembang[tahap.usia] && (
                  <div className="p-4 pt-0">
                    <p className="text-sm text-gray-600 mb-3">Pencapaian utama di tahap ini:</p>
                    <div className="space-y-3">
                      {tahap.categories.map((category, catIndex) => (
                        <div key={catIndex} className="bg-white rounded-lg shadow-sm p-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-100 mr-3">
                              {category.icon && <category.icon className="text-cyan-600" size={18} />}
                            </div>
                            <span className="font-medium text-gray-800">{category.name}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            {/* Progres disimulasikan sebagai 0/total milestones */}
                            <span className="mr-2 text-sm">0/{category.milestones.length}</span>
                            <FaChevronDown className="text-xs" /> {/* Panah kecil di samping progres */}
                          </div>
                          {/* Anda bisa menambahkan pop-up atau expander di sini untuk menampilkan milestones */}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TahapKembang;