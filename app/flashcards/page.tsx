import FlashcardGenerator from "@/components/flashcards/flashcard-generator"

export const metadata = {
  title: "AI-Powered Flashcards - AITOPIAN",
  description: "Generate flashcards from any topic with spaced repetition for better memory retention.",
}

export default function FlashcardsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">AI-Powered Flashcards</h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Generate flashcards from any topic or textbook. Our AI extracts key points and creates flashcards with
            spaced repetition to help you memorize information more effectively.
          </p>
        </div>

        <FlashcardGenerator />
      </div>
    </div>
  )
}
