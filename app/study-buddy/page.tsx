"use client"

import { useState } from "react"
import StudyModeSelector from "@/components/study-buddy/study-mode-selector"
import CBSEStudyMode from "@/components/study-buddy/cbse-study-mode"
import GlobalStudyBuddy from "@/components/study-buddy/global-study-buddy"

export default function StudyBuddyPage() {
  const [selectedMode, setSelectedMode] = useState<"cbse" | "global" | null>(null)

  const handleModeSelect = (mode: "cbse" | "global") => {
    setSelectedMode(mode)
  }

  const handleBack = () => {
    setSelectedMode(null)
  }

  if (selectedMode === "cbse") {
    return <CBSEStudyMode onBack={handleBack} />
  }

  if (selectedMode === "global") {
    return <GlobalStudyBuddy onBack={handleBack} />
  }

  return <StudyModeSelector onModeSelect={handleModeSelect} />
}
