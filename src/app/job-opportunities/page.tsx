"use client";
import { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
import JobFilter from "@/components/JobFilter";

export interface JobRecommendation {
  title: string;
  company: string;
  description: string;
  qualification: string;
  benefit: string;
  similarityScore: number;
  tags: string[];
  salary: string;
  experience: string;
  location: string;
}

export default function JobOpportunitiesPage() {
  const [filters, setFilters] = useState<any>({});
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);

  useEffect(() => {
    fetch("/data/jobs_recommendation.json")
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data["2"].recommendations);
      });
  }, []);

  console.log("recs ", recommendations)

  return (
    <div className="p-8 grid grid-cols-[1fr_280px] gap-8">
      {/* LEFT */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Job Opportunities for You</h2>
        <p className="text-gray-500 mb-6">Your personalized job opportunities</p>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.values(filters).length > 0 &&
            Object.values(filters)
              .flat()
              .map((f: any) => (
                <span
                  key={f}
                  className="bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-full"
                >
                  {f} ✕
                </span>
              ))}
        </div>

        {/* Job List */}
        <div className="grid grid-cols-2 gap-6">
          {recommendations.map((job, i) => (
            <JobCard key={i} {...job} />
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <JobFilter filters={filters} setFilters={setFilters} />
    </div>
  );
}
