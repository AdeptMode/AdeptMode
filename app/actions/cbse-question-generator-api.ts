"use server"

// Google Gemini API key
const GEMINI_API_KEY = "AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A"

// CBSE exam patterns and previous year trends for each class
const cbseExamPatterns = {
  "6": {
    Science: {
      pattern: "40 marks - 1 mark (20 questions), 2 marks (10 questions), 3 marks (7 questions), 5 marks (3 questions)",
      topics: "Food, Materials, Living Organisms, Motion, Light, Water, Air",
      previousYearTrends:
        "Questions on food components, plant parts, simple machines, and basic experiments are frequently asked.",
    },
    Mathematics: {
      pattern: "80 marks - 1 mark (20 questions), 2 marks (6 questions), 3 marks (10 questions), 4 marks (6 questions)",
      topics: "Numbers, Geometry, Integers, Fractions, Decimals, Data Handling, Mensuration",
      previousYearTrends:
        "Word problems on fractions, basic geometry constructions, and data interpretation are common.",
    },
    English: {
      pattern: "80 marks - Reading (20), Writing (25), Grammar (20), Literature (15)",
      topics: "Reading comprehension, Grammar, Creative writing, Poetry, Prose",
      previousYearTrends: "Comprehension passages, letter writing, and poem analysis are frequently tested.",
    },
    "Social Science": {
      pattern: "80 marks - 1 mark (20 questions), 3 marks (8 questions), 5 marks (6 questions)",
      topics: "History, Geography, Civics - Ancient India, Earth, Democracy",
      previousYearTrends: "Map work, historical timelines, and government functions are commonly asked.",
    },
  },
  "7": {
    Science: {
      pattern: "80 marks - 1 mark (20 questions), 2 marks (6 questions), 3 marks (10 questions), 5 marks (6 questions)",
      topics: "Nutrition, Heat, Acids-Bases, Weather, Soil, Respiration, Transportation",
      previousYearTrends: "Experiments on nutrition, weather patterns, and life processes are frequently asked.",
    },
    Mathematics: {
      pattern: "80 marks - 1 mark (20 questions), 2 marks (6 questions), 3 marks (10 questions), 4 marks (6 questions)",
      topics: "Integers, Fractions, Equations, Geometry, Congruence, Rational Numbers",
      previousYearTrends: "Algebraic expressions, geometric constructions, and data handling problems are common.",
    },
    English: {
      pattern: "80 marks - Reading (20), Writing (25), Grammar (20), Literature (15)",
      topics: "Advanced reading, Grammar, Essay writing, Poetry analysis",
      previousYearTrends: "Analytical writing, grammar applications, and literature interpretation are tested.",
    },
    "Social Science": {
      pattern: "80 marks - 1 mark (20 questions), 3 marks (8 questions), 5 marks (6 questions)",
      topics: "Medieval India, Environment, Democracy, Markets",
      previousYearTrends: "Historical events, environmental issues, and democratic processes are emphasized.",
    },
  },
  "8": {
    Science: {
      pattern: "80 marks - 1 mark (20 questions), 2 marks (6 questions), 3 marks (10 questions), 5 marks (6 questions)",
      topics: "Crop Production, Microorganisms, Materials, Force, Sound, Light",
      previousYearTrends: "Practical applications, scientific methods, and real-life examples are frequently tested.",
    },
    Mathematics: {
      pattern: "80 marks - 1 mark (20 questions), 2 marks (6 questions), 3 marks (10 questions), 4 marks (6 questions)",
      topics: "Rational Numbers, Linear Equations, Quadrilaterals, Mensuration, Factorisation",
      previousYearTrends: "Problem-solving, geometric proofs, and algebraic manipulations are common.",
    },
    English: {
      pattern: "80 marks - Reading (20), Writing (25), Grammar (20), Literature (15)",
      topics: "Complex reading, Advanced grammar, Essay writing, Literature analysis",
      previousYearTrends: "Critical thinking, advanced grammar usage, and literary analysis are emphasized.",
    },
    "Social Science": {
      pattern: "80 marks - 1 mark (20 questions), 3 marks (8 questions), 5 marks (6 questions)",
      topics: "Modern India, Resources, Constitution, Social Issues",
      previousYearTrends: "Constitutional values, resource management, and social awareness are key areas.",
    },
  },
  "9": {
    Science: {
      pattern: "80 marks - 1 mark (20 questions), 2 marks (6 questions), 3 marks (10 questions), 5 marks (6 questions)",
      topics: "Matter, Atoms, Life Processes, Motion, Force, Sound, Health",
      previousYearTrends: "Conceptual understanding, numerical problems, and diagram-based questions are common.",
    },
    Mathematics: {
      pattern: "80 marks - 1 mark (20 questions), 2 marks (6 questions), 3 marks (10 questions), 4 marks (6 questions)",
      topics: "Number Systems, Polynomials, Coordinate Geometry, Triangles, Statistics",
      previousYearTrends: "Proof-based questions, coordinate geometry, and statistical analysis are frequently asked.",
    },
    English: {
      pattern: "80 marks - Reading (20), Writing (25), Grammar (20), Literature (15)",
      topics: "Literature analysis, Advanced writing, Grammar applications",
      previousYearTrends: "Character analysis, theme interpretation, and creative writing are emphasized.",
    },
    "Social Science": {
      pattern: "80 marks - 1 mark (20 questions), 3 marks (8 questions), 5 marks (6 questions)",
      topics: "French Revolution, Nazism, Physical Features, Democracy",
      previousYearTrends: "Historical analysis, geographical features, and democratic principles are key focus areas.",
    },
  },
  "10": {
    Science: {
      pattern: "80 marks - 1 mark (20 questions), 2 marks (6 questions), 3 marks (10 questions), 5 marks (6 questions)",
      topics: "Chemical Reactions, Acids-Bases, Metals, Carbon, Life Processes, Light, Electricity",
      previousYearTrends:
        "Board exam focuses on practical applications, chemical equations, and life science concepts.",
    },
    Mathematics: {
      pattern: "80 marks - 1 mark (20 questions), 2 marks (6 questions), 3 marks (10 questions), 4 marks (6 questions)",
      topics: "Real Numbers, Polynomials, Linear Equations, Quadratic Equations, Trigonometry, Coordinate Geometry",
      previousYearTrends:
        "Application-based problems, trigonometric identities, and coordinate geometry are heavily tested.",
    },
    English: {
      pattern: "80 marks - Reading (20), Writing (25), Grammar (20), Literature (15)",
      topics: "Literature, Grammar, Writing skills, Communication",
      previousYearTrends: "Board exams emphasize literature analysis, formal writing, and grammar applications.",
    },
    "Social Science": {
      pattern: "80 marks - 1 mark (20 questions), 3 marks (8 questions), 5 marks (6 questions)",
      topics: "Nationalism, Industrialization, Resources, Democracy, Federalism",
      previousYearTrends: "Map work, case studies, and analytical questions on democracy and economics are common.",
    },
  },
  "11": {
    Physics: {
      pattern: "70 marks - 1 mark (15 questions), 2 marks (5 questions), 3 marks (7 questions), 5 marks (3 questions)",
      topics: "Mechanics, Thermodynamics, Oscillations, Waves",
      previousYearTrends:
        "Numerical problems, derivations, and conceptual questions on mechanics and waves are frequent.",
    },
    Chemistry: {
      pattern: "70 marks - 1 mark (15 questions), 2 marks (5 questions), 3 marks (7 questions), 5 marks (3 questions)",
      topics: "Atomic Structure, Chemical Bonding, Thermodynamics, Equilibrium, Organic Chemistry",
      previousYearTrends:
        "Structure-property relationships, organic reactions, and thermodynamic calculations are emphasized.",
    },
    Mathematics: {
      pattern: "80 marks - 1 mark (20 questions), 4 marks (6 questions), 6 marks (4 questions)",
      topics: "Sets, Functions, Trigonometry, Complex Numbers, Permutations, Coordinate Geometry",
      previousYearTrends:
        "Trigonometric equations, coordinate geometry, and combinatorics problems are frequently asked.",
    },
    Biology: {
      pattern: "70 marks - 1 mark (15 questions), 2 marks (5 questions), 3 marks (7 questions), 5 marks (3 questions)",
      topics: "Cell Biology, Plant Physiology, Human Physiology, Diversity",
      previousYearTrends: "Diagram-based questions, physiological processes, and classification are commonly tested.",
    },
    English: {
      pattern: "80 marks - Reading (20), Writing (25), Grammar (20), Literature (15)",
      topics: "Advanced literature, Critical analysis, Creative writing",
      previousYearTrends: "Literary criticism, advanced writing techniques, and language analysis are emphasized.",
    },
  },
  "12": {
    Physics: {
      pattern: "70 marks - 1 mark (15 questions), 2 marks (5 questions), 3 marks (7 questions), 5 marks (3 questions)",
      topics: "Electrostatics, Current Electricity, Magnetism, Optics, Modern Physics",
      previousYearTrends: "Board exams focus on electromagnetic theory, optics, and modern physics applications.",
    },
    Chemistry: {
      pattern: "70 marks - 1 mark (15 questions), 2 marks (5 questions), 3 marks (7 questions), 5 marks (3 questions)",
      topics: "Solid State, Solutions, Electrochemistry, Chemical Kinetics, Organic Chemistry",
      previousYearTrends: "Organic synthesis, electrochemistry calculations, and kinetics are heavily emphasized.",
    },
    Mathematics: {
      pattern: "80 marks - 1 mark (20 questions), 4 marks (6 questions), 6 marks (4 questions)",
      topics: "Relations, Calculus, Vectors, 3D Geometry, Linear Programming, Probability",
      previousYearTrends: "Calculus applications, vector algebra, and probability distributions are frequently tested.",
    },
    Biology: {
      pattern: "70 marks - 1 mark (15 questions), 2 marks (5 questions), 3 marks (7 questions), 5 marks (3 questions)",
      topics: "Reproduction, Genetics, Evolution, Ecology, Biotechnology",
      previousYearTrends: "Genetics problems, ecological concepts, and biotechnology applications are emphasized.",
    },
    English: {
      pattern: "80 marks - Reading (20), Writing (25), Grammar (20), Literature (15)",
      topics: "Literature analysis, Professional writing, Language skills",
      previousYearTrends: "Board exams focus on literary interpretation, formal writing, and language proficiency.",
    },
  },
}

