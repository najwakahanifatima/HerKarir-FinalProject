import { Circle, CircleDot } from 'lucide-react'
import { useState } from 'react'

// TO DO is submitted and is correct

interface AnswerChoiceProps {
    isCorrect: boolean | null
}

export default function AnswerChoice( {isCorrect} : AnswerChoiceProps) {
    const [chosenAnswer, setChosenAnswer] = useState('');

    return (
        <div className='flex justify-between gap-3'>
            <button 
                className={`flex items-center gap-2 w-full rounded-lg border-1 p-2 cursor-pointer hover:bg-[#FAE8ED] transition
                    ${chosenAnswer === 'True' ? 'bg-[#FAE8ED] border-2 border-[#A1133B]' : 'border-[#D9D9D9] bg-white'}`}
                onClick={() => setChosenAnswer('True')}
            >
                {chosenAnswer === 'True' ? <CircleDot className='text-[#A1133B]'/> :  <Circle className='text-[#D9D9D9]'/> }
                <span
                    className={`${chosenAnswer === 'True' ? 'text-[#A1133B]' : ''} text-[11px]`}
                >
                    True
                </span>
            </button>
            <button
                className={`flex items-center gap-2 w-full rounded-lg border-1 p-2 cursor-pointer hover:bg-[#FAE8ED] transition
                    ${chosenAnswer === 'False' ? 'bg-[#FAE8ED] border-2 border-[#A1133B]' : 'border-[#D9D9D9] bg-white'}`}  
                    onClick={() => setChosenAnswer('False')}  
            >
                {chosenAnswer === 'False' ? <CircleDot className='text-[#A1133B]'/> :  <Circle className='text-[#D9D9D9]'/> }
                <span
                    className={`${chosenAnswer === 'False' ? 'text-[#A1133B]' : ''} text-[11px]`}
                >
                    False
                </span>
            </button>
        </div>
    )
}