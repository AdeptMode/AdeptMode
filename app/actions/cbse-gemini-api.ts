"use server"

// Google Gemini API key
const GEMINI_API_KEY = "AIzaSyArhTwDG3IfBtMChOCdzY2n1JHoA8tLt2A"

// CBSE curriculum context for each class and subject
const cbseCurriculumContext = {
  "6": {
    Science:
      "NCERT Class 6 Science covers Food, Components of Food, Fibre to Fabric, Sorting Materials, Separation of Substances, Changes Around Us, Getting to Know Plants, Body Movements, Living Organisms, Motion and Measurement, Light Shadows and Reflections, Electricity and Circuits, Fun with Magnets, Water, Air Around Us, Garbage In Garbage Out.",
    Mathematics:
      "NCERT Class 6 Mathematics covers Knowing Our Numbers, Whole Numbers, Playing with Numbers, Basic Geometrical Ideas, Understanding Elementary Shapes, Integers, Fractions, Decimals, Data Handling, Mensuration, Algebra, Ratio and Proportion, Symmetry, Practical Geometry.",
    English:
      "NCERT Class 6 English covers reading comprehension, grammar, writing skills, poetry, prose, and communication skills.",
    "Social Science":
      "NCERT Class 6 Social Science covers History (What Where How and When, From Hunting Gathering to Growing Food, In the Earliest Cities, What Books and Burials Tell Us, Kingdoms Kings and an Early Republic, New Questions and Ideas, Ashoka the Emperor Who Gave Up War, Vital Villages Thriving Towns, Traders Kings and Pilgrims, New Empires and Kingdoms, Buildings Paintings and Books), Geography (The Earth in the Solar System, Globe Latitudes and Longitudes, Motions of the Earth, Maps, Major Domains of the Earth, Major Landforms of the Earth, Our Country India, India Climate Vegetation and Wildlife), Civics (Understanding Diversity, Diversity and Discrimination, What is Government, Key Elements of a Democratic Government, Panchayati Raj, Rural Administration, Urban Administration, Rural Livelihoods, Urban Livelihoods).",
  },
  "7": {
    Science:
      "NCERT Class 7 Science covers Nutrition in Plants, Nutrition in Animals, Fibre to Fabric, Heat, Acids Bases and Salts, Physical and Chemical Changes, Weather Climate and Adaptations, Winds Storms and Cyclones, Soil, Respiration in Organisms, Transportation in Animals and Plants, Reproduction in Plants, Motion and Time, Electric Current and its Effects, Light, Water A Precious Resource, Forests Our Lifeline, Wastewater Story.",
    Mathematics:
      "NCERT Class 7 Mathematics covers Integers, Fractions and Decimals, Data Handling, Simple Equations, Lines and Angles, The Triangle and its Properties, Congruence of Triangles, Comparing Quantities, Rational Numbers, Practical Geometry, Perimeter and Area, Algebraic Expressions, Exponents and Powers, Symmetry, Visualising Solid Shapes.",
    English:
      "NCERT Class 7 English covers advanced reading comprehension, grammar, creative writing, poetry analysis, prose comprehension, and communication skills.",
    "Social Science":
      "NCERT Class 7 Social Science covers History, Geography, and Civics with topics like Medieval India, environment, democracy, and governance.",
  },
  "8": {
    Science:
      "NCERT Class 8 Science covers Crop Production and Management, Microorganisms, Synthetic Fibres and Plastics, Materials Metals and Non-Metals, Coal and Petroleum, Combustion and Flame, Conservation of Plants and Animals, Cell Structure and Functions, Reproduction in Animals, Reaching the Age of Adolescence, Force and Pressure, Friction, Sound, Chemical Effects of Electric Current, Some Natural Phenomena, Light, Stars and the Solar System, Pollution of Air and Water.",
    Mathematics:
      "NCERT Class 8 Mathematics covers Rational Numbers, Linear Equations in One Variable, Understanding Quadrilaterals, Practical Geometry, Data Handling, Squares and Square Roots, Cubes and Cube Roots, Comparing Quantities, Algebraic Expressions and Identities, Mensuration, Exponents and Powers, Direct and Inverse Proportions, Factorisation, Introduction to Graphs, Playing with Numbers.",
    English:
      "NCERT Class 8 English covers complex reading comprehension, advanced grammar, essay writing, poetry appreciation, and effective communication.",
    "Social Science":
      "NCERT Class 8 Social Science covers modern Indian history, geography of resources, and constitutional values.",
  },
  "9": {
    Science:
      "NCERT Class 9 Science covers Matter in Our Surroundings, Is Matter Around Us Pure, Atoms and Molecules, Structure of the Atom, The Fundamental Unit of Life, Tissues, Diversity in Living Organisms, Motion, Force and Laws of Motion, Gravitation, Work and Energy, Sound, Why Do We Fall Ill, Natural Resources, Improvement in Food Resources.",
    Mathematics:
      "NCERT Class 9 Mathematics covers Number Systems, Polynomials, Coordinate Geometry, Linear Equations in Two Variables, Introduction to Euclid's Geometry, Lines and Angles, Triangles, Quadrilaterals, Areas of Parallelograms and Triangles, Circles, Constructions, Heron's Formula, Surface Areas and Volumes, Statistics, Probability.",
    English:
      "NCERT Class 9 English covers literature analysis, advanced grammar, creative writing, and communication skills.",
    "Social Science":
      "NCERT Class 9 Social Science covers French Revolution, Nazism, forest resources, democracy, and constitutional design.",
  },
  "10": {
    Science:
      "NCERT Class 10 Science covers Chemical Reactions and Equations, Acids Bases and Salts, Metals and Non-metals, Carbon and its Compounds, Periodic Classification of Elements, Life Processes, Control and Coordination, How do Organisms Reproduce, Heredity and Evolution, Light Reflection and Refraction, Human Eye and Colourful World, Electricity, Magnetic Effects of Electric Current, Our Environment, Management of Natural Resources.",
    Mathematics:
      "NCERT Class 10 Mathematics covers Real Numbers, Polynomials, Pair of Linear Equations in Two Variables, Quadratic Equations, Arithmetic Progressions, Triangles, Coordinate Geometry, Introduction to Trigonometry, Some Applications of Trigonometry, Circles, Constructions, Areas Related to Circles, Surface Areas and Volumes, Statistics, Probability.",
    English: "NCERT Class 10 English covers advanced literature, grammar, writing skills, and communication.",
    "Social Science":
      "NCERT Class 10 Social Science covers nationalism, industrialization, natural resources, democracy, and federalism.",
  },
  "11": {
    Physics:
      "NCERT Class 11 Physics covers Physical World, Units and Measurements, Motion in a Straight Line, Motion in a Plane, Laws of Motion, Work Energy and Power, System of Particles and Rotational Motion, Gravitation, Mechanical Properties of Solids, Mechanical Properties of Fluids, Thermal Properties of Matter, Thermodynamics, Kinetic Theory, Oscillations, Waves.",
    Chemistry:
      "NCERT Class 11 Chemistry covers Some Basic Concepts of Chemistry, Structure of Atom, Classification of Elements and Periodicity in Properties, Chemical Bonding and Molecular Structure, States of Matter, Thermodynamics, Equilibrium, Redox Reactions, Hydrogen, The s-Block Elements, The p-Block Elements, Organic Chemistry Some Basic Principles and Techniques, Hydrocarbons, Environmental Chemistry.",
    Mathematics:
      "NCERT Class 11 Mathematics covers Sets, Relations and Functions, Trigonometric Functions, Principle of Mathematical Induction, Complex Numbers and Quadratic Equations, Linear Inequalities, Permutations and Combinations, Binomial Theorem, Sequences and Series, Straight Lines, Conic Sections, Introduction to Three Dimensional Geometry, Limits and Derivatives, Mathematical Reasoning, Statistics, Probability.",
    Biology:
      "NCERT Class 11 Biology covers The Living World, Biological Classification, Plant Kingdom, Animal Kingdom, Morphology of Flowering Plants, Anatomy of Flowering Plants, Structural Organisation in Animals, Cell The Unit of Life, Biomolecules, Cell Cycle and Cell Division, Transport in Plants, Mineral Nutrition, Photosynthesis in Higher Plants, Respiration in Plants, Plant Growth and Development, Digestion and Absorption, Breathing and Exchange of Gases, Body Fluids and Circulation, Excretory Products and their Elimination, Locomotion and Movement, Neural Control and Coordination, Chemical Coordination and Integration.",
    English: "NCERT Class 11 English covers advanced literature, poetry, prose, grammar, and writing skills.",
  },
  "12": {
    Physics:
      "NCERT Class 12 Physics covers Electric Charges and Fields, Electrostatic Potential and Capacitance, Current Electricity, Moving Charges and Magnetism, Magnetism and Matter, Electromagnetic Induction, Alternating Current, Electromagnetic Waves, Ray Optics and Optical Instruments, Wave Optics, Dual Nature of Radiation and Matter, Atoms, Nuclei, Semiconductor Electronics Materials Devices and Simple Circuits.",
    Chemistry:
      "NCERT Class 12 Chemistry covers The Solid State, Solutions, Electrochemistry, Chemical Kinetics, Surface Chemistry, General Principles and Processes of Isolation of Elements, The p-Block Elements, The d and f Block Elements, Coordination Compounds, Haloalkanes and Haloarenes, Alcohols Phenols and Ethers, Aldehydes Ketones and Carboxylic Acids, Amines, Biomolecules, Polymers, Chemistry in Everyday Life.",
    Mathematics:
      "NCERT Class 12 Mathematics covers Relations and Functions, Inverse Trigonometric Functions, Matrices, Determinants, Continuity and Differentiability, Applications of Derivatives, Integrals, Applications of Integrals, Differential Equations, Vector Algebra, Three Dimensional Geometry, Linear Programming, Probability.",
    Biology:
      "NCERT Class 12 Biology covers Reproduction in Organisms, Sexual Reproduction in Flowering Plants, Human Reproduction, Reproductive Health, Principles of Inheritance and Variation, Molecular Basis of Inheritance, Evolution, Human Health and Disease, Strategies for Enhancement in Food Production, Microbes in Human Welfare, Biotechnology Principles and Processes, Biotechnology and its Applications, Organisms and Populations, Ecosystem, Biodiversity and Conservation, Environmental Issues.",
    English:
      "NCERT Class 12 English covers advanced literature analysis, poetry, prose, grammar, and professional writing skills.",
  },
}

