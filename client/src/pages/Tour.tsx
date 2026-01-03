import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useQuery } from "@tanstack/react-query";
import { useMultiplePageContent } from "@/hooks/use-page-content";
import type { TourDate } from "@shared/schema";
import { Link } from "wouter";
import tourPhoto1 from "@assets/IMG_7787_1767440597169.JPG";
import tourPhoto2 from "@assets/IMG_7793_1767440597170.JPG";
import tourPhoto3 from "@assets/IMG_7796_1767440597170.JPG";

const DEFAULT_TOUR_INTRO = `The SALTY Tour is a multi-city gathering series accompanying the release of Salt in Her Lungs. Each stop blends reading, visual art, music, and facilitated dialogue, partnering with community organizations and universities to create spaces rooted in culture, consent, and care.

Tour elements may include author readings and conversation, visual art installations by Filipina and AAPI artists, survivor-centered healing circles, and university talks and keynotes.

Planned cities include Hawai'i, Sacramento, the Bay Area, Los Angeles, Colorado, New York, Vancouver, Montreal, and beyond.`;

export default function Tour() {
  const { data: content = {} } = useMultiplePageContent(["tour_intro"]);
  const { data: tourDates, isLoading } = useQuery<TourDate[]>({
    queryKey: ["tourDates"],
    queryFn: async () => {
      const response = await fetch("/api/tour-dates");
      if (!response.ok) throw new Error("Failed to fetch tour dates");
      return response.json();
    },
  });

  const tourIntro = content.tour_intro || DEFAULT_TOUR_INTRO;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12 mb-24">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">The SALTY Tour (2026)</h1>
            <p className="text-xl font-bold text-primary mb-4">Book, Art, Healing, Community</p>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              {tourIntro.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} width="100%">
            <div className="border-t border-b border-border py-12 space-y-8">
              <h2 className="text-2xl font-serif uppercase tracking-widest">Events</h2>
              {isLoading ? (
                <p className="text-muted-foreground">Loading tour dates...</p>
              ) : tourDates && tourDates.length > 0 ? (
                <div className="space-y-6">
                  {tourDates.map((event, index) => (
                    <div key={event.id} className={`py-6 ${index !== tourDates.length - 1 ? 'border-b border-border/50' : ''}`}>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">{event.city}, {event.state}</span>
                            {event.description && (
                              <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded">{event.description}</span>
                            )}
                          </div>
                          <div className="text-muted-foreground space-y-1 text-sm">
                            <p><span className="font-semibold">Date:</span> {event.date}</p>
                            <p><span className="font-semibold">Time:</span> {event.time || 'TBD'}</p>
                            <p><span className="font-semibold">Venue:</span> {event.venue || 'TBD'}</p>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {event.rsvpLink ? (
                            <a 
                              href={event.rsvpLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-block bg-primary text-white px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors"
                            >
                              RSVP
                            </a>
                          ) : (
                            <span className="inline-block border border-muted-foreground/30 text-muted-foreground px-6 py-2 text-xs font-bold tracking-widest uppercase">
                              RSVP Coming Soon
                            </span>
                          )}
                        </div>
                      </div>
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
          
          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={tourPhoto1} 
                  alt="Glenda Macatangay" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={tourPhoto2} 
                  alt="Glenda Macatangay" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden col-span-2 md:col-span-1">
                <img 
                  src={tourPhoto3} 
                  alt="Glenda Macatangay" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </ScrollReveal>
          
          <div className="flex gap-4">
            <Link href="/contact">
              <button className="bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-primary transition-colors">
                Host a Tour Stop
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
