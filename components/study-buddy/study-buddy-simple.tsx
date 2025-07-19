"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, FileText, FlashlightIcon, HelpCircle, Send, AlertTriangle, Sparkles } from "lucide-react"
import { generateStudyContent } from "@/app/actions/gemini-api"

export default function StudyBuddySimple() {
  const [topic, setTopic] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"explain" | "summarize" | "flashcards" | "quiz">("explain")

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!topic.trim() || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await generateStudyContent(topic, activeTab)

      if (response.success && response.data) {
        setResult(response.data)
      } else {
        setError(response.error || "Failed to generate content. Please try again.")
      }
    } catch (err) {
      console.error("Error generating content:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as "explain" | "summarize" | "flashcards" | "quiz")
    // Clear previous results when changing tabs
    setResult("")
    setError(null)
  }

  // Get placeholder text based on active tab
  const getPlaceholderText = () => {
    switch (activeTab) {
      case "explain":
        return "Enter a concept you want explained..."
      case "summarize":
        return "Enter a topic to summarize..."
      case "flashcards":
        return "Enter a topic for flashcards..."
      case "quiz":
        return "Enter a topic for a quiz..."
      default:
        return "Enter a topic..."
    }
  }

  // Suggested topics for each mode
  const suggestedTopics = {
    explain: ["Photosynthesis", "Quantum physics", "The water cycle", "Machine learning"],
    summarize: ["World War II", "The Renaissance", "Climate change", "Solar system"],
    flashcards: ["Chemical elements", "Spanish vocabulary", "Historical dates", "Math formulas"],
    quiz: ["Basic algebra", "World geography", "Human anatomy", "Literary devices"],
  }

  // Function to handle clicking a suggested topic
  const handleTopicClick = (selectedTopic: string) => {
    setTopic(selectedTopic)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="mb-6">
          <Alert className="bg-purple-50 border-purple-200">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-purple-700">
              Enter any topic or question, and the AI Study Buddy will generate educational content to help you learn.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="explain" onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="explain" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Explain</span>
            </TabsTrigger>
            <TabsTrigger value="summarize" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Summarize</span>
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex items-center gap-2">
              <FlashlightIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Flashcards</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Quiz</span>
            </TabsTrigger>
          </TabsList>

          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex gap-2">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={getPlaceholderText()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !topic.trim()} className="bg-purple-600 hover:bg-purple-700">
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-opacity-50 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </form>

          {/* Suggested topics */}
          {!result && !isLoading && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Try these topics:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTopics[activeTab].map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleTopicClick(topic)}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results area */}
          {result && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-md">
              <div className="prose max-w-none whitespace-pre-wrap">{result}</div>
            </div>
          )}

          {/* Empty state */}
          {!result && !isLoading && (
            <TabsContent value={activeTab} className="mt-0">
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  {activeTab === "explain" && <Brain className="h-8 w-8 text-purple-600" />}
                  {activeTab === "summarize" && <FileText className="h-8 w-8 text-purple-600" />}
                  {activeTab === "flashcards" && <FlashlightIcon className="h-8 w-8 text-purple-600" />}
                  {activeTab === "quiz" && <HelpCircle className="h-8 w-8 text-purple-600" />}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab === "explain" && "Get Simple Explanations"}
                  {activeTab === "summarize" && "Create Summary Notes"}
                  {activeTab === "flashcards" && "Generate Flashcards"}
                  {activeTab === "quiz" && "Create Practice Quizzes"}
                </h3>
                <p className="max-w-md">
                  {activeTab === "explain" &&
                    "Enter any concept you find difficult, and I'll explain it in simple terms."}
                  {activeTab === "summarize" && "Enter a topic, and I'll create concise summary notes."}
                  {activeTab === "flashcards" && "Enter a topic, and I'll generate flashcards to help you study."}
                  {activeTab === "quiz" &&
                    "Enter a topic, and I'll create a multiple-choice quiz to test your knowledge."}
                </p>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
