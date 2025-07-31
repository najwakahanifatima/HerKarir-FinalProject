"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, Check } from 'lucide-react';

// Komponen untuk menampilkan gambar contoh (benar/salah)
const ExampleImage = ({ src, isCorrect }: { src: string; isCorrect: boolean; }) => (
    <div className="flex flex-col items-center">
    {/* Tanda */}
    <div className={`mb-2 w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
        {isCorrect ? <Check className="text-white" /> : <X className="text-white" />}
    </div>
    {/* Gambar */}
    <Image
        src={src}
        alt={isCorrect ? "Contoh Benar" : "Contoh Salah"}
        width={200}
        height={200}
        className="rounded-lg object-cover border-2"
    />
</div>
);


export default function CekPenampilanPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  // State untuk checkbox
  const [pakaianOk, setPakaianOk] = useState(false);
  const [posturOk, setPosturOk] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      alert("Pemeriksaan penampilan selesai!");
      router.push('/simulasi-wawancara/mulai');
    }
  };
  
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      router.back();
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-8 shadow-lg border">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Pemeriksaan Penampilan Pribadi</h1>
        
        {step === 1 && (
            <>
                <p className="text-center text-gray-600 mb-8">Pastikan Pakaian Sudah Sesuai (1/2)</p>
                <div className="flex jusnpm install react-speech-recognitiontify-center gap-8 mb-8">
                    <ExampleImage src="/images/pakaian-salah.svg" isCorrect={false} />
                    <ExampleImage src="/images/pakaian-benar.svg" isCorrect={true} />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={pakaianOk} onChange={() => setPakaianOk(!pakaianOk)} className="h-5 w-5 rounded text-pink-600 focus:ring-pink-500 border-gray-300"/>
                    <span className="text-gray-700">Saya sudah berpakaian rapi dan sesuai untuk wawancara profesional</span>
                </label>
            </>
        )}

        {step === 2 && (
            <>
                <p className="text-center text-gray-600 mb-8">Pastikan Postur Tubuh Sudah Sesuai (2/2)</p>
                <div className="flex justify-center gap-8 mb-8">
                    <ExampleImage src="/images/postur-salah.svg" isCorrect={false} />
                    <ExampleImage src="/images/postur-benar.svg" isCorrect={true} />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={posturOk} onChange={() => setPosturOk(!posturOk)} className="h-5 w-5 rounded text-pink-600 focus:ring-pink-500 border-gray-300"/>
                    <span className="text-gray-700">Postur tubuh saya mencerminkan kepercayaan diri dan sikap profesional</span>
                </label>
            </>
        )}

        <div className="flex justify-between items-center mt-8">
          <button onClick={handleBack} className="py-2 px-6 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50">
            Kembali
          </button>
          <button 
            onClick={handleNext}
            disabled={step === 1 ? !pakaianOk : !posturOk}
            className="py-2 px-6 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-300"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}