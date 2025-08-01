"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertTriangle,
  Sparkles,
  Download,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Maximize,
  Minimize,
  Info,
  Brain,
  BookOpen,
  Target,
} from "lucide-react"
import { generateMindMap, type MindMapNode } from "@/app/actions/mind-map-generator-api"
import MindMapVisualization from "./mind-map-visualization"

export default function MindMapGenerator() {
  const [topic, setTopic] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mindMapData, setMindMapData] = useState<MindMapNode | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!topic.trim()) {
      setError("Please enter a topic to generate your mind map")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await generateMindMap(topic, notes)

      if (response.success && response.data) {
        setMindMapData(response.data)
      } else {
        setError(response.error || "Failed to generate mind map. Please try again.")
      }
    } catch (err) {
      console.error("Error generating mind map:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle zoom controls
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2))
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))
  const handleReset = () => {
    setMindMapData(null)
    setError(null)
    setIsFullscreen(false)
    setZoomLevel(1)
  }
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  // Download mind map
  const handleDownload = () => {
    if (!mindMapData) return
    const element = document.createElement("a")
    const file = new Blob([JSON.stringify(mindMapData, null, 2)], { type: "application/json" })
    element.href = URL.createObjectURL(file)
    element.download = `mind_map_${topic.replace(/\s+/g, "_").toLowerCase()}.json`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Suggested topics with categories
  const topicCategories = [
    {
      category: "Science & Technology",
      topics: ["Quantum Physics", "Machine Learning", "Biotechnology", "Climate Science", "Nanotechnology"],
    },
    {
      category: "Literature & Arts",
      topics: ["Shakespeare's Works", "Modern Poetry", "Renaissance Art", "Film Theory", "Creative Writing"],
    },
    {
      category: "Social Sciences",
      topics: ["Psychology", "Sociology", "Economics", "Political Science", "Anthropology"],
    },
    {
      category: "Philosophy & Ethics",
      topics: ["Ethics", "Logic", "Metaphysics", "Philosophy of Mind", "Moral Philosophy"],
    },
  ]

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}>
      <Card
        className={`w-full mx-auto shadow-2xl border-0 ${isFullscreen ? "h-full rounded-none" : "max-w-7xl rounded-2xl"}`}
      >
        <CardContent className={`${isFullscreen ? "h-full flex flex-col p-6" : "p-8"}`}>
          {/* AI Features Banner */}
          <div className="mb-8">
            <Alert className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 border-2">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <AlertDescription className="text-purple-800 font-medium">
                    🧠 <strong>AI-Powered Mind Mapping:</strong> Generate comprehensive, interconnected concept networks
                    with detailed explanations, visual hierarchies, and complete topic coverage. Perfect for deep
                    learning and exam preparation.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </div>

          {error && (
            <Alert className="mb-6 border-red-300 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 font-medium">{error}</AlertDescription>
            </Alert>
          )}

          {!mindMapData ? (
            <div className="space-y-8">
              {/* Progress Steps */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <span className="ml-2 font-medium text-purple-600">Enter Topic</span>
                  </div>
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <span className="ml-2 font-medium text-gray-500">AI Generation</span>
                  </div>
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <span className="ml-2 font-medium text-gray-500">Interactive Map</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Topic Input Section */}
                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Brain className="h-6 w-6 text-purple-600 mr-3" />
                      <h3 className="text-xl font-bold text-purple-800">Topic Selection</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="topic" className="text-lg font-semibold text-gray-700">
                          What topic would you like to explore?
                        </Label>
                        <Input
                          id="topic"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          placeholder="e.g., Quantum Physics, Shakespeare's Hamlet, Machine Learning, Climate Change..."
                          className="mt-2 h-12 text-lg border-2 border-purple-200 focus:border-purple-500"
                        />
                      </div>

                      {/* Topic Categories */}
                      <div className="space-y-4">
                        <Label className="text-sm font-medium text-gray-600">💡 Explore these popular topics:</Label>
                        {topicCategories.map((category, categoryIndex) => (
                          <div key={categoryIndex} className="space-y-2">
                            <h4 className="font-semibold text-gray-700 text-sm">{category.category}</h4>
                            <div className="flex flex-wrap gap-2">
                              {category.topics.map((suggestedTopic, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => setTopic(suggestedTopic)}
                                  className="px-4 py-2 bg-white text-purple-700 rounded-full text-sm font-medium border-2 border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all duration-200 shadow-sm"
                                >
                                  {suggestedTopic}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes Section */}
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-bold text-blue-800">Additional Context (Optional)</h3>
                    </div>

                    <div>
                      <Label htmlFor="notes" className="text-lg font-semibold text-gray-700">
                        Add your notes or specify focus areas
                      </Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Paste your study notes, specify particular aspects you want to focus on, or mention your learning level (beginner, intermediate, advanced)..."
                        className="mt-2 h-32 border-2 border-blue-200 focus:border-blue-500"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        💡 <strong>Tip:</strong> Adding context helps AI create more targeted and relevant mind maps
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Generate Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    className="w-full max-w-md h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xl transform hover:scale-105 transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="h-6 w-6 border-3 border-white border-opacity-50 border-t-transparent rounded-full animate-spin mr-3"></div>
                        <span>Creating Your Mind Map...</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Target className="h-6 w-6 mr-3" />
                        <span>Generate Comprehensive Mind Map</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className={`space-y-6 ${isFullscreen ? "flex-grow flex flex-col" : ""}`}>
              {/* Mind Map Header */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">🧠 {topic}</h2>
                    <p className="text-purple-100">
                      Interactive mind map with comprehensive topic coverage • Click nodes for detailed explanations
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleZoomOut}
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleZoomIn}
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleFullscreen}
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mind Map Container */}
              <div
                className={`bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden ${isFullscreen ? "flex-grow" : "h-[700px]"}`}
              >
                <MindMapVisualization data={mindMapData} zoomLevel={zoomLevel} />
              </div>

              {/* Usage Tips */}
              <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>🎯 How to use:</strong> Click any node to view detailed explanations • Use +/- buttons to
                  expand/collapse branches • Drag to navigate • Zoom for better focus • Each color represents a
                  different concept level
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
