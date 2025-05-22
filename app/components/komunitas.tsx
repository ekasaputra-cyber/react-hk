'use client'; // Penting jika Anda menggunakan komponen client di App Router

import { useState } from 'react';
import Link from 'next/link'; // Untuk tombol kembali di header
import { FiSend } from 'react-icons/fi'; // Untuk ikon tombol kirim

// Definisikan tipe untuk Postingan
interface Post {
  id: string;
  author: string;
  timestamp: string;
  content: string;
}

const CommunityPage = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Mama Lala',
      timestamp: '2 jam yang lalu',
      content: 'Anak saya (6 bulan) susah sekali tidur malam, padahal sudah saya coba berbagai cara. Ada yang punya tips ampuh?',
    },
    {
      id: '2',
      author: 'Ayah Budi',
      timestamp: 'Kemarin',
      content: 'Balita saya (2 tahun) sering tantrum di tempat umum. Bagaimana cara menanganinya tanpa mempermalukan diri sendiri?',
    },
    {
      id: '3',
      author: 'Bunda Sasa',
      timestamp: '2 hari yang lalu',
      content: 'Anak saya (4 tahun) tiba-tiba jadi pemilih makanan, padahal sebelumnya tidak. Ada ide resep yang disukai anak-anak?',
    },
  ]);
  const [newPostContent, setNewPostContent] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: Date.now().toString(), // ID unik
        author: 'Anda', // Atau nama pengguna yang login
        timestamp: 'Baru saja', // Bisa diubah ke format waktu yang lebih akurat
        content: newPostContent.trim(),
      };
      setPosts([newPost, ...posts]); // Tambahkan postingan baru di paling atas
      setNewPostContent(''); // Kosongkan input
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Header Halaman Komunitas */}
      <div className="bg-cyan-600 text-white p-4 shadow-md">
        <div className="flex items-center">
          <Link href="/" className="text-white hover:text-cyan-100 transition-colors mr-3">
            <i className="fa-solid fa-circle-chevron-left text-2xl"></i>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Komunitas Orang Tua</h1>
            <p className="text-sm opacity-90">Bagikan keluhan dan pengalaman Anda</p>
          </div>
        </div>
      </div>

      {/* Area Input Postingan Baru */}
      <div className="p-4 border-b border-gray-200">
        <form onSubmit={handlePostSubmit} className="flex flex-col">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y min-h-[80px]"
            placeholder="Tulis keluhan atau pengalaman Anda di sini..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows={3}
          ></textarea>
          <button
            type="submit"
            className={`mt-3 self-end px-5 py-2 bg-cyan-500 text-white rounded-lg flex items-center transition-colors 
              ${!newPostContent.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-600'}`}
            disabled={!newPostContent.trim()}
          >
            <FiSend className="mr-2" /> Kirim Keluhan
          </button>
        </form>
      </div>

      {/* Daftar Postingan */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">Belum ada postingan. Jadilah yang pertama!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-cyan-700">{post.author}</span>
                <span className="text-xs text-gray-500">{post.timestamp}</span>
              </div>
              <p className="text-gray-800 leading-relaxed">{post.content}</p>
              {/* Anda bisa menambahkan tombol Balas/Suka/Bagikan di sini */}
              <div className="mt-3 flex space-x-4 text-gray-500 text-sm">
                <button className="flex items-center hover:text-cyan-600">
                  <i className="fa-regular fa-comment mr-1"></i> Balas
                </button>
                <button className="flex items-center hover:text-red-500">
                  <i className="fa-regular fa-heart mr-1"></i> Suka
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityPage;