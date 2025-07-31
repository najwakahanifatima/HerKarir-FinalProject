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
    Transkripkan isi video secara lengkap ke dalam teks dan berikan analisis mendalam terhadap video jawaban kandidat berdasarkan pertanyaan: "{question}"
    
    Berikan hasil dalam format berikut:
    1. **Transkrip Video**
    Tuliskan seluruh jawaban dari kandidat sesuai isi video.
    
    2. **Penilaian Jawaban (Skor 1–5)**  
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

    full_text = response.text.strip()

    def extract_section(text, section_title):
        try:
            start = text.index(f"**{section_title}")
            next_marker = text.index("**", start + 2)
            end = text.index("**", next_marker + 2) if "**" in text[next_marker + 2:] else len(text)
            return text[next_marker:end].strip()
        except:
            return ""

    return {
        "full_text": full_text,
        "transkrip": extract_section(full_text, "Transkrip Video")
        "tips": extract_section(full_text, "Tips Sukses Wawancara Umum"),
        "kesalahan_umum": extract_section(full_text, "Kesalahan Umum dalam Wawancara"),
        "pertanyaan_jebakan": extract_section(full_text, "Contoh Pertanyaan Jebakan")
    }
