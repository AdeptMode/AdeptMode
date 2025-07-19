"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowRight,
  Sparkles,
  Brain,
  Zap,
  Target,
  Star,
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Lightbulb,
  Rocket,
  Globe,
  Shield,
} from "lucide-react"

export default function Hero() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const features = [
    { icon: Brain, text: "AI-Powered Learning", color: "from-blue-500 to-cyan-500" },
    { icon: Target, text: "Personalized Study Plans", color: "from-purple-500 to-pink-500" },
    { icon: Zap, text: "Instant Feedback", color: "from-yellow-500 to-orange-500" },
    { icon: Award, text: "Exam Success", color: "from-green-500 to-emerald-500" },
  ]

  const stats = [
    { icon: Users, value: "50K+", label: "Active Students" },
    { icon: BookOpen, value: "1M+", label: "Questions Solved" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
    { icon: Globe, value: "100+", label: "Countries" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full blur-3xl animate-spin-slow"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-float opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}

        {/* Interactive cursor effect */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Animated badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200/50 mb-8 group hover:scale-105 transition-transform duration-300">
            <Sparkles className="h-4 w-4 text-purple-600 mr-2 animate-pulse" />
            <span className="text-sm font-medium text-purple-700">
              🎉 Join 50,000+ students learning smarter with AI
            </span>
            <ArrowRight className="h-4 w-4 text-purple-600 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Main heading with animated text */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-gray-900 mb-2">Transform Your</span>
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
              Learning Journey
            </span>
            <span className="block text-gray-900 text-4xl md:text-5xl mt-2">with AI Power</span>
          </h1>

          {/* Animated feature showcase */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-500 ${
                      index === currentFeature
                        ? `bg-gradient-to-r ${feature.color} text-white scale-110 shadow-lg`
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium text-sm">{feature.text}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Experience the future of education with our comprehensive AI-powered platform. Get personalized study plans,
            instant feedback, and achieve your academic goals faster than ever.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/cbse-learning-platform">
              <Button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <Rocket className="h-5 w-5 group-hover:animate-bounce" />
                  <span>Start Learning Free</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
            </Link>

            <Link href="/study-buddy">
              <Button
                variant="outline"
                className="group px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-gray-300 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-purple-600 group-hover:animate-pulse" />
                  <span>Try AI Study Buddy</span>
                </div>
              </Button>
            </Link>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Trusted by students worldwide</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="font-medium">4.9/5 rating</span>
            </div>

            <div className="flex items-center space-x-8 opacity-60">
              <div className="text-xs font-medium text-gray-500 tracking-wider">FEATURED IN</div>
              <div className="flex items-center space-x-6">
                <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">TechCrunch</div>
                <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">EdTech Review</div>
                <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">AI News</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
