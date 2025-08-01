"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Loader2, FileQuestion, Lightbulb, Target, Copy, RefreshCw } from "lucide-react"
import { generateChapterContent, generateExamQuestions } from "@/app/actions/cbse-curriculum-api"
import { toast } from "@/hooks/use-toast"

interface ChapterContentViewerProps {
  isOpen: boolean
  onClose: () => void
  classNumber: number | null
  subject: string | null
  chapter: any | null
  onBack: () => void
}

export function ChapterContentViewer({
  isOpen,
  onClose,
  classNumber,
  subject,
  chapter,
  onBack,
}: ChapterContentViewerProps) {
  const [content, setContent] = useState<string>("")
  const [examQuestions, setExamQuestions] = useState<string>("")
  const [isLoadingContent, setIsLoadingContent] = useState(false)
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)
  const [activeTab, setActiveTab] = useState("content")

  useEffect(() => {
    if (isOpen && classNumber && subject && chapter) {
      loadContent()
    }
  }, [isOpen, classNumber, subject, chapter])

  const loadContent = async () => {
    if (!classNumber || !subject || !chapter) return

    setIsLoadingContent(true)

    try {
      const result = await generateChapterContent(classNumber, subject, chapter.title)
      if (result.success && result.data) {
        setContent(result.data)
      }
    } catch (err) {
      console.error("Failed to load content:", err)
    } finally {
      setIsLoadingContent(false)
    }
  }

  const loadExamQuestions = async () => {
    if (!classNumber || !subject || !chapter) return

    setIsLoadingQuestions(true)

    try {
      const result = await generateExamQuestions(classNumber, subject, chapter.title)
      if (result.success && result.data) {
        setExamQuestions(result.data)
      }
    } catch (err) {
      console.error("Failed to load exam questions:", err)
    } finally {
      setIsLoadingQuestions(false)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "questions" && !examQuestions && !isLoadingQuestions) {
      loadExamQuestions()
    }
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  if (!classNumber || !subject || !chapter) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl bg-gray-900 border-gray-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Button onClick={onBack} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                Chapter {chapter.number}: {chapter.title}
              </div>
              <div className="text-sm text-gray-400 font-normal">
                {subject} • Class {classNumber}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Chapter Content
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <FileQuestion className="w-4 h-4" />
              Exam Questions
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Key Points
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-6">
            <Card className="bg-gray-800/30 border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-green-400" />
                    Detailed Explanation
                  </CardTitle>
                  {content && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleCopy(content)}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        onClick={loadContent}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingContent ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-green-400 mx-auto mb-4" />
                      <p className="text-gray-400">Generating AI-powered explanation...</p>
                    </div>
                  </div>
                ) : content ? (
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">{content}</div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Failed to load content. Please try refreshing.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="mt-6">
            <Card className="bg-gray-800/30 border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileQuestion className="w-5 h-5 text-blue-400" />
                    Predicted Exam Questions
                  </CardTitle>
                  {examQuestions && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleCopy(examQuestions)}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        onClick={loadExamQuestions}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Generate New
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingQuestions ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
                      <p className="text-gray-400">Analyzing previous year patterns and generating questions...</p>
                    </div>
                  </div>
                ) : examQuestions ? (
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">{examQuestions}</div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Button
                      onClick={loadExamQuestions}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      <FileQuestion className="w-4 h-4 mr-2" />
                      Generate Exam Questions
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="mt-6">
            <Card className="bg-gray-800/30 border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  Chapter Summary & Key Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-600/30">
                    <h4 className="font-semibold text-purple-300 mb-2">Chapter Overview</h4>
                    <p className="text-gray-300 text-sm">{chapter.description}</p>
                  </div>

                  <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-600/30">
                    <h4 className="font-semibold text-blue-300 mb-2">Difficulty Level</h4>
                    <p className="text-gray-300 text-sm">{chapter.difficulty}</p>
                  </div>

                  <div className="bg-green-900/20 rounded-lg p-4 border border-green-600/30">
                    <h4 className="font-semibold text-green-300 mb-2">Number of Topics</h4>
                    <p className="text-gray-300 text-sm">{chapter.topics} main topics covered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
