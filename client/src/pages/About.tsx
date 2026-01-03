import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-24">
          <ScrollReveal className="order-2 md:order-1 aspect-[4/5] bg-muted relative overflow-hidden">
             {/* Placeholder for Glenda's photo */}
             <div className="absolute inset-0 bg-secondary/20"></div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="order-1 md:order-2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif mb-6">About Glenda</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a storyteller, a cultural practitioner, and a believer in the healing power of salt water.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With a background in MSW and years of dedication to community healing, my work sits at the intersection of social justice, embodied practice, and narrative change.
            </p>
            
            <div className="pt-6">
               <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Credentials</h3>
               <ul className="text-sm text-muted-foreground space-y-1">
                 <li>Master of Social Work (MSW)</li>
                 <li>Certified Cultural Practitioner</li>
                 <li>Somatic Experiencing Trained</li>
               </ul>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
