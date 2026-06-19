import { getDb } from "./db.js";
import { contacts, tourDates, pageContent, testimonials, newsletterSubscribers, type InsertContact, type Contact, type InsertTourDate, type TourDate, type InsertPageContent, type PageContent, type InsertTestimonial, type Testimonial, type InsertNewsletterSubscriber, type NewsletterSubscriber } from "../shared/schema.js";
import { desc, eq, arrayContains, asc } from "drizzle-orm";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;

  createTourDate(tourDate: InsertTourDate): Promise<TourDate>;
  getTourDates(): Promise<TourDate[]>;
  updateTourDate(id: number, tourDate: Partial<InsertTourDate>): Promise<TourDate>;
  deleteTourDate(id: number): Promise<void>;

  getPageContent(pageKey: string): Promise<PageContent | undefined>;
  getAllPageContent(): Promise<PageContent[]>;
  upsertPageContent(pageKey: string, content: string): Promise<PageContent>;

  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonialsByPlacement(placement: string): Promise<Testimonial[]>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: number): Promise<void>;

  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
}

// Thrown by write operations when no database is configured. Reads degrade
// gracefully (return empty results) so the public site falls back to the
// content hardcoded in the React pages.
function requireDb() {
  const db = getDb();
  if (!db) {
    throw new Error("Database is not configured (DATABASE_URL is unset).");
  }
  return db;
}

export class Storage implements IStorage {
  async createContact(contact: InsertContact): Promise<Contact> {
    const db = requireDb();
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }

  async getContacts(): Promise<Contact[]> {
    const db = getDb();
    if (!db) return [];
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async createTourDate(tourDate: InsertTourDate): Promise<TourDate> {
    const db = requireDb();
    const [newTourDate] = await db.insert(tourDates).values(tourDate).returning();
    return newTourDate;
  }

  async getTourDates(): Promise<TourDate[]> {
    const db = getDb();
    if (!db) return [];
    return await db.select().from(tourDates);
  }

  async updateTourDate(id: number, tourDate: Partial<InsertTourDate>): Promise<TourDate> {
    const db = requireDb();
    const [updated] = await db.update(tourDates).set(tourDate).where(eq(tourDates.id, id)).returning();
    return updated;
  }

  async deleteTourDate(id: number): Promise<void> {
    const db = requireDb();
    await db.delete(tourDates).where(eq(tourDates.id, id));
  }

  async getPageContent(pageKey: string): Promise<PageContent | undefined> {
    const db = getDb();
    if (!db) return undefined;
    const [content] = await db.select().from(pageContent).where(eq(pageContent.pageKey, pageKey));
    return content;
  }

  async getAllPageContent(): Promise<PageContent[]> {
    const db = getDb();
    if (!db) return [];
    return await db.select().from(pageContent);
  }

  async upsertPageContent(pageKey: string, content: string): Promise<PageContent> {
    const db = requireDb();
    const existing = await this.getPageContent(pageKey);
    if (existing) {
      const [updated] = await db.update(pageContent)
        .set({ content, updatedAt: new Date() })
        .where(eq(pageContent.pageKey, pageKey))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(pageContent)
        .values({ pageKey, content })
        .returning();
      return created;
    }
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const db = requireDb();
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    const db = getDb();
    if (!db) return [];
    return await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
  }

  async getTestimonialsByPlacement(placement: string): Promise<Testimonial[]> {
    const db = getDb();
    if (!db) return [];
    return await db.select().from(testimonials)
      .where(arrayContains(testimonials.placement, [placement]))
      .orderBy(asc(testimonials.sortOrder));
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const db = requireDb();
    const [updated] = await db.update(testimonials).set(testimonial).where(eq(testimonials.id, id)).returning();
    return updated;
  }

  async deleteTestimonial(id: number): Promise<void> {
    const db = requireDb();
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  async createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const db = requireDb();
    const [newSubscriber] = await db.insert(newsletterSubscribers).values(subscriber).returning();
    return newSubscriber;
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    const db = getDb();
    if (!db) return [];
    return await db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.subscribedAt));
  }
}

export const storage = new Storage();