export async function generateCBSEQuestions(
  classNumber: string,
  subject: string,
  topic: string,
  questionCount = 10,
  difficulty: "Easy" | "Medium" | "Hard" | "Mixed" = "Mixed",
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // Get exam pattern and trends
    const examInfo = cbseExamPatterns[classNumber as keyof typeof cbseExamPatterns]?.[subject as keyof any]

    if (!examInfo) {
      return {
        success: false,
        error: "Subject not available for the selected class.",
      }
    }

    const prompt = `You are an expert CBSE examiner and question paper setter for Class ${classNumber} ${subject}.

EXAM PATTERN: ${examInfo.pattern}
SYLLABUS TOPICS: ${examInfo.topics}
PREVIOUS YEAR TRENDS: ${examInfo.previousYearTrends}

Generate ${questionCount} high-quality exam questions on "${topic}" that follow CBSE board exam patterns:

QUESTION DISTRIBUTION:
- Include a mix of 1-mark, 2-mark, 3-mark, and 5-mark questions
- Follow the exact marking scheme and pattern used in CBSE board exams
- Include questions similar to those asked in previous years

QUESTION TYPES TO INCLUDE:
1. Multiple Choice Questions (1 mark each)
2. Very Short Answer Questions (1-2 marks)
3. Short Answer Questions (3 marks)
4. Long Answer Questions (5 marks)
5. Application-based questions
6. Diagram-based questions (where applicable)

REQUIREMENTS:
- Questions should be exactly like CBSE board exam style
- Include proper marking scheme for each question
- Provide detailed answers and explanations
- Include diagrams/figures where necessary (describe them)
- Focus on conceptual understanding and application
- Include numerical problems (if applicable for the subject)
- Questions should test different cognitive levels (knowledge, understanding, application, analysis)

DIFFICULTY LEVEL: ${difficulty}
CLASS LEVEL: Appropriate for Class ${classNumber} students

FORMAT YOUR RESPONSE AS:
**CBSE Class ${classNumber} ${subject} - ${topic}**
**Total Questions: ${questionCount}**

**SECTION A: MULTIPLE CHOICE QUESTIONS (1 mark each)**
[Include MCQs with 4 options each]

**SECTION B: SHORT ANSWER QUESTIONS (2-3 marks each)**
[Include short answer questions]

**SECTION C: LONG ANSWER QUESTIONS (5 marks each)**
[Include detailed questions]

**ANSWER KEY WITH EXPLANATIONS**
[Provide detailed solutions for all questions]

Make sure all questions are:
- Aligned with NCERT curriculum
- Similar to previous year board exam questions
- Appropriate for Class ${classNumber} level
- Cover important concepts from "${topic}"
- Include proper marking scheme`

    // Call Gemini API
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

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
        maxOutputTokens: 3000,
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
      console.error("Gemini API error:", await response.text())
      return {
        success: false,
        error: "Sorry, content is currently unavailable. Please try again later.",
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
