import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useMultiplePageContent } from "@/hooks/use-page-content";
import aboutPhoto from "@assets/DFFBAAD2-5A7E-4C0A-9FC5-04C05FB1146B_1767440891536.JPG";

const DEFAULT_ABOUT_BIO = `Glenda Macatangay, MSW, Hilot Binabaylan is a healing arts educator, cultural strategist, and community organizer dedicated to advancing mental health, ancestral healing, and collective well-being through the power of arts, culture, and care. As the founder of My Healing Language, she creates transformative programs that bring ancestral wisdom and holistic healing practices into schools, community spaces, and family systems.

Her work includes the Heart Warrior Training Program, The Ego Check Podcast, LIFEFORCE Embodiment Collective, Memory Palace Survivor Movement, and Comes In Waves Grief Circles. These offerings center those most impacted by trauma, disconnection, and generational silence. Glenda's approach is relational, intuitive, and deeply rooted in her identity as a first-generation Filipina American and daughter of immigrants from Batangas, Philippines.

A former psychotherapist and social worker with over two decades of experience, Glenda is known for bridging ancestral memory with systems change. She is the co-founder of Youth Wellness Movement, Art of Becoming, and Born and Raised Stories, and leads equity and organizational wellness consulting through Paz y Luz Consulting. She is also a mother of four intuitive children and a devoted storyteller committed to building pathways of healing across generations.

Salt in Her Lungs: A Memoir of Trauma, Healing, and the Wisdom of the Waters is her first book. It is a courageous offering that weaves personal narrative, spiritual insight, and cultural remembrance into a guide for anyone learning to breathe again after silence.`;

export default function About() {
  const { data: content = {} } = useMultiplePageContent(["about_bio"]);
  const aboutBio = content.about_bio || DEFAULT_ABOUT_BIO;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start mb-24">
          <ScrollReveal className="order-2 md:order-1 aspect-[3/4] bg-muted relative overflow-hidden">
            <img 
              src={aboutPhoto} 
              alt="Glenda Macatangay" 
              className="w-full h-full object-cover"
            />
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="order-1 md:order-2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif mb-6">About Glenda</h1>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              {aboutBio.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
