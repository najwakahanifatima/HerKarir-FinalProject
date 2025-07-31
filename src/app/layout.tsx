import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Specify desired weights
})

export const metadata: Metadata = {
  title: "HerKarir",
  description: "Upgrade your skill with HerKarir",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Atur body untuk layout sticky footer */}
      <body className={`antialiased flex flex-col min-h-screen bg-gray-50 ${poppins.className} antialiased`}>
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