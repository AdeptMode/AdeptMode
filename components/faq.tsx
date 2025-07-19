import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "How does the AI Study Buddy work?",
      answer:
        "Our AI Study Buddy uses advanced natural language processing to understand your questions and provide detailed, personalized explanations. It can help with problem-solving, explain concepts, and guide you through complex topics in a conversational way.",
    },
    {
      question: "Is AITOPIAN suitable for all subjects?",
      answer:
        "Yes! AITOPIAN supports a wide range of subjects including mathematics, sciences, humanities, languages, and more. Our AI tools are designed to adapt to different learning materials and educational requirements.",
    },
    {
      question: "Can I use AITOPIAN on my mobile device?",
      answer:
        "Absolutely. AITOPIAN is fully responsive and works on desktops, laptops, tablets, and smartphones. You can access all features on the go, making it perfect for studying anywhere, anytime.",
    },
    {
      question: "How accurate is the AI Answer Evaluator?",
      answer:
        "Our AI Answer Evaluator has been trained on thousands of academic responses and follows educational assessment standards. It provides feedback comparable to human tutors with over 90% accuracy for most subjects and question types.",
    },
    {
      question: "Is my data secure with AITOPIAN?",
      answer:
        "We take data privacy very seriously. All your personal information and study materials are encrypted and stored securely. We never share your data with third parties, and you can request deletion of your data at any time.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access to your plan until the end of your billing period. We don't offer refunds for partial months.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">FAQ</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Find answers to common questions about AITOPIAN and our AI learning tools.
          </p>
        </div>

        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
