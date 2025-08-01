import Image from "next/image";
import Link from "next/link";
import {ArrowRight } from "lucide-react";


export default function HeroSection() {
  return (
    <section className="px-16">
    <div className="relative my-10 bg-pink-100 rounded-2xl p-8 md:p-12 flex items-center overflow-hidden">
      {/* Background Pattern */}
      <Image
        src="/images/hero-bg-pattern.svg"
        alt="background pattern"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 opacity-50 z-0"
      />

      {/* Konten Utama */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-8">
        {/* Kolom Teks */}
        <div className="md:w-1/2 text-center md:text-left md:pl-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Punya Tujuan Karier? Kami Bantu Kamu Sampai ke Sana.
          </h1>
          <p className="text-gray-600 mb-4">
            Nggak perlu bingung mulai dari mana, temukan gap-nya, dan beri
            rekomendasi belajar & kerja yang sesuai.
          </p>
          <p className="font-semibold text-[[pink-600]] mb-6">
            #BeraniBersamaHerKarir
          </p>
          <Link href="/login">
            <button className="bg-[#C9184A] text-white font-semibold pl-6 pr-2 py-2 rounded-full flex items-center gap-4 mx-auto md:mx-0 hover:bg-pink-500 cursor-pointer transition-colors">
              <span>Ayo Belajar Sekarang</span>
              <div className="bg-white rounded-full p-2">
                <ArrowRight size={20} className="text-[#C9184A]" />
              </div>
            </button>
          </Link>
        </div>

        <div className="md:w-1/2 relative flex items-center justify-center h-[300px]">
          {/* Gambar Latar Belakang (Vector) */}
          <Image
            src="/images/bg-vector-hero.svg"
            alt="Background Vector"
            layout="fill"
            objectFit="contain"
            className="z-0"
          />

          {/* Gambar Utama*/}
          <Image
            src="/images/hero-women.svg"
            alt="Hero Image"
            width={450}
            height={300}
            className="object-contain relative z-10"
          />
        </div>
      </div>

      {/* Tombol Navigasi Carousel */}
      <div className="absolute z-10 left-4 top-1/2 -translate-y-1/2">
        <button className="bg-pink-100 border-gray-200 p-2 rounded-full">
          {/* Ganti dengan komponen Image */}
          <Image
            src="/icons/arrow-left.svg"
            alt="Previous"
            width={45}
            height={45}
          />
        </button>
      </div>
      <div className="absolute z-10 right-4 top-1/2 -translate-y-1/2">
        <button className="bg-pink-100 border-gray-200 p-2 rounded-full">
          {/* Ganti dengan komponen Image */}
          <Image
            src="/icons/arrow-right.svg"
            alt="Next"
            width={45}
            height={45}
          />
        </button>
      </div>
    </div>
    </section>
  );
}
