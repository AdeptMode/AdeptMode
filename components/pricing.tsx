"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out AdeptMode",
      features: [
        "AI Study Buddy (limited questions)",
        "Basic Revision Planner",
        "10 AI-generated practice questions per month",
        "Basic flashcards",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Student",
      price: "$9.99",
      period: "per month",
      description: "Everything you need for better grades",
      features: [
        "Unlimited AI Study Buddy",
        "Advanced Smart Revision Planner",
        "Unlimited AI Answer Evaluator",
        "Unlimited practice questions",
        "AI-Powered Flashcards",
        "Basic Interactive Mind Maps",
        "Exam Anxiety Coach",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "per month",
      description: "The ultimate learning experience",
      features: [
        "All Student features",
        "Advanced Interactive Mind Maps",
        "AI-Powered Essay Writer",
        "Priority support",
        "Advanced analytics and insights",
        "Personalized learning recommendations",
        "Offline access",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base text-purple-600 dark:text-purple-400 font-semibold tracking-wide uppercase">
              Pricing
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Plans for Every Student
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 lg:mx-auto">
              Choose the perfect plan to boost your learning journey with our AI-powered tools.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-8 lg:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={item}>
              <Card
                className={`h-full flex flex-col ${
                  plan.popular
                    ? "border-purple-500 dark:border-purple-500 shadow-xl relative"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 -mt-4 mr-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    Popular
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    {plan.popular && <Sparkles className="h-5 w-5 text-purple-500 mr-2" />}
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                    <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                    {plan.period && <span className="ml-1 text-xl font-medium text-gray-500">{plan.period}</span>}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-purple-500/20"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
