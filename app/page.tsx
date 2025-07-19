import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import CTA from "@/components/cta"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
