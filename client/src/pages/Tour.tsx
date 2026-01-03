import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useQuery } from "@tanstack/react-query";
import type { TourDate } from "@shared/schema";
import { Link } from "wouter";

export default function Tour() {
  const { data: tourDates, isLoading } = useQuery<TourDate[]>({
    queryKey: ["tourDates"],
    queryFn: async () => {
      const response = await fetch("/api/tour-dates");
      if (!response.ok) throw new Error("Failed to fetch tour dates");
      return response.json();
    },
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12 mb-24">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">The SALTY Tour (2026)</h1>
            <p className="text-xl font-bold text-primary mb-4">Book, Art, Healing, Community</p>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                The SALTY Tour is a multi-city gathering series accompanying the release of Salt in Her Lungs. Each stop blends reading, visual art, music, and facilitated dialogue, partnering with community organizations and universities to create spaces rooted in culture, consent, and care.
              </p>
              <p>
                Tour elements may include author readings and conversation, visual art installations by Filipina and AAPI artists, survivor-centered healing circles, and university talks and keynotes.
              </p>
              <p>
                Planned cities include Hawai‘i, Sacramento, the Bay Area, Los Angeles, Colorado, New York, Vancouver, Montreal, and beyond.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="border-t border-b border-border py-12 space-y-8">
              <h2 className="text-2xl font-serif uppercase tracking-widest">Events</h2>
              {isLoading ? (
                <p className="text-muted-foreground">Loading tour dates...</p>
              ) : tourDates && tourDates.length > 0 ? (
                <div className="space-y-4">
                  {tourDates.map((date) => (
                    <div key={date.id} className="flex justify-between items-center py-4 border-b border-border/50">
                      <div>
                        <span className="font-bold">{date.city}</span>
                        {date.description && (
                          <p className="text-sm text-muted-foreground mt-1">{date.description}</p>
                        )}
                      </div>
                      <span className="text-muted-foreground">{date.date}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Tour dates coming soon! Check back for updates.
                </p>
              )}
            </div>
          </ScrollReveal>
          
          <div className="flex gap-4">
            <Link href="/contact">
              <button className="bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-primary transition-colors">
                Host a Tour Stop
              </button>
            </Link>
            <button className="border border-black px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-primary hover:border-primary hover:text-white transition-colors">
              Attend an Event
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
