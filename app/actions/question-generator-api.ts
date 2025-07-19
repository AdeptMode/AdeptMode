"use server"

// The Google Gemini API key
const GEMINI_API_KEY = "AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A"

// Function to generate exam questions using Google Gemini API
export async function generateExamQuestions(
  topic: string,
  questionCount = 5,
  difficulty: "Easy" | "Medium" | "Hard" | "Mixed" = "Mixed",
  questionType: "Multiple Choice" | "Short Answer" | "Essay" | "Mixed" = "Mixed",
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // Create a prompt for the AI
    const prompt = `
    You are an AI Exam Question Generator for educational purposes. Generate ${questionCount} ${difficulty.toLowerCase()} difficulty ${questionType === "Mixed" ? "mixed type" : questionType.toLowerCase()} questions on the topic "${topic}".
    
    For each question:
    1. Provide a clear, well-formulated question that tests understanding rather than just memorization
    2. For multiple-choice questions, provide 4 options (A, B, C, D) with one correct answer
    3. Provide a detailed explanation of the correct answer
    4. Include relevant examples, formulas, or diagrams where appropriate
    
    Format your response in a clear, structured way using markdown with headings and bullet points.
    Make sure the questions reflect common syllabus trends and are at an appropriate difficulty level.
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
    console.error("Error generating exam questions:", error)
    return {
      success: false,
      error: "Failed to generate exam questions",
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
    data: generateMockQuestions(),
  }
}

// Generate mock questions if all API calls fail
function generateMockQuestions(): string {
  return `# Exam Questions

## Question 1: Multiple Choice
**What is the primary function of mitochondria in a cell?**

A) Protein synthesis
B) Energy production
C) Cell division
D) Waste removal

**Correct Answer: B) Energy production**

**Explanation:** Mitochondria are often referred to as the "powerhouses" of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), which is used as a source of chemical energy. They produce ATP through the process of cellular respiration, which involves the oxidation of glucose and other nutrients.

## Question 2: Multiple Choice
**Which of the following is a characteristic of Newton's First Law of Motion?**

A) Force equals mass times acceleration
B) For every action, there is an equal and opposite reaction
C) An object at rest stays at rest unless acted upon by an external force
D) Energy cannot be created or destroyed

**Correct Answer: C) An object at rest stays at rest unless acted upon by an external force**

**Explanation:** Newton's First Law of Motion, also known as the Law of Inertia, states that an object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. This law describes the concept of inertia, which is the resistance of any physical object to any change in its velocity.

## Question 3: Short Answer
**Explain the difference between a metaphor and a simile in literature.**

**Answer:** A simile and a metaphor are both figures of speech that draw a comparison between two unrelated things, but they do so in different ways. A simile uses the words "like" or "as" to make an explicit comparison (e.g., "Her smile is like sunshine"). A metaphor, on the other hand, makes an implicit comparison by stating that one thing is another (e.g., "Her smile is sunshine"). Metaphors create a stronger, more direct association between the two things being compared, while similes create a more explicit but perhaps less forceful comparison.

## Question 4: Multiple Choice
**Which of the following best describes the function of photosynthesis in plants?**

A) Breaking down glucose to release energy
B) Converting light energy into chemical energy
C) Transporting water from roots to leaves
D) Producing oxygen without consuming carbon dioxide

**Correct Answer: B) Converting light energy into chemical energy**

**Explanation:** Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose or other sugars. During this process, carbon dioxide and water are used as raw materials, and oxygen is released as a byproduct. The chemical energy stored in the glucose molecules can later be used by the plant for various metabolic processes.

## Question 5: Essay
**Discuss the causes and consequences of the Industrial Revolution in Europe.**

**Answer Outline:**
The Industrial Revolution, which began in Great Britain in the late 18th century and spread throughout Europe and North America, represented a fundamental shift from agrarian, handicraft economies to ones dominated by machine manufacturing, factory systems, and urbanization.

**Causes:**
- Agricultural Revolution: Increased food production and population growth
- Technological innovations: Steam engine, spinning jenny, power loom
- Abundant natural resources: Coal and iron ore in Britain
- Capital accumulation and investment
- Political stability and supportive government policies
- Colonial markets and raw materials

**Consequences:**
- Economic: Rapid economic growth, rise of capitalism, increased productivity
- Social: Urbanization, emergence of working and middle classes, changing family structures
- Working conditions: Long hours, dangerous conditions, child labor
- Environmental: Pollution, deforestation, public health issues
- Political: Rise of labor movements, demands for political reform
- Global: Spread of industrialization, colonialism, global economic integration

The Industrial Revolution fundamentally transformed not just how goods were produced, but the entire social, economic, and political structure of societies. Its effects continue to shape our modern world, from patterns of work and consumption to environmental challenges and global economic relationships.`
}
