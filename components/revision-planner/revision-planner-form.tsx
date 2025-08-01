"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Plus, Trash2, AlertTriangle, Sparkles, BookOpen, Clock, Target, Brain } from "lucide-react"
import { generateRevisionPlan, type SubjectInfo, type RevisionPlannerInput } from "@/app/actions/revision-planner-api"
import RevisionPlanDisplay from "./revision-plan-display"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function RevisionPlannerForm() {
  const [examDate, setExamDate] = useState("")
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(4)
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [subjects, setSubjects] = useState<SubjectInfo[]>([
    { name: "", difficulty: "Medium", priority: "Medium", topics: "" },
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [revisionPlan, setRevisionPlan] = useState<string | null>(null)

  // Add a new subject
  const addSubject = () => {
    setSubjects([...subjects, { name: "", difficulty: "Medium", priority: "Medium", topics: "" }])
  }

  // Remove a subject
  const removeSubject = (index: number) => {
    if (subjects.length > 1) {
      const newSubjects = [...subjects]
      newSubjects.splice(index, 1)
      setSubjects(newSubjects)
    }
  }

  // Update a subject
  const updateSubject = (index: number, field: keyof SubjectInfo, value: string) => {
    const newSubjects = [...subjects]
    newSubjects[index] = {
      ...newSubjects[index],
      [field]: value as any,
    }
    setSubjects(newSubjects)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    if (!examDate) {
      setError("Please select an exam date")
      return
    }

    if (subjects.some((subject) => !subject.name.trim())) {
      setError("Please provide a name for all subjects")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const input: RevisionPlannerInput = {
        examDate,
        studyHoursPerDay,
        subjects,
        additionalNotes: additionalNotes.trim() || undefined,
      }

      const response = await generateRevisionPlan(input)

      if (response.success && response.data) {
        setRevisionPlan(response.data)
      } else {
        setError(response.error || "Failed to generate revision plan. Please try again.")
      }
    } catch (err) {
      console.error("Error generating revision plan:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Reset the form
  const handleReset = () => {
    setRevisionPlan(null)
    setError(null)
  }

  // Calculate days until exam
  const daysUntilExam = examDate
    ? Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0

  // If we have a revision plan, show it
  if (revisionPlan) {
    return <RevisionPlanDisplay plan={revisionPlan} onReset={handleReset} />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Steps */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Your Study Plan</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            Takes 2-3 minutes
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="text-sm font-medium text-purple-600">Exam Details</span>
          </div>
          <div className="flex-1 h-px bg-gray-200 mx-4"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-sm text-gray-500">Subjects</span>
          </div>
          <div className="flex-1 h-px bg-gray-200 mx-4"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="text-sm text-gray-500">AI Plan</span>
          </div>
        </div>
      </div>

      {/* AI Insight Banner */}
      <Alert className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <Brain className="h-5 w-5 text-purple-600" />
        <AlertDescription className="text-purple-800">
          <strong>AI-Powered Planning:</strong> Our advanced algorithm will analyze your subjects, difficulty levels,
          and available time to create an optimal study schedule with spaced repetition and priority-based allocation.
        </AlertDescription>
      </Alert>

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Exam Details Section */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              Exam Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="examDate" className="text-base font-medium text-gray-700">
                  Exam Date
                </Label>
                <div className="relative">
                  <Input
                    id="examDate"
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <Calendar className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                </div>
                {daysUntilExam > 0 && (
                  <p className="text-sm text-green-600 font-medium">📅 {daysUntilExam} days until your exam</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="studyHours" className="text-base font-medium text-gray-700">
                  Daily Study Hours
                </Label>
                <div className="relative">
                  <Input
                    id="studyHours"
                    type="number"
                    min={1}
                    max={12}
                    value={studyHoursPerDay}
                    onChange={(e) => setStudyHoursPerDay(Number.parseInt(e.target.value) || 4)}
                    className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <Clock className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">
                  ⏱️ Total study time: {studyHoursPerDay * Math.max(daysUntilExam, 1)} hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subjects Section */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                Your Subjects ({subjects.length})
              </div>
              <Button
                type="button"
                onClick={addSubject}
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Subject
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-800">Subject {index + 1}</h4>
                  <Button
                    type="button"
                    onClick={() => removeSubject(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    disabled={subjects.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor={`subject-${index}`} className="text-sm font-medium text-gray-700">
                      Subject Name
                    </Label>
                    <Input
                      id={`subject-${index}`}
                      value={subject.name}
                      onChange={(e) => updateSubject(index, "name", e.target.value)}
                      placeholder="e.g., Mathematics, Physics, Chemistry"
                      className="mt-1 h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`difficulty-${index}`} className="text-sm font-medium text-gray-700">
                      Difficulty Level
                    </Label>
                    <Select
                      value={subject.difficulty}
                      onValueChange={(value) => updateSubject(index, "difficulty", value)}
                    >
                      <SelectTrigger
                        id={`difficulty-${index}`}
                        className="mt-1 h-11 border-gray-300 focus:border-purple-500"
                      >
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">🟢 Easy</SelectItem>
                        <SelectItem value="Medium">🟡 Medium</SelectItem>
                        <SelectItem value="Hard">🔴 Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`priority-${index}`} className="text-sm font-medium text-gray-700">
                      Priority Level
                    </Label>
                    <Select value={subject.priority} onValueChange={(value) => updateSubject(index, "priority", value)}>
                      <SelectTrigger
                        id={`priority-${index}`}
                        className="mt-1 h-11 border-gray-300 focus:border-purple-500"
                      >
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">⬇️ Low Priority</SelectItem>
                        <SelectItem value="Medium">➡️ Medium Priority</SelectItem>
                        <SelectItem value="High">⬆️ High Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor={`topics-${index}`} className="text-sm font-medium text-gray-700">
                      Key Topics (Optional)
                    </Label>
                    <Input
                      id={`topics-${index}`}
                      value={subject.topics || ""}
                      onChange={(e) => updateSubject(index, "topics", e.target.value)}
                      placeholder="e.g., Algebra, Calculus, Geometry, Trigonometry"
                      className="mt-1 h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Additional Notes Section */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <Target className="w-6 h-6" />
              Additional Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Label htmlFor="additionalNotes" className="text-base font-medium text-gray-700">
                Study Preferences & Goals
              </Label>
              <Textarea
                id="additionalNotes"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Tell us about your study preferences, weak areas, preferred study times, or any specific goals..."
                className="h-24 border-gray-300 focus:border-green-500 focus:ring-green-500 resize-none"
              />
              <p className="text-sm text-gray-500">
                💡 This helps our AI create a more personalized study plan for you
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="text-center">
          <Button
            type="submit"
            className="h-14 px-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-6 w-6 border-2 border-white border-opacity-50 border-t-transparent rounded-full animate-spin mr-3"></div>
                Generating Your AI Study Plan...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 mr-3" />
                Generate My Smart Study Plan
              </>
            )}
          </Button>
          <p className="text-sm text-gray-500 mt-3">🚀 Your personalized study plan will be ready in seconds!</p>
        </div>
      </form>
    </div>
  )
}
