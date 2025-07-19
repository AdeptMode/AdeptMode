"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Sparkles, FileText } from "lucide-react"
import { generateExamQuestions } from "@/app/actions/question-generator-api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReactMarkdown from "react-markdown"

export default function QuestionGeneratorForm() {
  const [topic, setTopic] = useState("")
  const [questionCount, setQuestionCount] = useState(5)
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard" | "Mixed">("Mixed")
  const [questionType, setQuestionType] = useState<"Multiple Choice" | "Short Answer" | "Essay" | "Mixed">("Mixed")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [questions, setQuestions] = useState<string | null>(null)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    if (!topic.trim()) {
      setError("Please enter a topic")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await generateExamQuestions(topic, questionCount, difficulty, questionType)

      if (response.success && response.data) {
        setQuestions(response.data)
      } else {
        setError(response.error || "Failed to generate questions. Please try again.")
      }
    } catch (err) {
      console.error("Error generating questions:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Reset the form
  const handleReset = () => {
    setQuestions(null)
    setError(null)
  }

  // Suggested topics
  const suggestedTopics = [
    "Photosynthesis",
    "World War II",
    "Algebra",
    "Shakespeare",
    "Chemical Reactions",
    "Human Anatomy",
    "Machine Learning",
    "Climate Change",
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="mb-6">
          <Alert className="bg-purple-50 border-purple-200">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-purple-700">
              Generate likely exam questions based on syllabus trends. Our AI will create questions with detailed
              explanations to help you prepare effectively.
            </AlertDescription>
          </Alert>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {!questions ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="topic">Topic or Subject</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Photosynthesis, World War II, Algebra"
                className="mt-1"
              />
            </div>

            {/* Suggested topics */}
            <div>
              <Label className="text-sm text-gray-500">Suggested topics:</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {suggestedTopics.map((suggestedTopic, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setTopic(suggestedTopic)}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                  >
                    {suggestedTopic}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="questionCount">Number of Questions</Label>
                <Input
                  id="questionCount"
                  type="number"
                  min={1}
                  max={10}
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={difficulty} onValueChange={(value) => setDifficulty(value as any)}>
                  <SelectTrigger id="difficulty" className="mt-1">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                    <SelectItem value="Mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="questionType">Question Type</Label>
                <Select value={questionType} onValueChange={(value) => setQuestionType(value as any)}>
                  <SelectTrigger id="questionType" className="mt-1">
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
                    <SelectItem value="Short Answer">Short Answer</SelectItem>
                    <SelectItem value="Essay">Essay</SelectItem>
                    <SelectItem value="Mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-opacity-50 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating Questions...
                </>
              ) : (
                "Generate Exam Questions"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-white border border-gray-200 rounded-md">
              <div className="prose max-w-none">
                <ReactMarkdown>{questions}</ReactMarkdown>
              </div>
            </div>
            <div className="flex justify-between">
              <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
                Generate New Questions
              </Button>
              <Button
                onClick={() => {
                  const element = document.createElement("a")
                  const file = new Blob([questions], { type: "text/markdown" })
                  element.href = URL.createObjectURL(file)
                  element.download = "exam_questions.md"
                  document.body.appendChild(element)
                  element.click()
                  document.body.removeChild(element)
                }}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4 mr-1" />
                Download Questions
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
