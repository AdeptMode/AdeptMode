"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Globe, Lightbulb, BookOpen, Brain, HelpCircle, Copy, Share2 } from "lucide-react"
import { generateGlobalStudyResponse } from "@/app/actions/global-study-api"

interface GlobalStudyBuddyProps {
  onBack?: () => void
}

export default function GlobalStudyBuddy({ onBack }: GlobalStudyBuddyProps = {}) {
  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeMode, setActiveMode] = useState<"explain" | "summarize" | "flashcards" | "quiz">("explain")

  const suggestedTopics = [
    "Explain photosynthesis process",
    "Solve quadratic equations",
    "World War 2 causes and effects",
    "Chemical bonding types",
    "Shakespeare's writing style",
    "Climate change impacts",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsLoading(true)
    try {
      const result = await generateGlobalStudyResponse(question, activeMode)

      if (result.success && result.data) {
        setResponse(result.data)
      } else {
        setResponse("Sorry, I couldn't generate a response. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      setResponse("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedTopic = (topic: string) => {
    setQuestion(topic)
  }

  const copyResponse = () => {
    navigator.clipboard.writeText(response)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {onBack && (
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Mode Selection
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Globe className="h-6 w-6 text-purple-600" />
              Global Study Mode
            </h2>
            <p className="text-gray-600">Universal learning assistance for any curriculum</p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Study Assistant
          </CardTitle>
          <CardDescription>
            Ask questions about any subject, topic, or curriculum. Get explanations, summaries, flashcards, and quizzes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Learning Mode Tabs */}
          <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="explain" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Explain
              </TabsTrigger>
              <TabsTrigger value="summarize" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Summarize
              </TabsTrigger>
              <TabsTrigger value="flashcards" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger value="quiz" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Quiz
              </TabsTrigger>
            </TabsList>

            <TabsContent value="explain" className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Explain Mode:</strong> Get detailed explanations with examples and step-by-step breakdowns.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="summarize" className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Summarize Mode:</strong> Get concise summaries and key points of complex topics.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="flashcards" className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>Flashcards Mode:</strong> Generate flashcards for memorization and quick review.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="quiz" className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Quiz Mode:</strong> Create practice questions to test your understanding.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Question Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to learn about?
              </label>
              <Textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`Ask me to ${activeMode} any topic...`}
                className="min-h-[120px]"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isLoading ? "Thinking..." : `${activeMode.charAt(0).toUpperCase() + activeMode.slice(1)} Topic`}
            </Button>
          </form>

          {/* Suggested Topics */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Suggested Topics:</h3>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((topic, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-purple-50 hover:border-purple-300"
                  onClick={() => handleSuggestedTopic(topic)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          {/* Response */}
          {response && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">AI Response:</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyResponse}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">{response}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
