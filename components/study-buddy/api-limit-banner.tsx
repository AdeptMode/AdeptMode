import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ApiLimitBanner() {
  return (
    <Alert className="mb-4 border-purple-200 bg-purple-50">
      <AlertTriangle className="h-4 w-4 text-purple-600" />
      <AlertTitle className="text-purple-800">Powered by Google Gemini</AlertTitle>
      <AlertDescription className="text-purple-700">
        The AI Study Buddy uses Google Gemini to provide explanations, summaries, flashcards, and quizzes. This is a
        preview version and may have limited availability. If you experience any issues, please try again later.
      </AlertDescription>
    </Alert>
  )
}
