import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Contact() {
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
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest">Email</label>
                  <input type="email" className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none transition-colors" />
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
                <textarea rows={4} className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none transition-colors"></textarea>
              </div>
              
              <button type="submit" className="bg-primary text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors">
                Send Message
              </button>
            </form>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
