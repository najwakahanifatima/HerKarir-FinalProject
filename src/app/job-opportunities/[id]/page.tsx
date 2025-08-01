"use client";
import JobDetailCard from "@/components/JobDetailCard";
import ApplyJobModal from "@/components/ApplyJobModal";
import { useState } from "react";
import SuccessModal from "@/components/SuccessModal";
import JobCard from "@/components/JobCard";
import { JobRecommendation } from "../page";

const job: JobRecommendation = {
  title: "Junior Data Analyst Intern",
  company: "Google Indonesia",
  tags: ["Magang", "Di kantor", "Data & Produk"],
  location: "Jakarta Selatan",
  salary: "2.500.000",
  experience: "Min. 1 tahun pengalaman",
  description: `Sebagai Junior Data Analyst Intern di Google Indonesia, kamu akan terlibat langsung dalam pengolahan dan analisis data untuk mendukung pengambilan keputusan strategis...`,
  qualifications:
    "Mahasiswa aktif atau fresh graduate dari jurusan Teknik Informatika, Sistem Informasi, Memahami dasar SQL, Excel/Spreadsheet, dan salah satu tools visualisasi data, Mampu berpikir analitis dan memiliki ketelitian tinggi terhadap detail., Komunikatif, terbiasa bekerja dalam tim, dan cepat beradaptasi.",
  similarityScore: 0.6,
  benefit: "Good benefits.",
};

const recommendations: JobRecommendation[] = [
  {
    title: "Business Intelligence Intern",
    company: "Deloitte",
    tags: ["Magang", "Di kantor", "Mahir"],
    location: "Jakarta Barat",
    salary: "2.200.000",
    experience: "Min. 1 tahun pengalaman",
    description: "",
    qualifications: "",
    similarityScore: 0,
    benefit: "",
  },
  {
    title: "Product Analyst & Research Intern",
    company: "Shopee Indonesia",
    tags: ["Magang", "Di kantor", "Mahir"],
    location: "Jakarta Selatan",
    salary: "2.400.000",
    experience: "Min. 1 tahun pengalaman",
    description: "",
    qualifications: "",
    similarityScore: 0,
    benefit: "",
  },
];

export default function JobDetailPage() {
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  return (
    <div className="grid grid-cols-[1fr_320px] gap-10 p-8">
      {/* LEFT */}
      <JobDetailCard {...job} />

      {/* RIGHT Sidebar */}
      <div className="space-y-6">
        <div className="bg-white border p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-2">Location</h3>
          <p className="text-sm text-gray-600">
            Pacific Century Place Tower Level 45 SCBD Lot 10, Jl. Jenderal
            Sudirman No.53, RT.5/RW.3, Senayan, Kec. Kby. Baru, Jakarta Selatan
            12190
          </p>

          <h3 className="font-semibold mt-4 mb-1">Benefit perusahaan</h3>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-pink-100 text-[#C9184A] text-xs px-2 py-1 rounded-full">
              Bonus System
            </span>
            <span className="bg-pink-100 text-[#C9184A] text-xs px-2 py-1 rounded-full">
              Team Building Activity
            </span>
          </div>

          <button
            className="w-full mt-4 bg-[#C9184A] text-white py-2 rounded-lg text-sm font-semibold cursor-pointer transform transition hover:bg-pink-500"
            onClick={() => setOpenModal(true)}
          >
            Lamar sekarang
          </button>
        </div>

        {/* Modal Form */}
        <ApplyJobModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={() => {
            setOpenModal(false);
            setSuccessModal(true);
          }}
        />

        {/* Modal Sukses */}
        <SuccessModal
          open={successModal}
          onClose={() => setSuccessModal(false)}
        />

        <div>
          <h3 className="font-semibold text-lg mb-2">
            Job Recommendation for you
          </h3>
          <div className="space-y-4">
            {recommendations.map((job) => (
              <JobCard key={job.title} {...job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
