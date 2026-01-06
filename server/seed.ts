import { db } from "./db";
import { tourDates } from "@shared/schema";

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
    const existingTourDates = await db.select().from(tourDates);
    
    if (existingTourDates.length === 0) {
      console.log("[seed] No tour dates found, seeding database...");
      
      for (const tourDate of SEED_TOUR_DATES) {
        await db.insert(tourDates).values(tourDate);
      }
      
      console.log(`[seed] Added ${SEED_TOUR_DATES.length} tour dates`);
    } else {
      console.log(`[seed] Database already has ${existingTourDates.length} tour dates, skipping seed`);
    }
  } catch (error) {
    console.error("[seed] Error seeding database:", error);
  }
}
