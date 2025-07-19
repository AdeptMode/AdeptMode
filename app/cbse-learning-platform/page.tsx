"use client"

import { useState } from "react"
import { Sidebar } from "@/components/cbse-learning/sidebar"
import { TopBar } from "@/components/cbse-learning/top-bar"
import { MainContent } from "@/components/cbse-learning/main-content"
import { SubjectSelectionModal } from "@/components/cbse-learning/subject-selection-modal"
import { ChapterSelectionModal } from "@/components/cbse-learning/chapter-selection-modal"
import { ChapterContentViewer } from "@/components/cbse-learning/chapter-content-viewer"
import { FeatureModal } from "@/components/cbse-learning/feature-modal"

export default function CBSELearningPlatform() {
  const [activeClass, setActiveClass] = useState<number | null>(null)
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null)
  const [showSubjectModal, setShowSubjectModal] = useState(false)
  const [showChapterModal, setShowChapterModal] = useState(false)
  const [showChapterContent, setShowChapterContent] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<any | null>(null)

  const handleClassSelect = (classNumber: number) => {
    setActiveClass(classNumber)
    setShowSubjectModal(true)
  }

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject)
    setShowSubjectModal(false)
    setShowChapterModal(true)
  }

  const handleChapterSelect = (chapter: any) => {
    setSelectedChapter(chapter)
    setShowChapterModal(false)
    setShowChapterContent(true)
  }

  const handleFeatureClick = (feature: any) => {
    setSelectedFeature(feature)
  }

  const handleBackToSubjects = () => {
    setShowChapterContent(false)
    setShowSubjectModal(true)
    setSelectedChapter(null)
  }

  const handleBackToChapters = () => {
    setShowChapterContent(false)
    setShowChapterModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <TopBar />

      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar activeClass={activeClass} onClassSelect={handleClassSelect} />

        <MainContent
          activeClass={activeClass}
          selectedSubject={selectedSubject}
          selectedChapter={selectedChapter}
          onFeatureClick={handleFeatureClick}
          onBackToSubjects={handleBackToSubjects}
          showChapterContent={showChapterContent}
        />
      </div>

      {/* Modals */}
      <SubjectSelectionModal
        isOpen={showSubjectModal}
        onClose={() => setShowSubjectModal(false)}
        classNumber={activeClass}
        onSubjectSelect={handleSubjectSelect}
      />

      <ChapterSelectionModal
        isOpen={showChapterModal}
        onClose={() => setShowChapterModal(false)}
        classNumber={activeClass}
        subject={selectedSubject}
        onChapterSelect={handleChapterSelect}
        onBack={() => {
          setShowChapterModal(false)
          setShowSubjectModal(true)
        }}
      />

      <ChapterContentViewer
        isOpen={showChapterContent}
        onClose={() => setShowChapterContent(false)}
        classNumber={activeClass}
        subject={selectedSubject}
        chapter={selectedChapter}
        onBack={handleBackToChapters}
      />

      {selectedFeature && (
        <FeatureModal
          feature={selectedFeature}
          classNumber={activeClass}
          isOpen={!!selectedFeature}
          onClose={() => setSelectedFeature(null)}
        />
      )}
    </div>
  )
}
