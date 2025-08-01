"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  ArrowLeft,
  Printer,
  CheckSquare,
  Square,
  Calendar,
  Trophy,
  Clock,
  BookOpen,
  Star,
  TrendingUp,
  Filter,
  Eye,
  EyeOff,
} from "lucide-react"

interface RevisionPlanDisplayProps {
  plan: string
  onReset: () => void
}

interface StudySession {
  date: string
  day: string
  timeSlot: string
  subject: string
  topic: string
  duration: string
  priority: "High" | "Medium" | "Low"
  difficulty: "Easy" | "Medium" | "Hard"
  type: "New Topic" | "Revision" | "Practice" | "Mock Test"
  completed: boolean
}

export default function RevisionPlanDisplay({ plan, onReset }: RevisionPlanDisplayProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [filterPriority, setFilterPriority] = useState<string>("All")
  const [filterSubject, setFilterSubject] = useState<string>("All")
  const [showCompleted, setShowCompleted] = useState<boolean>(true)

  // Parse the plan text into structured data
  const studySessions = useMemo(() => {
    const sessions: StudySession[] = []
    const lines = plan.split("\n")

    // This is a simplified parser - in real implementation, you'd parse the AI response
    // For demo purposes, creating sample structured data
    const sampleSessions: StudySession[] = [
      {
        date: "2024-01-15",
        day: "Monday",
        timeSlot: "9:00 AM - 11:00 AM",
        subject: "Mathematics",
        topic: "Calculus - Derivatives",
        duration: "2 hours",
        priority: "High",
        difficulty: "Hard",
        type: "New Topic",
        completed: false,
      },
      {
        date: "2024-01-15",
        day: "Monday",
        timeSlot: "2:00 PM - 3:30 PM",
        subject: "Physics",
        topic: "Mechanics - Motion",
        duration: "1.5 hours",
        priority: "High",
        difficulty: "Medium",
        type: "Revision",
        completed: false,
      },
      {
        date: "2024-01-16",
        day: "Tuesday",
        timeSlot: "10:00 AM - 12:00 PM",
        subject: "Chemistry",
        topic: "Organic Chemistry",
        duration: "2 hours",
        priority: "Medium",
        difficulty: "Hard",
        type: "New Topic",
        completed: false,
      },
      {
        date: "2024-01-16",
        day: "Tuesday",
        timeSlot: "3:00 PM - 4:00 PM",
        subject: "Mathematics",
        topic: "Algebra Practice",
        duration: "1 hour",
        priority: "Low",
        difficulty: "Easy",
        type: "Practice",
        completed: false,
      },
      {
        date: "2024-01-17",
        day: "Wednesday",
        timeSlot: "9:00 AM - 12:00 PM",
        subject: "Mock Test",
        topic: "Full Syllabus Test",
        duration: "3 hours",
        priority: "High",
        difficulty: "Hard",
        type: "Mock Test",
        completed: false,
      },
    ]

    return sampleSessions.map((session) => ({
      ...session,
      completed: checkedItems[`${session.date}-${session.timeSlot}`] || false,
    }))
  }, [plan, checkedItems])

  // Toggle completion status
  const toggleCompletion = (sessionKey: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [sessionKey]: !prev[sessionKey],
    }))
  }

  // Filter sessions
  const filteredSessions = studySessions.filter((session) => {
    if (filterPriority !== "All" && session.priority !== filterPriority) return false
    if (filterSubject !== "All" && session.subject !== filterSubject) return false
    if (!showCompleted && session.completed) return false
    return true
  })

  // Get unique subjects for filter
  const subjects = Array.from(new Set(studySessions.map((s) => s.subject)))

  // Calculate statistics
  const totalSessions = studySessions.length
  const completedSessions = studySessions.filter((s) => s.completed).length
  const progressPercentage = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0
  const totalStudyHours = studySessions.reduce((acc, session) => {
    const hours = Number.parseFloat(session.duration.split(" ")[0])
    return acc + hours
  }, 0)

  // Priority colors
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Difficulty colors
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Hard":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Easy":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Type colors
  const getTypeColor = (type: string) => {
    switch (type) {
      case "New Topic":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "Revision":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Practice":
        return "bg-teal-100 text-teal-800 border-teal-200"
      case "Mock Test":
        return "bg-rose-100 text-rose-800 border-rose-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Handle download
  const handleDownload = () => {
    const csvContent = [
      ["Date", "Day", "Time Slot", "Subject", "Topic", "Duration", "Priority", "Difficulty", "Type", "Status"],
      ...studySessions.map((session) => [
        session.date,
        session.day,
        session.timeSlot,
        session.subject,
        session.topic,
        session.duration,
        session.priority,
        session.difficulty,
        session.type,
        session.completed ? "Completed" : "Pending",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const element = document.createElement("a")
    const file = new Blob([csvContent], { type: "text/csv" })
    element.href = URL.createObjectURL(file)
    element.download = "smart_study_plan.csv"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Handle print
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Smart Study Schedule</h1>
              <p className="text-purple-100">AI-generated personalized revision timetable</p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={onReset}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Create New Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Progress</p>
                  <p className="text-3xl font-bold">{progressPercentage}%</p>
                  <p className="text-green-100 text-xs">
                    {completedSessions}/{totalSessions} sessions
                  </p>
                </div>
                <Trophy className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Hours</p>
                  <p className="text-3xl font-bold">{totalStudyHours}</p>
                  <p className="text-blue-100 text-xs">Study time planned</p>
                </div>
                <Clock className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Subjects</p>
                  <p className="text-3xl font-bold">{subjects.length}</p>
                  <p className="text-purple-100 text-xs">Different subjects</p>
                </div>
                <BookOpen className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">High Priority</p>
                  <p className="text-3xl font-bold">{studySessions.filter((s) => s.priority === "High").length}</p>
                  <p className="text-orange-100 text-xs">Critical sessions</p>
                </div>
                <Star className="h-10 w-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                <Filter className="h-5 w-5 text-purple-600" />
                Filters & Actions
              </CardTitle>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  size="sm"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  size="sm"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Priority:</label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Subject:</label>
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="All">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={() => setShowCompleted(!showCompleted)}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                {showCompleted ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                {showCompleted ? "Hide" : "Show"} Completed
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Study Schedule Table */}
        <Card className="shadow-xl border-0 bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardTitle className="text-2xl flex items-center gap-3">
              <Calendar className="h-6 w-6" />
              Study Schedule ({filteredSessions.length} sessions)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Subject & Topic
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSessions.map((session, index) => {
                    const sessionKey = `${session.date}-${session.timeSlot}`
                    return (
                      <tr
                        key={sessionKey}
                        className={`hover:bg-gray-50 transition-colors ${session.completed ? "bg-green-50" : ""}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleCompletion(sessionKey)}
                            className="text-purple-600 hover:text-purple-800 transition-colors"
                          >
                            {session.completed ? <CheckSquare className="h-6 w-6" /> : <Square className="h-6 w-6" />}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900">{session.day}</div>
                            <div className="text-gray-600">{session.date}</div>
                            <div className="text-purple-600 font-medium">{session.timeSlot}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900 text-base">{session.subject}</div>
                            <div className="text-gray-600 mt-1">{session.topic}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            {session.duration}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${getPriorityColor(session.priority)} border`}>{session.priority}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${getDifficultyColor(session.difficulty)} border`}>
                            {session.difficulty}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${getTypeColor(session.type)} border`}>{session.type}</Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Progress Alert */}
        {progressPercentage > 0 && (
          <Alert className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <AlertDescription className="text-purple-800">
              <div className="flex items-center justify-between">
                <span>
                  <strong>Great Progress!</strong> You've completed {completedSessions} out of {totalSessions} study
                  sessions.
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-purple-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{progressPercentage}%</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Success Message */}
        {progressPercentage === 100 && (
          <Card className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Trophy className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-4">🎉 Congratulations! 🎉</h3>
              <p className="text-green-100 text-lg">
                You've completed your entire study plan! You're fully prepared for your exams. Best of luck - you've got
                this! 🚀
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
