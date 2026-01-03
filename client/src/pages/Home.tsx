import { Navbar } from "@/components/layout/Navbar";
import { ScrollReveal, StaggerContainer, revealVariant } from "@/components/ui/scroll-reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Twitter, Mail } from "lucide-react";
import { useRef } from "react";

// Corrected import path
import heroImage from "@assets/generated_images/asian_woman_creative_director_portrait_yellow_background.png";

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary selection:text-black overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-24 pb-12 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <StaggerContainer className="space-y-8">
              <motion.div variants={revealVariant}>
                <h1 className="text-4xl md:text-6xl font-serif font-medium leading-tight tracking-tight">
                  "Innovate with purpose. <br />
                  <span className="italic text-gray-500">Create for impact.</span>"
                </h1>
              </motion.div>
              
              <motion.div variants={revealVariant} className="space-y-2">
                <h2 className="text-xl font-bold tracking-wide uppercase">Michaela Ternasky-Holland</h2>
                <p className="text-gray-600 font-light">Peabody Nominated & Emmy Award-Winning Director</p>
              </motion.div>

              <motion.div variants={revealVariant}>
                <a href="#about" className="inline-flex items-center text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-primary hover:border-primary transition-colors">
                  Read more <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </motion.div>
            </StaggerContainer>
          </div>

          <div className="order-1 md:order-2 relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-[4/5]">
              {/* Yellow background shape */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-12 right-0 bottom-0 left-12 bg-primary z-0"
              />
              
              {/* Image */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative z-10 h-full w-full overflow-hidden"
              >
                 <img 
                  src={heroImage} 
                  alt="Michaela Ternasky-Holland"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro / Philosophy Section */}
      <section id="about" className="py-24 bg-secondary/30 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal width="100%">
            <p className="text-lg md:text-2xl font-serif leading-relaxed text-gray-800">
              As a director, creative strategist, and speaker, I bridge the gap between technology and humanity. 
              My work explores the intersection of <span className="bg-primary/30 px-1">immersive storytelling</span>, 
              social impact, and journalism.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Works - Parallax Grid */}
      <section className="py-24 px-6 md:px-12" ref={targetRef}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Selected Works</h2>
            <div className="h-1 w-24 bg-primary" />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-16">
            {[1, 2, 3, 4].map((item, index) => (
              <motion.div 
                key={item} 
                style={{ y: index % 2 === 0 ? 0 : y }} // Parallax effect on every other item
                className="group cursor-pointer"
              >
                <div className="overflow-hidden aspect-[16/10] mb-6 bg-gray-100 relative">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                  <img 
                    src={`https://picsum.photos/seed/${item + 20}/800/600`} 
                    alt="Project thumbnail" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-500">Documentary</span>
                  <h3 className="text-2xl font-serif group-hover:underline decoration-primary decoration-2 underline-offset-4">The Untold Story {item}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-24 bg-black text-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <StaggerContainer stagger={0.3} className="contents">
              <motion.div variants={revealVariant} className="space-y-6 p-8 border border-white/10 hover:border-primary/50 transition-colors duration-300">
                <h3 className="text-3xl font-serif text-primary">Director</h3>
                <p className="text-gray-400 leading-relaxed">
                  Specializing in XR, VR, and traditional documentary filmmaking. Telling stories that challenge perspectives and create empathy.
                </p>
              </motion.div>
              <motion.div variants={revealVariant} className="space-y-6 p-8 border border-white/10 hover:border-primary/50 transition-colors duration-300">
                <h3 className="text-3xl font-serif text-primary">Consultant</h3>
                <p className="text-gray-400 leading-relaxed">
                  Advising brands and organizations on inclusive storytelling, emerging technology, and creative strategy.
                </p>
              </motion.div>
              <motion.div variants={revealVariant} className="space-y-6 p-8 border border-white/10 hover:border-primary/50 transition-colors duration-300">
                <h3 className="text-3xl font-serif text-primary">Speaker</h3>
                <p className="text-gray-400 leading-relaxed">
                  Keynotes and panels on the future of storytelling, diversity in tech, and the power of immersive media.
                </p>
              </motion.div>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <img src="/attached_assets/logo.webp" alt="MTH" className="h-8 w-auto mb-4 opacity-50 grayscale" />
            <p className="text-xs text-gray-400">© 2024 Michaela Ternasky-Holland. All rights reserved.</p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
