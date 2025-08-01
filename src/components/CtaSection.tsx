"use client"; // 1. TAMBAHKAN INI di baris paling atas

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';   // 2. TAMBAHKAN IMPOR INI
import { useRouter } from 'next/navigation'; // 2. TAMBAHKAN IMPOR INI

export default function CtaSection() {
  // 3. TAMBAHKAN DUA BARIS INI
  const { user } = useAuth();
  const router = useRouter();

  // 4. TAMBAHKAN FUNGSI INI
  const handleClick = () => {
    if (user) {
      router.push('/simulasi-wawancara');
    } else {
      alert("Anda harus login terlebih dahulu untuk mencoba simulasi.");
      router.push('/login');
    }
  };

  return (
    <section className="bg-[url('/images/bg-feature.svg')] bg-pink-100 bg-cover bg-center py-20 px-6 md:px-12">
      <div className="px-24 py-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Siap Hadapi Interview? Coba Simulasi Pakai AI!
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Latihan wawancara secara interaktif dengan teknologi AI. Dapatkan pengalaman nyata, pertanyaan seperti di dunia kerja, dan feedback instan untuk bantu kamu tampil lebih percaya diri.
          </p>
          
          {/* TAMBAH 'onClick' PADA TOMBOL */}
          <button 
            onClick={handleClick}
            className="bg-[#C9184A] text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-pink-700 transition-colors"
          >
            Coba Simulasi Sekarang
            <div className="bg-white rounded-full p-2">
                <ArrowRight size={20} className="text-[#C9184A]" />
              </div>
          </button>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <Image
            src="/images/cta-interview.svg"
            alt="Simulasi Interview AI"
            width={500}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}