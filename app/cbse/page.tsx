"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuthModal } from "@/components/auth/auth-modal"
import { PaymentModal } from "@/components/payment/payment-modal"
import {
  BookOpen,
  FileText,
  Brain,
  Lock,
  Download,
  User,
  LogOut,
  Crown,
  Star,
  Zap,
  GraduationCap,
  Play,
  CheckCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

const SUBJECTS = {
  11: [
    { name: "Physics", icon: "⚛️", color: "from-blue-500 to-cyan-500" },
    { name: "Chemistry", icon: "🧪", color: "from-green-500 to-emerald-500" },
    { name: "Mathematics", icon: "📐", color: "from-purple-500 to-violet-500" },
    { name: "Biology", icon: "🧬", color: "from-red-500 to-pink-500" },
    { name: "English", icon: "📚", color: "from-orange-500 to-yellow-500" },
    { name: "Computer Science", icon: "💻", color: "from-indigo-500 to-blue-500" },
  ],
  12: [
    { name: "Physics", icon: "⚛️", color: "from-blue-500 to-cyan-500" },
    { name: "Chemistry", icon: "🧪", color: "from-green-500 to-emerald-500" },
    { name: "Mathematics", icon: "📐", color: "from-purple-500 to-violet-500" },
    { name: "Biology", icon: "🧬", color: "from-red-500 to-pink-500" },
    { name: "English", icon: "📚", color: "from-orange-500 to-yellow-500" },
    { name: "Computer Science", icon: "💻", color: "from-indigo-500 to-blue-500" },
  ],
}

const SAMPLE_CHAPTERS = {
  Physics: [
    {
      id: "1",
      chapter_number: 1,
      title: "Physical World",
      description: "Introduction to Physics and its scope in understanding nature",
      is_free: true,
      duration: "45 min",
    },
    {
      id: "2",
      chapter_number: 2,
      title: "Units and Measurements",
      description: "Fundamental and derived units, dimensional analysis, significant figures",
      is_free: false,
      duration: "60 min",
    },
    {
      id: "3",
      chapter_number: 3,
      title: "Motion in a Straight Line",
      description: "Kinematics in one dimension, velocity, acceleration, equations of motion",
      is_free: false,
      duration: "75 min",
    },
    {
      id: "4",
      chapter_number: 4,
      title: "Motion in a Plane",
      description: "Projectile motion, circular motion, relative velocity",
      is_free: false,
      duration: "80 min",
    },
  ],
  Chemistry: [
    {
      id: "5",
      chapter_number: 1,
      title: "Some Basic Concepts of Chemistry",
      description: "Matter, atoms, molecules, mole concept, stoichiometry",
      is_free: true,
      duration: "50 min",
    },
    {
      id: "6",
      chapter_number: 2,
      title: "Structure of Atom",
      description: "Atomic models, quantum numbers, electronic configuration",
      is_free: false,
      duration: "70 min",
    },
    {
      id: "7",
      chapter_number: 3,
      title: "Classification of Elements",
      description: "Periodic table, periodic properties, chemical bonding",
      is_free: false,
      duration: "65 min",
    },
  ],
  Mathematics: [
    {
      id: "8",
      chapter_number: 1,
      title: "Sets",
      description: "Introduction to set theory, operations on sets, Venn diagrams",
      is_free: true,
      duration: "40 min",
    },
    {
      id: "9",
      chapter_number: 2,
      title: "Relations and Functions",
      description: "Types of relations, functions, domain and range",
      is_free: false,
      duration: "55 min",
    },
    {
      id: "10",
      chapter_number: 3,
      title: "Trigonometric Functions",
      description: "Trigonometry, identities, equations, inverse functions",
      is_free: false,
      duration: "70 min",
    },
  ],
}

export default function CBSEPage() {
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [user, setUser] = useState<any>(null)
  const [userPayments, setUserPayments] = useState<any[]>([])
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [chapters, setChapters] = useState<any[]>([])

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (selectedClass && selectedSubject) {
      loadChapters()
    }
  }, [selectedClass, selectedSubject])

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        const { data: payments } = await getUserPayments(currentUser.id)
        setUserPayments(payments || [])
      }
    } catch (error) {
      console.error("Error checking user:", error)
    }
  }

  const loadChapters = async () => {
    const subjectChapters = SAMPLE_CHAPTERS[selectedSubject as keyof typeof SAMPLE_CHAPTERS] || []
    setChapters(subjectChapters)
  }

  const hasAccessToClass = (classNumber: number) => {
    return userPayments.some((payment) => payment.class_number === classNumber)
  }

  const handleFileAccess = async (chapter: any, fileType: string) => {
    if (!user) {
      setShowAuthModal(true)
      return
    }

    if (!chapter.is_free && !hasAccessToClass(Number.parseInt(selectedClass))) {
      setShowPaymentModal(true)
      return
    }

    try {
      const filePath = `class-${selectedClass}/${selectedSubject.toLowerCase()}/chapter-${chapter.chapter_number}/${fileType.toLowerCase()}.pdf`

      if (error) {
        toast({
          title: "File Access",
          description: `Opening ${fileType} for ${chapter.title} (Demo mode)`,
        })
      } else {
      }
    } catch (error) {
      toast({
        title: "File Access",
        description: `Opening ${fileType} for ${chapter.title} (Demo mode)`,
      })
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      setUser(null)
      setUserPayments([])
      toast({
        title: "Logged out successfully",
        description: "Come back soon for more learning!",
      })
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CBSE Learning Hub
              </h1>
              <p className="text-sm text-gray-600">AI-Powered Education Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border border-purple-200">
                  <User className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">{user.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout} className="border-purple-200">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
              >
                <User className="w-4 h-4 mr-2" />
                Login / Register
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full text-sm font-medium text-purple-700 mb-6">
              <Star className="w-4 h-4" />
              India's #1 CBSE Learning Platform
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Start Learning CBSE Class 11–12 with AI Help
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Master your CBSE curriculum with AI-powered study materials, interactive quizzes, and personalized
              learning paths designed by expert teachers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 shadow-lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Learning Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-purple-200">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Class Selection */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Choose Your Class</h2>
            <div className="mb-8">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full h-14 text-lg border-purple-200 focus:border-purple-500">
                  <SelectValue placeholder="Select your class (11 or 12)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="11" className="text-lg py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        11
                      </div>
                      <div>
                        <div className="font-medium">Class 11</div>
                        <div className="text-sm text-gray-600">Foundation year for board exams</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="12" className="text-lg py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        12
                      </div>
                      <div>
                        <div className="font-medium">Class 12</div>
                        <div className="text-sm text-gray-600">Board exam preparation</div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedClass && (
              <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl border border-purple-200">
                <div className="text-2xl font-bold text-purple-700 mb-2">₹500 Only</div>
                <div className="text-gray-600 mb-4">Complete access to all subjects • Lifetime validity</div>
                {user && !hasAccessToClass(Number.parseInt(selectedClass)) && (
                  <Button
                    onClick={() => setShowPaymentModal(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Unlock Class {selectedClass} - ₹500
                  </Button>
                )}
                {user && hasAccessToClass(Number.parseInt(selectedClass)) && (
                  <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                    <CheckCircle className="w-5 h-5" />
                    You have premium access to Class {selectedClass}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subject Selection */}
      {selectedClass && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Select Subject</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {SUBJECTS[selectedClass as keyof typeof SUBJECTS].map((subject) => (
                <Card
                  key={subject.name}
                  className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                    selectedSubject === subject.name ? "ring-2 ring-purple-500 bg-purple-50" : ""
                  }`}
                  onClick={() => setSelectedSubject(subject.name)}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${subject.color} flex items-center justify-center text-2xl mb-3 shadow-lg`}
                    >
                      {subject.icon}
                    </div>
                    <CardTitle className="text-xl">{subject.name}</CardTitle>
                    <CardDescription>Complete curriculum coverage</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-sm text-gray-600">15+ Chapters • PDFs • Quizzes</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Chapters */}
      {selectedClass && selectedSubject && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                Class {selectedClass} - {selectedSubject}
              </h2>
              {user && !hasAccessToClass(Number.parseInt(selectedClass)) && (
                <Button
                  onClick={() => setShowPaymentModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Unlock All Chapters - ₹500
                </Button>
              )}
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {chapters.map((chapter) => (
                <Card key={chapter.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-3 text-lg">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {chapter.chapter_number}
                          </div>
                          {chapter.title}
                          {chapter.is_free && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              Free
                            </Badge>
                          )}
                          {!chapter.is_free && !user && <Lock className="w-4 h-4 text-gray-400" />}
                          {!chapter.is_free && user && !hasAccessToClass(Number.parseInt(selectedClass)) && (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                        </CardTitle>
                        <CardDescription className="mt-2 text-base">{chapter.description}</CardDescription>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                          <span>⏱️ {chapter.duration}</span>
                          <span>📄 PDF Notes</span>
                          <span>🧠 Interactive Quiz</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFileAccess(chapter, "PDF")}
                        disabled={!chapter.is_free && (!user || !hasAccessToClass(Number.parseInt(selectedClass)))}
                        className="border-purple-200 hover:bg-purple-50"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        PDF Notes
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFileAccess(chapter, "Quiz")}
                        disabled={!chapter.is_free && (!user || !hasAccessToClass(Number.parseInt(selectedClass)))}
                        className="border-blue-200 hover:bg-blue-50"
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Practice Quiz
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFileAccess(chapter, "Download")}
                        disabled={!chapter.is_free && (!user || !hasAccessToClass(Number.parseInt(selectedClass)))}
                        className="border-green-200 hover:bg-green-50"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    {!chapter.is_free && (!user || !hasAccessToClass(Number.parseInt(selectedClass))) && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-3">
                          <Crown className="w-5 h-5 text-purple-600" />
                          <p className="text-sm text-purple-700 font-medium">
                            🔒 Premium content. {!user ? "Login and " : ""}Subscribe for ₹500 to unlock all chapters
                            with lifetime access.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle>AI-Powered Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Personalized study plans and intelligent doubt solving with advanced AI technology.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Complete Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  100% CBSE syllabus coverage with detailed notes, examples, and practice questions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Expert Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Created by experienced CBSE teachers and subject matter experts.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onSuccess={checkUser} />

      {user && selectedClass && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          classNumber={Number.parseInt(selectedClass)}
          userId={user.id}
          onSuccess={checkUser}
        />
      )}
    </div>
  )
}
