import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useState } from "react";
import { Check } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import contactPhoto from "@assets/IMG_3814_1767440945237.JPG";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; inquiryType: string; message: string }) => {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit");
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    contactMutation.mutate({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      inquiryType: formData.get("inquiryType") as string,
      message: formData.get("message") as string,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto mb-24">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">Contact</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              For speaking inquiries, tour hosting, or consulting proposals, please reach out below.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-start">
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
                    <input 
                      name="name"
                      required 
                      type="text" 
                      className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest">Email</label>
                    <input 
                      name="email"
                      required 
                      type="email" 
                      className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none transition-colors" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest">Inquiry Type</label>
                  <select 
                    name="inquiryType"
                    className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none transition-colors"
                  >
                    <option>Speaking Engagement</option>
                    <option>Host a Tour Stop</option>
                    <option>Consulting</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest">Message</label>
                  <textarea 
                    name="message"
                    required 
                    rows={4} 
                    className="w-full bg-transparent border-b border-border py-2 focus:border-primary outline-none transition-colors"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="bg-primary text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors disabled:opacity-50"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </button>
                {contactMutation.isError && (
                  <p className="text-red-600 text-sm">Failed to send message. Please try again.</p>
                )}
              </form>
            )}
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="hidden md:block">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={contactPhoto} 
                  alt="Glenda Macatangay" 
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.4} className="mt-24">
            <div className="border-t border-border pt-16">
              <h2 className="text-3xl md:text-4xl font-serif mb-8">Support the Work</h2>
              
              <div className="max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  This work exists because of community.
                </p>
                
                <p>
                  All donations are received by Paz Y Luz Consulting LLC, the umbrella under which My Healing Language and the Salt In Her Lungs book tour and related offerings are created and stewarded.
                </p>
                
                <p>
                  Your contribution helps sustain survivor-centered storytelling, healing spaces, and educational offerings rooted in care, culture, and truth-telling. It allows this work to remain accessible, values-aligned, and community-supported—especially for those who would otherwise be unable to participate.
                </p>
                
                <div className="py-4">
                  <p className="font-bold text-foreground mb-4">Your support helps fund:</p>
                  <ul className="space-y-2 pl-4">
                    <li className="flex gap-3"><span className="text-primary">•</span> Survivor storytelling projects, zines, and creative offerings</li>
                    <li className="flex gap-3"><span className="text-primary">•</span> Healing circles, workshops, and community gatherings</li>
                    <li className="flex gap-3"><span className="text-primary">•</span> Sliding-scale and scholarship access for survivors and families</li>
                    <li className="flex gap-3"><span className="text-primary">•</span> Educational resources focused on prevention, belief, and healing</li>
                    <li className="flex gap-3"><span className="text-primary">•</span> The ongoing labor of holding safe, intentional spaces for truth and repair</li>
                  </ul>
                </div>
                
                <p className="font-semibold text-foreground">This is not charity.</p>
                <p>It is collective care.</p>
                <p>It is belief in stories.</p>
                <p>It is an investment in healing that ripples outward.</p>
                
                <p>
                  If this work has moved you, supported you, or resonated with your values, your contribution—of any amount—helps carry it forward.
                </p>
                
                <p className="font-semibold text-foreground">
                  Thank you for being part of this circle.
                </p>
                
                <div className="pt-6">
                  <a 
                    href="https://www.paypal.com/donate/?hosted_button_id=JNP33BDCF364N"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors"
                    data-testid="button-donate"
                  >
                    Donate via PayPal
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
