// components/chatbotai.tsx (atau di mana pun komponen Anda berada)
'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

export default function ChatbotAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      text: 'Halo, saya Dr. Panda, dokter anak virtual. Ada yang bisa saya bantu?',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    const currentInput = input.trim(); // 1. Ambil nilai input saat ini dan trim
    if (!currentInput) return;

    const userMsg: Message = { // Tipekan userMsg agar sesuai dengan Message
      id: `user-${Date.now()}`, // Sedikit prefix untuk ID yang lebih jelas
      text: currentInput,       // Gunakan currentInput
      sender: 'user',          // 'user' as const tidak wajib jika Message type sudah benar
    };

    setMessages(prev => [...prev, userMsg]);
    setInput(''); // Kosongkan input setelah nilainya disimpan
    setIsLoading(true);

    try {
      // 2. Ubah endpoint API ke /api/ask (atau path yang benar ke API Gemini Anda)
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 3. Ubah 'question' menjadi 'prompt' dan gunakan currentInput
        body: JSON.stringify({ prompt: currentInput }),
      });

      // Periksa apakah respons dari server OK (status 200-299)
      if (!res.ok) {
        // Coba baca pesan error dari body respons jika ada
        let errorMessage = `Error: ${res.status} ${res.statusText}`;
        try {
            const errorData = await res.json();
            errorMessage = errorData.answer || errorData.message || errorMessage; // API kita mengembalikan 'answer' untuk error juga
        } catch (parseError) {
            // Jika body bukan JSON atau parsing gagal, gunakan status text saja
            console.error("Gagal parse error JSON:", parseError);
        }
        throw new Error(errorMessage); // Lemparkan error agar ditangkap oleh blok catch
      }

      const data = await res.json();

      const botMsg: Message = { // Tipekan botMsg agar sesuai dengan Message
        id: `bot-${Date.now()}`,
        text: data.answer || 'Maaf, terjadi kesalahan atau tidak ada jawaban.', // Fallback jika 'answer' kosong
        sender: 'bot',
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (e: any) { // Tangkap error (bisa juga (e: Error) jika Anda melempar Error)
      console.error("Error saat mengirim pesan:", e);
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          text: e.message || 'Gagal menghubungi server atau memproses permintaan.', // Tampilkan pesan error yang lebih baik
          sender: 'bot',
        },
      ]);
    } finally {
      // 4. Gunakan blok finally untuk memastikan setIsLoading(false) selalu dijalankan
      setIsLoading(false);
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Pastikan styling dari contoh sebelumnya yang lebih lengkap tetap ada jika diinginkan
  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Area tampilan chat */}
      <div className="space-y-3 min-h-[70vh] overflow-y-auto mb-4 p-2 border rounded-lg bg-white shadow-sm">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg max-w-[80%] break-words ${ // Tambahkan break-words
              msg.sender === 'user'
                ? 'bg-blue-500 text-white ml-auto' // Gaya untuk pesan pengguna
                : 'bg-gray-200 text-gray-800 mr-auto' // Gaya untuk pesan bot
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={endRef} />
        {/* Indikator loading */}
        {isLoading && <p className="text-sm text-gray-400 p-2 text-center">Mengetik...</p>}
      </div>
      {/* Input dan tombol kirim */}
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            // Kirim pesan saat tombol Enter ditekan & tidak sedang loading & input tidak kosong
            if (e.key === 'Enter' && !isLoading && input.trim()) {
              sendMessage();
            }
          }}
          placeholder="Ketik pertanyaan Anda tentang kesehatan anak..."
          className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading} // Nonaktifkan input saat loading
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          // Nonaktifkan tombol jika input kosong atau sedang loading
          disabled={!input.trim() || isLoading}
        >
          Kirim
        </button>
      </div>
    </div>
  );
}