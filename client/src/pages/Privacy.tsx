import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground uppercase tracking-widest">Last Updated: January 2026</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="space-y-6 text-muted-foreground">
            <h2 className="text-2xl font-serif text-foreground">Information We Collect</h2>
            <p>
              When you visit our website, we may collect certain information about you, including your name, email address, and any other information you voluntarily provide through our contact forms or newsletter signup.
            </p>

            <h2 className="text-2xl font-serif text-foreground pt-6">How We Use Your Information</h2>
            <p>
              We use the information we collect to respond to your inquiries, send newsletters and updates about events and offerings, and improve our website and services.
            </p>

            <h2 className="text-2xl font-serif text-foreground pt-6">Data Protection</h2>
            <p>
              We are committed to protecting your personal information. We implement appropriate security measures to safeguard your data against unauthorized access, alteration, or disclosure.
            </p>

            <h2 className="text-2xl font-serif text-foreground pt-6">Third-Party Services</h2>
            <p>
              We may use third-party services such as email marketing platforms to manage our newsletter. These services have their own privacy policies governing the use of your information.
            </p>

            <h2 className="text-2xl font-serif text-foreground pt-6">Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us directly.
            </p>

            <h2 className="text-2xl font-serif text-foreground pt-6">Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please reach out through our contact page.
            </p>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
