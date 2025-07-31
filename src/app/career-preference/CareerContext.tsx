"use client";
import React, { createContext, useContext, useState } from "react";

interface CareerData {
  salaryMin: string;
  salaryMax: string;
  jobType: string[];
  industry: string;
  workLocation: string[];
  city: string;
  skills: { name: string; level: string }[];
}

interface CareerContextType {
  data: CareerData;
  setData: React.Dispatch<React.SetStateAction<CareerData>>;
}

const CareerContext = createContext<CareerContextType | null>(null);

export const CareerProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<CareerData>({
    salaryMin: "",
    salaryMax: "",
    jobType: [],
    industry: "",
    workLocation: [],
    city: "",
    skills: [],
  });

  return (
    <CareerContext.Provider value={{ data, setData }}>
      {children}
    </CareerContext.Provider>
  );
};

export const useCareer = () => useContext(CareerContext)!;
