"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function InterviewPage() {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl w-full">
        
        {/* Left Illustration */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/jobs/carikerja.svg"
            alt="Seeking Jobs"
            width={300}
            height={300}
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Wujudkan Karir Impianmu!
          </h1>
          <p className="text-gray-500 mt-3 text-sm md:text-base leading-relaxed">
            Gali celah skill kamu dan dapatkan panduan belajar plus rekomendasi kerja yang tepat sasaran.
          </p>

          <div className="flex gap-5 text-sm">
            <button
            className="mt-5 bg-[#C9184A] text-white
              px-6 py-2 rounded-lg hover:bg-[#a2143d] transition cursor-pointer transform hover:-translate-y-1"
            onClick={() => (router.push('/career-preference'))}
          >
            Cek Jalan ke Karir Impianmu!
          </button>

          <button
            className="mt-5 bg-[#C9184A] text-white
              px-6 py-2 rounded-lg hover:bg-[#a2143d] transition cursor-pointer transform hover:-translate-y-1"
            onClick={() => (router.push('/job-opportunities'))}
          >
            Lihat Seluruh Lowongan Kerja
          </button>
          </div>
        </div>
      </div>
    </section>
  );
}
