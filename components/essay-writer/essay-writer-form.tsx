"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, PenTool, RefreshCw, Download, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateEssayContent, improveWriting, type EssayWriterInput } from "@/app/actions/essay-writer-api"
import ReactMarkdown from "react-markdown"

export default function EssayWriterForm() {
  // State for the "Generate Structure" tab
  const [topic, setTopic] = useState("")
  const [essayType, setEssayType] = useState("Argumentative")
  const [wordCount, setWordCount] = useState(1000)
  const [additionalInstructions, setAdditionalInstructions] = useState("")

  // State for the "Improve Writing" tab
  const [existingContent, setExistingContent] = useState("")
  const [focusArea, setFocusArea] = useState<"grammar" | "style" | "structure" | "all">("all")

  // Shared state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("generate")

  // Handle form submission for generating essay structure
  const handleGenerateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    if (!topic.trim()) {
      setError("Please enter an essay topic")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const input: EssayWriterInput = {
        topic,
        essayType,
        wordCount,
        additionalInstructions: additionalInstructions.trim() || undefined,
      }

      const response = await generateEssayContent(input)

      if (response.success && response.data) {
        setResult(response.data)
      } else {
        setError(response.error || "Failed to generate essay content. Please try again.")
      }
    } catch (err) {
      console.error("Error generating essay content:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle form submission for improving existing content
  const handleImproveSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    if (!existingContent.trim()) {
      setError("Please enter some content to improve")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await improveWriting(existingContent, focusArea)

      if (response.success && response.data) {
        setResult(response.data)
      } else {
        setError(response.error || "Failed to improve writing. Please try again.")
      }
    } catch (err) {
      console.error("Error improving writing:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Reset the form
  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  // Download result as markdown
  const handleDownload = () => {
    if (!result) return

    const element = document.createElement("a")
    const file = new Blob([result], { type: "text/markdown" })
    element.href = URL.createObjectURL(file)
    element.download = `essay_${activeTab === "generate" ? "structure" : "improvement"}.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Example essay topics
  const exampleTopics = [
    "The Impact of Artificial Intelligence on Education",
    "Climate Change: Causes, Effects, and Solutions",
    "The Role of Social Media in Modern Society",
    "Universal Basic Income: Pros and Cons",
  ]

  // Essay types
  const essayTypes = [
    "Argumentative",
    "Expository",
    "Narrative",
    "Descriptive",
    "Compare and Contrast",
    "Cause and Effect",
    "Research",
    "Analytical",
    "Persuasive",
    "Critical",
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="mb-6">
          <Alert className="bg-purple-50 border-purple-200">
            <PenTool className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-purple-700">
              Get help structuring your essays, generating ideas, and improving your writing style and grammar. Our AI
              assistant provides personalized guidance to enhance your academic writing.
            </AlertDescription>
          </Alert>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {!result ? (
          <Tabs defaultValue="generate" onValueChange={(value) => setActiveTab(value)} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="generate" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Generate Essay Structure</span>
              </TabsTrigger>
              <TabsTrigger value="improve" className="flex items-center gap-2">
                <PenTool className="h-4 w-4" />
                <span>Improve Existing Writing</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generate">
              <form onSubmit={handleGenerateSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="topic">Essay Topic</Label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., The Impact of Artificial Intelligence on Education"
                    className="mt-1"
                  />
                </div>

                {/* Example topics */}
                <div>
                  <Label className="text-sm text-gray-500">Example topics:</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {exampleTopics.map((exampleTopic, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setTopic(exampleTopic)}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                      >
                        {exampleTopic}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="essayType">Essay Type</Label>
                    <select
                      id="essayType"
                      value={essayType}
                      onChange={(e) => setEssayType(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    >
                      {essayTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="wordCount">Target Word Count</Label>
                    <Input
                      id="wordCount"
                      type="number"
                      min={250}
                      max={5000}
                      step={250}
                      value={wordCount}
                      onChange={(e) => setWordCount(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalInstructions">Additional Instructions (Optional)</Label>
                  <Textarea
                    id="additionalInstructions"
                    value={additionalInstructions}
                    onChange={(e) => setAdditionalInstructions(e.target.value)}
                    placeholder="e.g., Include specific sources, focus on particular aspects, instructor requirements..."
                    className="mt-1 h-24"
                  />
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-opacity-50 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating Essay Structure...
                    </>
                  ) : (
                    "Generate Essay Structure & Ideas"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="improve">
              <form onSubmit={handleImproveSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="existingContent">Your Current Draft</Label>
                  <Textarea
                    id="existingContent"
                    value={existingContent}
                    onChange={(e) => setExistingContent(e.target.value)}
                    placeholder="Paste your essay or paragraph here for improvement suggestions..."
                    className="mt-1 h-64"
                  />
                </div>

                <div>
                  <Label htmlFor="focusArea">Focus Area for Improvement</Label>
                  <select
                    id="focusArea"
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Aspects (Grammar, Style, Structure)</option>
                    <option value="grammar">Grammar & Punctuation</option>
                    <option value="style">Writing Style & Clarity</option>
                    <option value="structure">Structure & Organization</option>
                  </select>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-opacity-50 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Analyzing Writing...
                    </>
                  ) : (
                    "Get Improvement Suggestions"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-6">
            <div className="p-6 bg-white border border-purple-200 rounded-md shadow-sm overflow-auto max-h-[600px]">
              <div className="prose max-w-none">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            </div>
            <div className="flex justify-between">
              <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 mr-1" />
                Start New Essay
              </Button>
              <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4 mr-1" />
                Download as Markdown
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
