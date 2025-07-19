"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import type { Flashcard as FlashcardType } from "@/app/actions/flashcard-generator-api"

interface FlashcardProps {
  card: FlashcardType
  onMarkDifficulty: (id: string, difficulty: "Easy" | "Medium" | "Hard") => void
}

export default function Flashcard({ card, onMarkDifficulty }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="perspective-1000 w-full h-64 sm:h-80">
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d cursor-pointer"
        onClick={handleFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Front of card */}
        <Card
          className={`absolute w-full h-full backface-hidden p-6 flex flex-col justify-between ${
            isFlipped ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex justify-between items-start">
            <Badge variant="outline" className={getDifficultyColor(card.difficulty)}>
              {card.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800">
              Tap to flip
            </Badge>
          </div>
          <div className="flex-grow flex items-center justify-center text-center p-4">
            <h3 className="text-xl font-medium">{card.front}</h3>
          </div>
          <div className="flex justify-center space-x-2">
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onMarkDifficulty(card.id, "Easy")
              }}
            >
              Easy
            </Badge>
            <Badge
              variant="outline"
              className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onMarkDifficulty(card.id, "Medium")
              }}
            >
              Medium
            </Badge>
            <Badge
              variant="outline"
              className="bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onMarkDifficulty(card.id, "Hard")
              }}
            >
              Hard
            </Badge>
          </div>
        </Card>

        {/* Back of card */}
        <Card
          className={`absolute w-full h-full backface-hidden p-6 flex flex-col justify-between rotate-y-180 ${
            isFlipped ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-between items-start">
            <Badge variant="outline" className={getDifficultyColor(card.difficulty)}>
              {card.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800">
              Tap to flip
            </Badge>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            <p className="text-gray-700">{card.back}</p>
          </div>
          <div className="flex justify-center space-x-2">
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onMarkDifficulty(card.id, "Easy")
              }}
            >
              Easy
            </Badge>
            <Badge
              variant="outline"
              className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onMarkDifficulty(card.id, "Medium")
              }}
            >
              Medium
            </Badge>
            <Badge
              variant="outline"
              className="bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onMarkDifficulty(card.id, "Hard")
              }}
            >
              Hard
            </Badge>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
