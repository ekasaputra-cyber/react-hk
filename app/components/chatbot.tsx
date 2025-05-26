'use client'

import { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import Link from 'next/link';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

type Message = {
  id: string; // Atau number jika dari DB
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// Tipe untuk data pertanyaan umum dari backend
type CommonQuestionFromDB = {
  id: number; // Asumsi ID dari DB adalah number
  question: string;
  // response tidak perlu di sini jika hanya untuk tombol
};

export default function DoctorChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-bot-message', // ID bisa dibuat unik di frontend atau dari DB jika pesan ini juga dinamis
      text: 'Halo! Saya Panda, asisten dokter anak virtual. Ada yang bisa saya bantu terkait kesehatan anak Anda?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCommonQuestions, setShowCommonQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State untuk menyimpan pertanyaan umum yang diambil dari database
  const [commonQuestions, setCommonQuestions] = useState<CommonQuestionFromDB[]>([]);

  // Efek untuk mengambil daftar pertanyaan umum saat komponen dimuat
  useEffect(() => {
  const fetchCommonQuestions = async () => {
    try {
      const response = await fetch('/api/common-questions'); // Memanggil API yang sudah berhasil
      if (!response.ok) {
        throw new Error(`Gagal mengambil pertanyaan umum: ${response.status}`);
      }
      const data: CommonQuestionFromDB[] = await response.json();
      setCommonQuestions(data); // State ini akan digunakan untuk merender tombol
    } catch (error) {
      console.error("Error fetching common questions:", error);
    }
  };
  fetchCommonQuestions();
}, []);// Array dependensi kosong agar hanya berjalan sekali saat mount

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessageText = inputValue.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // --- PERBAIKI DI SINI ---
      const apiResponse = await fetch('/api/chat', { // Panggil endpoint /api/chat
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessageText }),
      });
      // --- AKHIR PERBAIKAN ---

      if (!apiResponse.ok) {
        // Tangani jika API /api/chat mengembalikan error status
        const errorData = await apiResponse.json().catch(() => ({})); // coba parse error JSON jika ada
        throw new Error(`Gagal mendapatkan balasan dari bot: ${apiResponse.status} ${apiResponse.statusText} - ${errorData.error || ''}`);
      }

      const responseData = await apiResponse.json();
      // Pastikan responseData dari /api/chat memiliki properti 'botResponse'
      const botResponseText = responseData.botResponse || "Maaf, saya belum memahami pertanyaan Anda. Mungkin coba pertanyaan lain?";

      const botMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error sending message or getting bot response:", error);
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        text: "Maaf, terjadi kesalahan saat memproses permintaan Anda.", // Atau error.message jika ingin lebih detail
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (questionText: string) => {
    setInputValue(questionText);
    // Memberi sedikit jeda agar inputValue terupdate di state sebelum mengirim
    setTimeout(() => {
      handleSendMessage();
    }, 0);
  };

  return (
// Bagian return dari DoctorChatbot()

<div className="max-w-md mx-auto bg-white min-h-screen flex flex-col shadow-lg" style={{ paddingBottom: '180px' /* Sesuaikan padding ini jika perlu */ }}>
  {/* Header */}
  <div className="bg-cyan-600 text-white p-4 shadow-md sticky top-0 z-10"> {/* Tambahkan sticky dan z-index jika ingin header tetap di atas saat scroll */}
    <div className="flex items-center">
      <Link href="/" className="text-cyan-200 hover:text-white transition-colors"> {/* Warna link agar kontras */}
        <i className="fa-solid fa-circle-chevron-left text-2xl mr-3"></i>
      </Link>
      <div>
        <h1 className="text-xl font-bold">Chat Dokter Anak</h1>
        <p className="text-sm opacity-90">Dibimbing oleh tim dokter spesialis anak</p>
      </div>
    </div>
  </div>

  {/* Chat Container */}
  <div className="flex-1 overflow-y-auto p-4 mb-4"> {/* Kurangi mb jika paddingBottom di div utama sudah cukup */}
    {messages.map((message) => (
      <div
        key={message.id}
        className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`flex items-start max-w-[80%] md:max-w-[70%] rounded-lg p-3 ${ /* max-w disesuaikan */
            message.sender === 'user'
              ? 'bg-cyan-500 text-white rounded-br-none ml-auto' /* ml-auto untuk user */
              : 'bg-gray-100 text-gray-800 shadow rounded-bl-none mr-auto' /* mr-auto untuk bot, warna kontras */
          }`}
        >
          {message.sender === 'bot' && (
            <div className="mr-2 flex-shrink-0"> {/* flex-shrink-0 agar gambar tidak mengecil */}
              <img 
                src="/image/pandok.png" // Pastikan path ini benar dari direktori public
                alt="Avatar Bot" 
                className="w-8 h-8 object-cover rounded-full" // Ukuran avatar bisa disesuaikan
              />
            </div>
          )}
          <div className="flex flex-col"> {/* Wrap text dan timestamp dalam flex-col */}
            <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p> {/* whitespace-pre-wrap untuk line break, break-words untuk kata panjang */}
            <p className={`text-xs mt-1 self-end ${ /* self-end agar timestamp ke kanan bawah */
                message.sender === 'user' ? 'text-cyan-100 opacity-75' : 'text-gray-500 opacity-75'
              }`}
            >
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    ))}

    {isTyping && (
      <div className="flex justify-start mb-4">
        <div className="flex items-start max-w-[80%] md:max-w-[70%]"> {/* Konsisten dengan max-width pesan */}
          <div className="mr-2 flex-shrink-0">
            <img 
              src="/image/pandok.png" // Avatar bot untuk typing indicator
              alt="Avatar Bot Typing" 
              className="w-8 h-8 object-cover rounded-full" 
            />
          </div>
          <div className="bg-gray-100 text-gray-800 shadow rounded-lg rounded-bl-none p-3">
            <div className="flex space-x-1 items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    )}
    <div ref={messagesEndRef} /> {/* Untuk auto-scroll */}
  </div>

  {/* Fixed Bottom Section (Input dan Quick Questions) */}
  <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t shadow-lg_custom_top"> {/* custom shadow untuk atas */}
    {/* Quick Questions Section */}
    <div className="p-3 border-b"> {/* p-3 dan border-b untuk quick questions */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-gray-700">Pertanyaan umum:</p>
        <button
          onClick={() => setShowCommonQuestions(!showCommonQuestions)}
          className="text-gray-500 hover:text-cyan-600 transition-colors p-1 rounded-md" /* p-1 untuk area klik lebih baik */
        >
          {showCommonQuestions ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </button>
      </div>

      {showCommonQuestions && (
        <div className="flex flex-wrap gap-2"> {/* mb-4 dihilangkan, diatur oleh padding p-3 parent */}
          {commonQuestions.length > 0 ? (
            commonQuestions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleQuickQuestion(item.question)}
                className="text-xs bg-cyan-50 text-cyan-700 px-3 py-1.5 rounded-full hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition duration-150 ease-in-out" /* py-1.5 dan style lebih detail */
              >
                {item.question}
              </button>
            ))
          ) : (
            <p className="text-xs text-gray-400 w-full text-center py-1"> {/* w-full text-center py-1 */}
              Memuat pertanyaan umum...
            </p>
          )}
        </div>
      )}
    </div>

    {/* Input Area */}
    <div className="p-3 bg-gray-50"> {/* p-3 dan sedikit background berbeda */}
      <div className="flex items-center"> {/* items-center */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Tulis pertanyaan Anda..."
          className="flex-1 border border-gray-300 rounded-l-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" /* p-2.5 text-sm dan focus:border */
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isTyping}
          className={`bg-cyan-500 text-white p-2.5 rounded-r-lg ${ /* p-2.5 */
            (!inputValue.trim() || isTyping) 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1'
          } transition duration-150 ease-in-out`}
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  </div>
</div>
  );
}