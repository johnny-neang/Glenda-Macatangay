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
        </div>
      </main>
      <Footer />
    </div>
  );
}
