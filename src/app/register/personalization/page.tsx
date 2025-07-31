"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

// 1. Definisikan tipe untuk props
type StepProps = {
  onSelect: (value: string) => void;
  selection: string;
};

// 2. Terapkan tipe pada props
const Step1 = ({ onSelect, selection }: StepProps) => (
  <>
    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Kamu mau berkembang di bidang karier apa?</h2>
    <div className="grid grid-cols-2 gap-4">
      {['Data & Produk', 'Teknologi & Teknik', 'Desain & Kreatif', 'Pemasaran & Media Sosial'].map(item => (
        <button key={item} onClick={() => onSelect(item)} className={`p-4 border rounded-full text-left ${selection === item ? 'bg-pink-100 border-pink-500 text-pink-500' : 'bg-white text-pink-500 border-pink-500'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${selection === item ? 'bg-pink-600 border-pink-600 text-black' : 'border-gray-300'}`}>
              {selection === item && <Check size={14} className="text-white" />}
            </div>
            <span>{item}</span>
          </div>
        </button>
      ))}
    </div>
  </>
);

// 3. Terapkan tipe pada props
const Step2 = ({ onSelect, selection }: StepProps) => (
  <>
    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Kamu mau berkembang di bidang karier apa?</h2>
    <div className="space-y-4">
      {['Sertifikasi Kursus', 'Sertifikasi Spesialisasi', 'Sertifikasi Profesional'].map(item => (
        <button key={item} onClick={() => onSelect(item)} className={`w-full p-4 border rounded-full text-left ${selection === item ? 'bg-pink-100 border-pink-500 text-pink-500' : 'bg-white text-pink-500'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${selection === item ? 'bg-pink-600 border-pink-600' : 'border-gray-300'}`}>
              {selection === item && <Check size={14} className="text-white" />}
            </div>
            <span>{item}</span>
          </div>
        </button>
      ))}
    </div>
  </>
);

export default function PersonalizationPage() {
  const [step, setStep] = useState(1);
  const [selection1, setSelection1] = useState('');
  const [selection2, setSelection2] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (step === 1 && selection1) setStep(2);
    if (step === 2 && selection2) router.push('/register/success');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <p className="text-center font-semibold text-pink-600 mb-2">Register</p>
        <hr className="my-4 border-gray-200 mx-0" />
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div className="bg-pink-600 h-2 rounded-full" style={{ width: step === 1 ? '50%' : '100%' }}></div>
        </div>
        
        {step === 1 && <Step1 onSelect={setSelection1} selection={selection1} />}
        {step === 2 && <Step2 onSelect={setSelection2} selection={selection2} />}
        
        <button 
          onClick={handleNext} 
          disabled={step === 1 ? !selection1 : !selection2}
          className="mt-8 w-full py-3 px-4 rounded-lg text-white bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 font-semibold"
        >
          {step === 1 ? 'Lanjut' : 'Personalisasi'}
        </button>
      </div>
    </div>
  );
}