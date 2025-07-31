import Image from 'next/image';

type TestimonialCardProps = {
  name: string;
  role: string;
  avatar: string;
  text: string;
};

export default function TestimonialCard({ name, role, avatar, text }: TestimonialCardProps) {
  return (
    // 1. Tambahkan 'relative' dan padding atas untuk memberi ruang bagi avatar
    <div className="relative bg-pink-100 pt-12 p-6 rounded-2xl w-100 h-60 flex-shrink-0 text-center">
      
      {/* 2. Posisikan avatar secara absolut di tengah atas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src={avatar}
          alt={name}
          width={64} // Perbesar ukuran avatar
          height={64}
          className="rounded-full border-4 border-white"
        />
      </div>

      {/* Konten teks */}
      <div className="mt-2">
          <p className="font-bold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{role}</p>
      </div>
      <p className="text-gray-700 mt-4">{text}</p>
    </div>
  );
}