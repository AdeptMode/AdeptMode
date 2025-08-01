


// Types
export interface User {
  id: string
  email: string
  created_at: string
}

export interface Payment {
  id: string
  user_id: string
  class_number: number
  amount: number
  razorpay_payment_id: string
  status: "pending" | "completed" | "failed"
  created_at: string
}

export interface Chapter {
  id: string
  class_number: number
  subject: string
  chapter_number: number
  title: string
  description: string
  is_free: boolean
}

export interface CurriculumContent {
  id: string
  grade: string
  subject: string
  chapter: string
  title: string
  content: string
  created_at: string
}

// Auth functions
export async function signUp(email: string, password: string) {
    email,
    password,
  })
  return { data, error }
}

export async function signIn(email: string, password: string) {
    email,
    password,
  })
  return { data, error }
}

export async function signOut() {
  return { error }
}

export async function getCurrentUser() {
  const {
    data: { user },
  return user
}

// Payment functions
export async function createPayment(userId: string, classNumber: number, razorpayPaymentId: string) {
    .from("payments")
    .insert([
      {
        user_id: userId,
        class_number: classNumber,
        amount: 200,
        razorpay_payment_id: razorpayPaymentId,
        status: "completed",
      },
    ])
    .select()

  return { data, error }
}

export async function getUserPayments(userId: string) {

  return { data, error }
}

// Content functions
export async function getChapters(classNumber: number, subject: string) {
    .from("chapters")
    .select("*")
    .eq("class_number", classNumber)
    .eq("subject", subject)
    .order("chapter_number")

  return { data, error }
}


  return { data, error }
}

// Fixed function to use the correct column name
export async function getCurriculumContent(grade: string, subject: string) {
  try {
    // Convert grade string to number (e.g., "11" -> 11)
    const classNumber = Number.parseInt(grade)

    if (isNaN(classNumber)) {
      console.error("Invalid grade provided:", grade)
      return []
    }

    // Use the correct column name 'class_number' instead of 'class_number'
      .from("chapters")
      .select("*")
      .eq("class_number", classNumber)
      .eq("subject", subject.toLowerCase())
      .order("chapter_number")

    if (error) {
      console.error("Error fetching curriculum content:", error)
      return []
    }

    // Transform chapters data to match CurriculumContent interface
    const curriculumContent = (data || []).map((chapter) => ({
      id: chapter.id,
      grade: grade,
      subject: subject,
      chapter: `Chapter ${chapter.chapter_number}`,
      title: chapter.title,
      content:
        chapter.description ||
        `This chapter covers ${chapter.title}. It includes fundamental concepts and practical applications relevant to CBSE Class ${grade} ${subject} curriculum.`,
      created_at: chapter.created_at,
    }))

    return curriculumContent
  } catch (error) {
    console.error("Error in getCurriculumContent:", error)
    return []
  }
}