export async function generateCBSEResponse(
  topic: string,
  classNumber: string,
  subject: string,
  mode: "explain" | "summarize" | "examples" | "practice" = "explain",
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // Get curriculum context
    const curriculumContext =
      cbseCurriculumContext[classNumber as keyof typeof cbseCurriculumContext]?.[subject as keyof any] || ""

    // Create mode-specific prompts
    let prompt = ""

    switch (mode) {
      case "explain":
        prompt = `You are an expert CBSE teacher for Class ${classNumber} ${subject}. 

CURRICULUM CONTEXT: ${curriculumContext}

Please provide a detailed explanation of "${topic}" that is:
1. Aligned with CBSE Class ${classNumber} ${subject} curriculum
2. Age-appropriate for Class ${classNumber} students
3. Includes relevant examples and analogies
4. Covers key concepts, definitions, and applications
5. Follows NCERT textbook approach
6. Includes important points for board exam preparation

Make sure the explanation is comprehensive yet easy to understand for a Class ${classNumber} student.`
        break

      case "summarize":
        prompt = `You are an expert CBSE teacher for Class ${classNumber} ${subject}.

CURRICULUM CONTEXT: ${curriculumContext}

Please provide a concise summary of "${topic}" that includes:
1. Key points aligned with CBSE Class ${classNumber} curriculum
2. Important definitions and formulas (if applicable)
3. Main concepts in bullet points
4. Quick revision notes format
5. Board exam important points

Keep it brief but comprehensive for Class ${classNumber} level.`
        break

      case "examples":
        prompt = `You are an expert CBSE teacher for Class ${classNumber} ${subject}.

CURRICULUM CONTEXT: ${curriculumContext}

Please provide practical examples and applications of "${topic}" that include:
1. Real-life examples relevant to Class ${classNumber} students
2. Step-by-step solved examples (if applicable)
3. Common applications and uses
4. Relatable analogies for better understanding
5. Examples that often appear in CBSE board exams

Focus on making the concept clear through examples.`
        break

      case "practice":
        prompt = `You are an expert CBSE teacher for Class ${classNumber} ${subject}.

CURRICULUM CONTEXT: ${curriculumContext}

Please create practice questions on "${topic}" that include:
1. 3-4 multiple choice questions with answers
2. 2-3 short answer questions (2-3 marks each)
3. 1-2 long answer questions (5 marks each)
4. Questions similar to CBSE board exam pattern
5. Include answers and explanations
6. Difficulty level appropriate for Class ${classNumber}

Format the questions clearly with proper marking scheme.`
        break
    }

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
