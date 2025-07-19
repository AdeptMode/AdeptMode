
const class6ScienceContent = {
  grade: "6",
  subject: "science",
  chapter: "1",
  title: "The Wonderful World of Science",
  content: `Science is a way of thinking, observing and doing things to understand the world we live in and to uncover the secrets of the universe. Think of it as a big adventure—we ask questions, explore the world and try to understand how things work. For this, the most important thing is to have 'Curiosity'.

Whether it is studying tiny grains of sand or massive mountains, a leaf of grass or a vast forest, there is always something new and exciting to discover. Science is everywhere - from the depths of the ocean to the vastness of outer space, from what is cooking in the kitchen to what is happening on the playground.

Science is like a giant and unending jigsaw puzzle. Every new discovery we make adds another piece to that puzzle. There is no limit to what we can discover, since every new piece of knowledge leads to more questions and more things to find out.

The Scientific Method:
1. First, we observe something that we find interesting or we do not understand.
2. This makes us wonder and perhaps think of a question about it.
3. Then, we guess a possible answer to that question.
4. We test this guess through experiments or more observations.
5. We then try to analyse the results to see if it actually answers our question.

Scientists are people who follow the scientific method to solve problems or to discover new things. But anyone who follows the scientific method is working like a scientist. When we try to ask questions and find out answers, we are all, in a way, scientists!

What we will explore:
- The amazing variety of life on Earth - plants and animals
- Food and different cuisines across India
- Different materials around us - paper, metal, plastic, rubber, magnets
- Water and its different forms - ice, liquid, steam
- Temperature - understanding hot and cold
- The Sun, Moon, and stars in the sky

Science is rarely done alone. Scientists across the world work together, often in large teams. It is always more fun to discover things together.`,
  topics: [
    "What is Science",
    "Scientific Method",
    "Observation and Questioning",
    "Curiosity and Exploration",
    "Scientists and Scientific Thinking",
    "Living Things",
    "Materials Around Us",
    "Water and Its Forms",
    "Temperature",
    "Celestial Bodies",
  ],
}

export async function populateClass6Science() {
  try {
    const result = await insertCurriculumContent(class6ScienceContent)
    if (result) {
      console.log("Successfully inserted Class 6 Science content:", result)
      return { success: true, data: result }
    } else {
      console.error("Failed to insert Class 6 Science content")
      return { success: false, error: "Failed to insert content" }
    }
  } catch (error) {
    console.error("Error populating curriculum:", error)
    return { success: false, error: "Database error" }
  }
}
