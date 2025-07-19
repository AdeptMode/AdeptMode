"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, ArrowRight, ArrowLeft, FileText, Clock, Target, Sparkles, X } from "lucide-react"
import { generateCBSEChapters } from "@/app/actions/cbse-curriculum-api"

interface ChapterSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  classNumber: number | null
  subject: string | null
  onChapterSelect: (chapter: any) => void
  onBack: () => void
}

const DIFFICULTY_COLORS = {
  Easy: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function ChapterSelectionModal({
  isOpen,
  onClose,
  classNumber,
  subject,
  onChapterSelect,
  onBack,
}: ChapterSelectionModalProps) {
  const [chapters, setChapters] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && classNumber && subject) {
      loadChapters()
    }
  }, [isOpen, classNumber, subject])

  const loadChapters = async () => {
    if (!classNumber || !subject) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await generateCBSEChapters(classNumber, subject)
      if (result.success && result.data) {
        setChapters(result.data)
      } else {
        setError("Failed to load chapters. Please try again.")
      }
    } catch (err) {
      setError("Failed to load chapters. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!classNumber || !subject) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl bg-slate-900/95 backdrop-blur-xl border-white/20 text-white max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="relative pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <Button onClick={onBack} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
            </Button>

            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {subject}
              </DialogTitle>
              <p className="text-gray-400 text-lg font-medium mt-1">
                Class {classNumber} • Choose a chapter to start learning
              </p>
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
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-ping opacity-20"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Loading Chapters</h3>
                <p className="text-gray-400">AI is generating the complete chapter list for {subject}...</p>
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
                onClick={loadChapters}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                Try Again
              </Button>
            </div>
          )}

          {!isLoading && !error && chapters.length > 0 && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full border border-blue-500/20 mb-4">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-medium">AI-Generated Chapters</span>
                </div>
                <p className="text-gray-400 text-lg">
                  Select any chapter to access detailed explanations, examples, and predicted exam questions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {chapters.map((chapter, index) => (
                  <Card
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 cursor-pointer hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105"
                    onClick={() => onChapterSelect(chapter)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-500 group-hover:scale-110">
                            {chapter.number}
                          </div>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowRight className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300 mb-2">
                            {chapter.title}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className={`${DIFFICULTY_COLORS[chapter.difficulty as keyof typeof DIFFICULTY_COLORS] || DIFFICULTY_COLORS.Medium} text-xs font-medium`}
                          >
                            {chapter.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <CardDescription className="text-gray-400 leading-relaxed">{chapter.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-400">{chapter.topics} Topics</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-400" />
                            <span className="text-gray-400">~30 min read</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full justify-between text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 group-hover:bg-blue-900/30 transition-all duration-300"
                      >
                        Start Learning
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
