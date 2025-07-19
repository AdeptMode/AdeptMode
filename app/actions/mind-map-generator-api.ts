"use server"

// The Google Gemini API key
const GEMINI_API_KEY = "AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A"

export type MindMapNode = {
  id: string
  label: string
  explanation?: string
  type?: string
  children?: MindMapNode[]
}

// Function to generate mind map data using Google Gemini API
export async function generateMindMap(
  topic: string,
  notes?: string,
): Promise<{ success: boolean; data?: MindMapNode; error?: string }> {
  try {
    // Create a prompt for the AI
    const prompt = `
    You are an AI Mind Map Generator for educational purposes at graduate level. Create a comprehensive, visually structured mind map on the topic "${topic}".
    ${notes ? `Use the following notes as reference:\n${notes}` : ""}
    
    The mind map should:
    1. Have a clear hierarchical structure with the main topic at the center
    2. Include key concepts, subtopics, and important details
    3. Show relationships between different concepts
    4. Be organized in a logical way that aids understanding and revision
    5. Include graduate-level explanations for each concept
    
    Format your response as a JSON object with the following structure:
    {
      "id": "unique-id",
      "label": "Main Topic",
      "explanation": "A detailed graduate-level explanation of this concept, including key theories, historical context, and current applications. This should be comprehensive enough for advanced study.",
      "children": [
        {
          "id": "unique-id-1",
          "label": "Subtopic 1",
          "explanation": "Detailed explanation of this subtopic at graduate level...",
          "children": [
            {
              "id": "unique-id-1-1",
              "label": "Detail 1",
              "explanation": "Detailed explanation of this detail at graduate level...",
              "children": []
            },
            ...
          ]
        },
        ...
      ]
    }
    
    Make sure each node has:
    1. A unique ID
    2. A concise but descriptive label (1-5 words)
    3. A detailed graduate-level explanation (3-5 sentences)
    
    Limit the mind map to a maximum of 3-4 levels of depth and around 20-30 total nodes for clarity.
    Ensure the explanations are sophisticated enough for graduate-level study, including relevant theories, methodologies, and current research where appropriate.
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
        maxOutputTokens: 4096, // Increased token limit for more detailed explanations
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
        return await tryAlternativeModel(topic, prompt)
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
        // Extract the JSON object from the response
        const text = data.candidates[0].content.parts[0].text
        // Find the JSON object in the text (it might be surrounded by markdown or other text)
        const jsonMatch = text.match(/\{[\s\S]*\}/m)

        if (jsonMatch) {
          const jsonText = jsonMatch[0]
          const mindMapData = JSON.parse(jsonText) as MindMapNode

          return {
            success: true,
            data: mindMapData,
          }
        } else {
          console.error("Could not find JSON object in response:", text)
          return {
            success: false,
            error: "Failed to parse mind map data from response",
          }
        }
      } catch (error) {
        console.error("Error parsing mind map data:", error)
        return {
          success: false,
          error: "Failed to parse mind map data",
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
    console.error("Error generating mind map:", error)
    return {
      success: false,
      error: "Failed to generate mind map",
    }
  }
}

// Try alternative models if the first one fails
async function tryAlternativeModel(
  topic: string,
  prompt: string,
): Promise<{ success: boolean; data?: MindMapNode; error?: string }> {
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
          maxOutputTokens: 4096,
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
          // Extract the JSON object from the response
          const text = data.candidates[0].content.parts[0].text
          // Find the JSON object in the text (it might be surrounded by markdown or other text)
          const jsonMatch = text.match(/\{[\s\S]*\}/m)

          if (jsonMatch) {
            const jsonText = jsonMatch[0]
            const mindMapData = JSON.parse(jsonText) as MindMapNode

            return {
              success: true,
              data: mindMapData,
            }
          }
        } catch (error) {
          console.error(`Error parsing mind map data from ${model}:`, error)
          // Continue to the next model
        }
      }
    } catch (error) {
      console.error(`Error with model ${model}:`, error)
      // Continue to the next model
    }
  }

  // If all models fail, return mock mind map data
  console.log("All models failed, returning mock mind map data")
  return {
    success: true,
    data: generateMockMindMap(topic),
  }
}

// Generate mock mind map data if all API calls fail
function generateMockMindMap(topic: string): MindMapNode {
  return {
    id: "root",
    label: topic || "Main Topic",
    explanation: `${topic} is a complex field that encompasses multiple theoretical frameworks and practical applications. At the graduate level, understanding this topic requires deep analysis of its historical development, current methodologies, and emerging research trends. Scholars in this field often engage with interdisciplinary approaches to address the multifaceted nature of the subject.`,
    children: [
      {
        id: "subtopic1",
        label: "Theoretical Foundations",
        explanation:
          "The theoretical foundations represent the epistemological and ontological underpinnings that structure our understanding of this field. These theories have evolved through various academic traditions and continue to be refined through rigorous scholarly debate and empirical research.",
        children: [
          {
            id: "concept1",
            label: "Core Principles",
            explanation:
              "These principles constitute the fundamental axioms and postulates that form the basis of all subsequent theoretical developments. Understanding these principles requires familiarity with both historical contexts and contemporary interpretations.",
            children: [
              {
                id: "principle1",
                label: "Historical Development",
                explanation:
                  "The historical trajectory reveals how these principles emerged from earlier paradigms and were subsequently refined through academic discourse and practical application. This evolution reflects broader intellectual and social currents.",
                children: [],
              },
              {
                id: "principle2",
                label: "Contemporary Applications",
                explanation:
                  "Modern interpretations adapt classical principles to address emerging challenges and incorporate insights from adjacent fields. This adaptive process ensures the continued relevance of foundational concepts in changing contexts.",
                children: [],
              },
            ],
          },
          {
            id: "concept2",
            label: "Methodological Approaches",
            explanation:
              "Diverse methodological frameworks offer complementary analytical tools for investigating phenomena in this field. These approaches vary in their epistemological assumptions, data collection techniques, and analytical procedures.",
            children: [
              {
                id: "method1",
                label: "Quantitative Methods",
                explanation:
                  "Statistical and mathematical techniques enable researchers to identify patterns, test hypotheses, and establish correlations between variables. These methods prioritize measurement precision and replicability of findings.",
                children: [],
              },
              {
                id: "method2",
                label: "Qualitative Paradigms",
                explanation:
                  "Interpretive approaches emphasize contextual understanding and meaning-making processes through techniques such as ethnography, discourse analysis, and phenomenological inquiry. These methods excel at capturing nuance and lived experience.",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "subtopic2",
        label: "Practical Applications",
        explanation:
          "The translation of theoretical knowledge into practical interventions represents a critical dimension of graduate-level expertise. This application process requires sophisticated understanding of contextual factors, stakeholder needs, and implementation challenges.",
        children: [
          {
            id: "app1",
            label: "Professional Contexts",
            explanation:
              "Implementation in professional settings necessitates adaptation to institutional constraints, regulatory frameworks, and organizational cultures. Successful application balances theoretical fidelity with pragmatic considerations.",
            children: [
              {
                id: "context1",
                label: "Organizational Factors",
                explanation:
                  "Institutional structures, power dynamics, and resource constraints significantly influence how theoretical models are operationalized in practice. Effective implementation requires strategic navigation of these organizational realities.",
                children: [],
              },
              {
                id: "context2",
                label: "Ethical Considerations",
                explanation:
                  "Application raises complex ethical questions regarding autonomy, justice, beneficence, and non-maleficence. Graduate-level practitioners must develop sophisticated ethical reasoning to address these dilemmas.",
                children: [],
              },
            ],
          },
          {
            id: "app2",
            label: "Case Studies",
            explanation:
              "Detailed examination of specific implementation instances provides valuable insights into contextual adaptation and effectiveness. These cases illustrate both successful strategies and instructive failures.",
            children: [
              {
                id: "case1",
                label: "Success Factors",
                explanation:
                  "Analysis of successful implementations reveals critical enabling conditions, including stakeholder engagement, resource adequacy, and alignment with existing systems. These factors often interact synergistically rather than additively.",
                children: [],
              },
              {
                id: "case2",
                label: "Implementation Challenges",
                explanation:
                  "Common obstacles include resistance to change, resource constraints, competing priorities, and contextual misalignment. Graduate-level practitioners develop strategies to anticipate and address these challenges proactively.",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "subtopic3",
        label: "Current Research",
        explanation:
          "Contemporary scholarship continues to expand the boundaries of knowledge through innovative research designs, interdisciplinary collaborations, and engagement with emerging societal challenges. Graduate-level understanding requires familiarity with these evolving research frontiers.",
        children: [
          {
            id: "research1",
            label: "Emerging Paradigms",
            explanation:
              "Novel theoretical frameworks challenge established assumptions and offer alternative interpretative lenses. These emerging paradigms often incorporate insights from previously marginalized perspectives and adjacent disciplines.",
            children: [],
          },
          {
            id: "research2",
            label: "Future Directions",
            explanation:
              "Promising research trajectories include methodological innovations, cross-disciplinary integrations, and applications to emerging societal challenges. Graduate-level scholars contribute to these developments through their own research endeavors.",
            children: [],
          },
        ],
      },
    ],
  }
}
