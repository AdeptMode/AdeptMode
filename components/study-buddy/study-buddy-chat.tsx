"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Brain, FileText, FlashlightIcon, HelpCircle, Send, AlertTriangle } from "lucide-react"
import { generateStudyBuddyResponse } from "@/app/actions/ai-actions"
import StudyBuddyMessage from "./study-buddy-message"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  mode?: "explain" | "summarize" | "flashcards" | "quiz"
}

export default function StudyBuddyChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"explain" | "summarize" | "flashcards" | "quiz">("explain")
  const [error, setError] = useState<string | null>(null)
  const [isMockMode, setIsMockMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Clear error when changing tabs
  useEffect(() => {
    setError(null)
  }, [activeTab])

  // Update the handleSend function to handle API limitations
  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    // Clear any previous errors
    setError(null)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      mode: activeTab,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Format messages for the API
      const messageHistory = messages
        .filter((msg) => msg.mode === activeTab) // Only include messages from the current mode
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))

      // Add the new user message
      messageHistory.push({
        role: "user",
        content: input,
      })

      // Get response from Google Gemini
      const response = await generateStudyBuddyResponse(messageHistory, activeTab)

      if (response.success && response.data) {
        // Add assistant message
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.data,
          mode: activeTab,
        }

        setMessages((prev) => [...prev, assistantMessage])

        // Check if we're using mock data
        if (response.isMock && !isMockMode) {
          setIsMockMode(true)
          // Add a system message about using demo mode
          const mockMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: "assistant",
            content:
              "⚠️ Note: I'm currently operating in demo mode with pre-generated responses due to API configuration issues. The responses are still helpful but not personalized to your specific questions.",
            mode: activeTab,
          }
          setMessages((prev) => [...prev, mockMessage])
        }

        // If we're using a fallback response due to API limitations, show a notification
        if (response.isLimited) {
          // Add a system message about the API limitation
          const limitMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: "assistant",
            content:
              "⚠️ Note: I'm currently operating with limited capabilities due to high demand. Some responses may be generalized.",
            mode: activeTab,
          }
          setMessages((prev) => [...prev, limitMessage])
        }
      } else {
        // Set error message
        setError(response.error || "I'm having trouble connecting right now. Please try again in a moment.")
      }
    } catch (error) {
      console.error("Error in chat:", error)
      // Set error message
      setError("I'm experiencing technical difficulties. Please try again in a few moments.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value as "explain" | "summarize" | "flashcards" | "quiz")
  }

  const getPlaceholderText = () => {
    switch (activeTab) {
      case "explain":
        return "Ask about any concept you want explained..."
      case "summarize":
        return "Enter a topic or paste text to summarize..."
      case "flashcards":
        return "Enter a topic to generate flashcards..."
      case "quiz":
        return "Enter a topic to create a quiz..."
      default:
        return "Type your message..."
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        {isMockMode && (
          <Alert className="mb-4 border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700">
              Demo mode active: Using pre-generated responses due to API configuration issues. Try common topics like
              math, science, or history.
            </AlertDescription>
          </Alert>
        )}

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

          {["explain", "summarize", "flashcards", "quiz"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <div className="flex flex-col h-[60vh]">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 rounded-md bg-gray-50">
                  {messages
                    .filter((msg) => msg.mode === tab)
                    .map((message) => (
                      <StudyBuddyMessage key={message.id} message={message} />
                    ))}
                  <div ref={messagesEndRef} />

                  {messages.filter((msg) => msg.mode === tab).length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                      <div className="bg-purple-100 p-3 rounded-full mb-4">
                        {tab === "explain" && <Brain className="h-8 w-8 text-purple-600" />}
                        {tab === "summarize" && <FileText className="h-8 w-8 text-purple-600" />}
                        {tab === "flashcards" && <FlashlightIcon className="h-8 w-8 text-purple-600" />}
                        {tab === "quiz" && <HelpCircle className="h-8 w-8 text-purple-600" />}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {tab === "explain" && "Get Simple Explanations"}
                        {tab === "summarize" && "Create Summary Notes"}
                        {tab === "flashcards" && "Generate Flashcards"}
                        {tab === "quiz" && "Create Practice Quizzes"}
                      </h3>
                      <p className="max-w-md">
                        {tab === "explain" &&
                          "Ask about any concept you find difficult, and I'll explain it in simple terms."}
                        {tab === "summarize" && "Enter a topic or paste text, and I'll create concise summary notes."}
                        {tab === "flashcards" && "Enter a topic, and I'll generate flashcards to help you study."}
                        {tab === "quiz" &&
                          "Enter a topic, and I'll create a multiple-choice quiz to test your knowledge."}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={getPlaceholderText()}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 border-2 border-white border-opacity-50 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
