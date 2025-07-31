"use client";
import { useRouter } from "next/navigation";
import { useCareer } from "./CareerContext";

export default function CareerStep1() {
  const { data, setData } = useCareer();
  const router = useRouter();

  return (
    <section className="p-6 max-w-3xl mx-auto">
      {/* Progress bar */}
      <div className="bg-pink-100 h-2 rounded-full mb-6">
        <div className="bg-pink-600 h-2 rounded-full w-1/3"></div>
      </div>

      <h1 className="text-2xl font-semibold">Preferensi Karir</h1>
      <p className="text-gray-500 mb-6">
        Rekomendasi disesuaikan dengan preferensimu.
      </p>

      {/* Gaji */}
      <div className="mb-6">
        <h2 className="font-semibold">Ekspektasi Gaji *</h2>
        <div className="flex gap-4 mt-2">
          <input
            value={data.salaryMin}
            onChange={(e) => setData({ ...data, salaryMin: e.target.value })}
            placeholder="1.000.000"
            className="border p-2 rounded w-1/2"
          />
          <input
            value={data.salaryMax}
            onChange={(e) => setData({ ...data, salaryMax: e.target.value })}
            placeholder="2.500.000"
            className="border p-2 rounded w-1/2"
          />
        </div>
      </div>

      {/* Tipe pekerjaan */}
      <div className="mb-6">
        <h2 className="font-semibold">Tipe Pekerjaan *</h2>
        {["Penuh waktu", "Paruh waktu", "Magang", "Freelance"].map((type) => (
          <label key={type} className="block">
            <input
              type="checkbox"
              checked={data.jobType.includes(type)}
              onChange={() =>
                setData({
                  ...data,
                  jobType: data.jobType.includes(type)
                    ? data.jobType.filter((t) => t !== type)
                    : [...data.jobType, type],
                })
              }
            />{" "}
            {type}
          </label>
        ))}
      </div>

      {/* Industri */}
      <div className="mb-6">
        <h2 className="font-semibold">Industri Pilihan *</h2>
        <select
          value={data.industry}
          onChange={(e) => setData({ ...data, industry: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="">Pilih industri</option>
          <option value="Data & Produk">Data & Produk</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {/* Lokasi */}
      <div className="mb-6">
        <h2 className="font-semibold">Lokasi Pilihan *</h2>
        {["On-site", "WFA"].map((loc) => (
          <label key={loc} className="block">
            <input
              type="checkbox"
              checked={data.workLocation.includes(loc)}
              onChange={() =>
                setData({
                  ...data,
                  workLocation: data.workLocation.includes(loc)
                    ? data.workLocation.filter((l) => l !== loc)
                    : [...data.workLocation, loc],
                })
              }
            />{" "}
            {loc}
          </label>
        ))}
        <select
          value={data.city}
          onChange={(e) => setData({ ...data, city: e.target.value })}
          className="border p-2 rounded w-full mt-2"
        >
          <option value="">Pilih kota</option>
          <option value="Jakarta">Jakarta</option>
          <option value="Bandung">Bandung</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          className="bg-pink-600 text-white px-6 py-2 rounded-lg"
          onClick={() => {history.back()}}
        >
          Kembali
        </button>
        <button
          className="bg-pink-600 text-white px-6 py-2 rounded-lg"
          onClick={() => router.push("/career-preference/skills")}
        >
          Selanjutnya
        </button>
      </div>
    </section>
  );
}
