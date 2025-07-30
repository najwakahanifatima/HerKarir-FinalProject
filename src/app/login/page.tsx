"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; 
import Image from 'next/image';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth(); // Ambil fungsi login
  
    // State untuk menyimpan input pengguna
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    // Fungsi yang dijalankan saat form disubmit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Simulasi: Cukup cek jika username diisi
      if (username) {
        login({ username: username }); // Panggil fungsi login dari context
        router.push('/'); // Arahkan ke beranda
      } else {
        alert('Username tidak boleh kosong.');
      }
    };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-4xl flex bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

        {/* Kolom Kiri: Logo, Garis, dan Gambar */}
        <div className="hidden lg:flex lg:w-1/2 flex-col">
          <div className="p-12 flex-shrink-0 flex justify-center">
              <Image 
                src="/logo-herkarir.svg"
                alt="HerKarir Logo"
                width={160}
                height={40}
              />
          </div>
          <hr className="border-gray-300 mx-0" />
          <div className="flex-grow relative p-12">
            <Image
              src="/images/auth-image.svg"
              alt="Auth image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* Kolom Kanan: Form Login */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center border-l border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Masuk</h2>
          <hr className="mb-8" />

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input 
                id="username" 
                name="username" 
                type="text" 
                required 
                value={username} // 3. Hubungkan ke state
                onChange={(e) => setUsername(e.target.value)} // 4. Update state saat diketik
                className="text-gray-400 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  value={password} // Hubungkan ke state
                  onChange={(e) => setPassword(e.target.value)} // Update state
                  className="text-gray-400 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              </div>
            </div>
            <div className="flex items-center justify-start">
              <a href="#" className="text-sm text-pink-600 hover:underline">Lupa password?</a>
            </div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 font-semibold transition-colors"
            >
              Masuk
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Belum punya akun?{' '}
            <Link href="/register" className="font-semibold text-pink-600 hover:underline">
              Daftar
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}