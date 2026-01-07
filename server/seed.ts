import { db } from "./db";
import { tourDates } from "@shared/schema";
import { eq, and } from "drizzle-orm";

const SEED_TOUR_DATES = [
  { city: "Bailey", date: "February 4-7", description: "", state: "CO", venue: "", time: "", rsvpLink: "" },
  { city: "Denver", date: "February 8-11", description: "", state: "CO", venue: "", time: "", rsvpLink: "" },
  { city: "Sacramento", date: "March", description: "book release", state: "CA", venue: "", time: "", rsvpLink: "" },
  { city: "Kona", date: "March 24-27", description: "", state: "HI", venue: "", time: "", rsvpLink: "" },
  { city: "Kaua'i", date: "April 3", description: "", state: "HI", venue: "", time: "", rsvpLink: "" },
  { city: "Honolulu", date: "April 18-19", description: "", state: "HI", venue: "", time: "", rsvpLink: "" },
  { city: "San Francisco", date: "April 26", description: "book launch", state: "CA", venue: "", time: "", rsvpLink: "" },
  { city: "New York", date: "May TBD", description: "", state: "NY", venue: "", time: "", rsvpLink: "" },
  { city: "Honolulu", date: "May TBD", description: "", state: "HI", venue: "", time: "", rsvpLink: "" },
  { city: "Vancouver", date: "June 4-7", description: "", state: "CAN", venue: "", time: "", rsvpLink: "" },
  { city: "Montreal", date: "June 14-17", description: "", state: "CAN", venue: "", time: "", rsvpLink: "" },
  { city: "Toronto", date: "June 18-20", description: "", state: "CAN", venue: "", time: "", rsvpLink: "" },
];

export async function seedDatabase() {
  try {
    console.log("[seed] Checking tour dates in database...");
    console.log("[seed] Environment:", process.env.NODE_ENV || "development");
    
    const existingTourDates = await db.select().from(tourDates);
    console.log(`[seed] Found ${existingTourDates.length} existing tour dates`);
    
    if (existingTourDates.length === 0) {
      console.log("[seed] No tour dates found, seeding database...");
      
      for (const tourDate of SEED_TOUR_DATES) {
        await db.insert(tourDates).values(tourDate);
        console.log(`[seed] Added: ${tourDate.city}, ${tourDate.state}`);
      }
      
      console.log(`[seed] Successfully added ${SEED_TOUR_DATES.length} tour dates`);
    } else {
      console.log(`[seed] Database already has ${existingTourDates.length} tour dates`);
      
      const existingCities = existingTourDates.map(t => `${t.city}-${t.date}`);
      let addedCount = 0;
      
      for (const tourDate of SEED_TOUR_DATES) {
        const key = `${tourDate.city}-${tourDate.date}`;
        if (!existingCities.includes(key)) {
          await db.insert(tourDates).values(tourDate);
          console.log(`[seed] Added missing: ${tourDate.city}, ${tourDate.state}`);
          addedCount++;
        }
      }
      
      if (addedCount > 0) {
        console.log(`[seed] Added ${addedCount} missing tour dates`);
      }
    }
  } catch (error) {
    console.error("[seed] Error seeding database:", error);
    console.error("[seed] Stack:", (error as Error).stack);
  }
}
