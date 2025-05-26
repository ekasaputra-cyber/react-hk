// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase'; // Sesuaikan path
import { getGenerativeResponse } from '../../../lib/gemini'; // Impor fungsi dari lib/gemini.ts

type ChatRequestBody = {
  question?: string;
};

type ChatResponseData = {
  botResponse?: string;
  source?: 'database' | 'gemini' | 'fallback'; // Untuk mengetahui sumber jawaban
  error?: string;
  details?: string;
};

export async function POST(request: Request) {
  try {
    const body: ChatRequestBody = await request.json();
    const userQuestion = body.question;

    if (!userQuestion || userQuestion.trim() === "") {
      return NextResponse.json({ error: "Pertanyaan tidak boleh kosong." } as ChatResponseData, { status: 400 });
    }

    // 1. Coba cari jawaban di Supabase (Database Pertanyaan Umum)
    const { data: dbData, error: supabaseError } = await supabase
      .from('common_questions')
      .select('response')
      .ilike('question', `%${userQuestion}%`) // Atau .eq() untuk pencocokan persis
      .single();

    if (supabaseError && supabaseError.code !== 'PGRST116') { // PGRST116: "Query result has no rows" - ini bukan error, tapi data tidak ada
      console.error("Supabase error fetching chat response:", supabaseError);
      // Jangan kirim detail error supabase ke client di produksi
      return NextResponse.json({ error: "Gagal mengambil respons dari database.", source: 'fallback' } as ChatResponseData, { status: 500 });
    }

    if (dbData && dbData.response) {
      // Jawaban ditemukan di database
      console.log("Jawaban ditemukan di DB Supabase.");
      return NextResponse.json({ botResponse: dbData.response, source: 'database' } as ChatResponseData, { status: 200 });
    } else {
      // 2. Jika tidak ditemukan di Supabase, teruskan ke Gemini AI
      console.log("Jawaban tidak ditemukan di DB, meneruskan ke Gemini AI...");
      
      // Prompt Engineering Sederhana: Beri konteks pada Gemini
      const promptForGemini = `Anda adalah Panda, asisten dokter anak virtual yang ramah, informatif, dan berempati. Jawablah pertanyaan berikut ini dari pengguna terkait kesehatan anak dengan bahasa yang mudah dipahami dan akurat. Jika pertanyaan di luar konteks kesehatan anak, tolak dengan sopan atau arahkan kembali. Pertanyaan: "${userQuestion}"`;

      const geminiResponseText = await getGenerativeResponse(promptForGemini);

      if (geminiResponseText) {
        console.log("Jawaban berhasil didapatkan dari Gemini AI.");
        return NextResponse.json({ botResponse: geminiResponseText, source: 'gemini' } as ChatResponseData, { status: 200 });
      } else {
        // 3. Fallback jika Gemini juga gagal atau tidak ada API Key
        console.log("Gemini AI gagal memberikan jawaban atau tidak terkonfigurasi.");
        return NextResponse.json({ 
          botResponse: "Maaf, saya belum bisa menjawab pertanyaan Anda saat ini. Mungkin Anda bisa mencoba pertanyaan lain atau hubungi dokter anak untuk informasi lebih lanjut.",
          source: 'fallback'
        } as ChatResponseData, { status: 200 }); // Status 200 karena bot tetap merespons, meskipun fallback
      }
    }

  } catch (error: any) {
    console.error("Error processing chat request (general catch):", error);
    if (error instanceof SyntaxError) { // Error jika body JSON tidak valid
        return NextResponse.json({ error: "Format request tidak valid.", source: 'fallback' } as ChatResponseData, { status: 400 });
    }
    return NextResponse.json({ error: "Terjadi kesalahan pada server.", source: 'fallback' } as ChatResponseData, { status: 500 });
  }
}