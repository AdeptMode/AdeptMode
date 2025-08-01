"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Calendar,
  CheckCircle,
  FileQuestion,
  CreditCard,
  Map,
  Heart,
  PenTool,
  ArrowRight,
  Star,
  Gift,
  BookOpen,
  ArrowLeft,
  Sparkles,
} from "lucide-react"

interface MainContentProps {
  activeClass: number | null
  selectedSubject: string | null
  selectedChapter: any | null
  onFeatureClick: (feature: any) => void
  onBackToSubjects: () => void
  showChapterContent: boolean
}

const FEATURES = [
  {
    id: "study-buddy",
    title: "AI Study Buddy",
    description: "Get personalized explanations and answers to your questions",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "revision-planner",
    title: "Smart Revision Planner",
    description: "Create personalized study schedules and revision plans",
    icon: Calendar,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "answer-evaluator",
    title: "AI Answer Evaluator",
    description: "Get your answers evaluated and receive detailed feedback",
    icon: CheckCircle,
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "question-generator",
    title: "Question Generator",
    description: "Generate practice questions based on your syllabus",
    icon: FileQuestion,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "flashcards",
    title: "Flashcards",
    description: "Create interactive flashcards for quick revision",
    icon: CreditCard,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "mind-maps",
    title: "Mind Maps",
    description: "Visualize concepts with AI-generated mind maps",
    icon: Map,
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "anxiety-coach",
    title: "Anxiety Coach",
    description: "Get support and strategies to manage exam anxiety",
    icon: Heart,
    color: "from-red-500 to-pink-500",
  },
  {
    id: "essay-writer",
    title: "Essay Writer",
    description: "Get help with essay writing and composition",
    icon: PenTool,
    color: "from-yellow-500 to-orange-500",
  },
]

export function MainContent({
  activeClass,
  selectedSubject,
  selectedChapter,
  onFeatureClick,
  onBackToSubjects,
  showChapterContent,
}: MainContentProps) {
  if (showChapterContent && selectedChapter) {
    return (
      <div className="flex-1 p-8 overflow-y-auto bg-gray-900">
        <Button onClick={onBackToSubjects} variant="ghost" className="text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Subjects
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            {selectedSubject} - Chapter {selectedChapter.number}
          </h1>
          <h2 className="text-2xl font-semibold text-white mb-2">{selectedChapter.title}</h2>
          <p className="text-gray-400 text-lg mb-4">{selectedChapter.description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Class {activeClass}</span>
            <span>•</span>
            <span>{selectedChapter.difficulty} Level</span>
            <span>•</span>
            <span>{selectedChapter.topics} Topics</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {FEATURES.map((feature) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={feature.id}
                className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 cursor-pointer hover:border-gray-600 hover:shadow-lg hover:scale-105"
                onClick={() => onFeatureClick(feature)}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-lg text-white hover:text-purple-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                  >
                    Use for This Chapter
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  if (!activeClass) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-900">
        <div className="text-center max-w-2xl">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Gift className="w-16 h-16 text-white" />
          </div>

          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to Free CBSE AI Learning
          </h2>
          <p className="text-gray-400 mb-8 text-xl leading-relaxed">
            Choose a class from the sidebar to explore subjects and chapters with AI-powered explanations and exam
            predictions - completely free!
          </p>

          <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Complete Curriculum</h3>
              <p className="text-gray-400 text-sm">All CBSE classes and subjects</p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">AI-Generated Content</h3>
              <p className="text-gray-400 text-sm">Powered by Google Gemini</p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <FileQuestion className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Exam Predictions</h3>
              <p className="text-gray-400 text-sm">Based on previous patterns</p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <Gift className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">100% Free</h3>
              <p className="text-gray-400 text-sm">No registration required</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gray-900">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <BookOpen className="w-12 h-12 text-white" />
        </div>

        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Class {activeClass} Selected
        </h2>
        <p className="text-gray-400 mb-8 text-lg leading-relaxed">
          Click on Class {activeClass} again in the sidebar to choose a subject and start exploring chapters with
          AI-powered content!
        </p>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="text-sm text-gray-400 mb-2">Learning Path:</div>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-blue-400 font-medium">Select Subject</span>
            <ArrowRight className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500">Choose Chapter</span>
            <ArrowRight className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500">AI Learning</span>
          </div>
        </div>
      </div>
    </div>
  )
}
