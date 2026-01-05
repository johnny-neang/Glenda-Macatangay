import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { openCalendlyPopup } from "@/hooks/use-calendly";
import { useMultiplePageContent } from "@/hooks/use-page-content";

const DEFAULT_SPEAKING_INTRO = "Glenda Macatangay brings a rare blend of survivor truth, ancestral wisdom, and practical frameworks to keynotes that help communities transform silence into safety. Her work offers a grounded, culturally rooted approach to trauma, healing, leadership, and relational wellbeing.";

export default function Speaking() {
  const { data: content = {} } = useMultiplePageContent(["speaking_intro"]);
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12 mb-24">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">Speaking and Keynotes</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {content.speaking_intro || DEFAULT_SPEAKING_INTRO}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="border-t border-border pt-12">
            <h2 className="text-2xl font-serif mb-6">Signature Talks</h2>
            <div className="space-y-6">
              <div className="p-6 border border-border">
                <h3 className="text-lg font-bold mb-2">The Weight of Silence: Truth, Power, and The Practice of Safety</h3>
              </div>
              <div className="p-6 border border-border">
                <h3 className="text-lg font-bold mb-2">When Childhood Ends Early: Protecting Innocence and Restoring Dignity and Hope</h3>
              </div>
              <div className="p-6 border border-border">
                <h3 className="text-lg font-bold mb-2">My Healing Language™ – Where Science, Spirit, and Story Meet Trauma Care and Healing for Survivors</h3>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="border-t border-border pt-12">
            <h2 className="text-2xl font-serif mb-6">Ideal Audiences</h2>
            <p className="text-muted-foreground mb-6">
              Ideal audiences include universities and AAPI and ethnic studies departments, conferences and symposiums, educators, clinicians, community leaders, and survivor-centered organizations.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3"><span className="text-primary">•</span> Women and women-led communities</li>
                <li className="flex gap-3"><span className="text-primary">•</span> Survivors of all genders</li>
                <li className="flex gap-3"><span className="text-primary">•</span> Parents and caregivers</li>
                <li className="flex gap-3"><span className="text-primary">•</span> Educators and school leaders</li>
              </ul>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3"><span className="text-primary">•</span> Universities and colleges</li>
                <li className="flex gap-3"><span className="text-primary">•</span> Mental health professionals and social workers</li>
                <li className="flex gap-3"><span className="text-primary">•</span> Community-based and survivor-centered organizations</li>
                <li className="flex gap-3"><span className="text-primary">•</span> Organizational leaders and workplaces focused on wellbeing and safety</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4} width="100%">
            <div className="bg-secondary p-8 md:p-12 text-secondary-foreground">
              <h2 className="text-2xl font-serif mb-4">Invite Glenda to Speak</h2>
              <p className="mb-6 opacity-80">Interested in having Glenda speak at your conference, university, or organization?</p>
              <button 
                onClick={() => openCalendlyPopup()}
                className="inline-block bg-primary text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors cursor-pointer"
                data-testid="button-request-availability"
              >Request Discovery Session</button>
            </div>
          </ScrollReveal>

        </div>
      </main>
      <Footer />
    </div>
  );
}
