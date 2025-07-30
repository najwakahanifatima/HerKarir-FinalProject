'use client'

import { useState } from "react"
import AnswerChoice from "./AnswerChoice"

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

    return (
        <section className="flex flex-col rounded-lg border-1 border-[#D9D9D9] items-center">
            {/* Header */}
            <div className="flex justify-between items-center bg-[#FAE8ED] p-4 rounded-t-lg">
                {/* Title and Module Name */}
                <div className="flex flex-col">
                    <span className="font-semibold">{title}</span>
                    <span className="text-[#383838] text-[10px]">{module}</span>
                </div>
                {isSubmitted && (
                    <div className="rounded-4xl bg-[#15803D] text-white text-sm px-4 py-1">
                        {score}
                    </div>
                )}
            </div>
            {/* Questions Section */}
            <div className="flex flex-col gap-3 my-5 mx-4">
                {questions.map((question, index) => (
                    <div key={index} className="flex flex-col border-1 border-[#D9D9D9] rounded-lg p-3 gap-2">
                        <div>
                            <span>{index+1}.</span>
                            <span> {question} </span>
                        </div>
                        {/* Answers Choice */}
                        <AnswerChoice isCorrect={null}/>
                    </div>
                ))}
            </div>
            {/* Submit Assessment */}
            <button className="w-5/6 bg-[#C9184A] text-white py-1 rounded-lg mb-5 cursor-pointer transform transition hover:-translate-y-1">
                Kumpulkan
            </button>
        </section>
    )
}
