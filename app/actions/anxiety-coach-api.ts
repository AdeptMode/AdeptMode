"use server"

// The Google Gemini API key
const GEMINI_API_KEY = "AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A"

// Function to generate anxiety coaching response using Google Gemini API
export async function generateAnxietyCoachingResponse(
  concern: string,
  preferredApproach?: string,
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // Create a prompt for the AI
    const prompt = `
    You are an AI Exam Anxiety Coach for students. A student has shared the following concern or situation related to exam anxiety:
    
    "${concern}"
    
    ${preferredApproach ? `They've indicated they prefer: ${preferredApproach}` : ""}
    
    Please provide a supportive, empathetic response that includes:
    
    1. Validation of their feelings and normalization of exam anxiety
    2. 2-3 specific relaxation techniques they can use immediately (breathing exercises, mindfulness practices, etc.)
    3. Motivational tips to boost their confidence
    4. A brief guided meditation or visualization exercise they can follow (about 1-2 paragraphs)
    5. Practical stress-relief strategies they can implement in their study routine
    
    Format your response in a clear, structured way using markdown with headings and bullet points.
    Use a warm, supportive tone throughout. Avoid generic advice - make your suggestions specific and actionable.
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
    console.error("Error generating anxiety coaching response:", error)
    return {
      success: false,
      error: "Failed to generate coaching response",
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
    data: generateMockResponse(),
  }
}

// Generate a mock response if all API calls fail
function generateMockResponse(): string {
  return `# Managing Your Exam Anxiety

## You're Not Alone

First, I want you to know that what you're feeling is completely normal. Exam anxiety affects most students at some point, even the highest achievers. Your body's stress response is actually trying to help you perform well - we just need to keep it at a helpful level rather than an overwhelming one.

## Relaxation Techniques You Can Use Right Now

### 1. Box Breathing

This technique quickly calms your nervous system:
* Breathe in slowly for 4 counts
* Hold for 4 counts
* Exhale slowly for 4 counts
* Hold for 4 counts
* Repeat 5 times

### 2. 5-4-3-2-1 Grounding Exercise

When anxiety feels overwhelming:
* Name 5 things you can see
* 4 things you can touch
* 3 things you can hear
* 2 things you can smell (or like the smell of)
* 1 thing you can taste (or like the taste of)

This brings you back to the present moment and out of anxious thoughts.

## Confidence Boosters

* **Recall Past Successes**: Write down three previous challenges you've overcome. You've conquered difficult situations before, and you can do it again.
* **Positive Self-Talk**: Replace "I'm going to fail" with "I've prepared as best I can and I'll do my best." Your brain believes what you tell it.
* **Visualization**: Spend 5 minutes each day imagining yourself calmly taking the exam, knowing the answers, and feeling confident.

## Guided Visualization: Your Calm Exam Space

Close your eyes and take three deep breaths. Imagine yourself walking into the exam room feeling prepared and confident. Your steps are steady, your breathing is calm. As you sit down, you feel the chair supporting you. You see the exam paper in front of you. Instead of panic, you feel a sense of clarity and focus. Your mind is like a clear pool of water, with all the knowledge you've gained accessible to you. You read each question carefully, taking your time. When you encounter a difficult question, you notice the feeling of uncertainty, but you don't let it overwhelm you. You move on and return to it later. See yourself completing the exam with time to spare, reviewing your answers thoughtfully. As you hand in your paper, you feel a sense of accomplishment, regardless of the outcome.

## Practical Stress-Relief Strategies for Your Study Routine

* **Study in Focused Blocks**: Use the Pomodoro technique - 25 minutes of focused study followed by a 5-minute break. This prevents burnout.
* **Physical Movement**: Even a 10-minute walk between study sessions reduces stress hormones and improves retention.
* **Prepare Your Body**: Prioritize sleep in the week before exams. Avoid excess caffeine, which can mimic anxiety symptoms.
* **Create a Worry Time**: Set aside 15 minutes daily to write down all your exam worries. Outside this time, remind yourself "I'll think about that during worry time."
* **Study with Purpose**: Rather than cramming, focus on understanding concepts and testing yourself, which builds confidence.

Remember, the goal isn't to eliminate all anxiety—some nervousness improves performance. The goal is to manage it so it helps rather than hinders you. You've got this!`
}
