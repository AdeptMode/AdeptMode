"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Sparkles, Upload } from "lucide-react"
import { evaluateAnswer } from "@/app/actions/answer-evaluator-api"
import { Textarea } from "@/components/ui/textarea"
import ReactMarkdown from "react-markdown"

export default function AnswerEvaluatorForm() {
  const [topic, setTopic] = useState("")
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [evaluation, setEvaluation] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState<string | null>(null)

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Only accept text files
    if (
      !file.type.match("text/plain") &&
      !file.type.match("application/msword") &&
      !file.type.match("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setError("Please upload a text file (.txt, .doc, or .docx)")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setAnswer(content)
      setFileContent(file.name)
    }
    reader.onerror = () => {
      setError("Error reading file")
    }
    reader.readAsText(file)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    if (!topic.trim()) {
      setError("Please enter a topic")
      return
    }

    if (!answer.trim()) {
      setError("Please enter or upload an answer")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await evaluateAnswer(answer, topic)

      if (response.success && response.data) {
        setEvaluation(response.data)
      } else {
        setError(response.error || "Failed to evaluate answer. Please try again.")
      }
    } catch (err) {
      console.error("Error evaluating answer:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Reset the form
  const handleReset = () => {
    setEvaluation(null)
    setError(null)
    setTopic("")
    setAnswer("")
    setFileContent(null)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="mb-6">
          <Alert className="bg-purple-50 border-purple-200">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-purple-700">
              Submit your answer for evaluation. Our AI will check grammar, accuracy, and structure while providing
              detailed feedback.
            </AlertDescription>
          </Alert>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {!evaluation ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="topic">Topic or Question</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., The causes of World War II, Shakespeare's use of metaphor in Macbeth"
                className="mt-1"
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="answer">Your Answer</Label>
                <div className="relative">
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".txt,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center px-3 py-1 text-sm text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200"
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Upload File
                  </Label>
                </div>
              </div>
              {fileContent && <div className="mt-2 text-sm text-gray-500">Uploaded: {fileContent}</div>}
              <Textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type or paste your answer here..."
                className="mt-1 h-64"
              />
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-opacity-50 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Evaluating...
                </>
              ) : (
                "Evaluate Answer"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-white border border-gray-200 rounded-md">
              <div className="prose max-w-none">
                <ReactMarkdown>{evaluation}</ReactMarkdown>
              </div>
            </div>
            <div className="flex justify-between">
              <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
                Evaluate Another Answer
              </Button>
              <Button onClick={() => window.print()} variant="outline" className="flex items-center gap-2">
                Print Evaluation
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
