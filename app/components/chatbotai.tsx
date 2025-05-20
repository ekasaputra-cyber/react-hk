'use client'

import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser } from 'react-icons/fi';
import { IoMdMedical } from 'react-icons/io';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function AIDoctorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya asisten dokter anak AI. Tanyakan apa saja tentang kesehatan anak Anda.',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Koneksi ke DeepSeek/API AI
  const fetchAIResponse = async (userInput: string) => {
    try {
      const response = await fetch('https://api.deepseek.com/v1/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'Anda adalah dokter anak profesional. Berikan jawaban medis yang akurat, jelas, dan empatik. Gunakan bahasa Indonesia yang mudah dimengerti.'
            },
            {
              role: 'user',
              content: userInput
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Maaf, saya tidak bisa memproses pertanyaan itu.';

    } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'Terjadi kesalahan saat menghubungi dokter AI. Silakan coba lagi.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Tambahkan pesan user
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Dapatkan respon dari AI
    const aiResponse = await fetchAIResponse(inputValue);

    const botMessage: Message = {
      id: Date.now().toString(),
      text: aiResponse,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-cyan-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <IoMdMedical className="text-2xl mr-3" />
          <div>
            <h1 className="text-xl font-bold">Dokter Anak AI</h1>
            <p className="text-sm opacity-90">Didukung oleh DeepSeek AI</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-4 ${message.sender === 'user' 
                ? 'bg-cyan-500 text-white rounded-br-none' 
                : 'bg-white border rounded-bl-none shadow'}`}>
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-cyan-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-lg rounded-bl-none shadow p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Tanyakan tentang kesehatan anak..."
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-cyan-500 text-white p-3 rounded-lg hover:bg-cyan-600 disabled:opacity-50"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    <div className="text-xs text-gray-500 p-2 text-center">
    Informasi ini bukan pengganti konsultasi dokter. Untuk keadaan darurat, segera hubungi layanan kesehatan terdekat.
    </div>
    </div>
  );
}