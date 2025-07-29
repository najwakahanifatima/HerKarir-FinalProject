'use client'

import { useState } from "react"
import { CircleCheck } from "lucide-react"
import VideoPlayer from "./VideoPlayer"

// TO DO: add pre, mid, post test in modulesName. add logo institution

interface ModuleLearningProps {
    title: string,
    institution: string,
    modulesName: string[],
    modulesDescription: string[],
    modulesDuration: string[],
}

export const ModuleLearning = ( { 
    title,
    institution,
    modulesName,
    modulesDescription,
    modulesDuration
 } : ModuleLearningProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const linkVideo = "https://www.youtube.com/embed/Ycu0wlPf5KA"; // just for dummy
    
    return (
        <section className="flex gap-10">
            {/* LEFT SIDE */}
            <aside className="w-1/3 flex flex-col bg-[#FAE8ED] border-[1px] border-[#D9D9D9] rounded-md">
                <p className="text-[12px] mt-7 px-5"> {institution} </p>
                <h1 className="font-bold mb-5 mt-2 text-xl px-5"> {title} </h1>
                {modulesName.map((modulesTitle, index) => (
                    <button
                        key= {index}
                        onClick={() => setSelectedIndex(index)}
                        className={`group flex items-center justify-between py-3 px-5
                        hover:bg-[#C9184A] hover:text-white transition cursor-pointer
                        ${selectedIndex === index ? 'bg-[#C9184A] text-white' : ''}`}
                    >
                        <div className="flex flex-col text-left">
                            <div className="flex items-center gap-2">
                                <span>{index+1}.</span>
                                <span>{modulesTitle}</span>
                            </div>
                            <span className={`pl-5 text-[12px] group-hover:text-white
                                ${selectedIndex === index ? 'text-white' : 'text-[#8C8C8C] group-hover:text-white'}`
                            }>{modulesDuration[index]}</span>
                        </div>
                        <CircleCheck/>
                    </button>
                ))}
            </aside>
            {/* RIGHT SIDE */}
            <aside className="w-2/3 flex flex-col gap-y-3">
                <h1 className="text-3xl font-bold"> {modulesName[selectedIndex]} </h1>
                <span className="text-[8C8C8C] text-sm"> {modulesDuration[selectedIndex]} </span>
                <VideoPlayer link={linkVideo} title={modulesName[selectedIndex]}/>
                <p className="mt-4"> {modulesDescription[selectedIndex]} </p>
            </aside>
        </section>
    )
}