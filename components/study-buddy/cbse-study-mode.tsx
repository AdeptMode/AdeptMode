"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, Lightbulb, Target, ArrowLeft, Copy, Share2 } from "lucide-react"
import { generateCBSEResponse } from "@/app/actions/cbse-gemini-api"

interface CBSEStudyModeProps {
  onBack?: () => void
}

const classes = [
  { value: "6", label: "Class 6", subjects: ["Science", "Mathematics", "English", "Social Science"] },
  { value: "7", label: "Class 7", subjects: ["Science", "Mathematics", "English", "Social Science"] },
  { value: "8", label: "Class 8", subjects: ["Science", "Mathematics", "English", "Social Science"] },
  { value: "9", label: "Class 9", subjects: ["Science", "Mathematics", "English", "Social Science"] },
  { value: "10", label: "Class 10", subjects: ["Science", "Mathematics", "English", "Social Science"] },
  { value: "11", label: "Class 11", subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English"] },
  { value: "12", label: "Class 12", subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English"] },
]

const studyModes = [
  { value: "explain", label: "Explain", icon: BookOpen, description: "Get detailed explanations" },
  { value: "summarize", label: "Summarize", icon: Target, description: "Get concise summaries" },
  { value: "examples", label: "Examples", icon: Lightbulb, description: "Get practical examples" },
  { value: "practice", label: "Practice", icon: Brain, description: "Get practice questions" },
]

export default function CBSEStudyMode({ onBack }: CBSEStudyModeProps) {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [studyMode, setStudyMode] = useState("explain")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const selectedClassData = classes.find((c) => c.value === selectedClass)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim() || !selectedClass || !selectedSubject) return

    setIsLoading(true)
    try {
      const result = await generateCBSEResponse(topic, selectedClass, selectedSubject, studyMode as any)

      if (result.success && result.data) {
        setResponse(result.data)
      } else {
        setResponse("Sorry, content is currently unavailable. Please try again later.")
      }
    } catch (error) {
      console.error("Error:", error)
      setResponse("Sorry, content is currently unavailable. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response)
  }

  const shareResponse = () => {
    if (navigator.share) {
      navigator.share({
        title: `CBSE ${selectedSubject} - ${topic}`,
        text: response,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {onBack && (
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Mode Selection
            </Button>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">CBSE Study Mode</h1>
            <p className="text-xl text-gray-300">AI-powered learning tailored to CBSE curriculum</p>
          </div>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Select Your Class & Subject
              </CardTitle>
              <CardDescription className="text-gray-300">
                Choose your class and subject to get curriculum-aligned responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.value} value={cls.value}>
                          {cls.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={!selectedClass}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedClassData?.subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedClass && selectedSubject && (
                <div className="flex items-center gap-2 mt-4">
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                    Class {selectedClass}
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    {selectedSubject}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedClass && selectedSubject && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white mb-6">
              <CardHeader>
                <CardTitle>Study Mode</CardTitle>
                <CardDescription className="text-gray-300">
                  Choose how you want to learn about the topic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {studyModes.map((mode) => {
                    const Icon = mode.icon
                    return (
                      <button
                        key={mode.value}
                        onClick={() => setStudyMode(mode.value)}
                        className={`p-3 rounded-lg border transition-all ${
                          studyMode === mode.value
                            ? "bg-purple-500/30 border-purple-400 text-white"
                            : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <Icon className="h-5 w-5 mx-auto mb-2" />
                        <div className="text-sm font-medium">{mode.label}</div>
                        <div className="text-xs opacity-75">{mode.description}</div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {selectedClass && selectedSubject && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Ask Your Question
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Enter any topic from your {selectedSubject} curriculum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Textarea
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder={`Ask about any ${selectedSubject} topic for Class ${selectedClass}...`}
                      className="min-h-[100px] bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !topic.trim()}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    {isLoading
                      ? "Getting AI Response..."
                      : `Get ${studyModes.find((m) => m.value === studyMode)?.label}`}
                  </Button>
                </form>

                {response && (
                  <div className="mt-6 p-6 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">AI Response:</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyToClipboard}
                          className="text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={shareResponse}
                          className="text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-gray-100 leading-relaxed">{response}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
