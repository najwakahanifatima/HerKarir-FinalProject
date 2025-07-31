"use client"; // 1. Jadikan Client Component

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';   // 2. Impor hook yang dibutuhkan
import { useRouter } from 'next/navigation'; // 2. Impor hook yang dibutuhkan

export default function Footer() {
  const { user } = useAuth();   // 3. Dapatkan status login
  const router = useRouter(); // 3. Inisiasi router

  // 4. Buat fungsi untuk menangani klik pada link
  const handleProtectedLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!user) {
      e.preventDefault(); // Hentikan navigasi
      alert("Silakan login atau register terlebih dahulu");
      router.push('/login'); // Arahkan ke halaman login
    } else {
      router.push(href); // Lanjutkan jika sudah login
    }
  };

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Kolom 1: Logo dan Tagline */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo-herkarir.svg" 
                alt="HerKarir Logo"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold text-pink-600">HerKarir</span>
            </Link>
            <p className="mt-4 text-gray-600">Karir Tanpa Batas, Perempuan Berkualitas</p>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Navigasi</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-pink-600 hover:text-pink-800">Beranda</Link></li>
              {/* 5. Ganti <Link> menjadi <a> dan tambahkan onClick */}
              <li><a href="#" onClick={(e) => handleProtectedLinkClick(e, '#')} className="text-pink-600 hover:text-pink-800 cursor-pointer">Kategori</a></li>
              <li><a href="#" onClick={(e) => handleProtectedLinkClick(e, '#')} className="text-pink-600 hover:text-pink-800 cursor-pointer">Pelatihan</a></li>
              <li><a href="#" onClick={(e) => handleProtectedLinkClick(e, '#')} className="text-pink-600 hover:text-pink-800 cursor-pointer">Cari Kerja</a></li>
              <li><a href="/simulasi-wawancara" onClick={(e) => handleProtectedLinkClick(e, '/simulasi-wawancara')} className="text-pink-600 hover:text-pink-800 cursor-pointer">Simulasi Wawancara</a></li>
            </ul>
          </div>

          {/* Kolom 3: Sosial Media */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Sosial Media</h3>
            <div className="flex gap-4">
              <Link href="#" className="hover:opacity-80">
                <Image src="/logos/instagram.svg" alt="Instagram" width={24} height={24} />
              </Link>
              <Link href="#" className="hover:opacity-80">
                <Image src="/logos/tiktok.svg" alt="TikTok" width={24} height={24} />
              </Link>
              <Link href="#" className="hover:opacity-80">
                <Image src="/logos/youtube.svg" alt="YouTube" width={24} height={24} />
              </Link>
              <Link href="#" className="hover:opacity-80">
                <Image src="/logos/twitter.svg" alt="Twitter" width={24} height={24} />
              </Link>
            </div>
          </div>

        </div>
      </div>
      
      {/* Bagian Bawah Footer (Copyright) */}
      <div className="bg-pink-800 text-center py-4">
        <p className="text-sm text-white">&copy; 2025 SISTECH. All rights reserved.</p>
      </div>
    </footer>
  );
}