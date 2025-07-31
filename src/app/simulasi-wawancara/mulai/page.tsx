"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function MulaiSimulasiPage() {
    const [questionNumber, setQuestionNumber] = useState(1);
    const totalQuestions = 5;
    const router = useRouter();
    const userVideoRef = useRef<HTMLVideoElement>(null);
    
    // State untuk menyimpan semua jawaban
    const [allAnswers, setAllAnswers] = useState<string[]>([]);
    
    const interviewVideos = [
      "/videos/1.mp4",
      "/videos/2.mp4",
      "/videos/3.mp4",
      "/videos/4.mp4",
      "/videos/5.mp4",
    ];

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        let stream: MediaStream;
        const startUserCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                if (userVideoRef.current) {
                    userVideoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing media devices.", err);
            }
        };
        startUserCamera();
        
        return () => {
            stream?.getTracks().forEach(track => track.stop());
        };
    }, []);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser Anda tidak mendukung speech recognition.</span>;
    }

    const calculateScore = (answers: string[]): number => {
        let totalScore = 0;
        const professionalKeywords = ['kolaborasi', 'tim', 'inisiatif', 'solusi', 'belajar', 'berkontribusi', 'profesional', 'tanggung jawab'];

        answers.forEach(answer => {
            const words = answer.split(' ').filter(word => word !== '');
            let answerScore = 0;

            if (words.length > 80) answerScore += 10;
            else if (words.length > 40) answerScore += 7;
            else if (words.length > 10) answerScore += 4;

            let keywordPoints = 0;
            professionalKeywords.forEach(keyword => {
                if (answer.toLowerCase().includes(keyword)) {
                    keywordPoints += 2;
                }
            });
            answerScore += Math.min(keywordPoints, 10);

            totalScore += answerScore;
        });

        return Math.round(totalScore);
    };

    const handleNextQuestion = () => {
        SpeechRecognition.stopListening();
        
        const currentAnswers = [...allAnswers, transcript];
        setAllAnswers(currentAnswers);
        
        resetTranscript();

        if (questionNumber < totalQuestions) {
            setQuestionNumber(prev => prev + 1);
        } else {
            const finalScore = calculateScore(currentAnswers);
            alert("Simulasi Selesai!");
            router.push(`/simulasi-wawancara/hasil?score=${finalScore}`);
        }
    };

    const handleStartRecording = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true, language: 'id-ID' });
    };

    return (
        <div className="py-12 px-4 md:px-12">
            <div className="max-w-4xl mx-auto">
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div className="bg-pink-600 h-2.5 rounded-full" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}></div>
                </div>
                <p className="text-right font-semibold text-gray-600 mb-8">({questionNumber}/{totalQuestions})</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-orange-400 rounded-lg overflow-hidden relative">
                        <video
                            key={questionNumber}
                            src={interviewVideos[questionNumber - 1]}
                            autoPlay
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold px-3 py-1 rounded-md">
                            Pertanyaan
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-lg overflow-hidden">
                        <video ref={userVideoRef} autoPlay playsInline muted className="w-full h-full object-cover"></video>
                    </div>
                </div>

                <textarea
                    value={transcript}
                    placeholder="Klik 'Mulai Menjawab' untuk mulai merekam jawaban Anda..."
                    className="text-gray-500 w-full h-32 p-4 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500"
                    readOnly
                />

                <div className="mt-6 flex flex-col items-center">
                    <div className="flex gap-4">
                        {!listening ? (
                            <button 
                                onClick={handleStartRecording} 
                                className="bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700"
                            >
                                Mulai Menjawab
                            </button>
                        ) : (
                            <button 
                                onClick={SpeechRecognition.stopListening} 
                                className="bg-red-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-red-700"
                            >
                                Stop Merekam
                            </button>
                        )}
                        <button 
                            onClick={handleNextQuestion} 
                            className="bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-pink-700 disabled:bg-gray-400"
                            disabled={listening}
                        >
                            Kirim dan Lanjutkan
                        </button>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">Catatan: Klik Stop Merekam sebelum Kirim dan Lanjutkan.</p>
                </div>
            </div>
        </div>
    );
}