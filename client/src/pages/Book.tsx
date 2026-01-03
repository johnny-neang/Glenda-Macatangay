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
        </div>
      </main>
      <Footer />
    </div>
  );
}
