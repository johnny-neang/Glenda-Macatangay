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
                <p className="text-muted-foreground">
                  In this transformative work, Glenda weaves personal narrative with somatic practices, offering a roadmap for anyone seeking to reclaim their voice and body.
                </p>
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
            <h2 className="text-2xl font-serif mb-8">Early Praise</h2>
            <div className="space-y-8">
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg italic text-foreground mb-4">
                  "A powerful voice for our times. Glenda's work reminds us that healing is not just personal, but political and planetary."
                </p>
                <cite className="text-sm font-bold text-muted-foreground not-italic">— Early Reviewer</cite>
              </blockquote>
              
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg italic text-foreground mb-4">
                  "Salt in Her Lungs is a testament to the body's capacity for remembrance and renewal. Glenda writes with the rhythm of waves—gentle yet powerful."
                </p>
                <cite className="text-sm font-bold text-muted-foreground not-italic">— Author Name, Title of Book</cite>
              </blockquote>
              
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg italic text-foreground mb-4">
                  "This is the kind of book that changes how you breathe. Glenda invites us into the deep waters of healing with grace and fierce honesty."
                </p>
                <cite className="text-sm font-bold text-muted-foreground not-italic">— Wellness Practitioner Name</cite>
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
