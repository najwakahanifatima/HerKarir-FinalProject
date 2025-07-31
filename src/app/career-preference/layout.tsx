"use client";

import { CareerProvider } from "./CareerContext";

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <CareerProvider>{children}</CareerProvider>;
}
