import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "HerKarir App",
  description: "Upgrade your skill with HerKarir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Atur body untuk layout sticky footer */}
      <body className="antialiased flex flex-col min-h-screen bg-gray-50">
        <AuthProvider>
        <Navbar />
        
        {/* Konten utama halaman akan dirender di sini */}
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}