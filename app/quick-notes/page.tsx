"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileText, Copy, Download, RotateCcw, Lightbulb, Clock, Target, Sparkles } from "lucide-react"
import { generateQuickNotes } from "@/app/actions/quick-notes-api"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function QuickNotesPage() {
  const [content, setContent] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  const sampleTopics = [
    "Photosynthesis is the process by which plants convert light energy into chemical energy. It occurs in chloroplasts and involves two main stages: light-dependent reactions and light-independent reactions (Calvin cycle). The overall equation is 6CO2 + 6H2O + light energy → C6H12O6 + 6O2. This process is crucial for life on Earth as it produces oxygen and glucose.",
    "The French Revolution (1789-1799) was a period of radical political and social transformation in France. Key causes included financial crisis, social inequality, and Enlightenment ideas. Major events included the storming of the Bastille, the Declaration of Rights, the Reign of Terror, and the rise of Napoleon. It led to the end of absolute monarchy and the rise of democratic ideals.",
    "Newton's Laws of Motion are three fundamental principles that describe the relationship between forces and motion. First Law (Inertia): An object at rest stays at rest unless acted upon by a force. Second Law: F = ma (Force equals mass times acceleration). Third Law: For every action, there is an equal and opposite reaction. These laws form the foundation of classical mechanics.",
  ]

  const handleGenerate = async () => {
    if (!content.trim()) return

    setIsLoading(true)
    try {
      const result = await generateQuickNotes(content)
      if (result.success && result.data) {
        setNotes(result.data)
        setWordCount(result.data.split(" ").length)
      } else {
        setNotes("Sorry, unable to generate notes at the moment. Please try again later.")
      }
    } catch (error) {
      setNotes("An error occurred while generating notes. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(notes)
  }

  const handleDownload = () => {
    const blob = new Blob([notes], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "quick-notes.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setContent("")
    setNotes("")
    setWordCount(0)
  }

  const handleSampleTopic = (topic: string) => {
    setContent(topic)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navbar />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Quick Notes Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform lengthy study content into concise, revision-friendly bullet point notes with AI
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
                  <p className="text-sm text-gray-600">Advanced AI extracts key points and simplifies complex topics</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Quick Revision</h3>
                  <p className="text-sm text-gray-600">Perfect for last-minute study sessions and exam preparation</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Focused Content</h3>
                  <p className="text-sm text-gray-600">Concise notes under 200 words covering essential points</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Input Content</span>
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    Paste your study material or select a sample topic
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Study Content</label>
                      <Textarea
                        placeholder="Paste your textbook content, chapter notes, or any study material here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[200px] resize-none border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{content.length} characters</span>
                        <Badge variant="outline" className="text-xs">
                          Optimal: 500-2000 characters
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Quick Start - Sample Topics
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {sampleTopics.map((topic, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSampleTopic(topic)}
                            className="text-left h-auto p-3 justify-start hover:bg-purple-50 hover:border-purple-300"
                          >
                            <div className="text-xs text-gray-600 truncate">{topic.substring(0, 80)}...</div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={handleGenerate}
                        disabled={!content.trim() || isLoading}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Generate Notes
                          </>
                        )}
                      </Button>
                      <Button onClick={handleReset} variant="outline" className="hover:bg-gray-50 bg-transparent">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Output Section */}
              <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Quick Notes</span>
                    </div>
                    {wordCount > 0 && (
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {wordCount} words
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    AI-generated concise notes for quick revision
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {notes ? (
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4 min-h-[200px] border">
                        <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                          {notes}
                        </pre>
                      </div>
                      <div className="flex space-x-3">
                        <Button
                          onClick={handleCopy}
                          variant="outline"
                          className="flex-1 hover:bg-green-50 hover:border-green-300 bg-transparent"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Notes
                        </Button>
                        <Button
                          onClick={handleDownload}
                          variant="outline"
                          className="flex-1 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-2">No notes generated yet</p>
                      <p className="text-sm text-gray-400">
                        Enter your content and click "Generate Notes" to get started
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
