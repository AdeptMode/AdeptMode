"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Globe, BookOpen, Users, Target, Zap } from "lucide-react"

interface StudyModeSelectorProps {
  onModeSelect: (mode: "cbse" | "global") => void
}

export default function StudyModeSelector({ onModeSelect }: StudyModeSelectorProps) {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Choose Your Study Mode
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the learning mode that best fits your educational needs and curriculum requirements
        </p>
      </div>

      {/* Mode Selection Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* CBSE Mode */}
        <Card className="relative overflow-hidden border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
          <CardHeader className="relative z-10 text-center pb-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-900">CBSE Study Mode</CardTitle>
            <CardDescription className="text-blue-700 font-medium">
              Curriculum-aligned learning for Indian students
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-800">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>NCERT textbook alignment</span>
              </div>
              <div className="flex items-center gap-3 text-blue-800">
                <Target className="w-5 h-5 text-blue-600" />
                <span>Board exam preparation focus</span>
              </div>
              <div className="flex items-center gap-3 text-blue-800">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Grade-specific content (6-12)</span>
              </div>
              <div className="flex items-center gap-3 text-blue-800">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>Subject-wise study plans</span>
              </div>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium">
                Perfect for students following the Central Board of Secondary Education curriculum
              </p>
            </div>

            <Button
              onClick={() => onModeSelect("cbse")}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg"
            >
              Choose CBSE Mode
            </Button>
          </CardContent>
        </Card>

        {/* Global Mode */}
        <Card className="relative overflow-hidden border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-xl group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50"></div>
          <CardHeader className="relative z-10 text-center pb-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-purple-900">Global Study Mode</CardTitle>
            <CardDescription className="text-purple-700 font-medium">
              Universal learning assistant for all curricula
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-purple-800">
                <Globe className="w-5 h-5 text-purple-600" />
                <span>Any curriculum worldwide</span>
              </div>
              <div className="flex items-center gap-3 text-purple-800">
                <Target className="w-5 h-5 text-purple-600" />
                <span>International exam prep</span>
              </div>
              <div className="flex items-center gap-3 text-purple-800">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span>Flexible topic exploration</span>
              </div>
              <div className="flex items-center gap-3 text-purple-800">
                <Zap className="w-5 h-5 text-purple-600" />
                <span>Multi-language support</span>
              </div>
            </div>

            <div className="bg-purple-100 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-800 font-medium">
                Ideal for international students and diverse educational systems
              </p>
            </div>

            <Button
              onClick={() => onModeSelect("global")}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 text-lg"
            >
              Choose Global Mode
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Feature Comparison */}
      <div className="bg-gray-50 rounded-xl p-6 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-center mb-6 text-gray-800">Feature Comparison</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-800">CBSE Mode Features:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• NCERT chapter-wise content</li>
              <li>• Board exam question patterns</li>
              <li>• Grade-specific difficulty levels</li>
              <li>• Indian education context</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-purple-800">Global Mode Features:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Universal topic coverage</li>
              <li>• International standards</li>
              <li>• Flexible learning paths</li>
              <li>• Cross-cultural examples</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
