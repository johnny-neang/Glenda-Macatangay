import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal, StaggerContainer, revealVariant } from "@/components/ui/scroll-reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Mic, MapPin, Briefcase } from "lucide-react";
import { useRef } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { openCalendlyPopup } from "@/hooks/use-calendly";
import { useMultiplePageContent } from "@/hooks/use-page-content";
import type { Testimonial } from "@shared/schema";

// New book cover image
import heroImage from "@assets/book-cover_1767438560120.png";
import bookCardBg from "@assets/Book_1767439512805.jpg";
import tourCardBg from "@assets/Tour_1767439512806.jpg";
import speakingCardBg from "@assets/Speaking_1767439512806.jpg";
import consultingCardBg from "@assets/Consulting_1767439512805.jpg";

const DEFAULT_HOME_HERO = "Discover Salt In Her Lungs and themes of self-love, relational well-being, survival, and ancestral healing";
const DEFAULT_HOME_INTRO = "I'm Glenda Macatangay, a Filipina author, healing arts educator, and community practitioner working at the intersection of story, culture, and collective care. My work centers survivors, spirit, and the practices that help us move from silence to safety.";

export default function Home() {
  const { data: content = {} } = useMultiplePageContent(["home_hero", "home_intro"]);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["testimonials", "home"],
    queryFn: async () => {
      const res = await fetch("/api/testimonials/placement/home");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white overflow-x-hidden flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-24 pb-12 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <StaggerContainer className="space-y-8">
              <motion.div variants={revealVariant}>
                <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight tracking-tight text-primary">
                  Salt in Her Lungs
                </h1>
              </motion.div>
              
              <motion.div variants={revealVariant} className="space-y-4">
                <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                  {content.home_hero || DEFAULT_HOME_HERO}
                </p>
                <p className="text-sm uppercase tracking-widest font-bold text-foreground/80">By Glenda Macatangay</p>
              </motion.div>

              <motion.div variants={revealVariant} className="flex flex-col gap-4 pt-4 max-w-xs">
                <a 
                  href="https://squarespace.com/placeholder" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-8 py-3 text-center text-sm font-bold uppercase tracking-widest hover:bg-black transition-colors w-full"
                >
                  Pre-Order the Book
                </a>
                <button 
                  onClick={() => openCalendlyPopup()}
                  className="block border border-foreground px-8 py-3 text-center text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-white transition-colors w-full"
                  data-testid="button-invite-speak"
                >
                  Invite Glenda to Speak
                </button>
              </motion.div>
            </StaggerContainer>
          </div>

          <div className="order-1 md:order-2 relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-[4/5]">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative h-full w-full overflow-hidden"
              >
                 <img 
                  src={heroImage} 
                  alt="Salt in Her Lungs Book Art"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Short Intro */}
      <section className="py-24 bg-muted/20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal width="100%">
            <p className="text-lg md:text-2xl font-serif leading-relaxed text-foreground">
              {content.home_intro || DEFAULT_HOME_INTRO}
            </p>
          </ScrollReveal>
        </div>
      </section>
      {/* Quick Sections Grid */}
      <section className="py-24 px-6 md:px-12" ref={targetRef}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Explore</h2>
            <div className="h-1 w-24 bg-primary" />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/book" className="group block space-y-4 p-8 border border-black transition-all h-full relative overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute -inset-6 transition-transform duration-700 group-hover:scale-110 origin-center"
                  style={{
                    backgroundImage: `url(${bookCardBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                {/* Overlay */}
                <div className="absolute -inset-6 bg-black/40 group-hover:bg-black/50 transition-colors" />

                <BookOpen className="w-8 h-8 text-white group-hover:scale-110 transition-transform relative z-10" />
                <h3 className="text-xl font-serif text-white relative z-10">The Book</h3>
                <p className="text-sm text-gray-200 leading-relaxed relative z-10">
                  Discover "Salt in Her Lungs" and the themes of resilience and ocean healing.
                </p>
                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white pt-2 relative z-10">
                  Learn More <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
            </Link>

            <Link href="/tour" className="group block space-y-4 p-8 border border-black transition-all h-full relative overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute -inset-6 transition-transform duration-700 group-hover:scale-110 origin-center"
                  style={{
                    backgroundImage: `url(${tourCardBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                {/* Overlay */}
                <div className="absolute -inset-6 bg-black/40 group-hover:bg-black/50 transition-colors" />

                <MapPin className="w-8 h-8 text-white group-hover:scale-110 transition-transform relative z-10" />
                <h3 className="text-xl font-serif text-white relative z-10">SALTY Tour</h3>
                <p className="text-sm text-gray-200 leading-relaxed relative z-10">
                  Join us for book readings, art installations, and community healing events in 2026.
                </p>
                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white pt-2 relative z-10">
                  View Dates <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
            </Link>

            <Link href="/speaking" className="group block space-y-4 p-8 border border-black transition-all h-full relative overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute -inset-6 transition-transform duration-700 group-hover:scale-110 origin-center"
                  style={{
                    backgroundImage: `url(${speakingCardBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                {/* Overlay */}
                <div className="absolute -inset-6 bg-black/40 group-hover:bg-black/50 transition-colors" />

                <Mic className="w-8 h-8 text-white group-hover:scale-110 transition-transform relative z-10" />
                <h3 className="text-xl font-serif text-white relative z-10">Speaking</h3>
                <p className="text-sm text-gray-200 leading-relaxed relative z-10">
                  Signature talks on embodied storytelling, grief, and collective resilience.
                </p>
                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white pt-2 relative z-10">
                  Topics <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
            </Link>

            <Link href="/consulting" className="group block space-y-4 p-8 border border-black transition-all h-full relative overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute -inset-6 transition-transform duration-700 group-hover:scale-110 origin-center"
                  style={{
                    backgroundImage: `url(${consultingCardBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                {/* Overlay */}
                <div className="absolute -inset-6 bg-black/40 group-hover:bg-black/50 transition-colors" />

                <Briefcase className="w-8 h-8 text-white group-hover:scale-110 transition-transform relative z-10" />
                <h3 className="text-xl font-serif text-white relative z-10">Consulting</h3>
                <p className="text-sm text-gray-200 leading-relaxed relative z-10">
                  Organizational wellness facilitation and "My Healing Language" strategy.
                </p>
                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white pt-2 relative z-10">
                  Work With Me <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-secondary text-secondary-foreground px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <ScrollReveal>
               <h2 className="text-sm font-bold uppercase tracking-widest opacity-70">Praise for the Work</h2>
            </ScrollReveal>
            
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} delay={0.2 + index * 0.1}>
                 <blockquote className="text-2xl md:text-4xl font-serif leading-tight">
                   "{testimonial.quote}"
                 </blockquote>
                 <cite className="block mt-8 text-sm font-bold not-italic opacity-80">
                   — {testimonial.name}{testimonial.title && `, ${testimonial.title}`}
                 </cite>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
}
