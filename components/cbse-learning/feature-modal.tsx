"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Loader2, AlertTriangle, Copy, RotateCcw, Sparkles, Gift } from "lucide-react"
import { generateGeminiResponse } from "@/app/actions/gemini-api"
import { toast } from "@/hooks/use-toast"

interface FeatureModalProps {
  feature: any
  classNumber: number | null
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
    if (!input.trim() || !classNumber) return

    setIsLoading(true)
    setError(null)
    setResponse("")

    try {
      const prompt = `${feature.prompt.replace("{class}", classNumber.toString())}

User Query: ${input}

Please provide a helpful, educational response appropriate for CBSE Class ${classNumber} students. Make sure the content is accurate, engaging, and follows CBSE curriculum guidelines.`

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response)
      toast({
        title: "Copied!",
        description: "Response copied to clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  if (!classNumber) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-gray-900 border-gray-700 text-white max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold">{feature.title}</div>
              <div className="text-sm text-gray-400 font-normal flex items-center gap-2">
                Class {classNumber} • AI-Powered •
                <span className="inline-flex items-center gap-1 text-green-400">
                  <Gift className="w-3 h-3" />
                  Free
                </span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="bg-gray-800/30 border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">About this feature</span>
              </div>
              <p className="text-gray-300 mb-3">{feature.description}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/30 rounded-full border border-green-600/30">
                <Gift className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400 font-medium">Completely Free • No Limits</span>
              </div>
            </CardContent>
          </Card>

          {!response && !error && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask me anything about ${feature.title.toLowerCase()} for Class ${classNumber}...

Examples:
• Explain photosynthesis in simple terms
• Create a revision plan for mathematics
• Generate practice questions on gravity
• Help me write an essay on environmental protection`}
                  className="bg-gray-800 border-gray-600 text-white min-h-[120px] focus:border-purple-500"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 font-semibold py-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Free AI Response...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Get Free AI Response
                  </>
                )}
              </Button>
            </form>
          )}

          {error && (
            <Card className="bg-red-900/20 border-red-600/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-red-400 mb-3">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Error</span>
                </div>
                <p className="text-red-300 mb-4">{error}</p>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-900/30"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {response && (
            <Card className="bg-gray-800/30 border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Free AI Response</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">{response}</div>
                </div>
                <div className="flex gap-2 mt-6 pt-4 border-t border-gray-700">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Ask Another Question
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
