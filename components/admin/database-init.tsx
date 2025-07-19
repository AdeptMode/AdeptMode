"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { populateClass6Science } from "@/scripts/populate-curriculum"

export default function DatabaseInit() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handlePopulateDatabase = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const result = await populateClass6Science()
      if (result.success) {
        setMessage("✅ Successfully populated Class 6 Science content!")
      } else {
        setMessage("❌ Failed to populate database: " + result.error)
      }
    } catch (error) {
      setMessage("❌ Error: " + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Database Initialization</CardTitle>
        <CardDescription>Populate the database with CBSE curriculum content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handlePopulateDatabase} disabled={isLoading} className="w-full">
          {isLoading ? "Populating..." : "Populate Class 6 Science"}
        </Button>

        {message && (
          <div className="p-3 rounded-lg bg-gray-50">
            <p className="text-sm">{message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
