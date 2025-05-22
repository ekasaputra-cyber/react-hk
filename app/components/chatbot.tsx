'use client'

import { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi'; // FiUser dan FiMessageSquare tidak digunakan
import { IoMdMedical } from 'react-icons/io'; // Masih ada tapi tidak digunakan di UI yang sekarang
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
  const [showCommonQuestions, setShowCommonQuestions] = useState(true); 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- PERBAIKAN: commonQuestions sekarang adalah array objek dengan pertanyaan dan jawaban ---
  const commonQuestionsData = [
    {
      question: 'Demam pada anak',
      response: "Demam pada anak biasanya merupakan reaksi normal tubuh terhadap infeksi. Pastikan anak tetap terhidrasi dengan baik dan berikan parasetamol atau ibuprofen sesuai dosis. Jika demamnya sangat tinggi (>39°C), disertai kejang, ruam, atau tidak turun dalam 24-48 jam, segera konsultasikan ke dokter anak."
    },
    {
      question: 'Imunisasi yang dibutuhkan',
      response: "Imunisasi sangat penting untuk melindungi anak dari penyakit berbahaya. Untuk anak usia 0-12 bulan, imunisasi dasar yang diperlukan antara lain Hepatitis B, Polio, BCG, DPT-HB-Hib, dan Campak. Lanjutkan dengan imunisasi booster dan tambahan sesuai rekomendasi IDAI dan jadwal imunisasi anak Anda."
    },
    {
      question: 'Pola makan sehat',
      response: "Pola makan sehat untuk balita (1-5 tahun) harus mengandung karbohidrat kompleks, protein, lemak sehat, serta vitamin dan mineral dari beragam buah dan sayur. Pastikan porsi sesuai usia, tekstur makanan disesuaikan dengan kemampuan mengunyah anak, dan hindari makanan olahan tinggi gula/garam."
    },
    {
      question: 'Alergi susu sapi',
      response: "Alergi susu sapi sering muncul sebagai gejala seperti ruam kulit (eksim), diare kronis, sembelit, muntah, kolik parah, atau bahkan kesulitan bernapas. Jika dicurigai, segera konsultasikan dengan dokter anak. Dokter mungkin akan menyarankan pengganti susu formula hipoalergenik atau diet eliminasi untuk ibu menyusui. Jangan mengganti susu tanpa anjuran dokter."
    },
    {
      question: 'Tumbuh kembang normal',
      response: "Setiap anak memiliki tempo perkembangan yang berbeda. Namun secara umum di usia 1 tahun anak sudah bisa berdiri sendiri, mengatakan beberapa kata sederhana, merespon ketika dipanggil namanya, dan menunjuk benda. Penting untuk terus menstimulasi anak melalui bermain dan interaksi. Jika ada kekhawatiran signifikan, konsultasikan dengan dokter anak."
    },
    {
      question: 'Anak susah tidur',
      response: "Sulit tidur pada anak bisa disebabkan oleh banyak faktor, mulai dari rutinitas tidur yang kurang teratur, lingkungan tidur tidak nyaman, hingga adanya kekhawatiran atau sakit. Coba ciptakan rutinitas tidur yang konsisten, pastikan kamar gelap dan tenang, serta hindari gadget sebelum tidur. Jika berlanjut, cari nasihat medis."
    },
    {
      question: 'Ruam popok',
      response: "Ruam popok adalah iritasi kulit umum pada bayi. Untuk mengatasinya, pastikan mengganti popok secara rutin (setiap 2-3 jam), bersihkan area popok dengan air bersih dan keringkan sepenuhnya sebelum mengenakan popok baru, serta gunakan krim ruam popok yang mengandung zinc oxide. Biarkan area popok terbuka sesekali agar kulit bernapas."
    },
    {
      question: 'Batuk dan pilek pada anak',
      response: "Batuk dan pilek pada anak seringkali disebabkan oleh infeksi virus dan biasanya bisa diatasi di rumah. Pastikan anak istirahat cukup, penuhi kebutuhan cairan (air putih, ASI, atau sup), dan berikan makanan bergizi. Penguapan atau tetes hidung saline bisa membantu. Jika gejala memburuk, disertai demam tinggi terus-menerus, sesak napas, atau tidak membaik dalam seminggu, segera ke dokter."
    },
    {
      question: 'Tips menstimulasi balita',
      response: "Untuk stimulasi balita (1-3 tahun), ajak mereka bermain peran, membaca buku bergambar bersama, menyanyi, melakukan aktivitas fisik di luar ruangan (berlari, melompat), dan ajarkan kosakata baru. Ini membantu perkembangan kognitif, bahasa, motorik, dan sosial-emosional mereka."
    },
    {
      question: 'Mengatasi tantrum anak',
      response: "Tantrum pada anak adalah bagian normal dari perkembangan emosional. Saat anak tantrum, tetaplah tenang, validasi perasaannya ('Kamu marah ya, karena...'), dan tawarkan pilihan lain. Hindari memberikan perhatian berlebihan saat tantrum, namun tetap pastikan keamanannya. Setelah tantrum reda, peluk dan bicarakan perasaannya."
    }
  ];
  // --- AKHIR PERBAIKAN STRUKTUR DATA ---


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessageText = inputValue.trim(); // Simpan teks pesan pengguna

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText, // Gunakan teks pesan pengguna yang sudah di-trim
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      // --- PERBAIKAN: Cari respons yang sesuai dengan pertanyaan pengguna ---
      const foundQuestion = commonQuestionsData.find(q => q.question.toLowerCase() === userMessageText.toLowerCase());
      const botResponseText = foundQuestion ? foundQuestion.response : "Maaf, saya belum memahami pertanyaan Anda. Bisakah Anda mengulanginya atau bertanya dengan kata kunci yang lebih spesifik?";
      // --- AKHIR PERBAIKAN LOGIKA RESPON ---
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    // Langsung kirim pesan saat pertanyaan cepat diklik
    // Ini akan memicu handleSendMessage dengan inputValue yang sudah diisi
    setTimeout(() => { // Memberi sedikit jeda agar inputValue terupdate di state
        handleSendMessage();
    }, 0); 
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
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500">Pertanyaan umum:</p>
            <button
              onClick={() => setShowCommonQuestions(!showCommonQuestions)}
              className="text-gray-500 hover:text-cyan-600 transition-colors"
            >
              {showCommonQuestions ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
            </button>
          </div>
          {showCommonQuestions && (
            <div className="flex flex-wrap gap-2 mb-4">
              {commonQuestionsData.map((item, index) => ( // Gunakan commonQuestionsData
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(item.question)} // Kirim item.question
                  className="text-xs bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full hover:bg-cyan-100 transition"
                >
                  {item.question}
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