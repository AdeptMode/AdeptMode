import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SupportingReadingSkillsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/blogs"
          className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all blogs
        </Link>

        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64 md:h-80">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/reading.jpg-9JHMTrW7wiFL3cXJfVMLwZlEU6ZsyB.jpeg"
              alt="Children reading together by a window"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Simple Ways Parents Can Support Their Child's Reading Skills
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Reading is one of the most important skills a child can develop, serving as the foundation for academic
                success and lifelong learning. While teachers play a crucial role in literacy instruction, parents have
                unique opportunities to nurture their child's reading development at home. The good news is that
                supporting your child's reading doesn't require special training or expensive materials – it simply
                takes consistency, creativity, and care.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Start with the Basics: Read Together Daily</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The most powerful thing you can do is establish a daily reading routine. Even just 15-20 minutes of
                shared reading time can make a significant difference. This doesn't always mean sitting down with a
                chapter book; it can include reading street signs during car rides, cooking instructions while preparing
                dinner, or comics in the Sunday paper.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                When reading together, let your child see you engaged with the text. Point to words as you read, discuss
                pictures, and ask simple questions like "What do you think will happen next?" This models active reading
                behaviors and shows that reading is interactive, not passive.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Create a Print-Rich Environment</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Fill your home with reading materials that match your child's interests and reading level. This might
                include picture books, graphic novels, magazines about dinosaurs or sports, poetry collections, or even
                instruction manuals for building blocks. The key is variety and accessibility.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Consider setting up a cozy reading nook with good lighting, comfortable seating, and easy access to
                books. When children have a special place designated for reading, it reinforces the idea that reading is
                important and enjoyable. Rotate books regularly to maintain novelty and interest.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Follow Your Child's Interests</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Pay attention to what captivates your child and seek out books on those topics. If they're fascinated by
                trucks, find books about construction vehicles. If they love animals, explore nature guides or stories
                featuring pets. When children read about subjects they're passionate about, they're more motivated to
                push through challenging words and concepts.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Don't worry if their choices seem repetitive or below their reading level. Re-reading favorite books
                builds fluency and confidence. Children often discover new details and develop deeper comprehension with
                each reading.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Make Reading Interactive and Fun</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Turn reading into a multi-sensory experience. Act out scenes from stories, use different voices for
                characters, or draw pictures of favorite story moments. Create simple crafts related to books you've
                read together, or cook a meal inspired by a story.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Play word games during everyday activities. Try rhyming games during bath time, play "I Spy" with
                letters while grocery shopping, or challenge your child to find all the words that start with a specific
                letter on a restaurant menu. These activities build phonemic awareness and letter recognition without
                feeling like formal instruction.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Model Reading Behavior</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Children learn by watching what adults do. Let your child see you reading for pleasure – whether it's a
                novel, newspaper, recipe, or article on your phone. Talk about what you're reading and why you enjoy it.
                Share interesting facts you've learned or funny moments from your book.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                When you encounter an unfamiliar word while reading together, demonstrate how to figure it out. You
                might sound it out, look for context clues, or simply say, "I'm not sure about this word – let's look it
                up together." This shows that even skilled readers encounter challenges and have strategies for
                overcoming them.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Be Patient with the Learning Process</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Reading development happens at different paces for different children. Some may decode words quickly but
                struggle with comprehension, while others might understand complex stories when read aloud but find
                decoding challenging. Celebrate small victories and avoid comparing your child to siblings or
                classmates.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                When your child makes mistakes while reading, resist the urge to immediately correct them. Give them a
                few seconds to self-correct, or ask gentle questions like "Does that make sense?" or "What word would
                make sense there?" This encourages problem-solving and builds independence.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Connect Reading to Real Life</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Help your child see that reading is everywhere and serves many purposes. Read maps together during
                family trips, follow recipes while cooking, or read instruction manuals when assembling toys. Point out
                environmental print like store signs, traffic signals, and product labels.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Encourage your child to write as well as read. The two skills support each other. They might keep a
                journal, write letters to grandparents, create their own stories, or make lists. Don't worry about
                perfect spelling or handwriting – focus on getting ideas down on paper.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Utilize Your Local Library</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Libraries are treasure troves of free resources for developing readers. Most offer story times, reading
                programs, and special events that make reading social and exciting. Librarians are also excellent
                resources for book recommendations tailored to your child's interests and reading level.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Many libraries have digital resources as well, including audiobooks and e-books that can be accessed
                from home. Audiobooks are particularly valuable as they expose children to rich vocabulary and complex
                sentence structures while building listening comprehension skills.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Stay Connected with School</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Maintain communication with your child's teacher about their reading progress. Ask about specific skills
                being taught in the classroom so you can reinforce them at home. Many teachers are happy to suggest
                books or activities that align with classroom instruction.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                If you have concerns about your child's reading development, don't hesitate to discuss them with the
                teacher. Early intervention is key when children struggle with reading, and teachers can provide
                guidance or connect you with additional resources.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Keep It Positive</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Perhaps most importantly, maintain a positive attitude about reading. If reading time becomes a battle,
                take a step back and try a different approach. Consider whether the material is too difficult, if your
                child is tired, or if they need more movement breaks.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Remember that developing strong reading skills takes time, and every child's journey is unique. Your
                support, encouragement, and enthusiasm for reading will have lasting impacts that extend far beyond
                elementary school. By creating positive associations with books and reading, you're giving your child a
                gift that will serve them throughout their life.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
