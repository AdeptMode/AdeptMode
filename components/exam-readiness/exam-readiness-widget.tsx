"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { generateExamReadinessReport } from "@/app/actions/exam-readiness-api"
import { Target, Calendar, AlertTriangle, Trophy, BarChart3, Lightbulb } from "lucide-react"
import Link from "next/link"

interface ReadinessReport {
  readinessStatus: string
  estimatedScore: string
  suggestedTopics: string[]
  quickTip: string
}

export default function ExamReadinessWidget() {
  const [readinessReport, setReadinessReport] = useState<ReadinessReport | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Sample data - in a real app, this would come from user's actual performance
  const sampleExamData = {
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
    chaptersCompleted: ["Algebra", "Trigonometry", "Mechanics", "Thermodynamics", "Organic Chemistry", "Cell Biology"],
    averageScores: [85, 78, 82, 75],
    weakAreas: ["Calculus", "Electromagnetic Induction", "Chemical Bonding"],
    examDate: "2024-03-15",
  }

  const handleQuickAssessment = async () => {
    setIsLoading(true)
    try {
      const report = await generateExamReadinessReport(sampleExamData)
      setReadinessReport(report)
    } catch (error) {
      console.error("Error generating readiness report:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getReadinessColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "high":
        return "from-green-500 to-emerald-600"
      case "moderate":
        return "from-yellow-500 to-orange-600"
      case "needs improvement":
        return "from-red-500 to-pink-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const daysUntilExam = Math.ceil(
    (new Date(sampleExamData.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="space-y-6">
      {/* Quick Assessment Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Target className="h-6 w-6" />
            Exam Readiness Assessment
          </CardTitle>
          <CardDescription>Get AI-powered insights into your exam preparation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Next Exam</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="font-semibold">{new Date(sampleExamData.examDate).toLocaleDateString()}</span>
                <Badge className="bg-blue-100 text-blue-700 border-0">{daysUntilExam} days left</Badge>
              </div>
            </div>
            <Button
              onClick={handleQuickAssessment}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Quick Assessment
                </>
              )}
            </Button>
          </div>

          {!readinessReport && (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">
                Click the button above to get your personalized exam readiness report
              </p>
              <Link href="/exam-readiness">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
                  <Target className="h-4 w-4 mr-2" />
                  Full Assessment
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Readiness Results */}
      {readinessReport && (
        <div className="space-y-4">
          {/* Status Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div
                className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${getReadinessColor(
                  readinessReport.readinessStatus,
                )} text-white shadow-lg`}
              >
                <div className="flex-shrink-0">
                  {readinessReport.readinessStatus?.toLowerCase() === "high" ? (
                    <Trophy className="h-8 w-8" />
                  ) : readinessReport.readinessStatus?.toLowerCase() === "moderate" ? (
                    <Target className="h-8 w-8" />
                  ) : (
                    <AlertTriangle className="h-8 w-8" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{readinessReport.readinessStatus}</h3>
                  <p className="text-white/90">Readiness Level</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-2xl font-bold">{readinessReport.estimatedScore}</div>
                  <p className="text-white/90 text-sm">Predicted Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Priority Topics */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <AlertTriangle className="h-5 w-5" />
                Priority Revision Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {readinessReport.suggestedTopics.slice(0, 3).map((topic, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{topic}</span>
                  </div>
                ))}
              </div>
              <Link href="/exam-readiness" className="block mt-4">
                <Button
                  variant="outline"
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                >
                  View Complete Report
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Tip */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-purple-800 mb-2">Expert Tip</h4>
                  <p className="text-purple-700 text-sm leading-relaxed">{readinessReport.quickTip}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
