"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { generateExamReadinessReport } from "../actions/exam-readiness-api"
import {
  Target,
  Calendar,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Trophy,
  Lightbulb,
  BarChart3,
  Star,
  Zap,
  Brain,
} from "lucide-react"

interface ExamData {
  subjects: string[]
  chaptersCompleted: string[]
  averageScores: number[]
  weakAreas: string[]
  examDate: string
}

interface ReadinessReport {
  readinessStatus: string
  estimatedScore: string
  suggestedTopics: string[]
  quickTip: string
}

export default function ExamReadinessPage() {
  const [examData, setExamData] = useState<ExamData>({
    subjects: [],
    chaptersCompleted: [],
    averageScores: [],
    weakAreas: [],
    examDate: "",
  })
  const [readinessReport, setReadinessReport] = useState<ReadinessReport | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [subjectsInput, setSubjectsInput] = useState("")
  const [chaptersInput, setChaptersInput] = useState("")
  const [scoresInput, setScoresInput] = useState("")
  const [weakAreasInput, setWeakAreasInput] = useState("")

  const handleGenerateReport = async () => {
    setIsLoading(true)
    try {
      const data: ExamData = {
        subjects: subjectsInput
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        chaptersCompleted: chaptersInput
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        averageScores: scoresInput
          .split(",")
          .map((s) => Number.parseFloat(s.trim()))
          .filter((n) => !isNaN(n)),
        weakAreas: weakAreasInput
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        examDate: examData.examDate,
      }
      setExamData(data)
      const report = await generateExamReadinessReport(data)
      setReadinessReport(report)
    } catch (error) {
      console.error("Error generating readiness report:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getReadinessColor = (status: string) => {
    switch (status.toLowerCase()) {
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

  const getReadinessIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "high":
        return <Trophy className="h-8 w-8" />
      case "moderate":
        return <Target className="h-8 w-8" />
      case "needs improvement":
        return <AlertTriangle className="h-8 w-8" />
      default:
        return <BarChart3 className="h-8 w-8" />
    }
  }

  const daysUntilExam = examData.examDate
    ? Math.ceil((new Date(examData.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <Target className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Exam Readiness Predictor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get AI-powered insights into your exam preparation. Predict your readiness level, estimated scores, and
            receive personalized revision recommendations.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-4 py-2 text-sm font-semibold border-0">
              <BarChart3 className="h-4 w-4 mr-2" />
              Score Prediction
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 px-4 py-2 text-sm font-semibold border-0">
              <Brain className="h-4 w-4 mr-2" />
              AI Analysis
            </Badge>
            <Badge className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700 px-4 py-2 text-sm font-semibold border-0">
              <Lightbulb className="h-4 w-4 mr-2" />
              Smart Recommendations
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                Enter Your Exam Data
              </CardTitle>
              <CardDescription>
                Provide your study progress and exam details for accurate readiness prediction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subjects" className="text-sm font-semibold">
                  Subjects (comma-separated)
                </Label>
                <Input
                  id="subjects"
                  placeholder="Mathematics, Physics, Chemistry, Biology"
                  value={subjectsInput}
                  onChange={(e) => setSubjectsInput(e.target.value)}
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chapters" className="text-sm font-semibold">
                  Chapters Completed (comma-separated)
                </Label>
                <Textarea
                  id="chapters"
                  placeholder="Algebra, Trigonometry, Mechanics, Thermodynamics, Organic Chemistry"
                  value={chaptersInput}
                  onChange={(e) => setChaptersInput(e.target.value)}
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scores" className="text-sm font-semibold">
                  Average Quiz/Test Scores (comma-separated percentages)
                </Label>
                <Input
                  id="scores"
                  placeholder="85, 78, 82, 75"
                  value={scoresInput}
                  onChange={(e) => setScoresInput(e.target.value)}
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weakAreas" className="text-sm font-semibold">
                  Weak Areas Identified (comma-separated)
                </Label>
                <Textarea
                  id="weakAreas"
                  placeholder="Calculus, Electromagnetic Induction, Chemical Bonding"
                  value={weakAreasInput}
                  onChange={(e) => setWeakAreasInput(e.target.value)}
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="examDate" className="text-sm font-semibold">
                  Exam Date
                </Label>
                <Input
                  id="examDate"
                  type="date"
                  value={examData.examDate}
                  onChange={(e) => setExamData({ ...examData, examDate: e.target.value })}
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <Button
                onClick={handleGenerateReport}
                disabled={isLoading || !examData.examDate}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing Your Readiness...
                  </>
                ) : (
                  <>
                    <Target className="h-5 w-5 mr-2" />
                    Generate Readiness Report
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Display */}
          <div className="space-y-6">
            {/* Exam Countdown */}
            {examData.examDate && (
              <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Exam Countdown</h3>
                      <p className="text-indigo-100">Time remaining until your exam</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{daysUntilExam}</div>
                      <p className="text-indigo-100">days left</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Exam Date: {new Date(examData.examDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Readiness Report */}
            {readinessReport && (
              <div className="space-y-6">
                {/* Readiness Status */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                      Readiness Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r ${getReadinessColor(
                        readinessReport.readinessStatus,
                      )} text-white shadow-lg`}
                    >
                      <div className="flex-shrink-0">{getReadinessIcon(readinessReport.readinessStatus)}</div>
                      <div>
                        <h3 className="text-2xl font-bold">{readinessReport.readinessStatus}</h3>
                        <p className="text-white/90">Current readiness level</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Score Prediction */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-6 w-6 text-green-600" />
                      Estimated Score Prediction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                      <div className="flex-shrink-0">
                        <Trophy className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold">{readinessReport.estimatedScore}</h3>
                        <p className="text-green-100">Predicted exam performance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Suggested Topics */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-6 w-6 text-orange-600" />
                      Priority Revision Topics
                    </CardTitle>
                    <CardDescription>Focus on these topics for maximum score improvement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      {readinessReport.suggestedTopics.map((topic, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-800">{topic}</span>
                          <Badge className="ml-auto bg-orange-100 text-orange-700 border-0">High Priority</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Tip */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-700">
                      <Lightbulb className="h-6 w-6" />
                      Expert Tip
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex-shrink-0">
                        <Star className="h-6 w-6 text-yellow-500" />
                      </div>
                      <p className="text-gray-800 leading-relaxed font-medium">{readinessReport.quickTip}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Sample Data Helper */}
            {!readinessReport && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-yellow-600" />
                    Quick Start
                  </CardTitle>
                  <CardDescription>Need help getting started? Try our sample data</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubjectsInput("Mathematics, Physics, Chemistry, Biology")
                      setChaptersInput(
                        "Algebra, Trigonometry, Calculus, Mechanics, Thermodynamics, Waves, Organic Chemistry, Inorganic Chemistry, Cell Biology, Genetics",
                      )
                      setScoresInput("85, 78, 82, 75")
                      setWeakAreasInput("Calculus, Electromagnetic Induction, Chemical Bonding, Genetics")
                      setExamData({ ...examData, examDate: "2024-03-15" })
                    }}
                    className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Load Sample Data
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
