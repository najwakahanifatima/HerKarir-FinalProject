"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState} from "react";
import { CourseProps } from "../page";
import { Star, UserRound, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { ModuleList } from "@/components/ModuleLists";

const images = [
    'detail1.jpg',
    'detail2.jpeg',
    'detail3.jpg',
    'detail4.png',
    'detail5.jpg',
]

export default function CourseDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const [course, setCourse] = useState<CourseProps | null>(null);
    let randomNumber = Math.floor(Math.random() * images.length);
    const imagePath = `/courses/${images[randomNumber]}`;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/data/courses_data.json');
            const data : CourseProps[] = await res.json();
            const found = data.find(
                (c) => c.Title.toLowerCase() === decodeURIComponent(id as string).toLowerCase()
            )
            setCourse(found || null);
        }

        fetchData();
    }, [id]);

    if (!course) return <p className="text-center text-gray-400 mt-20"> Loading ... </p>;

    return (
        <section className="flex flex-col gap-4 px-10 my-5 w-full">
            {/* Back Button */}
            <div>
                <button 
                    className="flex items-center text-gray-400 cursor-pointer"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className='mr-2' size={18}/> Back
                </button>
            </div>

            {/* Course Section */}
            <div className="flex gap-10 justify-between my-5">
                {/* Course Overview */}
                <div className="w-1/2 bg-[#FAE8ED] flex flex-col gap-3 p-5 rounded-lg">
                    <div className="w-full h-60">
                        <Image
                            src={imagePath}
                            alt={course.Title}
                            width={400}
                            height={400}
                            className="w-full h-full rounded-lg object-cover"
                        />
                    </div>
                    {/* Institution and Tags */}
                    <div className="flex gap-3 justify-start text-[10px] items-center">
                        <span> {course.Institution} </span>
                        <span className="border-1 border-[#C9184A] px-2 py-1 text-[#C9184A] rounded-full"> {course.Category} </span>
                        <span className="border-1 border-[#C9184A] px-2 py-1 text-[#C9184A] rounded-full"> {course.Subcategory} </span>
                    </div>
                    <h1 className="text-xl font-bold"> {course.Title} </h1>
                    <p className="text-sm"> {course.Description} </p>
                    {/* Ratings and Registrants */}
                    <div className="flex gap-2 text-[12px]">
                        <span className="flex gap-1"> <Star fill="black" size={15}/> {course.Rating} </span>
                        <span className="flex gap-1"> <UserRound fill="black" size={15}/> {course.Enrolled} </span>
                    </div>
                    <p className="font-semibold mt-5"> Sudah selecai cari pelatihan? Cari kerja sekarang! </p>
                    <div className="flex gap-3 items-center">
                        <button className="rounded-xl bg-[#C9184A] text-white px-4 py-3 text-[12px] cursor-pointer transition transform hover:-translate-y-1"
                            onClick={() => {router.push('/course/certificate')}}
                        > Unduh Sertifikat </button>
                        <button className="rounded-xl bg-[#C9184A] text-white px-4 py-3 text-[12px] cursor-pointer transition transform hover:-translate-y-1"> Cari Kerja </button>
                        <span className="text-[10px] text-[#C9184A]"> *Tombol aktif setelah kamu <br/> mendapatkan sertifikat. </span>

                    </div>
                </div>

                {/* Course Module Section */}
                <div className="w-1/2 h-150 overflow-y-scroll">
                    <ModuleList modulesName={course['Modules Name']} title={course.Title}/>
                </div>
            </div>
        </section>
    )
}