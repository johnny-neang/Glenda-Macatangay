import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { openCalendlyPopup } from "@/hooks/use-calendly";
import { useMultiplePageContent } from "@/hooks/use-page-content";
import speakingPhoto1 from "@assets/IMG_3397_1767441104174.jpg";
import speakingPhoto2 from "@assets/IMG_4321_1767441104176.JPG";
import speakingPhoto3 from "@assets/speaking_photo_3.jpg";

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

          <ScrollReveal delay={0.45} className="border-t border-border pt-12">
            <h2 className="text-2xl font-serif mb-8">Client Testimonials</h2>
            <div className="space-y-8">
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg italic text-foreground mb-4">
                  "We were fortunate enough to hire Glenda Macatangay as a consultant to help our team formulate a Mental Health and Wellness Strategic Plan from scratch. Glenda's thoughtful guidance made what could have been a daunting project approachable and enjoyable by walking us through step by step with regular communication and check-ins, great care, and compassionate candor. I appreciated her wisdom, passion, authenticity, transparency, and unwavering support throughout the whole process."
                </p>
                <cite className="text-sm font-bold text-muted-foreground not-italic">
                  — Mima Takemoto, Menlo Schools
                </cite>
              </blockquote>
              
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg italic text-foreground mb-4">
                  "Being familiar with Glenda's work with Community Responsive Education, I was excited to experience firsthand how her facilitation practices could create a safe container for both personal and team growth. Her approach and that of her partners served to unlock healthier ways of working, creative thinking, and organizational insight that has proven beneficial to our entire staff. Most important was the clarity and care offered throughout the entire process—setting a strong foundation for continuing discussions that honor our mission, vision, and values, and that ultimately supports our ability to serve our constituents in meaningful and impactful ways."
                </p>
                <cite className="text-sm font-bold text-muted-foreground not-italic">
                  — City of Sacramento, Office of Culture and Arts
                </cite>
              </blockquote>
              
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg italic text-foreground mb-4">
                  "I've had the privilege of knowing Glenda Macatangay for over 40 years, and most recently, I had the joy of working with her in a professional capacity. We brought Glenda on as a consultant to help our team here at Menlo School develop a Mental Health and Wellness Strategic Plan from the ground up. What could have felt overwhelming quickly became a meaningful and even enjoyable journey, thanks to Glenda's steady, compassionate, and thoughtful guidance. She walked us through every step with care, consistent communication, and a deep sense of integrity. Her facilitation of our full-day planning retreat was not only skillful but also inspiring. Glenda brings a rare blend of insight, authenticity, and clarity—especially in navigating complex systems and issues. She's not just a consultant; she's a true healer, a wise leader, and an invaluable thought partner. I can't recommend her highly enough for anyone looking to foster healing, equity, and wellness within their organization."
                </p>
                <cite className="text-sm font-bold text-muted-foreground not-italic">
                  — Adam Gelb, Menlo Schools
                </cite>
              </blockquote>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={speakingPhoto1} 
                  alt="Glenda Macatangay speaking" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={speakingPhoto2} 
                  alt="Glenda Macatangay presenting" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={speakingPhoto3} 
                  alt="Glenda Macatangay portrait" 
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
