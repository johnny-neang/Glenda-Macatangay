import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useMultiplePageContent } from "@/hooks/use-page-content";

const DEFAULT_ACKNOWLEDGEMENT = `We acknowledge that the land on which we gather, work, and create is the traditional and unceded territory of Indigenous peoples. We honor with gratitude the land itself and the people who have stewarded it throughout generations.

This acknowledgement is one small step in recognizing the ongoing presence and resilience of Indigenous communities and their deep connection to these lands.

We also honor the wisdom and sacrifices of our ancestors—those who came before us and whose stories, struggles, and dreams live on in our bodies, our memories, and our work.

This work is rooted in the understanding that healing is not just personal—it is collective, intergenerational, and deeply connected to the land and waters that hold our stories.

May we continue to learn, to listen, and to honor those who have paved the way.`;

export default function Acknowledgement() {
  const { data: content = {} } = useMultiplePageContent(["acknowledgement"]);
  const ackContent = content.acknowledgement || DEFAULT_ACKNOWLEDGEMENT;

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
            {ackContent.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
