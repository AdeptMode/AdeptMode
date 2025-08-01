"use client"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Users, Star, Sparkles } from "lucide-react"

interface SidebarProps {
  activeClass: number | null
  onClassSelect: (classNumber: number) => void
}

const CLASSES = [6, 7, 8, 9, 10, 11, 12]

export function Sidebar({ activeClass, onClassSelect }: SidebarProps) {
  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">CBSE Learning</h1>
            <p className="text-sm text-gray-400">AI-Powered Platform</p>
          </div>
        </div>

        <Card className="bg-green-900/30 border-green-600/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">100% Free</span>
            </div>
            <p className="text-xs text-gray-300">Complete CBSE curriculum with AI-powered explanations</p>
          </CardContent>
        </Card>
      </div>

      {/* Classes */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-gray-200">Select Your Class</h2>
        </div>

        <div className="space-y-3">
          {CLASSES.map((classNumber) => {
            const isActive = activeClass === classNumber

            return (
              <button
                key={classNumber}
                onClick={() => onClassSelect(classNumber)}
                className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-violet-600 border-purple-500 shadow-lg"
                    : "bg-gray-700/50 border-gray-600/50 hover:bg-gray-700 hover:border-gray-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {classNumber}
                    </div>
                    <div>
                      <span className="font-medium text-white">Class {classNumber}</span>
                      <div className="text-xs text-gray-400">8 AI Features • Free Access</div>
                    </div>
                  </div>

                  <div className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded">FREE</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-700">
        <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-600/30">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Learning Community</span>
          </div>
          <div className="text-xs text-gray-400">Join thousands of students learning with AI</div>
        </div>
      </div>
    </div>
  )
}
