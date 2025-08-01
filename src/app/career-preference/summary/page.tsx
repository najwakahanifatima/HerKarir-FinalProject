"use client";
import { useRouter } from "next/navigation";
import { useCareer } from "../CareerContext";

export default function SummaryPage() {
  const { data } = useCareer();
  const router = useRouter();

  return (
    <section className="max-w-3xl mx-auto p-6">
      <div className="bg-pink-100 h-2 rounded-full mb-6">
        <div className="bg-[#C9184A] h-2 rounded-full w-full"></div>
      </div>

      <h1 className="text-2xl font-semibold mb-1">Ringkasan</h1>
      <p className="text-gray-500 mb-8">Siap analisis celah kariermu?</p>

      <div className="space-y-6">
        <div>
          <h2 className="font-semibold">Ekspektasi Gaji</h2>
          <p>
            {data.salaryMin} – {data.salaryMax}
          </p>
        </div>

        <div>
          <h2 className="font-semibold">Tipe Pekerjaan</h2>
          <p>{data.jobType.join(", ")}</p>
        </div>

        <div>
          <h2 className="font-semibold">Industri Pilihan</h2>
          <p>{data.industry}</p>
        </div>

        <div>
          <h2 className="font-semibold">Lokasi Pilihan</h2>
          <p>
            {data.workLocation.join(", ")} – {data.city}
          </p>
        </div>

        <div>
          <h2 className="font-semibold">Skills</h2>
          {data.skills.map((s, i) => (
            <p key={i}>
              {s.name} ({s.level})
            </p>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          className="bg-[#C9184A] text-white px-6 py-2 rounded-lg transition cursor-pointer hover:bg-pink-500"
          onClick={() => {history.back()}}
        >
          Kembali
        </button>
        <button
          className="bg-[#C9184A] text-white px-6 py-2 rounded-lg transition cursor-pointer hover:bg-pink-500"
          onClick={() => {router.push('/job-opportunities')}}
        >
          Cari
        </button>
      </div>
    </section>
  );
}
