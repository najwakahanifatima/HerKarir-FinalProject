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

export interface InputData {
  skill: string[];
  category: string[];
  top_n: number;
}

export interface Recommendation {
  Category: string;
  Description: string;
  Duration: string;
  Enrolled: number;
  Institution: string;
  Level: string;
  "Modules Description": string[];
  "Modules Duration": string[];
  "Modules Name": string[];
  Rating: string;
  Similarity: number;
  Skills: string;
  Subcategory: string;
  Title: string;
  Type: string;
}

export interface RecommendationResponse {
  input: InputData;
  recommendations: Recommendation[];
}

type CourseMock = {
  id: string;
  title: string;
  image: string;
  provider: string;
  providerLogo: string;
};

type MockData = {
  learningProgress: {
    id: string;
    icon: string;
    title: string;
    progress: number;
  }[];
  recommendedCourses: CourseMock[];
};

type HomePageClientProps = {
  recommendedCourses: RecommendationResponse[];
  mockData: MockData;
};

export default function HomePageClient({ recommendedCourses, mockData }: HomePageClientProps) {
  const { user } = useAuth();
  const [displayedCourses, setDisplayedCourses] = useState<Recommendation[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [allSkills, setAllSkills] = useState<string[]>([]);
  
  const learningProgress = mockData.learningProgress;
  const courseImages = mockData.recommendedCourses.map(course => course.image);
  const providerLogos = mockData.recommendedCourses.map(course => course.providerLogo);

  // extract all unique skills from InputData and format
  useEffect(() => {
    const skillsSet = new Set<string>();
    
    recommendedCourses.forEach(response => {
      const category = response.input.category[0] || 'General';
      skillsSet.add(`${category}: ${response.input.skill}`);
    });
    
    setAllSkills(Array.from(skillsSet).sort());
  }, [recommendedCourses]);

  // filter courses based on selected skill from InputData
  useEffect(() => {
    if (!selectedSkill) {

      // show all courses when no skill is selected
      const allCourses = recommendedCourses.flatMap(response => response.recommendations);
      setDisplayedCourses(allCourses);
    } else {

      const skillPart = selectedSkill.includes(': ') 
        ? selectedSkill.split(': ')[1] 
        : selectedSkill;

      // find matches with selected skill
      const matchingResponse = recommendedCourses.find((response) => {
        const skillString = Array.isArray(response.input.skill)
          ? response.input.skill.join(",")
          : response.input.skill;
        return skillString === skillPart;
      });

      // use the recommendations directly from that response
      setDisplayedCourses(matchingResponse ? matchingResponse.recommendations : []);
    }
  }, [selectedSkill, recommendedCourses]);

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
          <div className="flex flex-col justify-between items-left mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Rekomendasi yang cocok buat kamu</h2>
            
            {/* Skills Filter Dropdown */}
            <div className="flex flex-col items-left gap-2 mt-4">
              <label className="text-sm font-medium text-gray-600">Pilih Personalisasi</label>
              <select
                className="border border-[#C9184A] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                <option value="">Tampilkan semua</option>
                {allSkills.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-10 bg-gray-100 border rounded-md border-gray-300">
            {displayedCourses.length > 0 ? (
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
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ditemukan kursus yang sesuai.</p>
              </div>
            )}
          </div>
        </section>
      </div>
      
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}