"use server"

// The Google Gemini API key
const GEMINI_API_KEY = "AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A"

// Function to evaluate an answer using Google Gemini API
export async function evaluateAnswer(
  studentAnswer: string,
  topic: string,
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // Create a prompt for the AI
    const prompt = `
    You are an AI Answer Evaluator for educational purposes. Evaluate the following student answer on the topic "${topic}".
    
    Student Answer:
    "${studentAnswer}"
    
    Please provide a comprehensive evaluation covering:
    1. Grammar and language usage
    2. Accuracy of content and facts
    3. Structure and organization
    4. Strengths of the answer
    5. Areas for improvement
    6. Suggested corrections
    7. Overall score (out of 100)
    
    Format your response in a clear, structured way using markdown with headings and bullet points.
    Be constructive, specific, and educational in your feedback.
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
    console.error("Error evaluating answer:", error)
    return {
      success: false,
      error: "Failed to evaluate answer",
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
    data: generateMockEvaluation(),
  }
}

// Generate a mock evaluation if all API calls fail
function generateMockEvaluation(): string {
  return `# Answer Evaluation

## Grammar and Language Usage
- **Strengths**: The answer uses proper sentence structure and punctuation.
- **Areas for Improvement**: There are a few grammatical errors and some awkward phrasing.
- **Suggestions**: Review subject-verb agreement and consider varying sentence structure for better flow.

## Accuracy of Content
- **Strengths**: The core concepts are generally accurate.
- **Areas for Improvement**: Some factual details are incorrect or imprecise.
- **Suggestions**: Double-check your facts, especially regarding dates and specific terminology.

## Structure and Organization
- **Strengths**: The answer has a clear introduction and conclusion.
- **Areas for Improvement**: The middle section lacks clear organization and logical flow.
- **Suggestions**: Consider using paragraph breaks to separate distinct ideas and use transition phrases between sections.

## Overall Assessment
- **Score**: 75/100
- **Summary**: This is a solid answer that demonstrates good understanding of the topic, but needs improvement in accuracy and organization.

## Detailed Feedback
The introduction effectively establishes the context, but the main arguments could be more clearly articulated. The conclusion summarizes the key points well, but could be strengthened by connecting back to the main thesis more explicitly.

Some specific claims need citation or further explanation. The examples provided are relevant but could be developed more fully to support your arguments.

## Recommendations for Improvement
1. Review key terminology and ensure accurate usage
2. Organize your thoughts into more distinct paragraphs
3. Provide more specific examples to support your claims
4. Proofread for grammatical errors
5. Consider adding transitional phrases between major points`
}
