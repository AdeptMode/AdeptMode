"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A")

interface ExamData {
  subjects: string[]
  chaptersCompleted: string[]
  averageScores: number[]
  weakAreas: string[]
  examDate: string
}

interface ReadinessReport {
  readinessStatus: string
  estimatedScore: string
  suggestedTopics: string[]
  quickTip: string
}

export async function generateExamReadinessReport(examData: ExamData): Promise<ReadinessReport> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const daysUntilExam = Math.ceil(
      (new Date(examData.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    )

    const prompt = `You are an intelligent Exam Readiness Predictor for students preparing for exams. Based on the provided student data, estimate their expected exam readiness level and suggest specific topics for quick revision to maximize score.

Student Data:
- Subjects: ${examData.subjects.join(", ")}
- Chapters completed: ${examData.chaptersCompleted.join(", ")}
- Average quiz/test scores: ${examData.averageScores.join(", ")}%
- Weak areas identified: ${examData.weakAreas.join(", ")}
- Exam Date: ${examData.examDate}
- Days until exam: ${daysUntilExam}

Response Format (return ONLY a valid JSON object):
{
  "readinessStatus": "High / Moderate / Needs Improvement",
  "estimatedScore": "Marks or percentage range (e.g., '75-85%' or '450-500 marks')",
  "suggestedTopics": ["List of 4-5 specific topics for immediate revision"],
  "quickTip": "1 motivational or practical tip for exam preparation"
}

Analysis Guidelines:
1. Readiness Status:
   - High: Average scores >80%, most chapters completed, <30 days to exam
   - Moderate: Average scores 60-80%, good chapter coverage, reasonable time left
   - Needs Improvement: Average scores <60%, many weak areas, limited preparation

2. Score Prediction:
   - Consider current average scores, weak areas, and time remaining
   - Be realistic but encouraging
   - Provide a range (e.g., "72-82%" or "360-410 marks")

3. Suggested Topics:
   - Prioritize weak areas that can be improved quickly
   - Focus on high-weightage topics
   - Consider time constraints

4. Quick Tip:
   - Be motivational and practical
   - Consider the readiness level and time remaining
   - Provide actionable advice

Return only the JSON object, no additional text.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Clean the response to extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Invalid response format")
    }

    const readinessReport = JSON.parse(jsonMatch[0]) as ReadinessReport
    return readinessReport
  } catch (error) {
    console.error("Error generating readiness report:", error)

    // Fallback response based on the provided data
    const averageScore =
      examData.averageScores.length > 0
        ? examData.averageScores.reduce((a, b) => a + b, 0) / examData.averageScores.length
        : 70

    const daysUntilExam = Math.ceil(
      (new Date(examData.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    )

    let readinessStatus = "Moderate"
    let estimatedScore = "70-80%"

    if (averageScore >= 80 && daysUntilExam > 7) {
      readinessStatus = "High"
      estimatedScore = "80-90%"
    } else if (averageScore < 60 || daysUntilExam < 7) {
      readinessStatus = "Needs Improvement"
      estimatedScore = "60-70%"
    }

    return {
      readinessStatus,
      estimatedScore,
      suggestedTopics: [
        "Review fundamental concepts in weak areas",
        "Practice previous year question papers",
        "Focus on high-weightage topics from syllabus",
        "Strengthen problem-solving techniques",
        "Revise important formulas and definitions",
      ],
      quickTip: `With ${daysUntilExam} days remaining, focus on consistent daily revision and practice. Quality over quantity - master the topics you know well while gradually improving weak areas!`,
    }
  }
}
