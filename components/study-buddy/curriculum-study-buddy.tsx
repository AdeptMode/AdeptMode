"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { generateCurriculumResponse } from "@/app/actions/curriculum-gemini-api"
import CurriculumSelector from "@/components/curriculum-selector"
import { ArrowLeft } from "lucide-react"

interface CurriculumStudyBuddyProps {
  onBack?: () => void
}

export default function CurriculumStudyBuddy({ onBack }: CurriculumStudyBuddyProps = {}) {
  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")

  const handleSelectionChange = (grade: string, subject: string) => {
    setSelectedGrade(grade)
    setSelectedSubject(subject)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim() || !selectedGrade || !selectedSubject) return

    setIsLoading(true)
    try {
      const result = await generateCurriculumResponse(question, selectedGrade, selectedSubject, "explain")

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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {onBack && (
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Mode Selection
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">CBSE Study Mode</h2>
            <p className="text-gray-600">Curriculum-aligned learning assistance</p>
          </div>
        </div>
      )}
      <CurriculumSelector onSelectionChange={handleSelectionChange} />

      {selectedGrade && selectedSubject && (
        <Card>
          <CardHeader>
            <CardTitle>CBSE AI Study Buddy</CardTitle>
            <CardDescription>
              Ask questions about your Class {selectedGrade}{" "}
              {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)} curriculum
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like to learn about?
                </label>
                <Textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask me anything about your science curriculum..."
                  className="min-h-[100px]"
                  required
                />
              </div>

              <Button type="submit" disabled={isLoading || !question.trim()} className="w-full">
                {isLoading ? "Thinking..." : "Ask Study Buddy"}
              </Button>
            </form>

            {response && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Study Buddy Response:</h3>
                <div className="text-blue-800 whitespace-pre-wrap">{response}</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
