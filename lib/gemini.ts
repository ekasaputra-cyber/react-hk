// lib/gemini.ts
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn("GEMINI_API_KEY tidak diatur. Fitur AI Generatif tidak akan berfungsi.");
  // Tidak throw error di sini agar aplikasi tetap bisa jalan tanpa Gemini jika diinginkan,
  // tapi API route yang menggunakan ini perlu menangani kasus di mana genAI tidak tersedia.
}

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

const generationConfig = {
  temperature: 0.7, // Kontrol kreativitas (0.0 - 1.0)
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048, // Sesuaikan dengan kebutuhan
};

// Pengaturan keamanan dasar, sesuaikan dengan kebutuhan aplikasi Anda
const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

export async function getGenerativeResponse(prompt: string): Promise<string | null> {
  if (!genAI) {
    console.error("Klien Gemini tidak diinisialisasi karena API Key tidak ada.");
    return null;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest", // Model yang cepat dan hemat biaya, cocok untuk chat
      // model: "gemini-pro", // Alternatif lain
      generationConfig,
      safetySettings,
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error saat menghubungi Gemini API:", error);
    return null; // Kembalikan null jika ada error
  }
}