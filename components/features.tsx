import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Calendar,
  CheckCircle,
  HelpCircle,
  CreditCard,
  Map,
  Heart,
  PenTool,
  User,
  Target,
  FileText,
} from "lucide-react"
import Link from "next/link"

export default function Features() {
  const features = [
    {
      title: "AI Study Buddy",
      description: "Get personalized explanations and answers to your questions with our intelligent AI tutor.",
      icon: Brain,
      href: "/study-buddy",
      badge: "Popular",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Smart Revision Planner",
      description: "Create personalized study schedules based on your exam dates and subjects.",
      icon: Calendar,
      href: "/revision-planner",
      badge: "Essential",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "AI Answer Evaluator",
      description: "Get detailed feedback on your answers with AI-powered evaluation and suggestions.",
      icon: CheckCircle,
      href: "/answer-evaluator",
      badge: "New",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Question Generator",
      description: "Generate practice questions tailored to your syllabus and difficulty level.",
      icon: HelpCircle,
      href: "/question-generator",
      badge: "Trending",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Flashcards",
      description: "Create and study with AI-generated flashcards for effective memorization.",
      icon: CreditCard,
      href: "/flashcards",
      badge: "Interactive",
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Mind Maps",
      description: "Visualize complex topics with AI-generated interactive mind maps.",
      icon: Map,
      href: "/mind-maps",
      badge: "Visual",
      color: "from-teal-500 to-green-500",
    },
    {
      title: "Anxiety Coach",
      description: "Get personalized tips and techniques to manage exam stress and anxiety.",
      icon: Heart,
      href: "/anxiety-coach",
      badge: "Wellness",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Essay Writer",
      description: "Improve your writing skills with AI-powered essay assistance and feedback.",
      icon: PenTool,
      href: "/essay-writer",
      badge: "Writing",
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "AI Mentor",
      description: "Track weaknesses and get personalized daily study tasks from your AI mentor.",
      icon: User,
      href: "/ai-mentor",
      badge: "Personal",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Exam Readiness",
      description: "Predict your exam performance and get targeted revision recommendations.",
      icon: Target,
      href: "/exam-readiness",
      badge: "Predictor",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Quick Notes",
      description: "Transform lengthy content into concise, revision-friendly bullet point notes.",
      icon: FileText,
      href: "/quick-notes",
      badge: "Fast",
      color: "from-emerald-500 to-teal-500",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful AI Learning Tools</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your learning experience with our comprehensive suite of AI-powered educational tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <Link href={feature.href}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                      Try Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Ready to supercharge your learning journey?</p>
          <Link href="/cbse-learning-platform">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Explore CBSE Platform
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
