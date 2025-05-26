// app/api/common-questions/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase'; // Sesuaikan path jika lib/supabase.ts ada di root proyek

// Tipe data untuk respons (bisa tetap sama atau disesuaikan)
type CommonQuestionForApi = {
  id: number;
  question: string;
};

type ErrorResponse = {
  error: string;
  details?: string;
};

// Handler untuk metode GET
export async function GET(request: Request) { // Menggunakan 'Request' dari Web API standar
  // 'supabase' diimpor dari lib/supabase.ts
  // Anda mungkin ingin menambahkan pengecekan null/undefined untuk supabase di sini jika lib/supabase.ts bisa mengembalikan itu,
  // tapi jika lib/supabase.ts selalu throw error jika gagal inisialisasi, maka tidak perlu.
  // if (!supabase) {
  //   return NextResponse.json({ error: "Klien Supabase tidak tersedia atau gagal diinisialisasi." } as ErrorResponse, { status: 500 });
  // }

  try {
    const { data: questions, error: supabaseError } = await supabase
      .from('common_questions')
      .select('id, question')
      .order('id', { ascending: true });

    if (supabaseError) {
      console.error("Supabase error fetching common questions:", supabaseError);
      return NextResponse.json({ error: "Error dari Supabase saat mengambil data.", details: supabaseError.message } as ErrorResponse, { status: 500 });
    }

    return NextResponse.json(questions || [] as CommonQuestionForApi[], { status: 200 });

  } catch (error: any) { // Menangkap error lain yang mungkin terjadi
    console.error("Error fetching common questions (catch block):", error);
    const details = process.env.NODE_ENV === 'development' ? error.message : undefined;
    return NextResponse.json({ error: "Gagal mengambil data pertanyaan umum dari server.", details } as ErrorResponse, { status: 500 });
  }
}

// Anda bisa menambahkan fungsi untuk metode lain seperti POST, PUT, DELETE di sini jika perlu
// export async function POST(request: Request) { ... }