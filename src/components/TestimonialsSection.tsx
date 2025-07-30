"use client";

import { useRef } from 'react';
import TestimonialCard from './TestimonialCard';
import mockData from '@/data/mock-data.json';
import { ArrowRight } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = mockData.testimonials;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 372, behavior: 'smooth' }); // Lebar kartu + gap
    }
  };

  return (
    <section className="px-8 py-16 m-16">
      <div className="max-w-7xl mx-auto md:px-12">
        {/* Judul sekarang terpisah di atas */}
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Buka peluang masa depan lewat pembelajaran yang relevan
        </h2>
      </div>

      {/* 1. Buat kontainer 'relative' untuk area scroll dan tombol */}
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pt-12 pb-4 pl-6 md:pl-12 scrollbar-hide"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              avatar={testimonial.avatar}
              text={testimonial.text}
            />
          ))}
        </div>

        {/* 2. Pindahkan tombol ke sini dan posisikan absolut */}
        <button 
          onClick={handleScroll}
          className="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 flex-shrink-0"
          aria-label="Scroll right"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </section>
  );
}