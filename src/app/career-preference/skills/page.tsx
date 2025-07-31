"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCareer } from "../CareerContext";

export default function CareerStep2() {
  const { data, setData } = useCareer();
  const router = useRouter();
  
  const [skills, setSkills] = useState(
    data.skills.length > 0 ? data.skills : [{ name: "", level: "" }]
  );

  // Tambah baris skill baru
  const addSkill = () => {
    setSkills([...skills, { name: "", level: "" }]);
  };

  // Ubah skill
  const handleChange = (index: number, key: "name" | "level", value: string) => {
    const updated = [...skills];
    updated[index][key] = value;
    setSkills(updated);
  };

  const handleNext = () => {
    setData({ ...data, skills });
    router.push("/career-preference/summary");
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      {/* Progress bar */}
      <div className="bg-pink-100 h-2 rounded-full mb-6">
        <div className="bg-pink-600 h-2 rounded-full w-2/3"></div>
      </div>

      <h1 className="text-2xl font-semibold mb-1">Skill kamu saat ini</h1>
      <p className="text-gray-500 mb-6">
        Yuk kasih tahu kamu jago di bidang apa!
      </p>

      {skills.map((skill, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <h2 className="font-semibold">Skill {index + 1} *</h2>

          {/* Pilih Skill */}
          <select
            value={skill.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            className="border rounded-lg p-2 w-full mt-2"
          >
            <option value="">Pilih skill</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Frontend Developer">Frontend Developer</option>
          </select>

          {/* Pilih Level */}
          <div className="mt-3">
            <h3 className="font-medium">Level *</h3>
            <div className="flex gap-4 mt-2">
              {["Pemula", "Menengah", "Mahir"].map((lvl) => (
                <label key={lvl} className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={skill.level === lvl}
                    onChange={() => handleChange(index, "level", lvl)}
                  />
                  {lvl}
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Tombol Tambah Skill */}
      <button
        onClick={addSkill}
        className="bg-pink-200 text-pink-700 px-4 py-2 rounded-lg mb-6"
      >
        + Skill
      </button>

      {/* Tombol Navigasi */}
      <div className="flex justify-between">
        <button
          className="bg-pink-600 text-white px-6 py-2 rounded-lg"
          onClick={() => {history.back()}}
        >
          Kembali
        </button>
        <button
          className="bg-pink-600 text-white px-6 py-2 rounded-lg"
          onClick={handleNext}
        >
          Selanjutnya
        </button>
      </div>
    </section>
  );
}
