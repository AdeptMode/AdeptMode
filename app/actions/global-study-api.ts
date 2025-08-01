"use server"

const GEMINI_API_KEY = "AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A"

export async function generateGlobalStudyResponse(
  prompt: string,
  mode: "explain" | "summarize" | "flashcards" | "quiz" = "explain",
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    let contextualPrompt = ""

    switch (mode) {
      case "explain":
        contextualPrompt = `You are a knowledgeable tutor for students worldwide. Please provide a detailed explanation of the following topic with examples and step-by-step breakdowns where appropriate:

${prompt}

Guidelines:
- Use clear, engaging language
- Provide practical examples
- Break down complex concepts
- Make it accessible for students`
        break

      case "summarize":
        contextualPrompt = `You are a study assistant. Please provide a concise summary of the following topic, highlighting the key points and main concepts:

${prompt}

Guidelines:
- Focus on essential information
- Use bullet points where helpful
- Keep it clear and organized
- Highlight the most important concepts`
        break

      case "flashcards":
        contextualPrompt = `Create flashcards for the following topic. Format them as "Question: [question]" and "Answer: [answer]" pairs. Create 5-8 flashcards covering the key concepts:

${prompt}

Guidelines:
- Make questions clear and specific
- Keep answers concise but complete
- Cover different aspects of the topic
- Use a mix of definition, application, and concept questions`
        break

      case "quiz":
        contextualPrompt = `Create a quiz with 5-7 multiple choice questions about the following topic. Format each question with options A, B, C, D and indicate the correct answer:

${prompt}

Guidelines:
- Make questions challenging but fair
- Include a mix of difficulty levels
- Cover different aspects of the topic
- Provide the correct answer for each question`
        break
    }

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

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

    const response = await fetch(`${url}?key=${GEMINI_API_KEY}`, {
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
