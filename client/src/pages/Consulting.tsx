import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Consulting() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12 mb-24">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">Consulting</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Facilitating organizational wellness and somatic healing strategies for purpose-driven teams.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="space-y-8">
            <div className="bg-white p-8 border border-border">
              <h2 className="text-2xl font-serif mb-4">My Healing Language</h2>
              <p className="text-muted-foreground mb-4">
                A specialized framework for organizations looking to integrate trauma-informed practices into their culture.
              </p>
              <div className="flex gap-4 flex-wrap">
                <span className="bg-muted px-3 py-1 text-xs uppercase tracking-widest">Facilitation</span>
                <span className="bg-muted px-3 py-1 text-xs uppercase tracking-widest">Strategy</span>
                <span className="bg-muted px-3 py-1 text-xs uppercase tracking-widest">Retreats</span>
              </div>
            </div>
            
             <button className="bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-primary transition-colors">
               Request a Proposal
             </button>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
