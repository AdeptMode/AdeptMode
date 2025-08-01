"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Heart, RefreshCw } from "lucide-react"
import { generateAnxietyCoachingResponse } from "@/app/actions/anxiety-coach-api"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import ReactMarkdown from "react-markdown"

export default function AnxietyCoachForm() {
  const [concern, setConcern] = useState("")
  const [preferredApproach, setPreferredApproach] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<string | null>(null)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    if (!concern.trim()) {
      setError("Please describe your concern or situation")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await generateAnxietyCoachingResponse(concern, preferredApproach)

      if (result.success && result.data) {
        setResponse(result.data)
      } else {
        setError(result.error || "Failed to generate coaching response. Please try again.")
      }
    } catch (err) {
      console.error("Error generating coaching response:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Reset the form
  const handleReset = () => {
    setResponse(null)
    setError(null)
    setConcern("")
    setPreferredApproach(undefined)
  }

  // Example concerns
  const exampleConcerns = [
    "I can't sleep the night before exams and feel physically sick.",
    "I know the material but my mind goes blank during tests.",
    "I'm worried I'll fail and disappoint my parents.",
    "I get so anxious I can't focus on studying.",
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="mb-6">
          <Alert className="bg-purple-50 border-purple-200">
            <Heart className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-purple-700">
              Share your exam anxiety concerns, and our AI coach will provide personalized relaxation techniques,
              motivational tips, guided meditation, and stress-relief strategies.
            </AlertDescription>
          </Alert>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {!response ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="concern">Describe your exam anxiety concern or situation</Label>
              <Textarea
                id="concern"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                placeholder="E.g., I get very anxious before exams and can't focus on studying..."
                className="mt-1 h-32"
              />
            </div>

            {/* Example concerns */}
            <div>
              <Label className="text-sm text-gray-500">Example concerns:</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {exampleConcerns.map((exampleConcern, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setConcern(exampleConcern)}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                  >
                    {exampleConcern}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>What type of approach would you prefer? (Optional)</Label>
              <RadioGroup
                value={preferredApproach}
                onValueChange={setPreferredApproach}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="mindfulness" id="mindfulness" />
                  <Label htmlFor="mindfulness" className="cursor-pointer">
                    Mindfulness & Meditation
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="practical" id="practical" />
                  <Label htmlFor="practical" className="cursor-pointer">
                    Practical Tips & Strategies
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="motivation" id="motivation" />
                  <Label htmlFor="motivation" className="cursor-pointer">
                    Motivational Approach
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="physical" id="physical" />
                  <Label htmlFor="physical" className="cursor-pointer">
                    Physical Relaxation Techniques
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-opacity-50 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating Coaching Response...
                </>
              ) : (
                "Get Personalized Support"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="p-6 bg-white border border-purple-200 rounded-md shadow-sm">
              <div className="prose max-w-none">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            </div>
            <div className="flex justify-between">
              <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 mr-1" />
                Ask Another Question
              </Button>
              <Button onClick={() => window.print()} variant="outline" className="flex items-center gap-2">
                Save/Print Advice
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
