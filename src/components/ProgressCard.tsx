import Image from 'next/image';

// Definisikan tipe untuk props
type ProgressCardProps = {
  icon: string;
  title: string;
  progress: number;
};

export default function ProgressCard({ icon, title, progress }: ProgressCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 min-w-[280px]">
      <div className="flex items-center gap-3 mb-3">
        <Image src={icon} alt={title} width={32} height={32} />
        <p className="font-semibold text-gray-800">{title}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-[#C9184A] h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-600">{progress}%</span>
      </div>
    </div>
  );
}