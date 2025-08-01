"use client";

import { useState, useRef, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from 'next/navigation'; 
import { UserCircle2, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();
  
  const pathname = usePathname(); 
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const navLinks = [
    { href: '/', label: 'Beranda', protected: false },
    { href: '/course', label: 'Kursus', protected: true },
    { href: '/seek-jobs', label: 'Cari Kerja', protected: true },
    { href: '/simulasi-wawancara', label: 'Simulasi Wawancara', protected: true },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const handleProtectedLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isProtected: boolean) => {
    if (isProtected && !user) {
      e.preventDefault();
      alert("Silakan login atau register terlebih dahulu");
      router.push('/login');
    } else {
      router.push(href);
    }
  };

  return (
    <nav className="bg-white py-4 px-6 md:px-24 flex justify-between items-center shadow-sm">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo-herkarir.svg"
          alt="HerKarir Logo"
          width={160}
          height={40}
        />
      </Link>
      

      <div className="hidden lg:flex items-center gap-15 text-gray-700 font-medium">
        {navLinks.map((link) => (
          <a
            key={link.label} 
            href={link.href} 
            onClick={(e) => handleProtectedLinkClick(e, link.href, link.protected)}
            className={
              `cursor-pointer ${pathname === link.href 
              ? 'text-[#C9184A] font-semibold hover:text-pink-500' 
              : 'text-[#C9184A] hover:text-pink-500 hover:-translate-y-0.5 transform transition'}`
            }
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="relative">
        {/* Tampilkan tombol Masuk saat loading atau jika user tidak ada */}
        {isLoading || !user ? (
          <Link href="/login">
            <button className="bg-[#C9184A] text-white px-7 py-2.5 rounded-lg font-semibold hover:bg-pink-500 transition-colors cursor-pointer">
              Masuk
            </button>
          </Link>
        ) : (
          // Tampilkan profil hanya jika loading selesai dan user ada
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className="font-semibold hidden sm:inline">{user.username}</span>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <UserCircle2 className="text-gray-600" />
            </button>
          </div>
        )}

        {isDropdownOpen && user && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut size={16} className="mr-2" />
              Keluar
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}