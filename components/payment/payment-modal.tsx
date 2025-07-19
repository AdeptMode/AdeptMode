"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Crown, Star, Zap, BookOpen, Brain, Download } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  classNumber: number
  userId: string
  onSuccess: () => void
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export function PaymentModal({ isOpen, onClose, classNumber, userId, onSuccess }: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)

    try {
      // Load Razorpay script
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      document.body.appendChild(script)

      script.onload = () => {
        const options = {
          amount: 50000, // ₹500 in paise
          currency: "INR",
          name: "CBSE Learning Platform",
          description: `Class ${classNumber} Complete Access - Lifetime`,
          image: "/images/logo.png",
          handler: async (response: any) => {
            try {
              // Save payment to database
              const { error } = await createPayment(userId, classNumber, response.razorpay_payment_id)
              if (error) throw error

              toast({
                title: "🎉 Payment Successful!",
                description: `You now have lifetime access to Class ${classNumber} content. Happy learning!`,
              })
              onSuccess()
              onClose()
            } catch (error: any) {
              toast({
                title: "Payment Verification Failed",
                description: "Please contact support with your payment ID for assistance.",
                variant: "destructive",
              })
            }
          },
          prefill: {
            name: "CBSE Student",
            email: "student@example.com",
          },
          theme: {
            color: "#7c3aed",
          },
          modal: {
            ondismiss: () => {
              setIsLoading(false)
            },
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
        setIsLoading(false)
      }

      script.onerror = () => {
        toast({
          title: "Payment Gateway Error",
          description: "Failed to load payment gateway. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Unlock Class {classNumber} Premium
          </DialogTitle>
        </DialogHeader>

        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Premium Access</CardTitle>
            <CardDescription className="text-base">
              Get complete access to all Class {classNumber} subjects and chapters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4">
              <div className="text-4xl font-bold text-purple-600 mb-1">₹500</div>
              <div className="text-sm text-gray-600">One-time payment • Lifetime access</div>
              <div className="text-xs text-green-600 font-medium mt-1">🔥 Limited time offer!</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm">All 6 subjects (Physics, Chemistry, Math, Biology, English, CS)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm">Complete PDF textbooks and detailed notes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm">Interactive quizzes and practice tests</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Download className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm">Downloadable content for offline study</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-yellow-600" />
                </div>
                <span className="text-sm">AI-powered study assistance and doubt solving</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium">Lifetime access - No recurring fees!</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm text-blue-800">
                <strong>💡 Why choose us?</strong>
                <br />
                Complete CBSE curriculum aligned with latest syllabus, created by expert teachers and powered by AI for
                personalized learning.
              </div>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6 shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  <Crown className="w-5 h-5 mr-2" />
                  Pay ₹500 & Unlock Everything
                </>
              )}
            </Button>

            <div className="text-center text-xs text-gray-500">
              Secure payment powered by Razorpay • 100% safe & encrypted
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
