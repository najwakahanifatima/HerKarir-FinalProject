'use client'

import { CourseProps } from "@/app/course/page";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { ModuleLearning } from "@/components/ModuleLearning";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function LearningPage() {
    const router = useRouter()
    const { id } = useParams();
    const [course, setCourse] = useState<CourseProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/data/courses_data.json');
            const data : CourseProps[] = await res.json();
            const found = data.find(
                (c) => c.Title.toLowerCase() === decodeURIComponent(id as string).toLowerCase()
            )
            setCourse(found || null);

            console.log("found: ", found)
        }

        fetchData()
    }, [id])

    if (!course) return <p className="text-center text-gray-400 mt-20"> Loading ... </p>;

    return (
        <section className="flex flex-col gap-4 my-5 px-10">
            {/* Back Button */}
            <div>
                <button 
                    className="flex items-center text-gray-400 cursor-pointer"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className='mr-2' size={18}/> Back
                </button>
            </div>
            <ModuleLearning 
                title={course.Title}
                institution={course.Institution}
                modulesName={course['Modules Name']}
                modulesDescription={course['Modules Description']}
                modulesDuration={course['Modules Duration']}
            />
        </section>
    )
}