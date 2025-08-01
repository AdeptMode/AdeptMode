"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Menu,
  Brain,
  Calendar,
  CheckCircle,
  HelpCircle,
  CreditCard,
  Map,
  Heart,
  PenTool,
  User,
  Target,
  FileText,
  Sparkles,
  Zap,
  Star,
  ChevronDown,
} from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      name: "AI Study Buddy",
      href: "/study-buddy",
      icon: Brain,
      description: "Personalized AI tutoring",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Smart Revision Planner",
      href: "/revision-planner",
      icon: Calendar,
      description: "Intelligent study schedules",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "AI Answer Evaluator",
      href: "/answer-evaluator",
      icon: CheckCircle,
      description: "Detailed answer feedback",
      color: "from-purple-500 to-violet-500",
    },
    {
      name: "Question Generator",
      href: "/question-generator",
      icon: HelpCircle,
      description: "Practice question creation",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Flashcards",
      href: "/flashcards",
      icon: CreditCard,
      description: "Interactive study cards",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Mind Maps",
      href: "/mind-maps",
      icon: Map,
      description: "Visual concept mapping",
      color: "from-indigo-500 to-purple-500",
    },
    {
      name: "Anxiety Coach",
      href: "/anxiety-coach",
      icon: Heart,
      description: "Stress management support",
      color: "from-teal-500 to-cyan-500",
    },
    {
      name: "Essay Writer",
      href: "/essay-writer",
      icon: PenTool,
      description: "Writing assistance & feedback",
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "AI Mentor",
      href: "/ai-mentor",
      icon: User,
      description: "Personal learning guidance",
      color: "from-violet-500 to-purple-500",
    },
    {
      name: "Exam Readiness",
      href: "/exam-readiness",
      icon: Target,
      description: "Performance prediction",
      color: "from-red-500 to-pink-500",
    },
    {
      name: "Quick Notes",
      href: "/quick-notes",
      icon: FileText,
      description: "Instant content summarization",
      color: "from-emerald-500 to-teal-500",
    },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-purple-500/10"
          : "bg-transparent"
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-indigo-600/5 animate-gradient-x"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo with unique design */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-105">
                <Brain className="h-7 w-7 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              {/* Floating particles */}
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
              <div className="absolute -bottom-1 -right-3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-70"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AdeptMode
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wider">AI LEARNING PLATFORM</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group bg-transparent hover:bg-white/50 data-[state=open]:bg-white/50 border border-transparent hover:border-purple-200 rounded-xl px-4 py-2 transition-all duration-300">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-purple-600 group-hover:animate-pulse" />
                      <span className="font-medium text-gray-700 group-hover:text-purple-700">Features</span>
                      <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-purple-600 transition-transform group-data-[state=open]:rotate-180" />
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[900px] p-6">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                          AI-Powered Learning Tools
                        </h3>
                        <p className="text-sm text-gray-600">
                          Transform your learning experience with our comprehensive AI toolkit
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {features.map((feature) => {
                          const IconComponent = feature.icon
                          return (
                            <NavigationMenuLink key={feature.name} asChild>
                              <Link
                                href={feature.href}
                                className="group block p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
                              >
                                <div className="flex items-start space-x-3">
                                  <div
                                    className={`p-2.5 rounded-lg bg-gradient-to-r ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                  >
                                    <IconComponent className="h-5 w-5 text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
                                      {feature.name}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{feature.description}</p>
                                  </div>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          )
                        })}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              href="/cbse-learning-platform"
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-white/50 border border-transparent hover:border-green-200 transition-all duration-300"
            >
              <Star className="h-4 w-4 text-green-600 group-hover:animate-spin" />
              <span className="font-medium text-gray-700 group-hover:text-green-700">CBSE Platform</span>
            </Link>

            <Link
              href="/blogs"
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-white/50 border border-transparent hover:border-blue-200 transition-all duration-300"
            >
              <FileText className="h-4 w-4 text-blue-600 group-hover:animate-pulse" />
              <span className="font-medium text-gray-700 group-hover:text-blue-700">Blogs</span>
            </Link>

            <Link
              href="/about"
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-white/50 border border-transparent hover:border-indigo-200 transition-all duration-300"
            >
              <Heart className="h-4 w-4 text-indigo-600 group-hover:animate-bounce" />
              <span className="font-medium text-gray-700 group-hover:text-indigo-700">About</span>
            </Link>
          </div>

          {/* CTA Button with unique design */}
          <div className="hidden lg:flex">
            <Link href="/cbse-learning-platform">
              <Button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 group-hover:animate-spin" />
                  <span className="font-semibold">Get Started Free</span>
                </div>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-white/50">
                <Menu className="h-6 w-6 text-gray-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    AdeptMode
                  </h2>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3">Features</h3>
                  {features.slice(0, 6).map((feature) => {
                    const IconComponent = feature.icon
                    return (
                      <Link
                        key={feature.name}
                        href={feature.href}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-all duration-300 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform`}
                        >
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-purple-700">{feature.name}</span>
                      </Link>
                    )
                  })}
                  <Link
                    href="/study-buddy"
                    className="block px-3 py-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    View All Features →
                  </Link>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <Link
                    href="/cbse-learning-platform"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <Star className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-700">CBSE Platform</span>
                  </Link>
                  <Link
                    href="/blogs"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Blogs</span>
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <Heart className="h-5 w-5 text-indigo-600" />
                    <span className="font-medium text-gray-700">About</span>
                  </Link>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <Link href="/cbse-learning-platform" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl py-3 shadow-lg">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
