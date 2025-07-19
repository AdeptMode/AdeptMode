"use client"

import { useState } from "react"
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
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { FeatureModal } from "./feature-modal"

interface MainContentProps {
  activeClass: number | null
  user: any
}

const FEATURES = [
  {
    id: "study-buddy",
    title: "AI Study Buddy",
    description: "Get personalized explanations and answers to your questions",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    prompt:
      "You are an AI Study Buddy for CBSE Class {class}. Help students understand concepts, solve problems, and provide clear explanations.",
  },
  {
    id: "revision-planner",
    title: "Smart Revision Planner",
    description: "Create personalized study schedules and revision plans",
    icon: Calendar,
    color: "from-green-500 to-emerald-500",
    prompt:
      "Create a comprehensive revision plan for CBSE Class {class} students. Include study schedules, important topics, and exam strategies.",
  },
  {
    id: "answer-evaluator",
    title: "AI Answer Evaluator",
    description: "Get your answers evaluated and receive detailed feedback",
    icon: CheckCircle,
    color: "from-purple-500 to-violet-500",
    prompt:
      "You are an AI Answer Evaluator for CBSE Class {class}. Evaluate student answers, provide constructive feedback, and suggest improvements.",
  },
  {
    id: "question-generator",
    title: "Question Generator",
    description: "Generate practice questions based on your syllabus",
    icon: FileQuestion,
    color: "from-orange-500 to-red-500",
    prompt:
      "Generate practice questions for CBSE Class {class} students. Include multiple choice, short answer, and long answer questions with solutions.",
  },
  {
    id: "flashcards",
    title: "Flashcards",
    description: "Create interactive flashcards for quick revision",
    icon: CreditCard,
    color: "from-pink-500 to-rose-500",
    prompt:
      "Create educational flashcards for CBSE Class {class} students. Include key concepts, definitions, and important facts for quick revision.",
  },
  {
    id: "mind-maps",
    title: "Mind Maps",
    description: "Visualize concepts with AI-generated mind maps",
    icon: Map,
    color: "from-indigo-500 to-blue-500",
    prompt:
      "Create mind maps and visual concept maps for CBSE Class {class} topics. Help students understand relationships between concepts.",
  },
  {
    id: "anxiety-coach",
    title: "Anxiety Coach",
    description: "Get support and strategies to manage exam anxiety",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    prompt:
      "You are an Anxiety Coach for CBSE Class {class} students. Provide stress management techniques, motivation, and emotional support for exam preparation.",
  },
  {
    id: "essay-writer",
    title: "Essay Writer",
    description: "Get help with essay writing and composition",
    icon: PenTool,
    color: "from-yellow-500 to-orange-500",
    prompt:
      "Help CBSE Class {class} students with essay writing. Provide structure, ideas, and guidance for different types of essays and compositions.",
  },
]

export function MainContent({ activeClass, user }: MainContentProps) {
  const [selectedFeature, setSelectedFeature] = useState<any>(null)

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Welcome to CBSE AI Learning
          </h2>
          <p className="text-gray-400 mb-6">
            Please login to access AI-powered learning features for your CBSE classes.
          </p>
        </div>
      </div>
    )
  }

  if (!activeClass) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Please select your class to start
          </h2>
          <p className="text-gray-400 mb-6">Choose a class from the sidebar to access AI-powered learning features.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
          Class {activeClass} - AI Learning Features
        </h1>
        <p className="text-gray-400">
          Explore AI-powered tools designed specifically for CBSE Class {activeClass} curriculum
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {FEATURES.map((feature) => {
          const IconComponent = feature.icon
          return (
            <Card
              key={feature.id}
              className="bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer group"
              onClick={() => setSelectedFeature(feature)}
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-white group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-400">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                >
                  Launch Feature
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedFeature && (
        <FeatureModal
          feature={selectedFeature}
          classNumber={activeClass}
          isOpen={!!selectedFeature}
          onClose={() => setSelectedFeature(null)}
        />
      )}
    </div>
  )
}
