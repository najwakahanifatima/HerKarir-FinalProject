import fs from 'fs/promises';
import path from 'path';
import HomePageClient from '@/components/HomePageClient'; // Kita akan buat komponen ini

// Tipe data untuk TypeScript
type CourseFromML = {
  Title: string;
  Institution: string;
  // Tambahkan properti lain jika perlu
};

// Ini sekarang adalah Server Component (default)
export default async function HomePage() {
  //Baca file JSON secara manual di server
  const filePath = path.join(process.cwd(), 'src', 'data', 'courses_data.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const allCourses: CourseFromML[] = JSON.parse(jsonData);

  //Baca mock data untuk gambar/logo
  const mockFilePath = path.join(process.cwd(), 'src', 'data', 'mock-data.json');
  const mockJsonData = await fs.readFile(mockFilePath, 'utf-8');
  const mockData = JSON.parse(mockJsonData);
  
  // Kirim data yang sudah dibaca sebagai props ke komponen client
  return (
    <HomePageClient allCourses={allCourses} mockData={mockData} />
  );
}