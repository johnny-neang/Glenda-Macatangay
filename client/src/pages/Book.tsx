import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import bookCover from "@assets/book-cover_1767436940677.jpg";

export default function Book() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12 mb-24">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">Salt in Her Lungs</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A journey of healing, movement, and returning to the self. "Salt in Her Lungs" explores the depths of our resilience and the ocean within.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal delay={0.2} className="relative aspect-[3/4] overflow-hidden shadow-2xl">
              <img 
                src={bookCover} 
                alt="Salt in Her Lungs Book Cover"
                className="w-full h-full object-cover"
              />
            </ScrollReveal>
            <div className="space-y-8">
              <ScrollReveal delay={0.4}>
                <h2 className="text-2xl font-serif mb-4">About the Book</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>A lyrical and unflinching memoir about childhood silence, intergenerational trauma, and the long walk back to truth.</p>
                  <p>Rooted in Filipina lineage and survivor wisdom, Salt in Her Lungs traces a journey through harm, shame, embodiment, motherhood, and healing. The book offers readers language for what was carried and practices for what comes next.</p>
                  <p>This book is for survivors and advocates, mothers and daughters navigating complexity, educators, healers, and cultural workers, and anyone seeking a more honest and embodied practice of healing.</p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.6}>
                <a 
                  href="https://squarespace.com/placeholder" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors w-full md:w-auto text-center"
                >
                  Pre-Order Now
                </a>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal className="border-t border-border pt-12">
            <h2 className="text-2xl font-serif mb-6">Themes + Who It's For</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Core Themes</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3"><span className="text-primary">•</span> Intergenerational trauma and ancestral healing</li>
                  <li className="flex gap-3"><span className="text-primary">•</span> The ocean as metaphor for grief and renewal</li>
                  <li className="flex gap-3"><span className="text-primary">•</span> Embodiment and somatic practices</li>
                  <li className="flex gap-3"><span className="text-primary">•</span> Cultural identity and diaspora</li>
                  <li className="flex gap-3"><span className="text-primary">•</span> Collective resilience and community care</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">This Book Is For</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3"><span className="text-primary">•</span> Those navigating personal or collective grief</li>
                  <li className="flex gap-3"><span className="text-primary">•</span> Healers, therapists, and wellness practitioners</li>
                  <li className="flex gap-3"><span className="text-primary">•</span> Readers exploring cultural identity and belonging</li>
                  <li className="flex gap-3"><span className="text-primary">•</span> Anyone seeking to reconnect with their body's wisdom</li>
                  <li className="flex gap-3"><span className="text-primary">•</span> Lovers of lyrical memoir and creative nonfiction</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="border-t border-border pt-12">
            <h2 className="text-2xl font-serif mb-8">What people are saying</h2>
            <div className="space-y-8">
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg italic text-foreground mb-4">
                  "Written with passion and honesty, Salt in Her Lungs, is part memoir, part poetry, and substantially a story about personal transformation. Combining stories of family, trauma, culture, love and transcendence, Macatangay's voice is sweet, yet hard hitting. She shares her stories of personal growth, triumph and healing without resentment or regret, but with the hope that others can benefit and learn from her journey."
                </p>
                <cite className="text-sm font-bold text-muted-foreground not-italic">— Pedro Noguera, Dean, Rossier School of Education, USC Distinguished Professor of Education</cite>
              </blockquote>
              
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg italic text-foreground mb-4">
                  "Illuminating & Courageous! 'Salt in Her Lungs' is a portal to healing after complex trauma—a luminous invitation to believe in Spirit, intuition, and the possibility of transformation."
                </p>
                <cite className="text-sm font-bold text-muted-foreground not-italic">— Jeannie E. Celestial, Ph.D., M.S.W., Licensed Psychologist & Co-Author/Co-Editor of "Clinical Interventions for Internalized Oppression"</cite>
              </blockquote>
            </div>
          </ScrollReveal>

          <ScrollReveal className="border-t border-border pt-12">
            <div className="bg-secondary text-secondary-foreground p-8 md:p-12">
              <h2 className="text-2xl font-serif mb-4">Pre-Order Details</h2>
              <p className="text-lg opacity-80 mb-6">
                "Salt in Her Lungs" is available for pre-order now. Release date coming soon.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between border-b border-secondary-foreground/20 pb-2">
                  <span className="font-bold">Format</span>
                  <span className="opacity-80">Hardcover, Paperback, eBook</span>
                </div>
                <div className="flex justify-between border-b border-secondary-foreground/20 pb-2">
                  <span className="font-bold">Publisher</span>
                  <span className="opacity-80">Publisher Name</span>
                </div>
                <div className="flex justify-between border-b border-secondary-foreground/20 pb-2">
                  <span className="font-bold">Expected Release</span>
                  <span className="opacity-80">2026</span>
                </div>
              </div>
              <a 
                href="https://squarespace.com/placeholder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors w-full md:w-auto text-center"
              >
                Pre-Order Now
              </a>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
