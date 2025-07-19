import QuestionGeneratorForm from "@/components/question-generator/question-generator-form"

export const metadata = {
  title: "Exam Question Generator - AITOPIAN",
  description: "Generate likely exam questions with detailed explanations based on syllabus trends.",
}

export default function QuestionGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Exam Question Generator</h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Generate likely exam questions based on syllabus trends. Our AI will create questions with detailed
            explanations to help you prepare effectively.
          </p>
        </div>

        <QuestionGeneratorForm />
      </div>
    </div>
  )
}
