import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "wouter";
import consultingPhoto1 from "@assets/IMG_0464_1767441391421.JPG";
import consultingPhoto2 from "@assets/IMG_1942_1767441391422.JPG";
import consultingPhoto3 from "@assets/IMG_1944_1767441391423.JPG";

export default function Consulting() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12 mb-24">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">Consulting and Facilitation</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Through My Healing Language, Glenda partners with organizations to support relational wellbeing, organizational wellness, and culturally responsive leadership.
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
            <Link href="/contact">
              <a className="inline-block bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-primary transition-colors">
                Request a Proposal
              </a>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="border-t border-border pt-12">
            <h2 className="text-2xl font-serif mb-8">Client Testimonials</h2>
            <div className="space-y-8">
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg italic text-foreground mb-4">
                  "We were fortunate enough to hire Glenda Macatangay as a consultant to help our team formulate a Mental Health and Wellness Strategic Plan from scratch. Glenda's thoughtful guidance made what could have been a daunting project approachable and enjoyable by walking us through step by step with regular communication and check-ins, great care, and compassionate candor. I appreciated her wisdom, passion, authenticity, transparency, and unwavering support throughout the whole process."
                </p>
                <cite className="text-sm font-bold text-muted-foreground not-italic">— Mima Takemoto, Menlo Schools</cite>
              </blockquote>
              
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg italic text-foreground mb-4">
                  "Being familiar with Glenda's work with Community Responsive Education, I was excited to experience firsthand how her facilitation practices could create a safe container for both personal and team growth. Her approach and that of her partners served to unlock healthier ways of working, creative thinking, and organizational insight that has proven beneficial to our entire staff. Most important was the clarity and care offered throughout the entire process—setting a strong foundation for continuing discussions that honor our mission, vision, and values, and that ultimately supports our ability to serve our constituents in meaningful and impactful ways."
                </p>
                <cite className="text-sm font-bold text-muted-foreground not-italic">— City of Sacramento, Office of Culture and Arts</cite>
              </blockquote>
              
              <blockquote className="border-l-4 border-primary pl-6">
                <p className="text-lg italic text-foreground mb-4">
                  "I've had the privilege of knowing Glenda Macatangay for over 40 years, and most recently, I had the joy of working with her in a professional capacity. We brought Glenda on as a consultant to help our team here at Menlo School develop a Mental Health and Wellness Strategic Plan from the ground up. What could have felt overwhelming quickly became a meaningful and even enjoyable journey, thanks to Glenda's steady, compassionate, and thoughtful guidance. She walked us through every step with care, consistent communication, and a deep sense of integrity. Her facilitation of our full-day planning retreat was not only skillful but also inspiring. Glenda brings a rare blend of insight, authenticity, and clarity—especially in navigating complex systems and issues. She's not just a consultant; she's a true healer, a wise leader, and an invaluable thought partner. I can't recommend her highly enough for anyone looking to foster healing, equity, and wellness within their organization."
                </p>
                <cite className="text-sm font-bold text-muted-foreground not-italic">— Adam Gelb, Menlo Schools</cite>
              </blockquote>
            </div>
          </ScrollReveal>

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
