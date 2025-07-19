"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, ShoppingCart, Check, Lock } from "lucide-react"

interface SidebarProps {
  selectedClasses: number[]
  purchasedClasses: number[]
  activeClass: number | null
  onClassSelect: (classNumber: number) => void
  onPurchase: () => void
  user: any
}

const CLASSES = [6, 7, 8, 9, 10, 11, 12]

export function Sidebar({
  selectedClasses,
  purchasedClasses,
  activeClass,
  onClassSelect,
  onPurchase,
  user,
}: SidebarProps) {
  const totalAmount = selectedClasses.length * 200

  return (
    <div className="w-80 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700/50 h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              CBSE Learning
            </h1>
            <p className="text-sm text-gray-400">AI-Powered Platform</p>
          </div>
        </div>
      </div>

      {/* Classes */}
      <div className="flex-1 p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Select Your Class</h2>
        <div className="space-y-3">
          {CLASSES.map((classNumber) => {
            const isPurchased = purchasedClasses.includes(classNumber)
            const isSelected = selectedClasses.includes(classNumber)
            const isActive = activeClass === classNumber

            return (
              <button
                key={classNumber}
                onClick={() => onClassSelect(classNumber)}
                className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-violet-600 border-purple-500 shadow-lg"
                    : isPurchased
                      ? "bg-green-900/30 border-green-600/50 hover:bg-green-900/50"
                      : isSelected
                        ? "bg-purple-900/30 border-purple-600/50 hover:bg-purple-900/50"
                        : "bg-gray-800/30 border-gray-600/30 hover:bg-gray-800/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : isPurchased
                            ? "bg-green-600 text-white"
                            : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {classNumber}
                    </div>
                    <span className="font-medium">Class {classNumber}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isPurchased && <Check className="w-4 h-4 text-green-400" />}
                    {!isPurchased && !user && <Lock className="w-4 h-4 text-gray-400" />}
                    {isSelected && (
                      <Badge variant="secondary" className="bg-purple-600 text-white">
                        ₹200
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Purchase Section */}
      {user && selectedClasses.length > 0 && (
        <div className="p-6 border-t border-gray-700/50">
          <div className="bg-gradient-to-r from-purple-900/50 to-violet-900/50 rounded-xl p-4 border border-purple-600/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-300">Selected Classes</span>
              <Badge className="bg-purple-600 text-white">{selectedClasses.length}</Badge>
            </div>
            <div className="text-2xl font-bold text-white mb-4">₹{totalAmount}</div>
            <Button
              onClick={onPurchase}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Purchase Now
            </Button>
          </div>
        </div>
      )}

      {!user && (
        <div className="p-6 border-t border-gray-700/50">
          <div className="text-center text-gray-400 text-sm">Please login to purchase classes</div>
        </div>
      )}
    </div>
  )
}
