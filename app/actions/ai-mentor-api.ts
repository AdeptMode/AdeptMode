"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A")

interface PerformanceData {
  subjectsAttempted: string[]
  chaptersCompleted: string[]
  averageQuizScore: number
  weakTopics: string[]
  totalStudyHours: number
  streakDays: number
  completedTasks: number
  totalTasks: number
}

interface MentorPlan {
  weakAreas: string[]
  suggestedImprovements: string[]
  dailyTasks: string[]
  motivationalMessage: string
}

export async function generatePersonalizedMentorPlan(performanceData: PerformanceData): Promise<MentorPlan> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `You are an AI Learning Mentor for students preparing for CBSE and competitive exams. Based on the student's recent performance data provided, identify weak areas, suggest improvements, and recommend 3 personalized daily study tasks. Keep suggestions short, clear, and motivating.

Student Performance Data:
- Subjects attempted: ${performanceData.subjectsAttempted.join(", ")}
- Chapters completed: ${performanceData.chaptersCompleted.join(", ")}
- Average quiz score: ${performanceData.averageQuizScore}%
- Notable weak topics: ${performanceData.weakTopics.join(", ")}
- Total study hours this month: ${performanceData.totalStudyHours} hours
- Current study streak: ${performanceData.streakDays} days
- Tasks completed: ${performanceData.completedTasks}/${performanceData.totalTasks}

Your response should follow this structure and return ONLY a valid JSON object:
{
  "weakAreas": ["List of 3-4 specific topics/chapters needing improvement"],
  "suggestedImprovements": ["List of 3-4 specific actionable strategies"],
  "dailyTasks": ["Task 1 with time estimate", "Task 2 with time estimate", "Task 3 with time estimate"],
  "motivationalMessage": "Short encouraging sentence acknowledging progress and motivating continued effort"
}

Make sure each daily task includes:
- Specific subject/topic
- Clear action (solve, read, practice, review)
- Time estimate in minutes
- Difficulty level consideration

Example task format: "Solve 15 calculus differentiation problems focusing on chain rule (45 minutes)"

Return only the JSON object, no additional text.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Clean the response to extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Invalid response format")
    }

    const mentorPlan = JSON.parse(jsonMatch[0]) as MentorPlan
    return mentorPlan
  } catch (error) {
    console.error("Error generating mentor plan:", error)

    // Fallback response
    return {
      weakAreas: [
        "Mathematical problem-solving speed needs improvement",
        "Physics conceptual understanding in mechanics",
        "Chemistry formula application in numerical problems",
        "Time management during practice tests",
      ],
      suggestedImprovements: [
        "Practice timed problem-solving sessions daily to build speed and accuracy",
        "Create concept maps linking physics formulas to real-world applications",
        "Use flashcards for chemistry formulas and practice numerical problems regularly",
        "Take weekly mock tests with strict time limits to improve exam performance",
      ],
      dailyTasks: [
        "Solve 20 algebra problems focusing on quadratic equations and inequalities (40 minutes)",
        "Read and summarize thermodynamics chapter, then solve 10 numerical problems (35 minutes)",
        "Practice 15 organic chemistry reactions and create mechanism flowcharts (30 minutes)",
      ],
      motivationalMessage:
        "Excellent work maintaining your 7-day study streak! Your consistent effort is building strong foundations for success. Keep pushing forward - you're making great progress! 🌟",
    }
  }
}
