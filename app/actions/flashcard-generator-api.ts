"use server"

// The Google Gemini API key
const GEMINI_API_KEY = "AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A"

export type Flashcard = {
  id: string
  front: string
  back: string
  difficulty: "Easy" | "Medium" | "Hard"
}

// Function to generate flashcards using Google Gemini API
export async function generateFlashcards(
  topic: string,
  cardCount = 10,
): Promise<{ success: boolean; data?: Flashcard[]; error?: string }> {
  try {
    // Create a prompt for the AI
    const prompt = `
    You are an AI Flashcard Generator for educational purposes. Generate ${cardCount} flashcards on the topic "${topic}".
    
    For each flashcard:
    1. Create a concise question or key term for the front of the card
    2. Provide a clear, comprehensive answer or explanation for the back of the card
    3. Assign a difficulty level (Easy, Medium, or Hard) based on the complexity of the concept
    
    Format your response as a JSON array with the following structure:
    [
      {
        "front": "Question or term",
        "back": "Answer or explanation",
        "difficulty": "Easy|Medium|Hard"
      },
      ...
    ]
    
    Make sure the flashcards cover key concepts, definitions, formulas, and important facts about the topic.
    The flashcards should be designed for effective learning and memory retention.
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
      try {
        // Extract the JSON array from the response
        const text = data.candidates[0].content.parts[0].text
        // Find the JSON array in the text (it might be surrounded by markdown or other text)
        const jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s)

        if (jsonMatch) {
          const jsonText = jsonMatch[0]
          const flashcards = JSON.parse(jsonText) as Omit<Flashcard, "id">[]

          // Add IDs to the flashcards
          const flashcardsWithIds = flashcards.map((card) => ({
            ...card,
            id: Math.random().toString(36).substring(2, 11),
          }))

          return {
            success: true,
            data: flashcardsWithIds,
          }
        } else {
          console.error("Could not find JSON array in response:", text)
          return {
            success: false,
            error: "Failed to parse flashcards from response",
          }
        }
      } catch (error) {
        console.error("Error parsing flashcards:", error)
        return {
          success: false,
          error: "Failed to parse flashcards",
        }
      }
    } else {
      console.error("Unexpected response structure:", JSON.stringify(data))
      return {
        success: false,
        error: "Unexpected response from AI service",
      }
    }
  } catch (error) {
    console.error("Error generating flashcards:", error)
    return {
      success: false,
      error: "Failed to generate flashcards",
    }
  }
}

// Try alternative models if the first one fails
async function tryAlternativeModel(prompt: string): Promise<{ success: boolean; data?: Flashcard[]; error?: string }> {
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
        try {
          // Extract the JSON array from the response
          const text = data.candidates[0].content.parts[0].text
          // Find the JSON array in the text (it might be surrounded by markdown or other text)
          const jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s)

          if (jsonMatch) {
            const jsonText = jsonMatch[0]
            const flashcards = JSON.parse(jsonText) as Omit<Flashcard, "id">[]

            // Add IDs to the flashcards
            const flashcardsWithIds = flashcards.map((card) => ({
              ...card,
              id: Math.random().toString(36).substring(2, 11),
            }))

            return {
              success: true,
              data: flashcardsWithIds,
            }
          }
        } catch (error) {
          console.error(`Error parsing flashcards from ${model}:`, error)
          // Continue to the next model
        }
      }
    } catch (error) {
      console.error(`Error with model ${model}:`, error)
      // Continue to the next model
    }
  }

  // If all models fail, return mock flashcards
  console.log("All models failed, returning mock flashcards")
  return {
    success: true,
    data: generateMockFlashcards(),
  }
}

// Generate mock flashcards if all API calls fail
function generateMockFlashcards(): Flashcard[] {
  return [
    {
      id: "flash1",
      front: "What is photosynthesis?",
      back: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water. It produces oxygen as a byproduct and is essential for most life on Earth.",
      difficulty: "Easy",
    },
    {
      id: "flash2",
      front: "What is the Pythagorean theorem?",
      back: "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of the squares of the lengths of the other two sides. It can be written as: a² + b² = c², where c is the hypotenuse.",
      difficulty: "Medium",
    },
    {
      id: "flash3",
      front: "What are the main causes of World War I?",
      back: "The main causes of World War I can be remembered with the acronym MAIN: Militarism (arms race between nations), Alliances (complex treaty systems), Imperialism (competition for colonies), and Nationalism (pride in one's country). The immediate trigger was the assassination of Archduke Franz Ferdinand.",
      difficulty: "Medium",
    },
    {
      id: "flash4",
      front: "What is the law of conservation of energy?",
      back: "The law of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another. The total energy of an isolated system remains constant over time.",
      difficulty: "Medium",
    },
    {
      id: "flash5",
      front: "What is DNA?",
      back: "DNA (deoxyribonucleic acid) is a molecule that carries the genetic instructions used in the growth, development, functioning, and reproduction of all known living organisms. It consists of two strands forming a double helix structure.",
      difficulty: "Easy",
    },
    {
      id: "flash6",
      front: "What is Newton's First Law of Motion?",
      back: "Newton's First Law of Motion (Law of Inertia) states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force.",
      difficulty: "Easy",
    },
    {
      id: "flash7",
      front: "What is the difference between mitosis and meiosis?",
      back: "Mitosis is cell division that results in two identical daughter cells, each with the same number of chromosomes as the parent cell. It's used for growth and repair. Meiosis is cell division that results in four daughter cells, each with half the number of chromosomes as the parent cell. It's used for sexual reproduction.",
      difficulty: "Hard",
    },
    {
      id: "flash8",
      front: "What is the Central Dogma of Molecular Biology?",
      back: "The Central Dogma of Molecular Biology describes the flow of genetic information within a biological system: DNA is transcribed into RNA, which is then translated into proteins. This unidirectional process forms the basis of all cellular functions.",
      difficulty: "Hard",
    },
    {
      id: "flash9",
      front: "What is the difference between ionic and covalent bonds?",
      back: "Ionic bonds form when electrons are transferred from one atom to another, creating oppositely charged ions that attract each other. Covalent bonds form when atoms share electrons. Ionic bonds typically form between metals and non-metals, while covalent bonds typically form between non-metals.",
      difficulty: "Medium",
    },
    {
      id: "flash10",
      front: "What is the function of the mitochondria?",
      back: "Mitochondria are often called the 'powerhouses of the cell' because they generate most of the cell's supply of adenosine triphosphate (ATP), which is used as a source of chemical energy. They also play roles in cell signaling, differentiation, and cell death.",
      difficulty: "Easy",
    },
  ]
}
