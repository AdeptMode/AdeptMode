"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Loader2, AlertTriangle } from "lucide-react"
import { generateGeminiResponse } from "@/app/actions/gemini-api"

interface FeatureModalProps {
  feature: any
  classNumber: number
  isOpen: boolean
  onClose: () => void
}

export function FeatureModal({ feature, classNumber, isOpen, onClose }: FeatureModalProps) {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    setError(null)
    setResponse("")

    try {
      const prompt = `${feature.prompt.replace("{class}", classNumber.toString())}

User Query: ${input}

Please provide a helpful, educational response appropriate for CBSE Class ${classNumber} students.`

      const result = await generateGeminiResponse(prompt)

      if (result.success && result.data) {
        setResponse(result.data)
      } else {
        setError("Sorry, content is currently unavailable. Please try again later.")
      }
    } catch (err) {
      setError("Sorry, content is currently unavailable. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setInput("")
    setResponse("")
    setError(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-gray-900 border-gray-700 text-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
              <feature.icon className="w-5 h-5 text-white" />
            </div>
            {feature.title} - Class {classNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="bg-gray-800/30 border-gray-700/50">
            <CardContent className="p-4">
              <p className="text-gray-300">{feature.description}</p>
            </CardContent>
          </Card>

          {!response && !error && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask me anything about ${feature.title.toLowerCase()} for Class ${classNumber}...`}
                  className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Response...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Get AI Response
                  </>
                )}
              </Button>
            </form>
          )}

          {error && (
            <Card className="bg-red-900/20 border-red-600/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Error</span>
                </div>
                <p className="text-red-300 mt-2">{error}</p>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="mt-4 border-red-600 text-red-400 hover:bg-red-900/30"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {response && (
            <Card className="bg-gray-800/30 border-gray-700/50">
              <CardContent className="p-6">
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-200">{response}</div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Ask Another Question
                  </Button>
                  <Button
                    onClick={() => navigator.clipboard.writeText(response)}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Copy Response
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
