import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "wouter";

export default function Speaking() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12 mb-24">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">Speaking</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Inviting audiences into deeper conversations about healing, resilience, and the power of story.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <ScrollReveal delay={0.2} className="space-y-6">
              <h3 className="text-2xl font-serif">Signature Talks</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary">•</span> The Ocean Within: Navigating Grief</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Embodied Storytelling</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Healing as a Collective Act</li>
              </ul>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4} className="bg-secondary p-8 text-secondary-foreground">
               <h3 className="text-2xl font-serif mb-4">Invite Glenda</h3>
               <p className="mb-6 opacity-80">Interested in having Glenda speak at your conference, university, or organization?</p>
               <Link href="/contact">
                 <a className="block text-center bg-primary text-white px-6 py-3 text-sm font-bold tracking-widest uppercase w-full hover:bg-white hover:text-black transition-colors">
                   Request Availability
                 </a>
               </Link>
            </ScrollReveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
