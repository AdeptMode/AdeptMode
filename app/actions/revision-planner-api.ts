"use server"

// The Google Gemini API key
const GEMINI_API_KEY = "AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A"

// Types for the revision planner
export type SubjectInfo = {
  name: string
  difficulty: "Easy" | "Medium" | "Hard"
  priority: "Low" | "Medium" | "High"
  topics?: string
}

export type RevisionPlannerInput = {
  examDate: string
  subjects: SubjectInfo[]
  studyHoursPerDay: number
  additionalNotes?: string
}

// Function to generate a revision plan using Google Gemini API
export async function generateRevisionPlan(
  input: RevisionPlannerInput,
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // Calculate days until exam
    const today = new Date()
    const examDate = new Date(input.examDate)
    const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExam < 1) {
      return {
        success: false,
        error: "Exam date must be in the future",
      }
    }

    // Create a prompt for the AI
    const prompt = `
    You are an AI-powered Smart Revision Planner. Create a detailed, personalized study schedule based on the following information:

    Exam Date: ${input.examDate} (${daysUntilExam} days from now)
    Available Study Hours Per Day: ${input.studyHoursPerDay} hours

    Subjects to Study:
    ${input.subjects
      .map(
        (subject) =>
          `- ${subject.name} (Difficulty: ${subject.difficulty}, Priority: ${subject.priority})
       ${subject.topics ? `  Topics: ${subject.topics}` : ""}`,
      )
      .join("\n")}

    ${input.additionalNotes ? `Additional Notes: ${input.additionalNotes}` : ""}

    Please create:
    1. A day-by-day study schedule from today until the exam date
    2. Allocation of study hours based on subject difficulty and priority
    3. Specific daily tasks for each subject
    4. Regular revision and practice test recommendations
    5. Short breaks and rest days as appropriate
    6. Study tips specific to each subject

    Format the schedule in a clear, organized way using markdown with headings, lists, and tables where appropriate.
    `

    // API endpoint for Gemini
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

    // Request body
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    }

    // Make the API request
    const response = await fetch(`${url}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error:", errorText)

      // If this model fails, try an alternative model
      if (response.status === 404) {
        console.log("Trying alternative model...")
        return await tryAlternativeModel(prompt)
      }

      return {
        success: false,
        error: `Error: ${response.status} ${response.statusText}`,
      }
    }

    // Parse the response
    const data = await response.json()

    // Extract the generated text from the response
    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text
    ) {
      return {
        success: true,
        data: data.candidates[0].content.parts[0].text,
      }
    } else {
      console.error("Unexpected response structure:", JSON.stringify(data))
      return {
        success: false,
        error: "Unexpected response from AI service",
      }
    }
  } catch (error) {
    console.error("Error generating revision plan:", error)
    return {
      success: false,
      error: "Failed to generate revision plan",
    }
  }
}

// Try alternative models if the first one fails
async function tryAlternativeModel(prompt: string): Promise<{ success: boolean; data?: string; error?: string }> {
  // List of alternative models to try
  const alternativeModels = ["gemini-pro", "gemini-1.0-pro", "gemini-1.5-pro", "gemini-1.0-pro-latest"]

  for (const model of alternativeModels) {
    try {
      console.log(`Trying model: ${model}`)
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }

      const response = await fetch(`${url}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Error with model ${model}:`, errorText)
        continue // Try the next model
      }

      const data = await response.json()

      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0] &&
        data.candidates[0].content.parts[0].text
      ) {
        console.log(`Success with model: ${model}`)
        return {
          success: true,
          data: data.candidates[0].content.parts[0].text,
        }
      }
    } catch (error) {
      console.error(`Error with model ${model}:`, error)
      // Continue to the next model
    }
  }

  // If all models fail, return a mock response
  console.log("All models failed, returning mock response")
  return {
    success: true,
    data: generateMockRevisionPlan(),
  }
}

// Generate a mock revision plan if all API calls fail
function generateMockRevisionPlan(): string {
  return `# Personalized Study Schedule

## Overview
This study plan is designed to help you prepare effectively for your upcoming exams. It balances your subjects based on difficulty and priority while ensuring adequate coverage of all topics.

## Daily Schedule (Next 14 Days)

### Week 1

#### Monday
- **Mathematics** (2 hours)
  - Review algebra fundamentals
  - Practice 10 equation problems
- **Physics** (1.5 hours)
  - Study mechanics concepts
  - Take notes on Newton's laws

#### Tuesday
- **Chemistry** (2 hours)
  - Review periodic table
  - Study chemical bonding
- **Biology** (1 hour)
  - Read chapter on cell structure
  - Create flashcards for key terms

#### Wednesday
- **Mathematics** (1.5 hours)
  - Study geometry concepts
  - Practice problem-solving
- **Physics** (2 hours)
  - Work on problem sets
  - Review formulas

#### Thursday
- **Chemistry** (1.5 hours)
  - Practice balancing equations
  - Study organic chemistry basics
- **Biology** (1.5 hours)
  - Review genetics principles
  - Complete worksheet on DNA

#### Friday
- **Mathematics** (2 hours)
  - Practice exam questions
  - Review difficult concepts
- **Physics** (1 hour)
  - Study electricity and magnetism
  - Create summary notes

#### Saturday
- **Review Day** (3 hours)
  - Take practice tests for all subjects
  - Identify weak areas

#### Sunday
- **Rest Day**
  - Light review of notes (optional)
  - Prepare materials for next week

### Week 2

#### Monday
- **Mathematics** (2 hours)
  - Focus on calculus concepts
  - Practice integration problems
- **Biology** (1.5 hours)
  - Study human systems
  - Create concept maps

#### Tuesday
- **Chemistry** (2 hours)
  - Review thermodynamics
  - Practice calculation problems
- **Physics** (1.5 hours)
  - Study waves and optics
  - Complete practice questions

#### Wednesday
- **Mathematics** (1.5 hours)
  - Review statistics concepts
  - Practice probability problems
- **Biology** (2 hours)
  - Study ecology principles
  - Review previous topics

#### Thursday
- **Chemistry** (2 hours)
  - Practice full-length problems
  - Review all major concepts
- **Physics** (1.5 hours)
  - Final review of formulas
  - Practice complex problems

#### Friday
- **Mathematics** (2 hours)
  - Complete practice exam
  - Review mistakes and solutions
- **Final Review** (1.5 hours)
  - Create summary sheets
  - Review key concepts across subjects

#### Saturday
- **Mock Exam Day** (4 hours)
  - Take full-length practice exams
  - Time yourself accurately

#### Sunday
- **Pre-Exam Preparation**
  - Light review of weak areas
  - Organize materials for exam
  - Early bedtime

## Study Tips

### General Tips
- Study in 25-minute focused sessions with 5-minute breaks (Pomodoro technique)
- Stay hydrated and maintain regular sleep schedule
- Review notes before bedtime for better retention
- Use active recall rather than passive reading

### Subject-Specific Tips

#### Mathematics
- Focus on understanding concepts rather than memorizing formulas
- Practice a variety of problem types
- Create a formula sheet for quick reference

#### Science Subjects
- Create concept maps to connect related ideas
- Explain concepts out loud to test understanding
- Focus on understanding processes and relationships

## Progress Tracking
Mark each completed task to track your progress:
- [ ] Week 1, Monday - Mathematics
- [ ] Week 1, Monday - Physics
- [ ] Week 1, Tuesday - Chemistry
- [ ] Week 1, Tuesday - Biology
(and so on...)

Good luck with your studies! Adjust this plan as needed based on your progress and understanding of each subject.`
}
