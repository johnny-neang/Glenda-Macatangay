import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal, StaggerContainer, revealVariant } from "@/components/ui/scroll-reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Mic, MapPin, Briefcase } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { openCalendlyPopup } from "@/hooks/use-calendly";
import { useMultiplePageContent } from "@/hooks/use-page-content";
import { useCart } from "@/hooks/use-shopify-cart";
import { useQuery } from "@tanstack/react-query";

const BOOK_VARIANT_ID = "gid://shopify/ProductVariant/51523523805466";

import heroImage from "@assets/book-cover_1767438560120.png";
import bookCardBg from "@assets/Book_1767439512805.jpg";
import tourCardBg from "@assets/Tour_1767439512806.jpg";
import speakingCardBg from "@assets/Speaking_1767439512806.jpg";
import consultingCardBg from "@assets/Consulting_1767439512805.jpg";

const DEFAULT_HOME_HERO = "Discover Salt In Her Lungs and themes of self-love, relational well-being, survival, and ancestral healing";
const DEFAULT_HOME_INTRO = "I'm Glenda Macatangay, a Filipina author and ancestral healing practitioner working at the intersection of story, culture, and collective care. Through writing, teaching, community practice, and ceremony, I center survivors and spirit—helping transform silence into safety and remembrance into healing.";

export default function Home() {
  const { data: content = {} } = useMultiplePageContent(["home_hero", "home_intro"]);
  const { addToCart, isLoading } = useCart();
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { data: testimonials = [] } = useQuery<{ id: number; name: string; title: string; quote: string }[]>({
    queryKey: ["testimonials", "home"],
    queryFn: async () => {
      const res = await fetch("/api/testimonials?placement=home");
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    },
  });

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white overflow-x-hidden flex flex-col">
      <Navbar />
      {/* Video Section */}
      <section className="pt-28 pb-12 px-6 md:px-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/0Y2KLqSnmRE"
              title="Salt in Her Lungs"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

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

              <motion.div variants={revealVariant}>
                <div className="bg-blue-600/10 border border-blue-600/20 px-6 py-4 rounded-sm">
                  <p className="text-blue-700 text-sm font-bold tracking-wide uppercase">
                    Limited Edition Book Bundle Available Now Until Supplies Last
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={revealVariant} className="space-y-4">
                <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                  Salt in Her Lungs is a journey of healing, movement, and return to sacredness—an exploration of love, resilience, memory, and the ocean of wisdom we carry within.
                </p>
                <p className="text-sm uppercase tracking-widest font-bold text-foreground/80">By Glenda Macatangay</p>
              </motion.div>

              <motion.div variants={revealVariant} className="flex flex-col gap-4 pt-4 max-w-xs">
                <button 
                  onClick={() => addToCart(BOOK_VARIANT_ID, 1)}
                  disabled={isLoading}
                  className="bg-primary text-white px-8 py-3 text-center text-sm font-bold uppercase tracking-widest hover:bg-black transition-colors w-full disabled:opacity-50"
                  data-testid="button-preorder-book"
                >
                  {isLoading ? "Adding..." : "Pre-Order Your Copy Today"}
                </button>
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
                <p className="text-sm text-gray-200 leading-relaxed relative z-10">Discover Salt In Her Lungs and themes of self- love, relational well-being, survival, and ancestral healing.</p>
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
      <section className="py-24 bg-secondary text-secondary-foreground px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <ScrollReveal>
            <h2 className="text-sm font-bold uppercase tracking-widest opacity-70">Praise for the Work</h2>
          </ScrollReveal>

          {testimonials.length > 0 && (
            <div className="relative min-h-[200px]">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6 }}
              >
                <blockquote className="text-xl md:text-2xl font-serif leading-tight">
                  "{testimonials[activeTestimonial]?.quote}"
                </blockquote>
                <cite className="block mt-8 text-sm font-bold not-italic opacity-80">
                  — {testimonials[activeTestimonial]?.name}, {testimonials[activeTestimonial]?.title}
                </cite>
              </motion.div>

              {testimonials.length > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? "bg-current opacity-100 w-4" : "bg-current opacity-30"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
