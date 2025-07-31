"use client";
import { useState } from "react";

export default function ApplyJobModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // simulasi API request
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Lamar Pekerjaan</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Nama</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" required />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" className="w-full border rounded-lg px-3 py-2" required />
          </div>

          <div>
            <label className="block text-sm mb-1">Lokasi</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" required />
          </div>

          <div>
            <label className="block text-sm mb-1">CV</label>
            <input type="file" className="w-full border rounded-lg px-3 py-2" required />
          </div>

          <div>
            <label className="block text-sm mb-1">Portfolio (Opsional)</label>
            <input type="file" className="w-full border rounded-lg px-3 py-2" />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" className="px-4 py-2 rounded-lg border" onClick={onClose}>
              Kembali
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Lamar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
