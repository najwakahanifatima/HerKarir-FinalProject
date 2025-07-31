import Image from 'next/image';
import FeatureCard from './FeatureCard';
import mockData from '@/data/mock-data.json';

export default function FeaturesSection() {
  const features = mockData.features;

  return (
    <section 
      className="bg-[url('/images/bg-feature.svg')] bg-pink-100 bg-cover bg-center py-20 px-6 md:px-12"
    >
      <div className="px-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold text-gray-800 mb-10">
            Belajar sesuai ritme dan tujuan kamu
          </h2>
          <div className="space-y-6">
            {features.map(feature => (
              <FeatureCard 
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <Image 
            src="/images/feature-women.svg"
            alt="Fitur HerKarir"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}