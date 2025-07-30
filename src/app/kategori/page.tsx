'use client'

import { CourseCardProps, CourseCard } from "@/components/CourseCard"
import { useEffect, useState } from "react"
import PaginationComponent from "@/components/PaginationComponent"


const categories = [
    'Business', 'Personal Development', 'Arts and Humanities',
    'Language Learning', 'Health', 'Computer Science',
    'Information Technology', 'Social Sciences', 
    'Physical Science and Engineering', 'Data Science',
    'Math and Logic']

const images = [
    'image1.svg', 'image2.svg', 'image3.svg',
    'image4.svg', 'image5.svg', 'image6.svg',
    'image7.svg', 'image8.svg', 'image9.svg',
]

export interface CourseProps {
    Title: string;
    Institution: string;
    Rating: number;
    Skills: string;
    Description: string;
    Link: string;
    Category: string;
    Subcategory: string;
    ModulesName: string[];
    ModulesDescription: string[];
    ModulesDuration: string[];
    Enrolled: number;
    Level: string;
    Duration: string;
    Type: string;
}

export default function CoursePage() {
    //Data fetching
    const [data, setData] = useState<CourseProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/data/courses_data.json');
                const data = await res.json();
                setData(data);
            } catch (e) {
                console.error("Error fetching course cards: ", e);
            }
        }
        fetchData()
    })

    // Search and Filter
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const filteredData = data.filter((item) => {
        const matchesSearch = 
            item.Title.toLowerCase().includes(searchTerm.toLowerCase());
            item.Institution.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = 
            selectedFilters.length === 0 ||
            selectedFilters.includes(item.Category)
        
        return matchesSearch && matchesCategory
    })

        // Pagination
    const cardsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredData.length / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentData = filteredData.slice(indexOfFirstCard, indexOfLastCard);

    const toggleFilter = (category: string) => {
        setCurrentPage(1);
        setSelectedFilters((prev) => 
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        )
    }

    return (
        <div className="flex flex-col gap-5 my-3 lg:px-40 md:px-10 sm:px-5">
            {/*Search Bar*/}
            <div>
                <input
                    type="text"
                    placeholder="Search courses..."
                    className="border border-gray-300 p-2 rounded-lg w-full text-sm"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                    }}
                />
            </div>

            {/*Course Category*/}
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => toggleFilter(category)}
                        className={`px-3 py-1 rounded-full border text-[10px] transition
                            ${selectedFilters.includes(category) 
                                ? 'bg-[#C9184A] text-white border-[#C9184A]'
                                : "bg-white border-gray-300 hover:bg-gray-100"}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/*Courses List*/}
            <div className="grid grid-cols-3 border-1 border-[#D9D9D9] rounded-2xl p-5 my-3 gap-4">
                {currentData.length > 0 ? (
                    currentData.map((item, index) => (
                        <div key={index} className="flex justify-center items-center">
                            <CourseCard 
                                key={index}
                                title={item.Title}
                                institution={item.Institution}
                                imagePath={images[index % images.length]}
                            />
                        </div>
                    )))
                
                : (
                    <p className="text-center col-span-3 text-gray-400"> No Courses Found. </p>
                )}
            </div>
            {/* Pagination */}
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                maxVisible={8}
            />
        </div>
    )
} 