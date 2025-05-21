// app/api/ask.tsx
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // Cek jika tidak ada API Key (mode testing)
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      answer: `Simulasi jawaban untuk pertanyaan: "${prompt}".\n\nKarena tidak ada API key, ini hanya jawaban mock.`
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Kamu adalah dokter anak yang sopan dan informatif. Jawablah pertanyaan tentang anak usia 0-12 tahun.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      return NextResponse.json({ answer: `Terjadi kesalahan: ${error.error?.message || 'Unknown error'}` });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || 'Tidak ada jawaban.';
    return NextResponse.json({ answer });

  } catch (error) {
    return NextResponse.json({ answer: `Error koneksi ke OpenAI: ${error}` });
  }
}
