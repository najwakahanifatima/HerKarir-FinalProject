"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function CertificatePage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const certificate = {
    id: params.id,
    course: "3D Interaction Design in Virtual Reality",
    imageUrl: "/courses/certificate-dummy.png",
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = certificate.imageUrl;
    link.download = `${certificate.course}-certificate.png`;
    link.click();
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
        {/* Back Button */}
        <div>
            <button 
                className="flex items-center text-gray-400 cursor-pointer"
                onClick={() => router.back()}
            >
                <ArrowLeft className='mr-2' size={18}/> Back
            </button>
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold my-6">Sertifikat</h1>

        {/* Overview Sertifikat (Gambar Dummy) */}
        <div className="border rounded-xl shadow-md p-6 bg-white mb-6 flex justify-center">
            <Image
                src={certificate.imageUrl}
                alt="Certificate Preview"
                width={300}
                height={300}
                className="w-full max-w-lg rounded-lg border"
            />
        </div>

      {/* Tombol Unduh */}
      <button
        onClick={handleDownload}
        className="w-full bg-[#C9184A] text-white py-3 rounded-lg hover:bg-[#A1133B] transition"
      >
        Unduh Sertifikat
      </button>
    </section>
  );
}
