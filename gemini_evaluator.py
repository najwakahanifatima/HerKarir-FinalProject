import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("models/gemini-1.5-flash")

def evaluate_video(path, question, topic):
    with open(path, "rb") as f:
        video_bytes = f.read()

    prompt = f"""
    Anda adalah seorang ahli HR dan pelatih wawancara. 
    Berikan analisis mendalam terhadap video jawaban kandidat berdasarkan pertanyaan: "{question}"
    
    Berikan hasil dalam format berikut:
    1. **Penilaian Jawaban (Skor 1–5)**  
        Berikan skor serta penjelasan singkat untuk masing-masing aspek berikut:
        - **Relevansi Jawaban:** Seberapa relevan jawaban dengan pertanyaan.
        - **Kejelasan & Keringkasan:** Apakah jawaban mudah dipahami dan tidak bertele-tele.
        - **Struktur Jawaban:** Apakah jawaban terstruktur dengan baik (misalnya, penggunaan metode STAR jika relevan).
        - **Kepercayaan Diri:** Apakah jawaban menunjukkan kepercayaan diri (berdasarkan pilihan kata dan intonasi yang tersirat).
    
    2. **Kekuatan**  
   Sebutkan hal-hal yang sudah bagus dari jawaban kandidat.

    3. **Area Peningkatan**  
    Apa saja yang bisa diperbaiki dari jawaban tersebut.

    4. **Tips Sukses Wawancara Umum**  
    Berikan 2–3 tips praktis yang bisa membantu kandidat meningkatkan performanya secara keseluruhan.

    5. **Kesalahan Umum dalam Wawancara**  
    Jelaskan 1–2 kesalahan umum yang sering terjadi, khususnya yang relevan dengan jawaban ini (jika ada).

    6. **Contoh Pertanyaan Jebakan**  
    Berikan 1 contoh pertanyaan jebakan yang berkaitan dengan topik "{topic}" dan jelaskan cara menjawabnya dengan tepat.
    """

    response = model.generate_content(
        contents=[
            {"mime_type": "video/mp4", "data": video_bytes},
            {"text": prompt}
        ],
        request_options={"timeout": 300},
        safety_settings={
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
        }
    )

    return response.text