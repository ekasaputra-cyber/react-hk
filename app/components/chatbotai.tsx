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
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      text: input,
      sender: 'user' as const,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();

      const botMsg = {
        id: Date.now().toString() + '-bot',
        text: data.answer || 'Maaf, terjadi kesalahan.',
        sender: 'bot' as const,
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString() + '-error', text: 'Gagal menghubungi server.', sender: 'bot' },
      ]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="space-y-3 min-h-[70vh] overflow-y-auto mb-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`p-2 rounded-md max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 mr-auto'}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={endRef} />
        {isLoading && <p className="text-sm text-gray-400">Mengetik...</p>}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ketik pertanyaan Anda..."
          className="flex-1 border rounded-l-md px-4 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r-md disabled:opacity-50"
          disabled={!input.trim() || isLoading}
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
