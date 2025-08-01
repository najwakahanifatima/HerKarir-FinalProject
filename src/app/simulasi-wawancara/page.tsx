import Image from 'next/image';
import Link from 'next/link';

// Komponen untuk visualisasi langkah-langkah
const StepIndicator = () => {
  const steps = ['Persiapan', 'Simulasi', 'Umpan Balik'];
  return (
    <div className="relative flex items-center justify-between w-full max-w-md">
      {/* Garis Latar Belakang */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#C9184A] -translate-y-1/2" style={{ width: '50%' }}></div>

      {/* Titik Langkah */}
      {steps.map((step, index) => (
        <div key={step} className="relative z-10 flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full ${index < 2 ? 'bg-[#C9184A]' : 'bg-gray-200'}`}></div>
          <p className="mt-2 text-sm font-semibold text-gray-700">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default function SimulasiWawancaraPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 text-center">
        
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="lg:w-1/2">
            <Image 
              src="/images/interview-illustration.svg" // Ganti dengan path ilustrasi Anda
              alt="Ilustrasi Wawancara AI"
              width={400}
              height={300}
              className="mx-auto"
            />
          </div>
          <div className="lg:w-1/2 lg:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simulasi Wawancara Realistis, Didukung AI
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Latihan wawancara interaktif yang bantu kamu siap hadapi dunia kerja dengan pertanyaan dinamis dan umpan balik langsung dari AI.
            </p>
            <Link href="/simulasi-wawancara/cek-perangkat">
              <button className="bg-[#C9184A] text-white font-semibold py-3 px-6 rounded-lg hover:bg-pink-500 transition-colors cursor-pointer">
                Mulai Simulasi Wawancara
              </button>
            </Link>
          </div>
        </div>

        {/* Steps Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Hanya dengan 3 langkah mudah:</h2>
          <div className="flex justify-center">
            <StepIndicator />
          </div>
        </div>

      </div>
    </div>
  );
}