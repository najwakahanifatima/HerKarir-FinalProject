import fs from "fs/promises";
import path from "path";
import HomePageClient from "@/components/HomePageClient";

interface InputData {
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

export default async function HomePage() {
  // Read courses recommendation JSON
  const filePath = path.join(process.cwd(), "public", "data", "courses_recommendation.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const parsedData: RecommendationResponse[] = JSON.parse(jsonData);
  const recommendedCourses: Recommendation[] = parsedData[0].recommendations;

  // Read mock data
  const mockFilePath = path.join(process.cwd(), "public", "data", "mock-data.json");
  const mockJsonData = await fs.readFile(mockFilePath, "utf-8");
  const mockData = JSON.parse(mockJsonData);
  
  return (
    <HomePageClient
      recommendedCourses={recommendedCourses}
      mockData={mockData}
    />
  );
}
