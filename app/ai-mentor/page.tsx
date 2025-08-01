"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { generatePersonalizedMentorPlan } from "../actions/ai-mentor-api"
import {
  Brain,
  Target,
  Clock,
  BookOpen,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Star,
  Trophy,
  Calendar,
  BarChart3,
} from "lucide-react"

interface MentorPlan {
  weakAreas: string[]
  suggestedImprovements: string[]
  dailyTasks: string[]
  motivationalMessage: string
}

export default function AIMentorPage() {
  const [mentorPlan, setMentorPlan] = useState<MentorPlan | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([])

  // Sample performance data - in a real app, this would come from user's actual data
  const performanceData = {
    subjectsAttempted: ["Mathematics", "Physics", "Chemistry", "Biology", "English"],
    chaptersCompleted: ["Algebra", "Trigonometry", "Mechanics", "Thermodynamics", "Organic Chemistry", "Cell Biology"],
    averageQuizScore: 78,
    weakTopics: ["Calculus", "Electromagnetic Induction", "Chemical Bonding", "Genetics"],
    totalStudyHours: 45,
    streakDays: 7,
    completedTasks: 23,
    totalTasks: 30,
  }

  const handleGeneratePlan = async () => {
    setIsLoading(true)
    try {
      const plan = await generatePersonalizedMentorPlan(performanceData)
      setMentorPlan(plan)
      setCompletedTasks(new Array(plan.dailyTasks.length).fill(false))
    } catch (error) {
      console.error("Error generating plan:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTaskCompletion = (index: number) => {
    const newCompletedTasks = [...completedTasks]
    newCompletedTasks[index] = !newCompletedTasks[index]
    setCompletedTasks(newCompletedTasks)
  }

  const completionRate = Math.round((performanceData.completedTasks / performanceData.totalTasks) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 shadow-lg">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Your AI Learning Mentor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get personalized guidance, track your weaknesses, and receive daily study tasks tailored to your learning
            needs.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 px-4 py-2 text-sm font-semibold border-0">
              <Target className="h-4 w-4 mr-2" />
              Weakness Tracking
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-4 py-2 text-sm font-semibold border-0">
              <Lightbulb className="h-4 w-4 mr-2" />
              Smart Suggestions
            </Badge>
            <Badge className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700 px-4 py-2 text-sm font-semibold border-0">
              <Calendar className="h-4 w-4 mr-2" />
              Daily Tasks
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="mentor"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              AI Mentor
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Performance Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Trophy className="h-8 w-8" />
                    <Badge className="bg-white/20 text-white border-0">Progress</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{completionRate}%</div>
                  <p className="text-green-100">Task Completion</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <BarChart3 className="h-8 w-8" />
                    <Badge className="bg-white/20 text-white border-0">Average</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{performanceData.averageQuizScore}%</div>
                  <p className="text-blue-100">Quiz Score</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <TrendingUp className="h-8 w-8" />
                    <Badge className="bg-white/20 text-white border-0">Streak</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{performanceData.streakDays}</div>
                  <p className="text-orange-100">Days</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Clock className="h-8 w-8" />
                    <Badge className="bg-white/20 text-white border-0">Monthly</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{performanceData.totalStudyHours}h</div>
                  <p className="text-purple-100">Study Time</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Subjects Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {performanceData.subjectsAttempted.map((subject, index) => (
                    <div key={subject} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{subject}</span>
                        <span className="text-gray-500">{Math.floor(Math.random() * 30) + 70}%</span>
                      </div>
                      <Progress value={Math.floor(Math.random() * 30) + 70} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Completed 7-day study streak</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Improved Physics score by 15%</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Mastered 6 new chapters</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Completed 45 hours of study</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Status */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Current Learning Status</CardTitle>
                <CardDescription>Overview of your recent learning activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700">Subjects Attempted</h4>
                    <div className="flex flex-wrap gap-2">
                      {performanceData.subjectsAttempted.map((subject) => (
                        <Badge key={subject} className="bg-green-100 text-green-700 border-0">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-700">Chapters Completed</h4>
                    <div className="flex flex-wrap gap-2">
                      {performanceData.chaptersCompleted.map((chapter) => (
                        <Badge key={chapter} className="bg-blue-100 text-blue-700 border-0">
                          {chapter}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700">Areas Needing Attention</h4>
                    <div className="flex flex-wrap gap-2">
                      {performanceData.weakTopics.map((topic) => (
                        <Badge key={topic} className="bg-red-100 text-red-700 border-0">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentor" className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Get Your Personalized Study Plan</CardTitle>
                <CardDescription>
                  Our AI mentor analyzes your performance and creates a customized daily study plan
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  onClick={handleGeneratePlan}
                  disabled={isLoading}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing Your Performance...
                    </>
                  ) : (
                    <>
                      <Brain className="h-5 w-5 mr-2" />
                      Generate Today's Plan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {mentorPlan && (
              <div className="space-y-6">
                {/* Weak Areas */}
                <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="h-5 w-5" />
                      Areas Needing Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mentorPlan.weakAreas.map((area, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm font-medium">{area}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Suggested Improvements */}
                <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Lightbulb className="h-5 w-5" />
                      Improvement Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mentorPlan.suggestedImprovements.map((improvement, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                            {index + 1}
                          </div>
                          <span className="text-sm leading-relaxed">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Tasks */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      Today's Study Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mentorPlan.dailyTasks.map((task, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                          <button
                            onClick={() => toggleTaskCompletion(index)}
                            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              completedTasks[index]
                                ? "bg-green-500 border-green-500 text-white"
                                : "border-gray-300 hover:border-green-400"
                            }`}
                          >
                            {completedTasks[index] && <CheckCircle className="h-4 w-4" />}
                          </button>
                          <div className="flex-1">
                            <span
                              className={`text-sm leading-relaxed ${
                                completedTasks[index] ? "line-through text-gray-500" : ""
                              }`}
                            >
                              {task}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Motivational Message */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-700">
                      <Star className="h-5 w-5" />
                      Your Daily Motivation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                      <p className="text-lg font-medium text-gray-800 leading-relaxed">
                        {mentorPlan.motivationalMessage}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Study Insights</CardTitle>
                  <CardDescription>Key observations about your learning patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Strength Areas</h4>
                    <p className="text-sm text-blue-700">
                      You excel in theoretical concepts and show consistent improvement in Mathematics and English.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Growth Opportunities</h4>
                    <p className="text-sm text-orange-700">
                      Focus on practical applications in Physics and Chemistry to improve problem-solving speed.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Study Habits</h4>
                    <p className="text-sm text-green-700">
                      Your consistent 7-day streak shows excellent discipline. Maintain this momentum!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>Personalized suggestions for improvement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-sm">Increase Practice Sessions</h4>
                      <p className="text-sm text-gray-600">Add 15 minutes of daily problem-solving for weak topics</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-sm">Use Visual Learning</h4>
                      <p className="text-sm text-gray-600">Try mind maps and diagrams for complex concepts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-sm">Regular Assessment</h4>
                      <p className="text-sm text-gray-600">Take weekly quizzes to track improvement</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-sm">Time Management</h4>
                      <p className="text-sm text-gray-600">Practice timed tests to improve speed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
