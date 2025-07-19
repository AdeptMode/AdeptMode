"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Loader2, ArrowRight, Beaker, Calculator, Globe, Palette, Music, Dumbbell, X } from "lucide-react"
import { generateCBSESubjects } from "@/app/actions/cbse-curriculum-api"

interface SubjectSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  classNumber: number | null
  onSubjectSelect: (subject: string) => void
}

const SUBJECT_ICONS: { [key: string]: any } = {
  Mathematics: Calculator,
  Science: Beaker,
  English: BookOpen,
  Hindi: BookOpen,
  "Social Science": Globe,
  "Computer Science": BookOpen,
  Physics: Beaker,
  Chemistry: Beaker,
  Biology: Beaker,
  History: BookOpen,
  Geography: Globe,
  "Political Science": BookOpen,
  Economics: BookOpen,
  Art: Palette,
  Music: Music,
  "Physical Education": Dumbbell,
}

const SUBJECT_COLORS: { [key: string]: string } = {
  Mathematics: "from-blue-500 to-cyan-500",
  Science: "from-green-500 to-emerald-500",
  English: "from-purple-500 to-violet-500",
  Hindi: "from-orange-500 to-red-500",
  "Social Science": "from-yellow-500 to-orange-500",
  "Computer Science": "from-indigo-500 to-blue-500",
  Physics: "from-cyan-500 to-blue-500",
  Chemistry: "from-green-500 to-teal-500",
  Biology: "from-emerald-500 to-green-500",
  History: "from-amber-500 to-yellow-500",
  Geography: "from-teal-500 to-cyan-500",
  "Political Science": "from-red-500 to-pink-500",
  Economics: "from-violet-500 to-purple-500",
  Art: "from-pink-500 to-rose-500",
  Music: "from-purple-500 to-indigo-500",
  "Physical Education": "from-orange-500 to-amber-500",
}

export function SubjectSelectionModal({ isOpen, onClose, classNumber, onSubjectSelect }: SubjectSelectionModalProps) {
  const [subjects, setSubjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && classNumber) {
      loadSubjects()
    }
  }, [isOpen, classNumber])

  const loadSubjects = async () => {
    if (!classNumber) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await generateCBSESubjects(classNumber)
      if (result.success && result.data) {
        setSubjects(result.data)
      } else {
        setError("Failed to load subjects. Please try again.")
      }
    } catch (err) {
      setError("Failed to load subjects. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!classNumber) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl bg-gray-900 border-gray-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-bold text-white">Class {classNumber} Subjects</DialogTitle>
                <p className="text-gray-400 text-lg mt-1">
                  Choose a subject to explore AI-generated chapters and content
                </p>
              </div>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="py-6">
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-8 h-8 animate-spin text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Generating CBSE Subjects</h3>
                <p className="text-gray-400">AI is creating the complete curriculum for Class {classNumber}...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
              <p className="text-red-400 mb-6">{error}</p>
              <Button
                onClick={loadSubjects}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Try Again
              </Button>
            </div>
          )}

          {!isLoading && !error && subjects.length > 0 && (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-400 text-lg">
                  Select any subject to dive deep into chapters with detailed explanations and exam predictions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject, index) => {
                  const IconComponent = SUBJECT_ICONS[subject.name] || BookOpen
                  const colorClass = SUBJECT_COLORS[subject.name] || "from-gray-500 to-gray-600"

                  return (
                    <Card
                      key={index}
                      className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 cursor-pointer hover:border-gray-600 hover:shadow-lg hover:scale-105"
                      onClick={() => onSubjectSelect(subject.name)}
                    >
                      <CardHeader className="pb-4">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colorClass} flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 hover:scale-110`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>

                        <CardTitle className="text-xl text-white hover:text-purple-300 transition-colors">
                          {subject.name}
                        </CardTitle>
                        <CardDescription className="text-gray-400 leading-relaxed">
                          {subject.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="flex items-center justify-between text-sm mb-4">
                          <span className="text-gray-400">{subject.chapters} Chapters</span>
                          <span className="text-purple-400 font-medium">Class {classNumber}</span>
                        </div>

                        <Button
                          variant="ghost"
                          className="w-full justify-between text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                        >
                          Explore Chapters
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
