import Image from 'next/image';

// Definisikan tipe untuk props
type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex-shrink-0">
        <Image 
          src={icon}
          alt={`${title} icon`}
          width={40}
          height={40}
        />
      </div>
      <div>
        <h3 className="font-bold text-lg text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
}