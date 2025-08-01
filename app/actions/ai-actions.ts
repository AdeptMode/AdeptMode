"use server"

import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { getMockResponse } from "./mock-responses"

// Configure the Google client with the API key from our environment variable
const googleClient = google({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
})

type MessageType = {
  role: "user" | "assistant" | "system"
  content: string
}

// Fallback responses when API is unavailable
const fallbackResponses = {
  explain:
    "I'm currently unable to connect to my knowledge base due to high demand. Here's a general approach to understanding this topic: Break it down into smaller parts, look for familiar concepts, and try to relate it to something you already know. Please try again later when I can provide a more specific explanation.",
  summarize:
    "I'm currently unable to generate summary notes due to high demand. When creating your own summary, focus on main ideas, key terms, and supporting details. Use bullet points and organize by themes or chronology. Please try again later when I can help with a specific summary.",
  flashcards:
    "I'm currently unable to generate flashcards due to high demand. When creating your own flashcards, focus on key concepts, definitions, and cause-effect relationships. Keep questions clear and answers concise. Please try again later when I can help create specific flashcards.",
  quiz: "I'm currently unable to generate a quiz due to high demand. When studying, try to create your own questions that test understanding rather than memorization. Include a mix of factual recall and application questions. Please try again later when I can help create a specific quiz.",
}

export async function generateStudyBuddyResponse(
  messages: MessageType[],
  mode: "explain" | "summarize" | "flashcards" | "quiz" = "explain",
) {
  try {
    // Get the latest user message to determine the topic
    const latestUserMessage = messages.filter((msg) => msg.role === "user").pop()?.content || ""

    // Create a system message based on the mode
    let systemMessage = ""

    switch (mode) {
      case "explain":
        systemMessage = `You are an AI Study Buddy that helps students understand complex topics. 
        Explain concepts in simple, clear language using analogies and examples when helpful. 
        Keep explanations concise but thorough.`
        break
      case "summarize":
        systemMessage = `You are an AI Study Buddy that creates summary notes. 
        Create concise, well-structured summary notes on the topic the student provides. 
        Use bullet points, numbered lists, and clear headings to organize information.`
        break
      case "flashcards":
        systemMessage = `You are an AI Study Buddy that creates flashcards for studying. 
        Generate 5-10 flashcards on the topic in this format:
        CARD 1:
        Question: [question]
        Answer: [answer]
        
        CARD 2:
        Question: [question]
        Answer: [answer]
        
        And so on. Make sure the questions test key concepts and the answers are concise.`
        break
      case "quiz":
        systemMessage = `You are an AI Study Buddy that creates quizzes to test knowledge. 
        Generate a 5-question multiple-choice quiz on the topic in this format:
        
        Q1: [question]
        A) [option]
        B) [option]
        C) [option]
        D) [option]
        Correct Answer: [letter]
        Explanation: [brief explanation]
        
        Q2: [question]
        ...and so on. Make sure the questions test understanding, not just memorization.`
        break
    }

    // Add the system message to the beginning of the messages array
    const messagesWithSystem = [{ role: "system", content: systemMessage }, ...messages]

    try {
      // Check if API key exists
      if (!process.env.GOOGLE_GEMINI_API_KEY) {
        console.log("API key missing, using mock response")
        // Use mock response if API key is missing
        return {
          success: true,
          data: getMockResponse(mode, latestUserMessage),
          isMock: true,
        }
      }

      // Generate response using Google Gemini with our configured client
      const { text } = await generateText({
        model: googleClient("gemini-pro"),
        messages: messagesWithSystem,
      })

      return { success: true, data: text }
    } catch (error: any) {
      console.error("Google Gemini API Error:", error)

      // Check if it's an API key error
      if (error.message && error.message.includes("API key")) {
        console.error("API Key Error Details:", {
          keyExists: !!process.env.GOOGLE_GEMINI_API_KEY,
          keyLength: process.env.GOOGLE_GEMINI_API_KEY?.length || 0,
        })

        // Use mock response for API key errors
        return {
          success: true,
          data: getMockResponse(mode, latestUserMessage),
          isMock: true,
        }
      }

      // Check if it's another type of API error
      if (
        error.message &&
        (error.message.includes("quota") ||
          error.message.includes("exceeded") ||
          error.message.includes("billing") ||
          error.message.includes("rate limit"))
      ) {
        // Return a fallback response based on the mode
        return {
          success: true,
          data: fallbackResponses[mode],
          isLimited: true,
        }
      }

      // For other errors, use mock response
      return {
        success: true,
        data: getMockResponse(mode, latestUserMessage),
        isMock: true,
      }
    }
  } catch (error) {
    console.error("Error generating study buddy response:", error)
    return {
      success: false,
      error: "We're experiencing high demand right now. Please try again in a few moments.",
    }
  }
}
