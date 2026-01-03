import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useState } from "react";
import { Check } from "lucide-react";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-12 mb-24">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">Contact</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              For speaking inquiries, tour hosting, or consulting proposals, please reach out below.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {isSubmitted ? (
              <div className="bg-muted/30 border border-primary/20 p-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif">Message Sent</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. Glenda or a member of the team will get back to you shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-bold uppercase tracking-widest border-b border-black hover:text-primary hover:border-primary transition-colors pb-1"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest">Name</label>
                    <input required type="text" className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest">Email</label>
                    <input required type="email" className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest">Inquiry Type</label>
                  <select className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none transition-colors">
                    <option>Speaking Engagement</option>
                    <option>Host a Tour Stop</option>
                    <option>Consulting</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest">Message</label>
                  <textarea required rows={4} className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none transition-colors"></textarea>
                </div>
                
                <button type="submit" className="bg-primary text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
