'use client'

import { AssessmentCard } from "@/components/AssessmentCard";
import { ArrowLeft } from "lucide-react";

const dummyQuestions = [
  "User feedback and data should be a key input when making product decisions.",
  "The more features a product has, the better its product-market fit.",
  "Scrum and Agile are development frameworks that Product Managers often work within.",
  "User personas are created primarily based on internal stakeholder assumptions.",
  "A high churn rate is a positive indicator of product-market fit.",
];

const dummyCorrectAnswers = ["True", "False", "False", "True", "True"];

interface AssessmentPageProps {
  params: Promise<{
    id: string;
    test: string;
  }>;
}

export default async function AssessmentPage({ params }: AssessmentPageProps) {
  const { id, test } = await params;
  const courseTitle = decodeURIComponent(id);

  let testTitle = '';
  if (test === 'pre-test') {
    testTitle = 'Pre-Test: Menilai Kesiapan Anda';
  } else if (test === 'mid-test') {
    testTitle = 'Mid-Test: Mengukur Hasil Belajar Anda Sejauh Ini';
  } else {
    testTitle = 'Post-Test: Menilai Hasil Belajar Anda';
  }

  return (
    <section className="flex flex-col gap-6 mx-64 my-10">
      <button
        className="flex items-center text-gray-400 cursor-pointer"
        onClick={() => history.back()}
      >
        <ArrowLeft className="mr-2" size={18} /> Back
      </button>

      <div className="flex justify-center">
        <AssessmentCard
          title={testTitle}
          module={courseTitle}
          questions={dummyQuestions}
          correctAnswers={dummyCorrectAnswers}
        />
      </div>
    </section>
  );
}