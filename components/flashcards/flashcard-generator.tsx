"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Sparkles, ChevronLeft, ChevronRight, Download, RefreshCw } from "lucide-react"
import { generateFlashcards, type Flashcard as FlashcardType } from "@/app/actions/flashcard-generator-api"
import Flashcard from "./flashcard"
import { Progress } from "@/components/ui/progress"

export default function FlashcardGenerator() {
  const [topic, setTopic] = useState("")
  const [cardCount, setCardCount] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [studyMode, setStudyMode] = useState(false)
  const [spacedRepetitionQueue, setSpacedRepetitionQueue] = useState<FlashcardType[]>([])

  // Reset the queue when flashcards change
  useEffect(() => {
    if (flashcards.length > 0) {
      setSpacedRepetitionQueue([...flashcards])
    }
  }, [flashcards])

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
      const response = await generateFlashcards(topic, cardCount)

      if (response.success && response.data) {
        setFlashcards(response.data)
        setCurrentCardIndex(0)
        setStudyMode(true)
      } else {
        setError(response.error || "Failed to generate flashcards. Please try again.")
      }
    } catch (err) {
      console.error("Error generating flashcards:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle marking card difficulty (for spaced repetition)
  const handleMarkDifficulty = (id: string, difficulty: "Easy" | "Medium" | "Hard") => {
    // Update the difficulty in the flashcards array
    const updatedFlashcards = flashcards.map((card) => (card.id === id ? { ...card, difficulty } : card))
    setFlashcards(updatedFlashcards)

    // Update the queue based on difficulty
    const currentCard = spacedRepetitionQueue[currentCardIndex]
    const remainingCards = spacedRepetitionQueue.filter((_, index) => index !== currentCardIndex)

    // Implement a simple spaced repetition algorithm
    // Easy cards go to the end, medium cards go halfway through, hard cards come back soon
    let newQueue: FlashcardType[] = []

    if (difficulty === "Easy") {
      // Put at the end of the queue
      newQueue = [...remainingCards, { ...currentCard, difficulty }]
    } else if (difficulty === "Medium") {
      // Put in the middle of the queue
      const middleIndex = Math.floor(remainingCards.length / 2)
      newQueue = [
        ...remainingCards.slice(0, middleIndex),
        { ...currentCard, difficulty },
        ...remainingCards.slice(middleIndex),
      ]
    } else {
      // Put a few cards later (but not immediately)
      const laterIndex = Math.min(3, remainingCards.length)
      newQueue = [
        ...remainingCards.slice(0, laterIndex),
        { ...currentCard, difficulty },
        ...remainingCards.slice(laterIndex),
      ]
    }

    setSpacedRepetitionQueue(newQueue)

    // Move to the next card
    if (remainingCards.length > 0) {
      // Keep the same index if we're not at the end, otherwise go back to 0
      setCurrentCardIndex(currentCardIndex >= remainingCards.length ? 0 : currentCardIndex)
    } else {
      // If that was the last card, reset to study mode false
      setStudyMode(false)
    }
  }

  // Navigate to the next card
  const handleNextCard = () => {
    if (currentCardIndex < spacedRepetitionQueue.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  // Navigate to the previous card
  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  // Reset the form
  const handleReset = () => {
    setStudyMode(false)
    setFlashcards([])
    setError(null)
  }

  // Download flashcards as JSON
  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([JSON.stringify(flashcards, null, 2)], { type: "application/json" })
    element.href = URL.createObjectURL(file)
    element.download = `flashcards_${topic.replace(/\s+/g, "_").toLowerCase()}.json`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
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
              Generate AI-powered flashcards from any topic. Our system uses spaced repetition to help you memorize
              information more effectively.
            </AlertDescription>
          </Alert>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {!studyMode ? (
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

            <div>
              <Label htmlFor="cardCount">Number of Flashcards</Label>
              <Input
                id="cardCount"
                type="number"
                min={5}
                max={20}
                value={cardCount}
                onChange={(e) => setCardCount(Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-opacity-50 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating Flashcards...
                </>
              ) : (
                "Generate Flashcards"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Studying: {topic} ({currentCardIndex + 1}/{spacedRepetitionQueue.length})
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RefreshCw className="h-4 w-4 mr-1" /> New Topic
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" /> Save
                </Button>
              </div>
            </div>

            <Progress value={((currentCardIndex + 1) / spacedRepetitionQueue.length) * 100} className="h-2" />

            <div className="relative">
              {spacedRepetitionQueue.length > 0 && (
                <Flashcard card={spacedRepetitionQueue[currentCardIndex]} onMarkDifficulty={handleMarkDifficulty} />
              )}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevCard}
                disabled={currentCardIndex === 0}
                className="flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNextCard}
                disabled={currentCardIndex === spacedRepetitionQueue.length - 1}
                className="flex items-center"
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>
                Rate each card as Easy, Medium, or Hard. Cards you find difficult will appear more frequently to help
                you learn.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
