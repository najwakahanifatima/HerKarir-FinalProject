"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import SearchInput from '@/components/SearchInput';
import ProgressCard from '@/components/ProgressCard';
import {CourseCard} from '@/components/CourseCard';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import HeroSection from '@/components/HeroSection';

// Tipe data
type CourseFromML = {
  Title: string;
  Institution: string;
};

type MockData = {
  learningProgress: any[];
  recommendedCourses: any[];
  // tambahkan tipe lain jika perlu
};

type HomePageClientProps = {
  allCourses: CourseFromML[];
  mockData: MockData;
};

export default function HomePageClient({ allCourses, mockData }: HomePageClientProps) {
  const { user } = useAuth();
  const [displayedCourses, setDisplayedCourses] = useState<CourseFromML[]>([]);
  
  const learningProgress = mockData.learningProgress;
  const courseImages = mockData.recommendedCourses.map(course => course.image);
  const providerLogos = mockData.recommendedCourses.map(course => course.providerLogo);

   useEffect(() => {
    // Sekarang, baik sudah login maupun belum, selalu tampilkan 10 data teratas
    setDisplayedCourses(allCourses.slice(0, 10));
  }, [user, allCourses]);

  return (
    <>
      <div className="px-6 md:px-12">
        <SearchInput />

        <HeroSection />

        <section className="px-16 my-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Kerja bagus! Yuk, lanjut tingkatkan skill kamu</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {learningProgress.map(item => (
              <ProgressCard key={item.id} icon={item.icon} title={item.title} progress={item.progress} />
            ))}
          </div>
        </section>

        <section className="my-20 px-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Rekomendasi yang cocok buat kamu</h2>
          <div className="p-10 bg-#D9D9D9 border-1 rounded-md border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCourses.map((course, index) => (
              <CourseCard 
                key={index}
                title={course.Title}
                institution={course.Institution}
                imagePath={courseImages[index % courseImages.length]}
                providerLogo={providerLogos[index % providerLogos.length]}
              />
            ))}
          </div>
          </div>
        </section>
      </div>
      
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}