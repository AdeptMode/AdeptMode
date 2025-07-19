import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata = {
  title: "About Us - Adept Mode",
  description: "Learn about our mission to transform education with AI.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Adept Mode</h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Our mission is to transform education with AI-powered learning tools that adapt to each student's needs.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Adept Mode was founded by a team of educators, AI researchers, and learning scientists who saw the potential
            for artificial intelligence to revolutionize how students learn.
          </p>
          <p className="text-gray-600 mb-4">
            We believe that every student deserves personalized support that adapts to their unique learning style,
            pace, and needs. Our AI-powered platform makes this level of personalization accessible to all.
          </p>
          <p className="text-gray-600">
            Since our founding, we've helped thousands of students improve their grades, reduce study time, and gain
            confidence in their academic abilities.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalization</h3>
              <p className="text-gray-600">
                We believe learning should adapt to each student's unique needs, not the other way around.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-600">
                We're committed to making high-quality educational support available to all students.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously improve our AI models and learning tools based on the latest research.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
