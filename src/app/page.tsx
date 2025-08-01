import fs from "fs/promises";
import path from "path";
import HomePageClient from "@/components/HomePageClient";
import { InputData, Recommendation, RecommendationResponse } from "@/components/HomePageClient";

export default async function HomePage() {
  // Read courses recommendation JSON
  const filePath = path.join(process.cwd(), "public", "data", "courses_recommendation.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const parsedData: RecommendationResponse[] = JSON.parse(jsonData);

  // Read mock data
  const mockFilePath = path.join(process.cwd(), "public", "data", "mock-data.json");
  const mockJsonData = await fs.readFile(mockFilePath, "utf-8");
  const mockData = JSON.parse(mockJsonData);
  
  return (
    <HomePageClient
      recommendedCourses={parsedData}
      mockData={mockData}
    />
  );
}
