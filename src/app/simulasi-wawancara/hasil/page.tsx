"use client";

import { Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const tipsData = {
  interview: [
    "Tunjukkan antusiasme dan percaya diri saat menjawab. Nada suara dan ekspresi wajah juga berperan penting.",
    "Gunakan contoh nyata dari pengalaman kuliah, organisasi, atau proyek saat menjawab pertanyaan.",
    "Latih eye contact dan bahasa tubuh yang terbuka agar terlihat profesional.",
    "Tutup jawaban dengan kalimat positif atau insight yang relevan.",
    "Jangan ragu untuk bertanya balik di akhir sesi interview sebagai tanda ketertarikanmu.",
  ],
  kesalahanUmum: [
    "Tidak memahami peran dan tanggung jawab dari posisi yang dilamar.",
    "Terlalu banyak mengucapkan hmm, eee, atau terlalu lama diam karena kurang persiapan.",
    "Tidak melakukan riset tentang perusahaan, budaya kerja, atau produk/jasanya.",
    "Menjawab pertanyaan dengan terlalu jujur tanpa filter, misalnya mengungkapkan ketidaksukaan terhadap kerja tim.",
    "Terlalu fokus pada gaji atau keuntungan pribadi tanpa menonjolkan kontribusimu.",
  ],
  pertanyaanMenjebak: [
    { q: "Apa kelemahan terbesarmu?", a: "Jawab dengan jujur tapi tetap menunjukkan keinginan untuk berkembang." },
    { q: "Kenapa kami harus memilih kamu?", a: "Tunjukkan nilai unik yang kamu bawa dan sesuaikan dengan kebutuhan perusahaan." },
    { q: "Apa rencana kamu lima tahun ke depan?", a: "Tunjukkan ambisi yang realistis dan relevan dengan bidang yang dilamar. Cth: Saya ingin berkembang sebagai profesional yang mampu membawa dampak lewat teknologi dan data."},
  ]
};

function HasilContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score') || 0;

  return (
    <div className="bg-white py-12 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <p className="text-lg font-semibold text-gray-700 mb-5">Skor kamu:</p>
        <h1 className="text-7xl font-bold text-pink-600 mb-12">{score}/100</h1>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Tips Penting untuk Meningkatkan Kualitas Wawancaramu</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-pink-600 mb-3">Tips Interview:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {tipsData.interview.map((tip, index) => <li key={index}>{tip}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-pink-600 mb-3">Kesalahan Umum:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {tipsData.kesalahanUmum.map((tip, index) => <li key={index}>{tip}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-pink-600 mb-3">Pertanyaan Menjebak:</h3>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                  {tipsData.pertanyaanMenjebak.map((item, index) => (
                    <li key={index}>
                      <strong>{item.q}</strong><br />
                      <span className="text-gray-600">{item.a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 flex items-start justify-center">
            <Image
              src="/images/tips-illustration.svg"
              alt="Ilustrasi Tips Wawancara"
              width={300}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HasilSimulasiPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <HasilContent />
    </Suspense>
  );
}