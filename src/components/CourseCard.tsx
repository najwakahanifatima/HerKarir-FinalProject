"use client"; // 1. Jadikan Client Component

import Image from 'next/image';
import { useAuth } from '@/context/AuthContext'; // 2. Impor hook untuk cek status login
import { useRouter } from 'next/navigation'; // 3. Impor hook untuk navigasi

type CourseCardProps = {
  title: string;
  provider: string;
  providerLogo: string;
  image: string;
};

export default function CourseCard({ title, provider, providerLogo, image }: CourseCardProps) {
  const { user } = useAuth(); // Dapatkan status login
  const router = useRouter(); // Inisiasi router

  // 4. Buat fungsi untuk menangani klik tombol
  const handleStartClick = () => {
    if (user) {
      // Jika sudah login, arahkan ke halaman kursus (ganti dengan link yang benar)
      alert(`Masuk ke kursus: ${title}`);
      // router.push(`/course/${title}`); 
    } else {
      // Jika belum login, tampilkan pesan dan arahkan ke halaman login
      alert("Anda harus login terlebih dahulu untuk memulai kursus.");
      router.push('/login');
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md border border-gray-100 p-5 h-64 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col justify-between h-full">
        <div className="w-2/3">
          <h3 className="font-bold text-lg text-gray-800 leading-tight">{title}</h3>
          <div className="flex items-center gap-2 mt-2">
            <Image src={providerLogo} alt={`${provider} logo`} width={16} height={16} />
            <span className="text-sm text-gray-500">{provider}</span>
          </div>
        </div>
        <div>
          {/* 5. Tambahkan onClick pada tombol */}
          <button 
            onClick={handleStartClick}
            className="bg-pink-600 text-white py-2 px-8 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
          >
            Mulai
          </button>
        </div>
      </div>
      <div className="absolute bottom-2 right-0 w-1/2 h-1/2">
        <Image 
          src={image} 
          alt={title} 
          layout="fill"
          objectFit="contain" 
        />
      </div>
    </div>
  );
}