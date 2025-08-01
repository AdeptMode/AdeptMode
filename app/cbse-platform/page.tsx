"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Brain,
  Calendar,
  CheckCircle,
  FileQuestion,
  CreditCard,
  Map,
  Heart,
  PenTool,
  Lock,
  User,
  LogOut,
} from "lucide-react"

const CLASSES = [6, 7, 8, 9, 10, 11, 12]

const FEATURES = [
  { id: "study-buddy", title: "AI Study Buddy", icon: Brain, color: "from-blue-500 to-cyan-500" },
  { id: "revision-planner", title: "Smart Revision Planner", icon: Calendar, color: "from-green-500 to-emerald-500" },
  { id: "answer-evaluator", title: "AI Answer Evaluator", icon: CheckCircle, color: "from-purple-500 to-violet-500" },
  { id: "question-generator", title: "Question Generator", icon: FileQuestion, color: "from-orange-500 to-red-500" },
  { id: "flashcards", title: "Flashcards", icon: CreditCard, color: "from-pink-500 to-rose-500" },
  { id: "mind-maps", title: "Mind Maps", icon: Map, color: "from-indigo-500 to-blue-500" },
  { id: "anxiety-coach", title: "Anxiety Coach", icon: Heart, color: "from-red-500 to-pink-500" },
  { id: "essay-writer", title: "Essay Writer", icon: PenTool, color: "from-yellow-500 to-orange-500" },
]

export default function CBSEPlatform() {
  const [selectedClasses, setSelectedClasses] = useState<number[]>([])
  const [activeClass, setActiveClass] = useState<number | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [purchasedClasses, setPurchasedClasses] = useState<number[]>([])

  const handleClassSelect = (classNumber: number) => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }

    if (purchasedClasses.includes(classNumber)) {
      setActiveClass(classNumber)
    } else {
      if (selectedClasses.includes(classNumber)) {
        setSelectedClasses(selectedClasses.filter((c) => c !== classNumber))
      } else {
        setSelectedClasses([...selectedClasses, classNumber])
      }
    }
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowAuthModal(false)
  }

  const handlePurchase = () => {
    // Simulate purchase
    setPurchasedClasses([...purchasedClasses, ...selectedClasses])
    setSelectedClasses([])
    alert("Purchase successful! You now have access to the selected classes.")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Bar */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              CBSE Learning Platform
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Student</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => setShowAuthModal(true)}>Login</Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700/50 h-screen flex flex-col">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Select Your Class</h2>
            <div className="space-y-3">
              {CLASSES.map((classNumber) => {
                const isPurchased = purchasedClasses.includes(classNumber)
                const isSelected = selectedClasses.includes(classNumber)
                const isActive = activeClass === classNumber

                return (
                  <button
                    key={classNumber}
                    onClick={() => handleClassSelect(classNumber)}
                    className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-violet-600 border-purple-500"
                        : isPurchased
                          ? "bg-green-900/30 border-green-600/50 hover:bg-green-900/50"
                          : isSelected
                            ? "bg-purple-900/30 border-purple-600/50 hover:bg-purple-900/50"
                            : "bg-gray-800/30 border-gray-600/30 hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : isPurchased
                                ? "bg-green-600 text-white"
                                : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {classNumber}
                        </div>
                        <span className="font-medium">Class {classNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isPurchased && !isLoggedIn && <Lock className="w-4 h-4 text-gray-400" />}
                        {isSelected && <Badge className="bg-purple-600 text-white">₹200</Badge>}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Purchase Section */}
          {isLoggedIn && selectedClasses.length > 0 && (
            <div className="p-6 border-t border-gray-700/50 mt-auto">
              <div className="bg-gradient-to-r from-purple-900/50 to-violet-900/50 rounded-xl p-4 border border-purple-600/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-300">Selected Classes</span>
                  <Badge className="bg-purple-600 text-white">{selectedClasses.length}</Badge>
                </div>
                <div className="text-2xl font-bold text-white mb-4">₹{selectedClasses.length * 200}</div>
                <Button onClick={handlePurchase} className="w-full bg-gradient-to-r from-purple-600 to-violet-600">
                  Purchase Now
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {!isLoggedIn ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Welcome to CBSE AI Learning
                </h2>
                <p className="text-gray-400 mb-6">Please login to access AI-powered learning features.</p>
                <Button onClick={() => setShowAuthModal(true)}>Login to Continue</Button>
              </div>
            </div>
          ) : !activeClass ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Please select your class to start
                </h2>
                <p className="text-gray-400">Choose a class from the sidebar to access AI-powered learning features.</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Class {activeClass} - AI Learning Features
                </h1>
                <p className="text-gray-400">Explore AI-powered tools designed for CBSE Class {activeClass}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {FEATURES.map((feature) => {
                  const IconComponent = feature.icon
                  return (
                    <Card
                      key={feature.id}
                      className="bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 transition-all cursor-pointer"
                    >
                      <CardHeader className="pb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                        <CardDescription className="text-gray-400">
                          AI-powered {feature.title.toLowerCase()} for Class {activeClass}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="ghost" className="w-full text-purple-400 hover:text-purple-300">
                          Launch Feature
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Login to Continue</h3>
            <p className="text-gray-400 mb-6">Please login to access the CBSE learning platform.</p>
            <div className="flex gap-3">
              <Button onClick={handleLogin} className="flex-1">
                Demo Login
              </Button>
              <Button variant="outline" onClick={() => setShowAuthModal(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
