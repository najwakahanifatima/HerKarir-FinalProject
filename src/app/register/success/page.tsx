import Link from 'next/link';
import Image from 'next/image'; // 1. Impor komponen Image
import { ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      
      <div className="w-full max-w-md text-center">

        <Image
          src="/icons/checkcircle.svg"
          alt="Success Icon"
          width={64}
          height={64}
          className="mx-auto mb-4"
        />

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Personalizasimu berhasil!</h1>
        <p className="text-gray-600 mb-8">
          Sekarang, semua rekomendasi sudah disesuaikan dengan minat dan tujuan kariermu. 
          <br />Yuk, jelajahi beranda yang dirancang khusus untuk kamu!
        </p>
        <Link href="/" className="inline-flex items-center gap-2 justify-center py-3 px-6 rounded-full text-white bg-pink-600 hover:bg-pink-700 font-semibold">
          Pergi ke Beranda
          <ArrowRight size={20} />
        </Link>
      </div>

    </div>
  );
}