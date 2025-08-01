"use client";
import { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
import JobFilter, { JobFilters } from "@/components/JobFilter";

export interface JobRecommendation {
  title: string;
  company: string;
  description: string;
  qualifications: string;
  benefit: string;
  similarityScore: number;
  tags: string[];
  salary?: string;
  experience?: string;
  location?: string;
}

interface QueryResult {
  query_text: string;
  recommendations: JobRecommendation[];
}

interface JobDataProps {
  [key: string]: QueryResult;
}

export default function JobOpportunitiesPage() {
  const [filters, setFilters] = useState<JobFilters>({});
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [jobData, setJobData] = useState<JobDataProps>({});
  const [selectedQuery, setSelectedQuery] = useState<string>("");

  useEffect(() => {
    fetch("/data/jobs_recommendation.json")
      .then((res) => res.json())
      .then((data: JobDataProps) => {
        setJobData(data);

        // Show all jobs by default
        const allJobs = Object.values(data)
          .flatMap((item: QueryResult) => item.recommendations);
        setRecommendations(allJobs);
      })
      .catch((error) => {
        console.error("Failed to fetch job data:", error);
      });
  }, []);

  // Apply filters to job recommendations
  const applyFilters = (jobs: JobRecommendation[]): JobRecommendation[] => {
    return jobs.filter((job) => {
      // Salary filter
      if (filters.minSalary && job.salary) {
        const jobSalary = parseInt(job.salary.replace(/\D/g, '')) || 0;
        const minSalary = parseInt(filters.minSalary.replace(/\D/g, '')) || 0;
        if (jobSalary < minSalary) return false;
      }

      if (filters.maxSalary && job.salary) {
        const jobSalary = parseInt(job.salary.replace(/\D/g, '')) || 0;
        const maxSalary = parseInt(filters.maxSalary.replace(/\D/g, '')) || 0;
        if (jobSalary > maxSalary) return false;
      }

      // Job type filter
      if (filters.jobType && filters.jobType.length > 0) {
        const hasMatchingType = filters.jobType.some(type => 
          job.tags.some(tag => tag.toLowerCase().includes(type.toLowerCase())) ||
          job.description.toLowerCase().includes(type.toLowerCase())
        );
        if (!hasMatchingType) return false;
      }

      // Location filter
      if (filters.location && job.location) {
        if (!job.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      // Industry filter
      if (filters.industry) {
        const hasMatchingIndustry = job.tags.some(tag => 
          tag.toLowerCase().includes(filters.industry!.toLowerCase())
        ) || job.description.toLowerCase().includes(filters.industry.toLowerCase());
        if (!hasMatchingIndustry) return false;
      }

      return true;
    });
  };

  // Update recommendations when dropdown or filters change
  useEffect(() => {
    let baseJobs: JobRecommendation[] = [];

    if (!selectedQuery) {
      baseJobs = Object.values(jobData).flatMap((item: QueryResult) => item.recommendations);
    } else {
      const found = Object.values(jobData).find(
        (item: QueryResult) => item.query_text === selectedQuery
      );
      baseJobs = found ? found.recommendations : [];
    }

    // Apply filters to the base jobs
    const filteredJobs = applyFilters(baseJobs);
    setRecommendations(filteredJobs);
  }, [selectedQuery, jobData, filters]);

  const activeFilters = Object.entries(filters)
    .map(([, value]) => {
      if (Array.isArray(value)) return value;
      if (typeof value === "string" && value.trim() !== "") return [value];
      return [];
    })
    .flat();

  return (
    <div className="p-8 grid grid-cols-[1fr_280px] gap-8">
      {/* LEFT */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Job Opportunities for You</h2>
        <p className="text-gray-500 mb-6">Your personalized job opportunities</p>

        {/* Dropdown */}
        <select
          className="border border-[#C9184A] rounded-lg p-2 mb-6 w-full"
          value={selectedQuery}
          onChange={(e) => setSelectedQuery(e.target.value)}
        >
          <option value="">Show All (Click to filter)</option>
          <option>.NET FullStack Developer</option>
          <option>3D Interaction Design in Virtual Reality</option>
          <option>3D Modeling for 3D Printing and Laser Cutting on Fusion 360</option>
          <option>3D Printing and Additive Manufacturing</option>
          <option>3D Printing Hardware</option>
        </select>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map((f) => (
            <span
              key={f}
              className="bg-pink-100 text-[#C9184A] text-sm px-3 py-1 rounded-full"
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