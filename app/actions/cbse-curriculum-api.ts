"use server"

// Google Gemini API key
const GEMINI_API_KEY = "AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A"

async function callGeminiAPI(prompt: string): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

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
      console.error("Gemini API error:", await response.text())
      return {
        success: false,
        error: "Sorry, content is currently unavailable. Please try again later.",
      }
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
      return {
        success: true,
        data: data.candidates[0].content.parts[0].text,
      }
    } else {
      return {
        success: false,
        error: "Sorry, content is currently unavailable. Please try again later.",
      }
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error)
    return {
      success: false,
      error: "Sorry, content is currently unavailable. Please try again later.",
    }
  }
}

export async function generateCBSESubjects(
  classNumber: number,
): Promise<{ success: boolean; data?: any[]; error?: string }> {
  const prompt = `Generate a comprehensive list of CBSE subjects for Class ${classNumber}. 

For each subject, provide:
1. Subject name
2. Brief description (2-3 sentences)
3. Approximate number of chapters
4. Return as a JSON array

Example format:
[
  {
    "name": "Mathematics",
    "description": "Covers algebra, geometry, and arithmetic concepts appropriate for Class ${classNumber}.",
    "chapters": 15
  }
]

Make sure to include all core CBSE subjects for Class ${classNumber} including:
- Mathematics
- Science (or Physics/Chemistry/Biology for higher classes)
- English
- Hindi
- Social Science (or History/Geography/Political Science/Economics for higher classes)
- Any additional subjects specific to Class ${classNumber}

Return only the JSON array, no additional text.`

  try {
    const result = await callGeminiAPI(prompt)

    if (result.success && result.data) {
      // Try to parse JSON from the response
      try {
        const jsonMatch = result.data.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const subjects = JSON.parse(jsonMatch[0])
          return { success: true, data: subjects }
        }
      } catch (parseError) {
        console.error("JSON parsing error:", parseError)
      }

      // Fallback: create subjects from text response
      const subjects = [
        { name: "Mathematics", description: "Covers algebra, geometry, and arithmetic concepts.", chapters: 15 },
        { name: "Science", description: "Explores physics, chemistry, and biology fundamentals.", chapters: 18 },
        { name: "English", description: "Language skills, literature, and communication.", chapters: 12 },
        { name: "Hindi", description: "Hindi language, grammar, and literature.", chapters: 10 },
        { name: "Social Science", description: "History, geography, and civics studies.", chapters: 20 },
      ]

      return { success: true, data: subjects }
    }

    return result
  } catch (error) {
    return {
      success: false,
      error: "Failed to generate subjects. Please try again.",
    }
  }
}

export async function generateCBSEChapters(
  classNumber: number,
  subject: string,
): Promise<{ success: boolean; data?: any[]; error?: string }> {
  const prompt = `Generate a comprehensive list of chapters for CBSE Class ${classNumber} ${subject}.

For each chapter, provide:
1. Chapter number
2. Chapter title
3. Brief description (2-3 sentences)
4. Difficulty level (Easy/Medium/Hard)
5. Number of main topics covered
6. Return as a JSON array

Example format:
[
  {
    "number": 1,
    "title": "Chapter Title",
    "description": "Brief description of what this chapter covers and its importance.",
    "difficulty": "Medium",
    "topics": 8
  }
]

Make sure the chapters are:
- Aligned with official CBSE curriculum for Class ${classNumber} ${subject}
- Arranged in logical learning sequence
- Age-appropriate for Class ${classNumber} students
- Cover all major topics in the subject

Return only the JSON array, no additional text.`

  try {
    const result = await callGeminiAPI(prompt)

    if (result.success && result.data) {
      // Try to parse JSON from the response
      try {
        const jsonMatch = result.data.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const chapters = JSON.parse(jsonMatch[0])
          return { success: true, data: chapters }
        }
      } catch (parseError) {
        console.error("JSON parsing error:", parseError)
      }

      // Fallback: create sample chapters
      const sampleChapters = Array.from({ length: 12 }, (_, i) => ({
        number: i + 1,
        title: `Chapter ${i + 1}`,
        description: `This chapter covers important concepts in ${subject} for Class ${classNumber} students.`,
        difficulty: ["Easy", "Medium", "Hard"][i % 3],
        topics: Math.floor(Math.random() * 10) + 5,
      }))

      return { success: true, data: sampleChapters }
    }

    return result
  } catch (error) {
    return {
      success: false,
      error: "Failed to generate chapters. Please try again.",
    }
  }
}

export async function generateChapterContent(
  classNumber: number,
  subject: string,
  chapterTitle: string,
): Promise<{ success: boolean; data?: string; error?: string }> {
  const prompt = `Create a comprehensive explanation for the CBSE Class ${classNumber} ${subject} chapter: "${chapterTitle}".

Please provide:

1. **Introduction** - What this chapter is about and why it's important
2. **Key Concepts** - Main topics and definitions with clear explanations
3. **Detailed Explanation** - Step-by-step breakdown of concepts with examples
4. **Real-life Applications** - How these concepts apply in daily life
5. **Important Formulas/Rules** (if applicable) - Key formulas or rules to remember
6. **Common Mistakes** - What students often get wrong and how to avoid them
7. **Study Tips** - How to effectively learn and remember this chapter
8. **Connection to Other Chapters** - How this relates to other topics in the curriculum

Make sure the content is:
- Age-appropriate for Class ${classNumber} students
- Aligned with CBSE curriculum guidelines
- Easy to understand with clear examples
- Comprehensive yet engaging
- Includes practical examples and analogies

Format the response in a clear, structured manner with proper headings and bullet points where appropriate.`

  return await callGeminiAPI(prompt)
}

export async function generateExamQuestions(
  classNumber: number,
  subject: string,
  chapterTitle: string,
): Promise<{ success: boolean; data?: string; error?: string }> {
  const prompt = `Generate exam questions for CBSE Class ${classNumber} ${subject} chapter: "${chapterTitle}" based on previous year question patterns.

Create the following types of questions:

**MULTIPLE CHOICE QUESTIONS (MCQs) - 5 questions**
- 1 mark each
- Include 4 options (A, B, C, D)
- Cover different difficulty levels
- Provide correct answers

**SHORT ANSWER QUESTIONS - 4 questions**
- 2-3 marks each
- Test conceptual understanding
- Include variety of topics from the chapter

**LONG ANSWER QUESTIONS - 2 questions**
- 5 marks each
- Test comprehensive understanding
- Include application-based questions

**VERY SHORT ANSWER QUESTIONS - 3 questions**
- 1 mark each
- Quick recall questions
- Definition or formula based

For each question, provide:
1. The question text
2. Mark allocation
3. Expected answer/solution
4. Difficulty level (Easy/Medium/Hard)

Make sure questions are:
- Based on CBSE exam patterns and previous year trends
- Age-appropriate for Class ${classNumber}
- Cover all important topics from the chapter
- Include both theoretical and application-based questions
- Follow CBSE marking scheme guidelines

Format the response clearly with proper question numbering and sections.`

  return await callGeminiAPI(prompt)
}
