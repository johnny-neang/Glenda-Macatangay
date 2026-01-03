import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Acknowledgement() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Acknowledgement</h1>
            <p className="text-xl text-muted-foreground">Land & Lineage</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              We acknowledge that the land on which we gather, work, and create is the traditional and unceded territory of Indigenous peoples. We honor with gratitude the land itself and the people who have stewarded it throughout generations.
            </p>

            <p>
              This acknowledgement is one small step in recognizing the ongoing presence and resilience of Indigenous communities and their deep connection to these lands.
            </p>

            <h2 className="text-2xl font-serif text-foreground pt-6">Honoring Lineage</h2>
            <p>
              We also honor the wisdom and sacrifices of our ancestors—those who came before us and whose stories, struggles, and dreams live on in our bodies, our memories, and our work.
            </p>

            <p>
              This work is rooted in the understanding that healing is not just personal—it is collective, intergenerational, and deeply connected to the land and waters that hold our stories.
            </p>

            <p className="italic pt-6">
              May we continue to learn, to listen, and to honor those who have paved the way.
            </p>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
