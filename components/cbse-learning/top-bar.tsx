"use client"

import { Button } from "@/components/ui/button"
import { GraduationCap, Home, Sparkles } from "lucide-react"
import Link from "next/link"

export function TopBar() {
  return (
    <div className="h-20 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">AdeptMode CBSE Learning</h1>
          <p className="text-sm text-gray-400">Free AI-Powered Education Platform</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-900/30 rounded-xl border border-green-600/30">
          <Sparkles className="w-4 h-4 text-green-400" />
          <div className="text-sm">
            <div className="text-green-400 font-medium">Free for Everyone</div>
            <div className="text-green-300 text-xs">No limits • No signup</div>
          </div>
        </div>

        <Link href="/">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
