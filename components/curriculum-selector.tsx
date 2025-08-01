"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CurriculumSelectorProps {
  onSelectionChange: (grade: string, subject: string) => void
}

export default function CurriculumSelector({ onSelectionChange }: CurriculumSelectorProps) {
  const [selectedGrade, setSelectedGrade] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")

  const grades = [
    { value: "6", label: "Class 6" },
    { value: "7", label: "Class 7" },
    { value: "8", label: "Class 8" },
    { value: "9", label: "Class 9" },
    { value: "10", label: "Class 10" },
    { value: "11", label: "Class 11" },
    { value: "12", label: "Class 12" },
  ]

  const subjects = [
    { value: "science", label: "Science" },
    { value: "mathematics", label: "Mathematics" },
    { value: "english", label: "English" },
    { value: "social-science", label: "Social Science" },
  ]

  useEffect(() => {
    if (selectedGrade && selectedSubject) {
      onSelectionChange(selectedGrade, selectedSubject)
    }
  }, [selectedGrade, selectedSubject, onSelectionChange])

  return (
    <Card className="w-full max-w-2xl mx-auto mb-8">
      <CardHeader>
        <CardTitle>Select Your CBSE Curriculum</CardTitle>
        <CardDescription>Choose your grade and subject to get personalized learning content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Grade</label>
          <div className="grid grid-cols-4 gap-2">
            {grades.map((grade) => (
              <Button
                key={grade.value}
                variant={selectedGrade === grade.value ? "default" : "outline"}
                onClick={() => setSelectedGrade(grade.value)}
                className="w-full"
              >
                {grade.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Subject</label>
          <div className="grid grid-cols-2 gap-2">
            {subjects.map((subject) => (
              <Button
                key={subject.value}
                variant={selectedSubject === subject.value ? "default" : "outline"}
                onClick={() => setSelectedSubject(subject.value)}
                className="w-full"
                disabled={!selectedGrade}
              >
                {subject.label}
              </Button>
            ))}
          </div>
        </div>

        {selectedGrade && selectedSubject && (
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-green-800 font-medium">
              ✓ Selected: CBSE Class {selectedGrade} - {subjects.find((s) => s.value === selectedSubject)?.label}
            </p>
            <p className="text-green-600 text-sm mt-1">All AI features will now be customized for your curriculum</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
