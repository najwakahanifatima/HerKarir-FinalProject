'use client'

import { useState } from "react"
import AnswerChoice from "./AnswerChoice"
import { Progress } from "./ui/progress"
import { useRouter } from "next/navigation"

export interface AssessmentCardProps {
  title: string
  module: string
  questions: string[]
  correctAnswers: string[]
}

export const AssessmentCard = ({
  title,
  module,
  questions,
  correctAnswers,
}: AssessmentCardProps) => {
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null))
  const [progress, setProgress] = useState(0)
  const [answeredIndex, setAnsweredIndex] = useState<number[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const router = useRouter();

  const handleAnswer = (index: number, answer: string) => {
    const updatedAnswers = [...userAnswers]
    updatedAnswers[index] = answer
    setUserAnswers(updatedAnswers)

    if (!answeredIndex.includes(index)) {
      const newAnswered = [...answeredIndex, index]
      setAnsweredIndex(newAnswered)
      setProgress((newAnswered.length / questions.length) * 100)
    }
  }

  const handleSubmit = () => {
    let calculatedScore = 0
    userAnswers.forEach((ans, i) => {
      if (ans === correctAnswers[i]) calculatedScore++
    })
    setScore(calculatedScore)
    setIsSubmitted(true)
  }

  return (
    <section className="flex flex-col rounded-lg border border-[#D9D9D9] items-center w-5/6">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#FAE8ED] py-4 px-7 rounded-t-lg w-full">
            <div className="flex flex-col">
              <span className="font-semibold text-lg">{title}</span>
              <span className="text-[#383838] text-[10px]">{module}</span>
            </div>
            {isSubmitted && (
            <div className="rounded-4xl bg-[#15803D] text-white text-sm px-4 py-1">
                Score: {score}/{questions.length}
            </div>
            )}
        </div>

        {/* Progress & Questions */}
        <div className="flex flex-col gap-3 my-5">
            <Progress value={progress} className="w-full mb-3"/>

            <div className="flex flex-col gap-7">
              {questions.map((question, index) => {
              const isCorrect = isSubmitted && userAnswers[index] === correctAnswers[index]
              const isWrong = isSubmitted && userAnswers[index] !== correctAnswers[index]

              return (
                  <div
                  key={index}
                  className={`flex flex-col border rounded-lg p-3 gap-2 ${
                      isCorrect ? "border-green-500 bg-green-50" : isWrong ? "border-red-500 bg-red-50" : "border-[#D9D9D9]"
                  }`}
                  >
                  <div className="text-sm">
                      <span>{index + 1}.</span> {question}
                  </div>

                  <AnswerChoice
                      selectedAnswer={userAnswers[index]}
                      correctAnswer={correctAnswers[index]}
                      isSubmitted={isSubmitted}
                      onSelect={(ans) => handleAnswer(index, ans)}
                  />
                  </div>
              )
            })}
            </div>
        </div>

        {/* Submit Button */}
        <button
            className="w-5/6 text-sm bg-[#C9184A] text-white py-2 rounded-lg mb-5 cursor-pointer transform transition hover:-translate-y-0.5"
            onClick={() => {
            if (isSubmitted) {
                window.location.href = `/course/${encodeURIComponent(title)}`;
            } else {
                handleSubmit();
            }
            }}
        >
            {isSubmitted ? "Kembali ke Course Module" : "Kumpulkan"}
        </button>
    </section>
  )
}
