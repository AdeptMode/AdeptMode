import AnswerEvaluatorForm from "@/components/answer-evaluator/answer-evaluator-form"

export const metadata = {
  title: "AI Answer Evaluator - AITOPIAN",
  description: "Get instant feedback on your answers with AI-powered evaluation.",
}

export default function AnswerEvaluatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">AI Answer Evaluator</h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Submit your answers for instant evaluation. Our AI will check grammar, accuracy, and structure while
            providing detailed feedback to help you improve.
          </p>
        </div>

        <AnswerEvaluatorForm />
      </div>
    </div>
  )
}
