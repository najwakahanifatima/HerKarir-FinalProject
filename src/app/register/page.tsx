"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!username) {
      alert("Username tidak boleh kosong!");
      return;
    }

    login({ username: username });

    // 👇👇👇 UBAH BARIS INI 👇👇👇
    // Arahkan pengguna ke halaman personalisasi setelah daftar
    router.push('/register/personalization');
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-4xl flex bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

        {/* Kolom Kiri */}
        <div className="hidden lg:flex lg:w-1/2 flex-col">
          <div className="p-12 flex-shrink-0">
            <Link href="/" className="flex justify-center">
              <Image 
                src="/logo-herkarir.svg"
                alt="HerKarir Logo"
                width={160}
                height={40}
              />
            </Link>
          </div>
          <hr className="border-gray-300 mx-12" />
          <div className="flex-grow relative p-12">
            <Image
              src="/images/auth-image.svg"
              alt="Seorang wanita sedang belajar"
              layout="fill"
              objectFit="contain"
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Kolom Kanan: Form Register */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center border-l border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Daftar</h2>
          <hr className="mb-8" />
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input id="email" name="email" type="email" required className="text-gray-400 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input 
                id="username" 
                name="username" 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-gray-400 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" name="password" type="password" required className="text-gray-400 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
              <Lock className="absolute right-3 bottom-2.5 text-gray-400" size={18}/>
            </div>
            <div className="relative">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
              <input id="confirm-password" name="confirm-password" type="password" required className="text-gray-400 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"/>
              <Lock className="absolute right-3 bottom-2.5 text-gray-400" size={18}/>
            </div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 font-semibold transition-colors"
            >
              Daftar
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-semibold text-pink-600 hover:underline">
              Masuk
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}