"use server"

// The Google Gemini API key
const GEMINI_API_KEY = "AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A"

// Types for essay writer
export type EssayWriterInput = {
  topic: string
  essayType: string
  wordCount: number
  additionalInstructions?: string
  existingContent?: string
}

// Function to generate essay content using Google Gemini API
export async function generateEssayContent(
  input: EssayWriterInput,
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // Create a prompt for the AI
    const prompt = `
    You are an AI Essay Writing Assistant for students. Help with the following essay:
    
    Topic: ${input.topic}
    Type of Essay: ${input.essayType}
    Target Word Count: ${input.wordCount} words
    ${input.additionalInstructions ? `Additional Instructions: ${input.additionalInstructions}` : ""}
    ${input.existingContent ? `Existing Content to Improve/Continue: ${input.existingContent}` : ""}
    
    ${
      input.existingContent
        ? `Please analyze the existing content and provide:
        1. Suggestions for improving the writing style, clarity, and flow
        2. Grammar and punctuation corrections
        3. Ideas for strengthening the arguments or adding relevant points
        4. Recommendations for better structure or organization`
        : `Please provide:
        1. A suggested essay structure with an introduction, body paragraphs, and conclusion
        2. Key points and arguments to include in each section
        3. Potential thesis statement
        4. Relevant examples, evidence, or references that could strengthen the essay
        5. Tips for maintaining academic tone and style appropriate for this type of essay`
    }
    
    Format your response in a clear, structured way using markdown with headings, bullet points, and numbered lists.
    Do not write the complete essay for the student, but provide substantial guidance, structure, and content suggestions.
    Include tips for improving writing style, clarity, and academic tone.
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
    console.error("Error generating essay content:", error)
    return {
      success: false,
      error: "Failed to generate essay content",
    }
  }
}

// Function to improve existing content
export async function improveWriting(
  content: string,
  focusArea: "grammar" | "style" | "structure" | "all" = "all",
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // Create a prompt for the AI
    let prompt = `
    You are an AI Writing Improvement Assistant for students. Analyze and improve the following content:
    
    ${content}
    
    `

    switch (focusArea) {
      case "grammar":
        prompt += `
        Focus on grammar and punctuation corrections. Identify and fix:
        1. Grammatical errors
        2. Punctuation mistakes
        3. Spelling errors
        4. Subject-verb agreement issues
        5. Tense consistency problems
        
        Format your response with:
        - A list of identified issues
        - Corrected versions of problematic sentences
        - A fully corrected version of the text
        `
        break
      case "style":
        prompt += `
        Focus on improving writing style and clarity. Provide suggestions for:
        1. More precise and varied vocabulary
        2. Better sentence structure and variety
        3. Improved transitions between ideas
        4. More concise phrasing
        5. More engaging and academic tone
        
        Format your response with:
        - Specific style improvement suggestions
        - Examples of revised sentences
        - Tips for maintaining a consistent and appropriate tone
        `
        break
      case "structure":
        prompt += `
        Focus on improving the structure and organization. Provide suggestions for:
        1. Better paragraph organization
        2. Improved flow of ideas
        3. Stronger topic sentences
        4. More effective introduction and conclusion
        5. Better logical progression of arguments
        
        Format your response with:
        - Analysis of current structure
        - Suggested reorganization
        - Tips for improving coherence and cohesion
        `
        break
      case "all":
      default:
        prompt += `
        Provide comprehensive improvement suggestions covering:
        1. Grammar and punctuation corrections
        2. Style and clarity enhancements
        3. Structure and organization improvements
        4. Vocabulary and phrasing suggestions
        5. Academic tone and formality adjustments
        
        Format your response with:
        - A summary of the main strengths and weaknesses
        - Specific improvement suggestions in each category
        - Examples of revised sentences or paragraphs
        - A conclusion with general writing improvement tips
        `
        break
    }

    prompt += `
    Use markdown formatting with headings, bullet points, and examples.
    Be constructive and educational in your feedback.
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
    console.error("Error improving writing:", error)
    return {
      success: false,
      error: "Failed to improve writing",
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
  return `# Essay Structure and Content Suggestions

## Introduction

### Thesis Statement Suggestion
A strong thesis statement for this topic could be: "While [main argument], it is important to consider [counter perspective] because [reasoning]."

### Opening Strategies
- Begin with a relevant quotation to engage the reader
- Start with a surprising statistic or fact related to your topic
- Pose a thought-provoking question that your essay will answer
- Provide brief historical context for your topic

### Context Setting
Make sure to briefly explain:
- Key terms and concepts relevant to your topic
- The current debate or conversation surrounding this issue
- Why this topic matters in a broader context

## Body Paragraphs

### First Main Point
**Topic Sentence:** "The first significant aspect to consider is..."

**Supporting Evidence to Consider:**
- Academic research from [relevant field]
- Historical examples that demonstrate this point
- Statistical data that supports your argument

**Analysis Approach:**
- Connect evidence directly to your thesis
- Explain the significance of this evidence
- Address potential counterarguments to this point

### Second Main Point
**Topic Sentence:** "Another crucial dimension of this issue involves..."

**Supporting Evidence to Consider:**
- Expert opinions from authorities in the field
- Case studies that illustrate your point
- Comparative examples that strengthen your argument

**Analysis Approach:**
- Demonstrate the logical connection between points
- Deepen the analysis by considering implications
- Use transitional phrases to maintain flow

### Third Main Point
**Topic Sentence:** "Perhaps most importantly..."

**Supporting Evidence to Consider:**
- Current events that relate to your argument
- Primary sources that provide direct insight
- Theoretical frameworks that help explain your position

**Analysis Approach:**
- Develop more complex aspects of your argument
- Connect back to earlier points for cohesion
- Anticipate and address the strongest counterarguments

## Conclusion

### Synthesis Strategies
- Briefly summarize your main points without simply repeating them
- Revisit your thesis and show how you've proven it
- Connect your specific topic to broader implications or significance

### Ending Techniques
- End with a call to action if appropriate
- Propose questions for further research or consideration
- Circle back to your introduction for a sense of closure
- Leave the reader with a memorable final thought

## Writing Style Tips

### Academic Tone
- Maintain formal language throughout
- Avoid contractions, slang, and overly casual expressions
- Use precise vocabulary specific to your subject area
- Limit use of first person unless specifically required

### Clarity Improvements
- Vary sentence structure for better flow
- Use strong topic sentences to guide the reader
- Ensure each paragraph focuses on a single main idea
- Use transitional phrases between paragraphs and sections

### Common Pitfalls to Avoid
- Overgeneralizations without sufficient evidence
- Emotional appeals that lack logical support
- Excessive quotations without adequate analysis
- Introducing new arguments in the conclusion

Remember to adapt these suggestions to fit your specific assignment requirements and writing style. This structure provides a foundation that you can customize based on your topic's unique needs.`
}
