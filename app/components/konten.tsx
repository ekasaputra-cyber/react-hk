'use client'

import { useState } from 'react';

type Article = {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  source: string;
  link: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: 'MPASI Tinggi Protein: Sup Krim Ayam',
    category: 'Resep MPASI, 9-11 bulan',
    summary: 'MPASI Tinggi Protein: Sup Krim Ayam',
    content: `Bahan:

1 dada ayam tanpa tulang dan kulit
1 cangkir ASI atau susu formula
1/2 sdt tepung maizena
Cara membuat:

Hilangkan kulit, lemak dan sisa-sisa tulang pada ayam. Cuci sampai bersih, potong dadu.
Rebus ayam dengan air secukupnya selama 10 menit atau sampai ayam matang. Angkat dan tiriskan. Simpan air rebusan ayam untuk kaldu.
Masukkan ayam, tepung dan kaldu (air rebusan ayam) ke dalam blender, haluskan. Gunakan kaldu untuk mengencerkan ataum mengentalkan adonan hingga kekentalan yang diinginkan.
Tim adonan sampai matang. Saat ingin menyajikan tambahkan ASI atau susu formula.`,
    image: '/image/konten/SKA.webp',
    source: '',
    link: '',
  },
  {
    id: 2,
    title: 'Cerita Si Kancil, Sapi, dan Buaya',
    category: 'Dongeng',
    summary: ' Buku Dongeng, Cerita Dongeng, Dongeng, Membaca Dongeng',
    content: `Pada suatu hari, sapi yang tengah berjalan-jalan sendirian mendengar suara jeritan dari arah bebatuan. Ternyata seekor buaya terjebak di bawah tumpukan batu tersebut dan meminta pertolongan. `,
    image: 'https://akcdn.detik.net.id/visual/2022/11/03/cerita-si-kancil_169.jpeg?w=750&q=90',
    source: '',
    link: 'https://www.haibunda.com/parenting/20221103075505-61-288462/8-cerita-si-kancil-terbaik-penuh-pesan-moral-untuk-dongeng-sebelum-tidur',
  },
  {
    id: 3,
    title: 'Perbedaan Anak Pendek Genetik vs Kurang Growth Hormone',
    category: 'Tumbuh Kembang',
    summary: 'Tumbuh Kembang, Genetik, Growth Hormone, Anak Pendek',
    content: `Pertumbuhan anak merupakan indikator penting dalam menilai kesehatan dan perkembangannya. Namun, beberapa anak mengalami pertumbuhan yang lebih lambat atau tinggi badan yang jauh di bawah rata-rata. Dua penyebab umum dari kondisi ini adalah faktor genetik dan kekurangan hormon pertumbuhan (Growth Hormone Deficiency/GHD). Meskipun keduanya dapat menyebabkan tinggi badan yang pendek, penyebab, gejala, dan penanganannya berbeda secara signifikan.`,
    image: 'https://cdn.rri.co.id/berita/Lhokseumawe/o/1720499600563-1000264777/m2ik789o69w55tu.jpeg',
    source: 'RRI',
    link: 'https://rri.co.id/kesehatan/812711/mengenal-beda-stunting-dengan-tubuh-pendek-pada-anak',
  },
    {
    id: 4,
    title: 'Vaksin Wajib untuk Anak Usia Sekolah: Mengapa Penting?',
    category: 'Parenthood, > 6 Tahun',
    summary: 'Jawal Vaksinasi, Vaksinasi, Program Imunisasi, Imunisasi Anak Sekolah, Imunisasi, Vaksinasi anak sekolah',
    content: `si Kecil sudah memasuki usia sekolah? Ini adalah momen besar, bukan hanya bagi perkembangan sosialnya, tetapi juga untuk kesehatannya. Ketika anak mulai bersosialisasi lebih intens dengan teman-teman di sekolah, risiko terpapar berbagai penyakit juga meningkat. Itulah mengapa sangat penting memastikan si Kecil sudah melengkapi vaksinasi sebelum mulai berinteraksi di lingkungan yang lebih luas.`,
    image: 'https://www.akudankau.co.id/sites/default/files/2023-10/Apa%20Saja%20Perlengkapan%20Sekolah%20SD%20yang%20Harus%20Disiapkan_%20Yuk%2C%20Cek%21%20%281%29.jpg',
    source: '',
    link: '',
  },
  {
    id: 5,
    title: 'Jangan Sepelekan Lele! Ini 5 Manfaatnya yang Bikin Anak Makin Sehat!',
    category: 'Protein',
    summary: 'Ikan Lele, Protein, MPASI Anak',
    content: `Selain ayam dan daging sapi, ikan juga jadi pilihan bagus. Dari sekian banyak pilihan ikan, ikan lele sering terlupakan, padahal manfaatnya baik untuk anak.  Ikan lele punya tekstur daging yang lembut, rasanya tidak terlalu amis, dan harganya terjangkau. Tapi lebih dari itu, kandungan gizinya ternyata mendukung tumbuh kembang anak, lho! Yuk, simak apa saja manfaat ikan lele untuk si Kecil.
    1. Kaya Protein Berkualitas Tinggi 2. Sumber Vitamin B12 yang Penting untuk Otak 3. Rendah Merkuri 4. Kaya Fosfor dan Selenium 5. Lemak Sehat yang Mendukung Tumbuh Kembang`,
    image: 'https://media.istockphoto.com/id/487880831/id/foto/ikan-lele-besar-di-atas-meja-kayu.jpg?s=612x612&w=0&k=20&c=57zDtV4CUW1PWoiQ9eGAI-hAvuWFVNgZ4cr7aIUBY3Y=',
    source: '',
    link: '',
  },
];

const EdukasiAnak = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const toggleArticle = (id: number) => {
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h1 className="text-xl font-bold mb-6 text-cyan-700 text-center">
        Artikel Edukasi Anak & MPASI
      </h1>

      <div className="space-y-5">
        {articles.map(({ id, title, category, summary, content, image, source, link }) => (
          <div
            key={id}
            className="border border-cyan-200 rounded-md p-4 hover:bg-cyan-50 transition"
            onClick={() => toggleArticle(id)}
          >
            <div className="flex items-center gap-3">
              <img
                src={image}
                alt={title}
                className="w-14 h-14 rounded-md object-cover"
              />
              <div className="flex-1">
                <h2 className="text-base font-semibold text-cyan-600">{title}</h2>
                <span className="text-xs text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full">
                  {category}
                </span>
                <p className="text-sm text-gray-700 mt-1">{summary}</p>
              </div>
            </div>

            {selectedId === id && (
              <div className="mt-3 text-sm text-gray-800">
                {content}
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-cyan-600 underline"
                >
                  Baca selengkapnya di {source}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EdukasiAnak;
