import Image from "next/image";

export default function SuccessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="flex flex-col bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center items-center">
        <Image
          src='/jobs/jobsent.svg'
          alt='Job Sent!'
          width={100}
          height={100}
        />
        <h2 className="text-lg font-semibold mb-5 mt-5">Lamaranmu telah dikirim!</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg"
        >
          Kembali ke lowongan pekerjaan
        </button>
      </div>
    </div>
  );
}
