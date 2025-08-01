"use server"


const GEMINI_API_KEY = "AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A"

// Update the generateCurriculumResponse function to handle empty curriculum data better
export async function generateCurriculumResponse(
  prompt: string,
  grade: string,
  subject: string,
  mode: "explain" | "summarize" | "flashcards" | "quiz" | "question" | "answer" = "explain",
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // Get curriculum content for the specific grade and subject
    const curriculumData = await getCurriculumContent(grade, subject)

    let contextualPrompt = ""

    if (curriculumData && curriculumData.length > 0) {
      const relevantContent = curriculumData
        .map((item) => `Chapter: ${item.chapter}\nTitle: ${item.title}\nContent: ${item.content}`)
        .join("\n\n")

      contextualPrompt = `You are an AI tutor for CBSE Class ${grade} ${subject.charAt(0).toUpperCase() + subject.slice(1)}. 
      Use the following curriculum content as your knowledge base:

      ${relevantContent}

      Based on this curriculum content, please respond to the following request in ${mode} mode:
      ${prompt}

      Important guidelines:
      - Only use information from the provided curriculum content
      - Adapt your language and examples for Class ${grade} students
      - If the question is outside the curriculum scope, politely redirect to relevant topics
      - Make your response engaging and age-appropriate`
    } else {
      contextualPrompt = `You are an AI tutor for CBSE Class ${grade} ${subject.charAt(0).toUpperCase() + subject.slice(1)}. 
      Please respond to the following request in ${mode} mode, keeping in mind the CBSE curriculum for Class ${grade}:
      ${prompt}

      Important guidelines:
      - Adapt your language and examples for Class ${grade} students
      - Follow CBSE curriculum standards
      - Make your response engaging and age-appropriate`
    }


    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: contextualPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    }

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error:", errorText)
      return {
        success: false,
        error: `Error: ${response.status} ${response.statusText}`,
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
      console.error("Unexpected response structure:", JSON.stringify(data))
      return {
        success: false,
        error: "Unexpected response from AI service",
      }
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error)
    return {
      success: false,
      error: "Failed to connect to AI service",
    }
  }
}
