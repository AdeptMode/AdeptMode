import AnxietyCoachForm from "@/components/anxiety-coach/anxiety-coach-form"

export const metadata = {
  title: "Exam Anxiety Coach - AITOPIAN",
  description:
    "Get personalized relaxation techniques, motivational tips, and stress-relief strategies for exam anxiety.",
}

export default function AnxietyCoachPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Exam Anxiety Coach</h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Get personalized support to manage exam stress and anxiety. Our AI coach provides relaxation techniques,
            motivational tips, guided meditation, and practical strategies to help you perform at your best.
          </p>
        </div>

        <AnxietyCoachForm />
      </div>
    </div>
  )
}
