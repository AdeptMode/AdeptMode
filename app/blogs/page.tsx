import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, User, Calendar, Tag } from "lucide-react"

export const metadata = {
  title: "Educational Blog - AI Learning Tips, Study Techniques & Parenting Advice | Adept Mode",
  description:
    "Discover expert insights on AI-powered education, effective study techniques, parenting tips, and modern learning strategies. Transform your educational journey with research-backed advice.",
  keywords:
    "AI education, study techniques, parenting tips, online learning, educational technology, student success, learning strategies, homework help, reading skills, anxiety management",
  openGraph: {
    title: "Educational Blog - AI Learning & Study Tips | Adept Mode",
    description: "Expert insights on AI-powered education, study techniques, and parenting advice for modern learners.",
    type: "website",
    url: "https://adeptmode.com/blogs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Educational Blog - AI Learning & Study Tips | Adept Mode",
    description: "Expert insights on AI-powered education, study techniques, and parenting advice for modern learners.",
  },
}

export default function BlogsPage() {
  const featuredPost = {
    title: "How AI is Transforming Education: Revolution in the Classroom",
    excerpt:
      "Explore the groundbreaking ways artificial intelligence is reshaping modern education, from personalized learning experiences to intelligent tutoring systems that adapt to each student's unique needs.",
    category: "AI Education",
    date: "December 15, 2024",
    readTime: "12 min read",
    author: "Dr. Sarah Chen",
    slug: "ai-transforming-education",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ai-Iz2VYPNFl5jmLe4epBWFFNBxNhlOBu.jpeg",
    featured: true,
  }

  const blogPosts = [
    {
      title: "5 Effective Study Techniques Backed by Science",
      excerpt:
        "Discover research-proven methods to enhance learning retention, improve focus, and maximize study efficiency with evidence-based strategies used by top students worldwide.",
      category: "Study Techniques",
      date: "December 10, 2024",
      readTime: "8 min read",
      author: "Prof. Michael Rodriguez",
      slug: "effective-study-techniques",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-uPRGWqITE3YOVzrxq7tKnEbWsE3uT9.jpeg",
      tags: ["Study Tips", "Learning Science", "Academic Success"],
    },
    {
      title: "How to Make Homework Fun and Less Stressful for Kids",
      excerpt:
        "Transform homework battles into enjoyable learning experiences with creative strategies, positive reinforcement techniques, and stress-reduction methods that work for children of all ages.",
      category: "Parenting",
      date: "December 5, 2024",
      readTime: "6 min read",
      author: "Lisa Thompson",
      slug: "homework-fun",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2e878aed-8272-40cb-b38d-78f2a34537d7.jpg-m14rquhJmxVCygib88pb6yQF0t1QFG.jpeg",
      tags: ["Homework Help", "Child Psychology", "Parent Tips"],
    },
    {
      title: "Simple Ways Parents Can Support Their Child's Reading Skills",
      excerpt:
        "Practical, research-backed strategies for parents to nurture literacy development, build reading confidence, and create a love for books that lasts a lifetime.",
      category: "Parenting",
      date: "November 28, 2024",
      readTime: "7 min read",
      author: "Emma Williams",
      slug: "supporting-reading-skills",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/reading.jpg-9JHMTrW7wiFL3cXJfVMLwZlEU6ZsyB.jpeg",
      tags: ["Reading Skills", "Literacy", "Child Development"],
    },
    {
      title: "How to Choose the Right Online Course for Your Child",
      excerpt:
        "Navigate the digital learning landscape with confidence. Learn to evaluate online courses, assess quality indicators, and select programs that match your child's learning style and goals.",
      category: "Online Learning",
      date: "November 20, 2024",
      readTime: "10 min read",
      author: "Dr. James Park",
      slug: "choosing-right-online-course",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/online%20course.jpg-7B57VH2lDelHeCISwcvbWWbmLllOs0.jpeg",
      tags: ["Online Education", "Course Selection", "Digital Learning"],
    },
    {
      title: "Practical Tips for Parents to Support Their Child's Learning",
      excerpt:
        "Evidence-based strategies for creating an optimal learning environment at home, fostering academic motivation, and building strong study habits that lead to long-term success.",
      category: "Parenting",
      date: "November 15, 2024",
      readTime: "9 min read",
      author: "Rachel Green",
      slug: "practical-tips-support-learning",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/j.jpg-7c9eLFv4JvF1db6j6InKXvkdkAfHIV.jpeg",
      tags: ["Learning Support", "Academic Success", "Study Environment"],
    },
  ]

  const categories = [
    { name: "All Posts", count: blogPosts.length + 1, active: true },
    { name: "AI Education", count: 1, active: false },
    { name: "Study Techniques", count: 1, active: false },
    { name: "Parenting", count: 3, active: false },
    { name: "Online Learning", count: 1, active: false },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Educational Insights & Learning Tips</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Discover expert advice on AI-powered education, proven study techniques, and practical parenting
              strategies to unlock your child's full learning potential.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">AI Education</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Study Techniques</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Parenting Tips</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Learning Strategies</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  category.active
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 shadow-sm"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Featured Article
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center text-gray-500 text-sm">
                      <User className="h-4 w-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm ml-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      {featuredPost.date}
                    </div>
                  </div>
                  <Link
                    href={`/blogs/${featuredPost.slug}`}
                    className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-purple-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors group"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with Latest Educational Insights</h3>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Get weekly tips on AI-powered learning, study techniques, and parenting advice delivered straight to your
            inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
