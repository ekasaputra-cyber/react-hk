'use client'

import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import { IoMdMedical } from 'react-icons/io';
import Link from 'next/link';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'; // Import icons for expand/collapse


type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function DoctorChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya Panda, asisten dokter anak virtual. Ada yang bisa saya bantu terkait kesehatan anak Anda?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCommonQuestions, setShowCommonQuestions] = useState(true); // State baru untuk mengontrol visibilitas
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const commonQuestions = [
    'Demam pada anak',
    'Imunisasi yang dibutuhkan',
    'Pola makan sehat',
    'Alergi susu sapi',
    'Tumbuh kembang normal',
    'Anak susah tidur',
    'Ruam popok',
    'Batuk dan pilek pada anak',
    'Tips menstimulasi balita',
    'Mengatasi tantrum anak'
  ];

  // Auto scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response after 1-2 seconds
    setTimeout(() => {
      const botResponses = [
        "Saya memahami kekhawatiran Anda. Demam pada anak biasanya merupakan reaksi normal tubuh terhadap infeksi. Apakah anak Anda menunjukkan gejala lain seperti batuk atau diare?",
        "Imunisasi penting untuk melindungi anak dari penyakit berbahaya. Untuk anak usia 0-12 bulan, imunisasi dasar yang diperlukan antara lain Hepatitis B, Polio, BCG, DPT-HB-Hib, dan Campak.",
        "Pola makan sehat untuk balita harus mengandung karbohidrat, protein, lemak sehat, serta vitamin dan mineral. Pastikan porsi sesuai usia dan tekstur makanan disesuaikan dengan kemampuan mengunyah anak.",
        "Alergi susu sapi sering muncul sebagai ruam kulit, diare, atau muntah. Alternatifnya bisa menggunakan susu soya atau susu hipoalergenik. Namun konsultasikan dulu dengan dokter anak.",
        "Setiap anak memiliki tempo perkembangan yang berbeda. Namun secara umum di usia 1 tahun anak sudah bisa berdiri sendiri, mengatakan beberapa kata sederhana, dan merespon ketika dipanggil namanya.",
        "Sulit tidur pada anak bisa disebabkan oleh banyak hal, mulai dari rutinitas tidur yang kurang teratur hingga adanya kekhawatiran tertentu. Coba ciptakan rutinitas tidur yang konsisten, pastikan kamar nyaman, dan hindari gadget sebelum tidur.",
        "Ruam popok adalah masalah kulit yang umum pada bayi. Pastikan mengganti popok secara rutin, bersihkan area popok dengan lembut, dan biarkan kulit bayi kering sebelum mengenakan popok baru. Penggunaan krim ruam popok juga dapat membantu.",
        "Batuk dan pilek pada anak seringkali disebabkan oleh infeksi virus. Pastikan anak istirahat cukup, penuhi kebutuhan cairan, dan berikan makanan bergizi. Jika gejala memburuk atau disertai demam tinggi, segera ke dokter.",
        "Untuk stimulasi balita, ajak mereka bermain peran, membaca buku bersama, menyanyi, atau melakukan aktivitas fisik di luar ruangan. Ini membantu perkembangan kognitif, bahasa, dan motorik mereka.",
        "Tantrum pada anak adalah bagian dari perkembangan emosional mereka. Tetap tenang, validasi perasaannya, dan tawarkan pilihan lain. Hindari memberikan perhatian berlebihan saat tantrum, namun tetap pastikan keamanannya.",
        "Bagaimana kondisi nafsu makan anak Anda saat ini? Pola makan sehat untuk anak usia sekolah sebaiknya mencakup beragam buah, sayur, biji-bijian utuh, protein tanpa lemak, dan produk susu rendah lemak. Hindari makanan tinggi gula dan lemak jenuh.",
        "Anak usia 4-6 tahun perlu stimulasi yang melibatkan aktivitas fisik, seperti berlari dan melompat, serta aktivitas yang melatih keterampilan motorik halus, seperti menggambar dan menyusun balok. Bermain puzzle juga bagus untuk kognitif.",
        "Masa prasekolah adalah waktu krusial untuk perkembangan sosial-emosional. Ajarkan anak untuk berbagi, berempati, dan menyelesaikan konflik sederhana. Bermain dengan teman sebaya sangat membantu dalam hal ini.",
        "Jika anak Anda sering sakit, pastikan ia mendapatkan nutrisi yang cukup dari makanan bergizi, istirahat yang cukup, dan lingkungan yang bersih. Cuci tangan secara teratur juga penting untuk mencegah penyebaran kuman.",
        "Anak usia 7-12 tahun sedang dalam masa perkembangan akademis. Dukung minat belajar mereka, ciptakan lingkungan belajar yang nyaman, dan bantu mereka mengatasi tantangan di sekolah. Ingat, bermain juga tetap penting!"
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col shadow-lg" style={{ paddingBottom: '180px' }}>
      {/* Header */}
      <div className="bg-cyan-600 text-white p-4 shadow-md">
        <div className="flex items-center">
          <Link href="/" className="text-cyan-400 hover:text-cyan-500 transition-colors">
                <i className="fa-solid fa-circle-chevron-left text-2xl mr-3"></i>
          </Link>
          
          <div>
            <h1 className="text-xl font-bold">Chat Dokter Anak</h1>
            <p className="text-sm opacity-90">Dibimbing oleh tim dokter spesialis anak</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 mb-16">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-xs rounded-lg p-3 ${message.sender === 'user' 
                ? 'bg-cyan-500 text-white rounded-br-none' 
                : 'bg-white text-gray-800 shadow rounded-bl-none'}`}
            >
              {message.sender === 'bot' && (
                <div className="mr-2 text-cyan-500">
                  <img src="/image/pandok.png" alt="Foto Dokter" className="w-36 object-cover rounded" />
                </div>
              )}
              <div>
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-cyan-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white text-gray-800 shadow rounded-lg rounded-bl-none p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t shadow-xl rounded">
        {/* Quick Questions */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2"> {/* Flexbox untuk mensejajarkan teks dan tombol */}
            <p className="text-sm text-gray-500">Pertanyaan umum:</p>
            <button
              onClick={() => setShowCommonQuestions(!showCommonQuestions)}
              className="text-gray-500 hover:text-cyan-600 transition-colors"
            >
              {showCommonQuestions ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
            </button>
          </div>
          {showCommonQuestions && ( // Kondisi rendering berdasarkan state
            <div className="flex flex-wrap gap-2 mb-4">
              {commonQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full hover:bg-cyan-100 transition"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4">
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tulis pertanyaan Anda..."
              className="flex-1 border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={`bg-cyan-500 text-white p-3 rounded-r-lg ${!inputValue.trim() ? 'opacity-50' : 'hover:bg-cyan-600'}`}
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}