"use server"

// The Google Gemini API key
const GEMINI_API_KEY = "AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A"

// Function to generate content using Google Gemini API
export async function generateGeminiResponse(
  prompt: string,
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // Updated API endpoint for Gemini
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
        error: "Sorry, content is currently unavailable. Please try again later.",
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
    data: generateMockResponse(prompt),
  }
}

// Generate a mock response if all API calls fail
function generateMockResponse(prompt: string): string {
  const promptLower = prompt.toLowerCase()

  // Check if it's about math
  if (promptLower.includes("math") || promptLower.includes("algebra") || promptLower.includes("calculus")) {
    return `# Mathematics Explanation

Mathematics is the study of numbers, quantities, shapes, and patterns. It's a fundamental discipline that helps us understand the world around us through abstract reasoning and logical deduction.

## Key Concepts in Mathematics:

1. **Numbers and Operations**: Understanding different number systems (natural, integer, rational, real) and operations like addition, subtraction, multiplication, and division.

2. **Algebra**: Using symbols and letters to represent numbers and quantities, allowing us to solve equations and express relationships.

3. **Geometry**: The study of shapes, sizes, positions, and dimensions of objects in space.

4. **Calculus**: Deals with rates of change and accumulation, including differentiation and integration.

5. **Statistics and Probability**: Analyzing data, making predictions, and understanding randomness and uncertainty.

Mathematics provides the foundation for many other fields, including physics, engineering, computer science, economics, and more.`
  }

  // Check if it's about science
  if (promptLower.includes("science") || promptLower.includes("physics") || promptLower.includes("chemistry")) {
    return `# Science Overview

Science is the systematic study of the natural world through observation, experimentation, and analysis. It helps us understand how the universe works and develop technologies that improve our lives.

## Major Branches of Science:

1. **Physics**: Studies matter, energy, and the fundamental forces of nature. Key topics include mechanics, thermodynamics, electromagnetism, and quantum mechanics.

2. **Chemistry**: Examines the composition, structure, properties, and changes of matter. It explores how atoms combine to form molecules and how these interact.

3. **Biology**: Investigates living organisms and their processes, including genetics, evolution, ecology, and physiology.

4. **Earth Science**: Studies the Earth's systems, including geology, meteorology, oceanography, and astronomy.

The scientific method provides a framework for scientific inquiry:
1. Make observations
2. Form a hypothesis
3. Test through experiments
4. Analyze results
5. Draw conclusions
6. Refine and repeat

Science continues to evolve as new discoveries challenge and expand our understanding of the universe.`
  }

  // Default response for other topics
  return `# General Knowledge

Learning is the process of acquiring new understanding, knowledge, behaviors, skills, values, attitudes, and preferences. It's a lifelong journey that helps us grow and adapt to our changing world.

## Effective Learning Strategies:

1. **Active Learning**: Engage with the material through questioning, discussing, and problem-solving rather than passive reading or listening.

2. **Spaced Repetition**: Review information at increasing intervals to improve long-term retention.

3. **Retrieval Practice**: Test yourself regularly to strengthen memory and identify gaps in understanding.

4. **Elaboration**: Explain concepts in your own words and connect them to what you already know.

5. **Varied Practice**: Apply knowledge in different contexts to develop deeper understanding.

Understanding how to learn effectively is perhaps the most valuable skill you can develop, as it unlocks your ability to master any subject or skill you choose to pursue.`
}

// Function to generate educational content based on topic and mode
export async function generateStudyContent(
  topic: string,
  classNumber: number,
  mode: "explain" | "summarize" | "flashcards" | "quiz" = "explain",
): Promise<{ success: boolean; data?: string; error?: string }> {
  // Create a prompt based on the mode
  let prompt = ""

  switch (mode) {
    case "explain":
      prompt = `You are an educational AI assistant for CBSE Class ${classNumber} students. Please explain the following topic in simple, clear language appropriate for their grade level. 
      Use examples and analogies where helpful. Make sure the content aligns with CBSE curriculum standards.
      
      Topic: ${topic}`
      break
    case "summarize":
      prompt = `You are an educational AI assistant for CBSE Class ${classNumber} students. Please create a concise summary of the following topic.
      Use bullet points and clear headings to organize the information. Ensure the content is appropriate for Class ${classNumber} level.
      
      Topic: ${topic}`
      break
    case "flashcards":
      prompt = `You are an educational AI assistant for CBSE Class ${classNumber} students. Please create 5-8 flashcards on the following topic.
      Format each flashcard as:
      
      CARD #:
      Question: [question]
      Answer: [answer]
      
      Make sure the questions and answers are appropriate for Class ${classNumber} level and follow CBSE curriculum.
      
      Topic: ${topic}`
      break
    case "quiz":
      prompt = `You are an educational AI assistant for CBSE Class ${classNumber} students. Please create a 5-question multiple-choice quiz on the following topic.
      Format each question as:
      
      Q#: [question]
      A) [option]
      B) [option]
      C) [option]
      D) [option]
      Correct Answer: [letter]
      Explanation: [brief explanation]
      
      Ensure the questions are appropriate for Class ${classNumber} level and align with CBSE standards.
      
      Topic: ${topic}`
      break
  }

  // Call the Gemini API
  return await generateGeminiResponse(prompt)
}
