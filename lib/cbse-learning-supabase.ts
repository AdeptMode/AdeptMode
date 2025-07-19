


export interface User {
  id: string
  email: string
  created_at: string
}

export interface Purchase {
  id: string
  user_id: string
  class_number: number
  amount: number
  razorpay_payment_id: string
  status: "pending" | "completed" | "failed"
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

// Purchase functions
export async function createPurchase(userId: string, classNumbers: number[], razorpayPaymentId: string) {
  const purchases = classNumbers.map((classNumber) => ({
    user_id: userId,
    class_number: classNumber,
    amount: 200,
    razorpay_payment_id: razorpayPaymentId,
    status: "completed" as const,
  }))


  return { data, error }
}

export async function getUserPurchases(userId: string): Promise<number[]> {
    .from("cbse_learning_purchases")
    .select("class_number")
    .eq("user_id", userId)
    .eq("status", "completed")

  if (error) {
    console.error("Error fetching purchases:", error)
    return []
  }

  return data?.map((p) => p.class_number) || []
}
