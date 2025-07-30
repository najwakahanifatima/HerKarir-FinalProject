"use client"

import Image from "next/image"
import { useRouter } from "next/navigation";

export interface CourseCardProps {
  title: string;
  institution: string;
  imagePath: string;
}

export const CourseCard = ({
  title,
  institution,
  imagePath
}: CourseCardProps) => {
  const router = useRouter();
  const handleStart = () => {
    router.push(`/course/${encodeURIComponent(title)}`)
  }
  
  return (
    <div className="rounded-xl flex flex-col md:flex-row gap-3 w-full h-full shadow-md items-center p-4 bg-white">
      
      {/* Title + Institution + Button */}
      <div className="flex flex-col gap-2 items-start w-full sm:w-2/3 text-center sm:text-left">
        <span className="text-sm font-semibold w-full">{title}</span>
        <span className="text-[10px] text-gray-500 w-full">{institution}</span>
        <button 
          onClick={handleStart}
          className="mt-1 border border-[#C9184A] text-[#C9184A] cursor-pointer 
          px-4 py-1 text-[12px] rounded-full hover:bg-[#C9184A] hover:text-white transition">
          Mulai
        </button>
      </div>

      {/* Image */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
        <Image
          src={`/courses/${imagePath}`}
          alt={title}
          width={100}
          height={100}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
};
