"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Shield, Zap } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedClasses: number[]
  userId: string
  onSuccess: (purchasedClasses: number[]) => void
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export function PaymentModal({ isOpen, onClose, selectedClasses, userId, onSuccess }: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const totalAmount = selectedClasses.length * 200

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
          amount: totalAmount * 100, // Amount in paise
          currency: "INR",
          name: "CBSE Learning Platform",
          description: `Access to Class ${selectedClasses.join(", ")} - AI Learning Features`,
          image: "/images/logo.png",
          handler: async (response: any) => {
            try {
              // Save purchase to database
              const { error } = await createPurchase(userId, selectedClasses, response.razorpay_payment_id)
              if (error) throw error

              onSuccess(selectedClasses)
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
      <DialogContent className="sm:max-w-lg bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Complete Your Purchase
          </DialogTitle>
        </DialogHeader>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-white">CBSE Class Access</CardTitle>
            <CardDescription className="text-gray-400">
              Unlock AI-powered learning for Class {selectedClasses.join(", ")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center bg-gradient-to-r from-purple-900/50 to-violet-900/50 rounded-lg p-4 border border-purple-600/30">
              <div className="text-3xl font-bold text-white mb-1">₹{totalAmount}</div>
              <div className="text-sm text-gray-300">
                {selectedClasses.length} Class{selectedClasses.length > 1 ? "es" : ""} × ₹200 each
              </div>
              <Badge className="bg-green-600 text-white mt-2">Lifetime Access</Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-300">8 AI-powered learning features</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-300">CBSE curriculum aligned content</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-300">24/7 AI study assistance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-300">Personalized learning experience</span>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <p className="text-xs text-gray-400">Your payment is secured by Razorpay with 256-bit SSL encryption</p>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Pay ₹{totalAmount} & Unlock Access
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
