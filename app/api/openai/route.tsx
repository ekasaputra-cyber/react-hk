// app/api/ask/route.ts (atau .js)

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Konfigurasi model Gemini yang akan digunakan
const MODEL_NAME = "gemini-1.5-pro-latest"; // Atau "gemini-pro", "gemini-1.0-pro", dll.

export async function POST(req: Request) {
  let promptFromRequest: string;

  try {
    const body = await req.json();
    promptFromRequest = body.prompt;
  } catch (error) {
    console.error("Error parsing JSON body:", error);
    return NextResponse.json({ answer: "Format permintaan tidak valid." }, { status: 400 });
  }

  if (!promptFromRequest || typeof promptFromRequest !== 'string' || promptFromRequest.trim() === "") {
    return NextResponse.json({ answer: "Prompt tidak boleh kosong." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Cek jika tidak ada API Key (mode testing/development)
  if (!apiKey) {
    console.log("GEMINI_API_KEY tidak ditemukan. Mengembalikan simulasi jawaban.");
    return NextResponse.json({
      answer: `Simulasi jawaban untuk pertanyaan: "${promptFromRequest}".\n\nKarena tidak ada GEMINI_API_KEY, ini hanya jawaban mock.`
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      // System instruction memberikan konteks untuk persona dan tugas model
      // Ini adalah cara yang direkomendasikan untuk model seperti gemini-1.5-pro
      systemInstruction: "Kamu adalah dokter anak yang sopan dan informatif. Jawablah pertanyaan tentang anak usia 0-12 tahun.",
      
      // Opsional: Konfigurasi safety settings
      // safetySettings: [
      //   { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      //   { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      //   { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      //   { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      // ],
    });

    // Catatan: Jika menggunakan model yang lebih lama (seperti "gemini-pro" versi awal)
    // yang mungkin tidak mendukung `systemInstruction` secara langsung di `getGenerativeModel`,
    // Anda mungkin perlu menyusun prompt dalam format chat history:
    // const chat = model.startChat({
    //   history: [
    //     { role: "user", parts: [{ text: "System: Kamu adalah dokter anak yang sopan dan informatif. Jawablah pertanyaan tentang anak usia 0-12 tahun." }] },
    //     { role: "model", parts: [{ text: "Baik, saya mengerti. Silakan ajukan pertanyaan Anda." }] }
    //   ]
    // });
    // const result = await chat.sendMessage(promptFromRequest);
    
    // Untuk model yang mendukung systemInstruction dengan generateContent:
    const result = await model.generateContent(promptFromRequest);
    const response = result.response;

    if (!response || !response.candidates || response.candidates.length === 0) {
      console.error('Gemini API Error: Tidak ada kandidat jawaban dalam respons', response);
      return NextResponse.json({ answer: "Gagal mendapatkan jawaban dari Gemini: Respons tidak memiliki kandidat." }, { status: 500 });
    }

    const firstCandidate = response.candidates[0];

    // Periksa apakah ada konten dan bagian teks di dalam kandidat pertama
    if (!firstCandidate.content || !firstCandidate.content.parts || firstCandidate.content.parts.length === 0) {
        console.error('Gemini API Error: Tidak ada bagian teks dalam konten kandidat', firstCandidate);
        return NextResponse.json({ answer: "Gagal mendapatkan jawaban dari Gemini: Konten kandidat tidak valid." }, { status: 500 });
    }
    
    // Gabungkan semua bagian teks dari kandidat pertama
    const answer = firstCandidate.content.parts.map(part => {
        if (part.text) {
            return part.text;
        }
        return ""; // Atau tangani bagian non-teks jika diharapkan
    }).join("").trim();


    if (!answer) { // Jika setelah trim jawabannya kosong
      console.log('Gemini memberikan jawaban kosong atau hanya whitespace.');
      return NextResponse.json({ answer: "Gemini tidak memberikan jawaban yang dapat ditampilkan." });
    }

    return NextResponse.json({ answer });

  } catch (error: any) {
    console.error('Error saat menghubungi Gemini atau memproses permintaan:', error);
    let errorMessage = 'Terjadi kesalahan internal saat menghubungi layanan Gemini.';
    
    // Mencoba mendapatkan pesan error yang lebih spesifik dari Gemini SDK
    if (error.message) {
        errorMessage = `Error dari Gemini: ${error.message}`;
    } else if (error.toString) {
        errorMessage = error.toString();
    }
    
    // Anda mungkin ingin memeriksa status code error jika tersedia (error.status atau error.code)
    // untuk memberikan pesan yang lebih spesifik atau status HTTP yang berbeda
    return NextResponse.json({ answer: errorMessage }, { status: 500 });
  }
}