import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useQuery } from "@tanstack/react-query";
import { useMultiplePageContent } from "@/hooks/use-page-content";
import type { Testimonial } from "@shared/schema";
import bookCover from "@assets/book-cover_1767440366702.png";

const DEFAULT_BOOK_TAGLINE = "A journey of healing, movement, and returning to the self. \"Salt in Her Lungs\" explores the depths of our resilience and the ocean within.";
const DEFAULT_BOOK_ABOUT = `A lyrical and unflinching memoir about childhood silence, intergenerational trauma, and the long walk back to truth.

Rooted in Filipina lineage and survivor wisdom, Salt in Her Lungs traces a journey through harm, shame, embodiment, motherhood, and healing. The book offers readers language for what was carried and practices for what comes next.

This book is for survivors and advocates, mothers and daughters navigating complexity, educators, healers, and cultural workers, and anyone seeking a more honest and embodied practice of healing.`;

export default function Book() {
  const { data: content = {} } = useMultiplePageContent(["book_tagline", "book_about"]);
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["testimonials", "book"],
    queryFn: async () => {
      const res = await fetch("/api/testimonials/placement/book");
      return res.json();
    },
  });

  const bookAbout = content.book_about || DEFAULT_BOOK_ABOUT;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12 mb-24">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">Salt in Her Lungs</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {content.book_tagline || DEFAULT_BOOK_TAGLINE}
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
                  {bookAbout.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
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

          {testimonials.length > 0 && (
            <ScrollReveal className="border-t border-border pt-12">
              <h2 className="text-2xl font-serif mb-8">What people are saying</h2>
              <div className="space-y-8">
                {testimonials.map((testimonial) => (
                  <blockquote key={testimonial.id} className="border-l-4 border-primary pl-6" data-testid={`testimonial-book-${testimonial.id}`}>
                    <p className="text-lg italic text-foreground mb-4">
                      "{testimonial.quote}"
                    </p>
                    <cite className="text-sm font-bold text-muted-foreground not-italic">
                      — {testimonial.name}{testimonial.title && `, ${testimonial.title}`}
                    </cite>
                  </blockquote>
                ))}
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal className="border-t border-border pt-12" width="100%">
            <div className="bg-secondary text-secondary-foreground p-8 md:p-12">
              <h2 className="text-2xl font-serif mb-4">Pre-Order: Limited Signed Edition</h2>
              <div className="space-y-4 mb-6">
                <p className="text-lg opacity-90">
                  A small number of signed copies of Salt in Her Lungs are available for direct pre-order.
                </p>
                <p className="opacity-80">
                  This limited edition is an offering—meant to be held, read slowly, and shared with care.
                </p>
              </div>
              
              <div className="mb-6">
                <p className="font-bold mb-3">Each pre-order includes:</p>
                <ul className="space-y-2 opacity-80">
                  <li className="flex gap-3"><span className="text-primary">•</span> A signed copy of Salt in Her Lungs</li>
                  <li className="flex gap-3"><span className="text-primary">•</span> Memory Palace, a companion zine featuring the voices and reflections of fellow survivors</li>
                  <li className="flex gap-3"><span className="text-primary">•</span> A Lala Paz Candle, created as a ritual companion for reading, remembering, and grounding</li>
                </ul>
              </div>
              
              <p className="opacity-80 mb-8">
                Quantities are limited and available while supplies last. Pre-orders will end on February 14.
              </p>
              
              <a 
                href="https://squarespace.com/placeholder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors w-full md:w-auto text-center mb-12"
              >
                Pre-Order Now
              </a>
              
              <div className="border-t border-secondary-foreground/20 pt-8">
                <h3 className="text-xl font-serif mb-4">Bulk Orders for Classrooms & Learning Spaces</h3>
                <p className="opacity-80 mb-4">
                  For classroom, library, or community-based bulk orders, please email me directly with:
                </p>
                <ul className="space-y-2 opacity-80 mb-4">
                  <li className="flex gap-3"><span className="text-primary">•</span> Desired quantity</li>
                  <li className="flex gap-3"><span className="text-primary">•</span> Intended use (classroom, circle, curriculum, etc.)</li>
                </ul>
                <p className="opacity-80 mb-4">
                  Educator and bulk discounts are available.
                </p>
                <p className="font-bold">
                  Email: <a href="mailto:hello@myhealinglanguage.com" className="hover:underline text-[#ffffff]">hello@myhealinglanguage.com</a>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
