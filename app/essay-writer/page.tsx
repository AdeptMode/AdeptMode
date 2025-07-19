import EssayWriterForm from "@/components/essay-writer/essay-writer-form"

export const metadata = {
  title: "AI-Powered Essay Writer - AITOPIAN",
  description: "Get help structuring essays, generating ideas, and improving your writing style and grammar.",
}

export default function EssayWriterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">AI-Powered Essay Writer</h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Get help structuring your essays, generating ideas, and improving your writing style and grammar. Our AI
            assistant provides personalized guidance to enhance your academic writing.
          </p>
        </div>

        <EssayWriterForm />
      </div>
    </div>
  )
}
