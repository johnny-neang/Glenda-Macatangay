import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useQuery } from "@tanstack/react-query";
import { openCalendlyPopup } from "@/hooks/use-calendly";
import { useMultiplePageContent } from "@/hooks/use-page-content";
import type { Testimonial } from "@shared/schema";
import consultingPhoto1 from "@assets/consulting_new_1.jpg";
import consultingPhoto2 from "@assets/consulting_new_2.jpg";
import consultingPhoto3 from "@assets/consulting_new_3.jpg";

// Remove unused imports
// import _mg_6553 from "@assets/_mg_6553.jpeg";
// import _mg_6402_2 from "@assets/_mg_6402-2.jpeg";

const DEFAULT_CONSULTING_INTRO = "Through My Healing Language, Glenda partners with organizations to support relational wellbeing, organizational wellness, and culturally responsive leadership.";

export default function Consulting() {
  const { data: content = {} } = useMultiplePageContent(["consulting_intro"]);
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["testimonials", "consulting"],
    queryFn: async () => {
      const res = await fetch("/api/testimonials/placement/consulting");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12 mb-24">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">Consulting and Facilitation</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {content.consulting_intro || DEFAULT_CONSULTING_INTRO}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="border-t border-border pt-12">
            <h2 className="text-2xl font-serif mb-6">Offerings</h2>
            <p className="text-muted-foreground mb-6">
              Offerings include organizational wellness and burnout prevention, intercultural communication and power dynamics, feedback systems and psychological safety, and retreat design and facilitation in both virtual and in-person formats.
            </p>
            <p className="text-muted-foreground mb-8">
              Grounded in social work practice, ancestral healing, and research-informed frameworks, each engagement is tailored to the people and place it serves.
            </p>
            <div className="flex gap-4 flex-wrap mb-8">
              <span className="bg-muted px-4 py-2 text-xs uppercase tracking-widest">Organizational Wellness</span>
              <span className="bg-muted px-4 py-2 text-xs uppercase tracking-widest">Facilitation</span>
              <span className="bg-muted px-4 py-2 text-xs uppercase tracking-widest">Retreat Design</span>
              <span className="bg-muted px-4 py-2 text-xs uppercase tracking-widest">Strategy</span>
            </div>
            <button 
              onClick={() => openCalendlyPopup()}
              className="inline-block bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-primary transition-colors cursor-pointer"
              data-testid="button-request-proposal"
            >Schedule discovery call</button>
          </ScrollReveal>

          {testimonials.length > 0 && (
            <ScrollReveal delay={0.3} className="border-t border-border pt-12">
              <h2 className="text-2xl font-serif mb-8">Client Testimonials</h2>
              <div className="space-y-8">
                {testimonials.map((testimonial) => (
                  <blockquote key={testimonial.id} className="border-l-4 border-primary pl-6" data-testid={`testimonial-consulting-${testimonial.id}`}>
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

          <ScrollReveal delay={0.4}>
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={consultingPhoto1} 
                  alt="Glenda Macatangay consulting" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={consultingPhoto2} 
                  alt="Glenda Macatangay in discussion" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={consultingPhoto3} 
                  alt="Glenda Macatangay facilitating" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
