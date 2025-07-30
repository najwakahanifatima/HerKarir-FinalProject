'use client'

import { useEffect, useState } from "react"
import AnswerChoice from "./AnswerChoice"
import { Progress } from "./ui/progress"

export interface AssessmentCardProps {
    title: string,
    module: string,
    questions: string[],
    correctAnswers: string[],
    isSubmitted: boolean,
    score: number
}

export const AssessmentCard = ( {
    title,
    module,
    questions,
    correctAnswers,
    isSubmitted,
    score
} : AssessmentCardProps) => {
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
    const [progress, setProgress] = useState(0);
    const [answeredIndex, setAnsweredIndex] = useState<number[]>([])

    const handleProgress = (index: number) => {
        if (!answeredIndex.includes(index)) {
            setAnsweredIndex((prev) => [...prev, index]);
            setProgress(((answeredIndex.length + 1) / questions.length) * 100);
        }
    }

    return (
        <section className="flex flex-col rounded-lg border-1 border-[#D9D9D9] items-center">
            {/* Header */}
            <div className="flex justify-between items-center bg-[#FAE8ED] py-4 px-7 rounded-t-lg w-full">
                {/* Title and Module Name */}
                <div className="flex flex-col">
                    <span className="font-semibold text-lg">{title}</span>
                    <span className="text-[#383838] text-[10px]">{module}</span>
                </div>
                {isSubmitted && (
                    <div className="rounded-4xl bg-[#15803D] text-white text-sm px-4 py-1">
                        {score}
                    </div>
                )}
            </div>
            {/* Progress & Questions Section */}
            <div className="flex flex-col gap-3 my-5 mx-4">
                <Progress value={progress} className="w-full mb-3"/>
                {questions.map((question, index) => (
                    <div key={index} className="flex flex-col border-1 border-[#D9D9D9] rounded-lg p-3 gap-2">
                        <div className="text-sm">
                            <span>{index+1}.</span>
                            <span> {question} </span>
                        </div>
                        {/* Answers Choice */}
                        <AnswerChoice 
                            isCorrect={null}
                            onClick={() => handleProgress(index)}    
                        />
                    </div>
                ))}
            </div>
            {/* Submit Assessment */}
            <button className="w-5/6 text-sm bg-[#C9184A] text-white py-2 rounded-lg mb-5 cursor-pointer transform transition hover:-translate-y-1">
                Kumpulkan
            </button>
        </section>
    )
}
