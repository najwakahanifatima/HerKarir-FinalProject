import { Circle, CircleDot } from "lucide-react"

interface AnswerChoiceProps {
    selectedAnswer: string | null
    correctAnswer: string
    isSubmitted: boolean
    onSelect: (value: string) => void
}

export default function AnswerChoice({
    selectedAnswer,
    correctAnswer,
    isSubmitted,
    onSelect
}: AnswerChoiceProps) {
    const renderButton = (value: string) => {
    const isSelected = selectedAnswer === value
    const isCorrect = correctAnswer === value

    // Final border & background color
    let borderColor = "border-[#D9D9D9]"
    let bgColor = "bg-white"

    if (isSubmitted) {
      if (isCorrect) {
        borderColor = "border-green-500"
        bgColor = "bg-green-50"
      } else if (isSelected && !isCorrect) {
        borderColor = "border-red-500"
        bgColor = "bg-red-50"
      }
    } else if (isSelected) {
      borderColor = "border-[#A1133B]"
      bgColor = "bg-[#FAE8ED]"
    }

    return (
        <button
            disabled={isSubmitted} // disable click after submission
            className={`flex items-center gap-2 w-full rounded-lg border p-2 cursor-pointer transition ${borderColor} ${bgColor}`}
            onClick={() => onSelect(value)}
            >
            {isSelected ? (
                <CircleDot className={isSubmitted && !isCorrect ? "text-red-500" : "text-[#A1133B]"} />
            ) : (
                <Circle className="text-[#D9D9D9]" />
            )}
            <span className="text-[11px]">{value}</span>
        </button>
    )}

    return <div className="flex justify-between gap-3">{renderButton("True")}{renderButton("False")}</div>
}
